<template>
  <div id="app">
    <div class="header">
      <h1>校庆图标制作</h1>
    </div>

    <div class="body">
      <el-upload
        v-if="!selected"
        class="avatar-uploader"
        :auto-upload="false"
        action
        :show-file-list="false"
        :on-change="handleFileChange"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <canvas v-show="false" id="cvs" class="cvs"></canvas>

      <div class="loading result" v-if="selected && !resultImg" v-loading="true"></div>
      <img :src="resultImg" v-if="resultImg" class="result" alt />
    </div>
    <div class="footer">
      <p v-if="!selected">点击上方按钮上传头像</p>
      <p v-else class="success">{{isMobile? '长按上方图片保存到相册' : '右击上方图片保存到系统'}}</p>

      <!-- <el-row> -->
      <div class="btn-row">
        <el-upload
          v-if="selected"
          :auto-upload="false"
          action
          :show-file-list="false"
          :on-change="handleFileChange"
        >
          <el-button>更换图片</el-button>
        </el-upload>

        <el-upload
          v-if="selected"
          :auto-upload="false"
          action
          :show-file-list="false"
          :on-change="handleIconChange"
        >
          <el-button>更换图标</el-button>
        </el-upload>
      </div>

      <!-- <a href="#" id="downloader" @onclick="saveImg" download="image.png">
        <el-button type="primary">保存图片</el-button>
      </a>-->

      <!-- </el-row> -->
    </div>
  </div>
</template>

<script>
let cvaWidth = 1600;
let avatar = null;
let icon = null;
export default {
  name: "app",
  components: {},
  data() {
    return {
      selected: false,
      imageUrl: "",
      resultImg: "",
      iconSrc: "logos/cqu01.png",
      isMobile: "ontouchstart" in window
    };
  },
  methods: {
    async handleFileChange(file) {
      this.selected = true;
      let fileBase64 = await this.loadFile(file.raw);
      avatar = await this.loadImg(fileBase64);
      icon = await this.loadImg(this.iconSrc);
      this.drawToCanvas();
    },
    async handleIconChange(file) {
      let fileBase64 = await this.loadFile(file.raw);
      // avatar = await this.loadImg(fileBase64);
      icon = await this.loadImg(fileBase64);
      this.drawToCanvas();
    },
    loadFile(file) {
      return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(file); //转化成base64数据类型
        reader.onload = e => {
          resolve(e.target.result);
        };
        reader.onerror = e => {
          reject(e);
        };
      });
    },
    loadImg(src) {
      return new Promise((resolve, reject) => {
        var img = new Image();

        img.onload = function(e) {
          resolve(e.target);
        };
        img.onerror = function(e) {
          reject(e);
        };
        img.src = src;
      });
    },
    async drawToCanvas() {
      var cvs = document.querySelector("#cvs");
      cvs.width = cvaWidth;
      cvs.height = cvaWidth;
      var ctx = cvs.getContext("2d");
      ctx.drawImage(avatar, 0, 0, cvaWidth, cvaWidth);

      let iconWidth = cvaWidth / 4;
      ctx.drawImage(
        icon,
        (cvaWidth * 245) / 400,
        (cvaWidth * 262) / 400,
        iconWidth,
        iconWidth
      );

      this.resultImg = cvs.toDataURL("image/png");
    }
  }
};
</script>

<style lang="less">
h1 {
  color: #41b883;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  .header {
    // font-size: 16px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .result {
    width: 300px;
    height: 300px;
    // border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0px 0px 7px 1px #d0d0d0;

    &.loading {
      box-shadow: none;
    }
  }

  .footer {
    margin-top: 20px;
    color: #bbb;
    .btn-row {
      display: flex;
      justify-content: center;
      .el-upload {
        margin: 10px;
      }
    }
    .success {
      color: #000;
    }
  }
}
</style>

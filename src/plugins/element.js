import Vue from 'vue'
import { Button, Input, Message, Upload } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

locale.use(lang)

Vue.use(Button)
Vue.use(Input)
Vue.use(Upload)
Vue.prototype.$message = Message;
import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'

import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import CKEditor from '@ckeditor/ckeditor5-vue'
import lottie from 'lottie-web'
//vee-validation
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

import { date, currency } from './libs/filters'

defineRule('required', required)
defineRule('email', email)

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})
setLocale('zh_TW')

const app = createApp(App)

app.config.globalProperties.lottie = lottie

app.directive('num', {
  mounted(el, binding) {
    const p = currency(binding.value)
    el.innerHTML = p
  },
  updated(el, binding) {
    const p = currency(binding.value)
    el.innerHTML = p
  }
})
app.directive('date', {
  mounted(el, binding) {
    const t = date(binding.value)
    el.innerHTML = t
  },
  updated(el, binding) {
    const t = date(binding.value)
    el.innerHTML = t
  }
})

app.use(CKEditor)
app.use(router)
app.use(store)
app.use(VueAxios, axios)
app.component('Loading', Loading)
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')

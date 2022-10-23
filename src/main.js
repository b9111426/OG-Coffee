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

import { date, currency } from './libs/filters'
import $httpMessageState from './libs/pushMessageState'

const app = createApp(App)
app.config.globalProperties.$filters = {
  date,
  currency
}
app.config.globalProperties.$httpMessageState = $httpMessageState
app.config.globalProperties.lottie = lottie

app.directive('price', {
  mounted(el, binding) {
    const p = currency(binding.value)
    el.innerHTML = p
  },
  updated(el, binding) {
    const p = currency(binding.value)
    el.innerHTML = p
  }
})
app.use(router)
app.use(store)
app.use(CKEditor)
app.use(VueAxios, axios)
app.component('Loading', Loading)
app.mount('#app')

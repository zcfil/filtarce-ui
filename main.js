import '@/static/js/pc'
import Vue from 'vue'
import App from './App'
import tip from'./common/tip.js'
import { conversion,moneyFormat,parseTime,money } from './common/costum.js'
Vue.prototype.conversion = conversion
Vue.prototype.moneyFormat = moneyFormat
Vue.prototype.parseTime = parseTime
Vue.prototype.money = money
Vue.prototype.$tip=tip

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
import Vue from 'vue'
import App from './App'
import { alter, toast } from './utils/index';
import navTo from './utils/navTo';
import cache from './utils/cache';
import api from './services/index';

Vue.prototype.$cache = cache;
Vue.prototype.$alert = alter;
Vue.prototype.$toast = toast;
Vue.prototype.$api = api;
Vue.prototype.$href = navTo;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import iView from 'view-design'
import iviewArea from 'iview-area'
import 'view-design/dist/styles/iview.css'
import './commons/theme.less'
import formatter from './commons/utils/formatter'
import util from './commons/utils/index'
import CommonListPage from './components/CommonListPage'


Vue.config.devtools = true
Vue.config.productionTip = false

Vue.prototype.formatter = formatter
Vue.prototype.util = util

Vue.use(iView)
Vue.use(iviewArea)
Vue.component(CommonListPage.name, CommonListPage)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

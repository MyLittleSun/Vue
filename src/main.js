// 入口文件
import Vue from 'vue'

import app from './App.vue'

import { Header } from 'mint-ui'
Vue.component(Header.name, Header)

import './lib/mui/css/mui.min.css'

var vm = new Vue({
    el: '#app',
    render: (ce) => ce(app)
})
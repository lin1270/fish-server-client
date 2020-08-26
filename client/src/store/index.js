import Vue from 'vue'
import Vuex from 'vuex'
import { sendRequest } from '../commons/http/api.js'
import * as types from './types'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: true,
        token: null,
        userInfo: {},
        coinList: null,
        actionList: null
    },
    mutations: {
        [types.SET_TOKEN]: (state, data) => {
            state.token = data
        },
        [types.SET_ACTION_LIST]: (state, data) => {
            state.actionList = data
        },
        [types.SET_USER_INFO]: (state, data) => {
            state.userInfo = data
        },
        [types.SET_COIN_LIST]: (state, data) => {
            state.coinList = data
        },
        logout: (state, data) => {
            state.token = null
            state.userInfo = {}
        }
    },
    actions: {
        [types.SET_TOKEN]: ({ commit }, key) => {
            localStorage.setItem('token', key)
            commit('setToken', key)
        },
        [types.SET_USER_INFO]: ({ commit }, key) => {
            localStorage.setItem('userInfo', JSON.stringify(key))
            commit('setUserInfo', key)
        },
        [types.SET_COIN_LIST]: ({ commit }) => {
            sendRequest('/admin/coin/list-coinid',{},'GET').then(res => {
                if (res) {
                    localStorage.setItem('coinList', JSON.stringify(res.data))
                    commit('setCoinList', res.data)
                }
            })
        },
        [types.SET_ACTION_LIST]: ({ commit }, key) => {
            if (!key) return
            try {
                let data = JSON.stringify(key)
                localStorage.setItem('actionList', data)
                commit('setActionList', data)
            } catch (error) {}
        },
        logout: ({ commit }, data) => {
            localStorage.clear()
            commit('logout', data)
        }
    },
    getters: {
        [types.GET_TOKEN]: state => {
            let token = state.token || localStorage.getItem('token')
            return token
        },
        [types.GET_USER_INFO]: state => {
            let userInfo = Object.keys(state.userInfo).length > 1 ? state.userInfo : JSON.parse(localStorage.getItem('userInfo')) || {}
            return userInfo
        },
        [types.GET_COIN_LIST]: state => {
            let coinArray = state.coinList ? state.coinList : JSON.parse(localStorage.getItem('coinList')) || []
            return coinArray
        },
        [types.GET_ACTION_LIST]: state => {
            let actionArray = state.actionList ? JSON.parse(state.actionList) : JSON.parse(localStorage.getItem('actionList')) || []
            return actionArray
        }
    }
})

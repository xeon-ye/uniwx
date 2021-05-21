import { toast } from './index';
import {get, put } from './cache';
// 获取用户信息
const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                console.log(res);
                resolve(res);
            },
            fail: (err) => {
                console.log(err);
                toast('您取消了授权');
            }
        })
    })

}
const navigateTo = async(params) => {
    let token = get("token");
    //别的操作
    if (token) {
        //可以再做一次token校检
        uni.navigateTo(params)
    } else {
        let res = await getUserInfo();
        put('userInfo', res.userInfo);
        if (res) {
            uni.redirectTo({
                url: "/pages/login/index"
            })
        }
    }
}

const redirectTo = async(params) => {
    let token = get("token");
    //别的操作
    if (token) {
        //可以再做一次token校检
        uni.redirectTo(params)
    } else {
        let res = await getUserInfo();
        put('userInfo', res.userInfo);
        if (res) {
            uni.redirectTo({
                url: "/pages/login/index"
            })
        }
    }
}

const reLaunch = async(params) => {
    let token = get("token");
    //别的操作
    if (token) {
        //可以再做一次token校检
        uni.reLaunch(params)
    } else {
        let res = await getUserInfo();
        put('userInfo', res.userInfo);
        if (res) {
            uni.redirectTo({
                url: "/pages/login/index"
            })
        }
    }
}


const switchTab = async(params) => {
    let token = get("token");
    //别的操作
    if (token) {
        //可以再做一次token校检
        uni.switchTab(params)
    } else {
        let res = await getUserInfo();
        put('userInfo', res.userInfo);
        if (res) {
            uni.redirectTo({
                url: "/pages/login/index"
            })
        }
    }
}

const navigateBack = async(params) => {
    let token = get("token");
    //别的操作
    if (token) {
        //可以再做一次token校检
        uni.navigateBack(params)
    } else {
        let res = await getUserInfo();
        put('userInfo', res.userInfo);
        if (res) {
            uni.redirectTo({
                url: "/pages/login/index"
            })
        }
    }
}


const preloadPage = async(params) => {
    let token = get("token");
    //别的操作
    if (token) {
        //可以再做一次token校检
        uni.preloadPage(params)
    } else {
        let res = await getUserInfo();
        put('userInfo', res.userInfo);
        if (res) {
            uni.redirectTo({
                url: "/pages/login/index"
            })
        }
    }
}

module.exports = {
    navigateTo,
    redirectTo,
    reLaunch,
    switchTab,
    navigateBack,
    preloadPage
}
var cloud = require("./js/cloud_operation")
/**
 * 测试搜团号和模板导入的功能可以使用如下团号
 * 7f6ef486-6f98-41fe-97a1-13fde4fba7c6
 */
App({
    globalData: {
        user_info: {
            uid: "25318dbd-a3d7-4441-8b44-97f42d65dabe", //用户ID
            name: "许孙", //昵称
            img: "cloud://buy-goods-xg7nm6m0/爷的头像.jpeg", //头像 url
            credit: 4.7, //信用 "极好","优秀","良好","一般"
            collect: [4356, 454], //收藏
            circle: [4356, 65476876], //收藏的圈子的ID
            order: [45, 65765], //作为成员下的订单，为谷子的ID数组
            host: [546, 76857], //作为团长开的团，为谷子的ID数组
            message: [4365, 65876958], //消息表的ID
        }
    },
    load: function (cont) {
        swan.showLoading({
            title: cont || '加载中…',
            mask: false
        });
        setTimeout(() => {
            swan.hideLoading();
        }, 2000);
    },
    uload: function () {
        swan.hideLoading();
    },
    unload: function () {
        swan.hideLoading();
    },
    nload: function () {
        swan.hideLoading();
    },
    lastPage: function () {
        let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
        return pages[pages.length - 2];
    },
    creditToTxt: function (credit) {
        return credit > 4 ? '极好' : (credit > 3 ? '优秀' : (credit > 2 ? '良好' : '一般'));
    },
    onLaunch: function () {
        if (!swan.cloud) {
            console.error('请使用 3.105.2 或以上的基础库以使用云能力')
        } else {
            swan.cloud.init({
                traceUser: true,
                env: 'buy-goods-xg7nm6m0'
            })
        }
    },
    show: function (txt) {
        swan.showToast({
            title: txt,
            icon: 'none'
        });
    }
})
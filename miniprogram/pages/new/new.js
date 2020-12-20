import {
    up
} from "../../js/upload";

var cloud = require("../../js/cloud_operation");

Page({
    data: {
        head_img: getApp().globalData.user_info.img, //团长的头像
        name: getApp().globalData.user_info.name, //团长的用户名
        user_id: getApp().globalData.user_info.uid, //团长的user_id
        credit: getApp().globalData.user_info.credit, //团长的信用
        time: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(), //当前的时间戳
        text: '',
        images_list: [], //图片的List
        /*谷子详情*/
        good_detail: [{
            name: "点我编辑",
            price: 66.6,
            num: 5
        }],
        pop_status: false, //弹出窗的状态
        goods: '', //谷子输入框
        money: '', //钱的输入框
    },
    globalData: {
        togeName_tmp: '', //团名
        text_tmp: '', //团介绍
        goods_tmp: '', //暂存弹出框的输入内容
        money_tmp: '', //暂存弹出框的输入内容
        index_tmp: '', //暂存弹出时的index
    },

    navi_intro:function(){
        swan.navigateTo({
            url: '/pages/new/intro/intro'
        });
    },

    async submit() {
        var flag = true;
        const {
            user_id,
            images_list,
            good_detail
        } = this.data;
        const {
            togeName_tmp,
            text_tmp
        } = this.globalData;
        if (togeName_tmp.length == 0) {
            getApp().show("团名不能留空")
            flag = false;
            return;
        }
        if (text_tmp.length == 0) {
            getApp().show("简介不能为空")
            flag = false;
            return;
        }
        if (images_list.length == 0) {
            getApp().show("请至少上传一张图片");
            flag = false;
            return;
        }
        if (good_detail.length == 0) {
            getApp().show("请至少填入一个谷子")
            flag = false;
            return;
        }

        var num = images_list.length;
        var that = this;
        var cloud_img = [];
        swan.showLoading({
            title: `上传图片中(${0}/${images_list.length})`,
            mask: true
        });
        new Promise((resolve, reject) => {
            images_list.forEach(ele => {
                up.upImg(ele).then(res => {
                    cloud_img.push(res);
                    swan.showLoading({
                        title: `上传图片中(${cloud_img.length}/${images_list.length})`,
                        mask: true
                    });
                    if (cloud_img.length == num) {
                        resolve(cloud_img);
                    }
                })
            });
        }).then(res => {
            const detail = that.data.good_detail;
            var tmp_detail = [];
            detail.forEach(element => {
                tmp_detail.push({
                    name: element.name, //某个谷子的名字
                    price: element.price, //谷子的价格
                    num_total: element.num, //谷子的总数
                    num_occupy: 0, //已经占的数量
                    select: 0, //我的选择
                })
            });
            cloud.add("goods", {
                host: { //团长的个人信息
                    host_id: that.data.user_id,
                    host_img: that.data.head_img,
                    host_name: that.data.name,
                    host_credit: this.data.credit
                },
                time: new Date().getTime(), //时间戳
                name: togeName_tmp, //团名
                description: text_tmp, //团描述
                image: res, //谷子的图片
                goods: that.data.good_detail, //谷子详情
                order: [], //订单
                status: "开团中……", //订单状态
                receive_num: "", //物流单号
                comment: [], //评论
            }).then((res) => {
                setTimeout(() => {
                    swan.hideLoading();
                    // swan.showToast({
                    //     title: '开团成功!',
                    //     mask: true
                    // });
                    swan.reLaunch({
                        url: '/pages/newed/newed?goods_id=' + res,
                    });
                    // let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
                    // let prevPage = pages[pages.length - 2];
                    // prevPage.get_popular_goods()
                    // setTimeout(() => {
                    //     swan.navigateBack();
                    // }, 500)
                }, 500)
            })
        })
    },

    onLoad: function () {

    },

    input_togeName: function (e) {
        this.globalData.togeName_tmp = e.detail.value;
    },

    batch: function () { //跳转到批量导入的界面
        swan.navigateTo({
            url: '/pages/new/batch/batch?good_detail=' + encodeURI(JSON.stringify(this.data.good_detail))
        });
    },

    textConfirm: function (e) {
        this.globalData.text_tmp = e.detail.value;
    },

    choose: function (e) {
        const {
            images
        } = e;
        swan.showLoading({
            title: '压缩中'
        });
        var tmp = [];
        var _ = this;
        images.forEach(ele => {
            swan.compressImage({
                src: ele,
                quality: 15,
                success: res => {
                    tmp.push(res.tempFilePath);
                    if (tmp.length == images.length) {
                        swan.hideLoading();
                        this.setData(`images_list`, tmp);
                        // console.log('compressImage success', tmp);
                    }
                },
                fail: err => {
                    console.log('compressImage fail', err);
                }
            });
        });
    },

    input_goods: function (e) {
        this.globalData.goods_tmp = e.detail.value == '' ? '点击编辑' : e.detail.value;
    },

    input_money: function (e) {
        this.globalData.money_tmp = e.detail.value;
    },


    pop_confirm: function () { //弹出框确认
        const {
            goods_tmp,
            money_tmp,
            index_tmp
        } = this.globalData;
        this.setData({
            [`good_detail[${index_tmp}].name`]: goods_tmp,
            [`good_detail[${index_tmp}].price`]: parseFloat(parseFloat(money_tmp).toFixed(1)),
            pop_status: false
        });
    },


    tapGoodInfo: function (e) { //点击谷子信息，进入编辑
        const {
            index
        } = e.currentTarget.dataset;
        this.globalData.goods_tmp = this.data.good_detail[index].name;
        this.globalData.money_tmp = this.data.good_detail[index].price;
        this.globalData.index_tmp = index;
        this.setData({
            pop_status: true,
            goods: this.data.good_detail[index].name,
            money: this.data.good_detail[index].price,
        })
    },

    longPress: function (e) { //长按减号
        var index = e.currentTarget.dataset.index;
        swan.vibrateShort({
            success: () => {
                this.setData({
                    [`good_detail[${index}].num`]: 0
                });
                swan.showToast({
                    title: '已清零',
                    icon: 'success',
                    duration: 1000
                });
            }
        });
    },

    goodLongPress: function (e) { //长按谷子信息
        var index = e.currentTarget.dataset.index;
        swan.vibrateShort({});
        swan.showActionSheet({
            itemList: ["删除", "上移", "下移", "重置"],
            itemColor: '#414141',
            success: res => {
                const {
                    tapIndex
                } = res;
                var t = this.data.good_detail;
                if (tapIndex == 0) {
                    t.splice(index, 1);
                } else if (tapIndex == 1) {
                    if (index > 0) {
                        const tmp_tip = t[index - 1];
                        t[index - 1] = t[index];
                        t[index] = tmp_tip;
                    } else {
                        swan.showToast({
                            title: '当前谷子已在列表顶部啦～',
                            icon: 'none',
                            duration: 1000
                        });
                    }
                } else if (tapIndex == 2) {
                    if (index < t.length - 1) {
                        const tmp_tip = t[index + 1];
                        t[index + 1] = t[index];
                        t[index] = tmp_tip;
                    } else {
                        swan.showToast({
                            title: '当前谷子已在列表底部啦～',
                            icon: 'none',
                            duration: 1000
                        });
                    }
                } else if (tapIndex == 3) {
                    t[index] = {
                        name: "点击编辑",
                        price: 0.0,
                        num: 0
                    };
                }
                this.setData({
                    good_detail: t
                })
            }
        });
    },

    minus: function (e) { //减谷子数量
        var index = e.currentTarget.dataset.index;
        swan.vibrateShort({});
        if (this.data.good_detail[index].num <= 1) {
            this.setData({
                [`good_detail[${index}].num`]: 1
            });
            return;
        }
        this.setData({
            [`good_detail[${index}].num`]: this.data.good_detail[index].num - 1
        });
    },

    plus: function (e) { //加谷子数量
        var index = e.currentTarget.dataset.index;
        swan.vibrateShort({});
        const t = this.data.good_detail[index].num;
        if (this.data.good_detail[index].num < 1) {
            this.setData({
                [`good_detail[${index}].num`]: 1
            });
            return;
        }
        this.setData({
            [`good_detail[${index}].num`]: parseInt(t + 1)
        });
    },

    input_num: function (res) {
        var index = res.currentTarget.dataset.index;
        if (res.detail.value) {
            this.setData({
                [`good_detail[${index}].num`]: parseInt(res.detail.value)
            });
        }
    },

    addGood: function (e) {
        if (this.data.good_detail.length >= 30) {
            swan.showToast({
                title: '至多30项，敬请谅解',
                icon: 'none',
                duration: 1500
            });
            return;
        }
        var t = {
            name: "点击编辑",
            price: parseFloat("0.0"),
            num: 1
        };
        this.setData({
            good_detail: this.data.good_detail.concat(t)
        });
        var query = swan.createSelectorQuery().in(this);
        query.selectViewport().scrollOffset()
        query.select(".submit").boundingClientRect();
        query.exec(function (res) {
            var miss = res[0].scrollTop + res[1].top - 10;
            swan.pageScrollTo({
                scrollTop: miss,
                duration: 300
            });
        });

    }
});
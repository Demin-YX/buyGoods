// var detail = require("../../js/data").data.good_detail;
var detail = {};
var cloud = require("../../js/cloud_operation");
Page({
    data: {
        host_id: detail.host_id, //团长的ID
        host_head: detail.host_head, //团长头像
        host_name: detail.host_name, //团长的名字
        host_credit: detail.host_credit, //团长的信用等级
        goods_id: detail.goods_id, //谷子的ID
        goods_time: detail.goods_time, //谷子的时间 2020-11-03
        goods_title: detail.goods_title, //谷子的名字
        goods_description: detail.goods_description, //谷子的介绍
        goods_imgs: detail.goods_imgs, //谷子的图片
        goods_person: detail.goods_person, //拼团人数
        goods_status: detail.goods_status, //拼团状态
        goods_receiving_num: "", //物流订单号
        comment: detail.comment, //评论的内容
        user_headImg: getApp().globalData.user_info.img, //"我"的头像

        circle: detail.circle, //热门谷圈
        pop_goods_tip: detail.goods_tip, //占位的谷子的信息

        isMe: false, //我是不是团长
        hide: true, //我要评论的评论框是否收起

        buyMoney: '', //登记买谷的金额，需计算

        pop_active: 3, //弹出窗的index
        pop_status: false, //弹出窗的状态

        receiving_person: '', //收货人
        receiving_number: '', //电话号码
        receiving_address: '', //收货地址

    },

    globalData: {
        screenHeight: '', //屏幕的高度
        rect_top: '', //元素的顶部距离屏幕顶部的高度
    },

    onLoad: function (option) {
        console.log(option)
        this.load_data(option);
    },

    tapHead: function () {
        if (this.data.host_id != getApp().globalData.user_info.uid) {
            cloud.launch_dialog(this.data.host_id, this.data.goods_id).then(() => {
                swan.navigateTo({
                    url: '/pages/dialog/dialog?user_id=' + this.data.host_id + "&goods_id=" + this.data.goods_id,
                });
            })
        }
    },


    share: function () {
        swan.setClipboardData({
            data: this.data.goods_id,
            success: res => {
                swan.showToast({
                    title: '复制团号成功,请分享给好友'
                });
            }
        });
    },

    /***********************************************
     *
     *
     *                  发起对话
     *
     *
     ***********************************************/
    dialog: function (res) {
        const uid = res.uid; // 对方的uid
        cloud.launch_dialog(uid, this.data.goods_id).then(() => {
            swan.navigateTo({
                url: '/pages/dialog/dialog?user_id=' + uid +
                    "&goods_id=" + this.data.goods_id
            });
        })
    },

    get_comment: function () {
        cloud.get_comment(this.data.goods_id).then(ele => {
            this.setData({
                comment: ele,
            })
        })
    },

    collect: function () {
        var _ = this;
        swan.getStorage({
            key: 'COLLECT',
            success: res => {
                var data_ = res.data;
                var flag = true; //true 加入 false 删除
                if (data_ == "" || data_ == []) {
                    data_ = [{
                        goods_id: _.data.goods_id,
                        img: _.data.goods_imgs[0],
                        title: _.data.goods_title,
                        cont: _.data.goods_description
                    }];
                } else {
                    let index = -1;
                    res.data.forEach((e, idx) => {
                        /* 在原有数组中 */
                        if (e.goods_id == _.data.goods_id) {
                            index = idx
                        }
                    })
                    if (index > -1) {
                        data_.splice(index, 1)
                        flag = false
                    } else {
                        data_.push({
                            goods_id: _.data.goods_id,
                            img: _.data.goods_imgs[0],
                            title: _.data.goods_title,
                            cont: _.data.goods_description
                        })
                    }
                }
                swan.setStorage({
                    key: 'COLLECT',
                    data: data_,
                    success: e => {
                        // swan.getStorage({
                        //     key: 'COLLECT',
                        //     success: res => {
                        //         console.log("收藏的结果是", res.data)
                        //     }
                        // });
                        swan.showToast({
                            title: flag ? '收藏成功!' : '取消收藏成功!'
                        });
                    }
                })
            },
        });
    },

    load_data: function (option) {
        const _id = option._id;
        cloud.get_goods_detail(_id).then(res => {
            // console.log(res)
            const {
                description,
                goods,
                host,
                image,
                name,
                order,
                receive_num,
                status,
                _id,
                time
            } = res[0];

            cloud.get_order(_id)
                .then(ele => {
                    var pop_goods_tip_tmp = [];
                    goods.forEach((goods_ele, goods_index) => {
                        var occupy_total = 0;
                        ele.forEach(order_ele => {
                            occupy_total += order_ele.order_num[goods_index]
                        });
                        pop_goods_tip_tmp.push({
                            name: goods_ele.name,
                            price: goods_ele.price,
                            num_total: goods_ele.num,
                            num_occupy: occupy_total,
                            select: 0,
                        })
                    });
                    this.setData({
                        pop_goods_tip: pop_goods_tip_tmp,
                        goods_person: ele.length
                    });
                })

            cloud.get_comment(_id).then(ele => {
                this.setData({
                    comment: ele,
                })
            })
            this.setData({
                isMe: host.host_id == getApp().globalData.user_info.uid,
                goods_description: description,
                goods_id: _id,
                goods_time: this.toDate(time),
                host_credit: host.host_credit > 4 ? '极好' : (host.host_credit > 3 ? '优秀' : (host.host_credit > 2 ? '良好' : '一般')),
                host_id: host.host_id,
                host_head: host.host_img,
                host_name: host.host_name,
                goods_imgs: image,
                goods_title: name,
                goods_status: status,
                goods_receiving_num: receive_num,
            })
        })

        var that = this;
        swan.getSystemInfo({
            success: res => {
                that.globalData.screenHeight = res.screenHeight;
            }
        });
        let query = swan.createSelectorQuery();
        query.select('.leave_title').boundingClientRect(rect => {
            that.globalData.rect_top = rect.top;
        }).exec();
    },

    /**
     * 发送评论
     * @param {*} res
     */
    send_comment: function (res) {
        swan.showLoading({
            title: '发表中……'
        });
        var _ = this;
        cloud.send_comment(_.data.goods_id, {
            "uid": "" + getApp().globalData.user_info.uid,
            "img": "" + getApp().globalData.user_info.img,
            "name": "" + getApp().globalData.user_info.name,
            "time": "" + _.toTime(new Date().getTime()),
            "cont": "" + res.leave
        }).then(res => {
            cloud.get_comment(_.data.goods_id).then(ele => {
                _.setData({
                    comment: ele
                });
                swan.hideLoading();
                swan.showToast({
                    title: '留言成功'
                });
                /**
                 * 滑倒最底端
                 */
                setTimeout(() => {
                    swan.pageScrollTo({
                        scrollTop: 10000000
                    });
                }, 50)
            })
        })
    },

    toDate: function (time) {
        var date = new Date(time);
        var res = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        return res;
    },

    toTime: function (time) {
        var date = this.toDate(time);
        var _date = new Date(time);
        var time = ` ${_date.getHours()}:${_date.getMinutes()}`;
        return date + time;
    },

    test_switch: function (e) {
        this.setData({
            isMe: e.detail.checked
        })
    },



    onPageScroll: function (e) {
        // console.log(e)
        this.setData({
            hide: e.scrollTop >= 10 ? false : true
        })
    },

    /**
     * 点击功能按钮
     */
    tapFuncBtn: function (e) {
        var index = parseInt(e.currentTarget.dataset.index);
        console.log(index);
        if (index == 0) {
            swan.navigateTo({
                url: '/pages/detail/member/member?goods_id=' +
                    this.data.goods_id +
                    "&isMe=" + this.data.isMe
            });
        } else if (index == 3) {
            this.setData({
                pop_active: 3,
                pop_status: true
            })
        } else if (index == 5) {
            swan.navigateTo({
                url: '/pages/status/status?status=' +
                    this.data.goods_status +
                    "&number=" +
                    this.data.goods_receiving_num +
                    "&goods_id=" +
                    this.data.goods_id
            });
        } else {
            this.setData({
                pop_active: index + 1,
                pop_status: true
            })
        }
    },

    /**
     * 第二个弹窗
     */

    pop2_comp: function () {
        this.setData({
            pop_status: false
        });
    },

    preview: function (e) {
        var that = this;
        var index = e.currentTarget.dataset.index;
        swan.previewImage({
            current: that.data.goods_imgs[index],
            urls: that.data.goods_imgs
        });
    },

    hide_pop: function () {
        this.setData({
            pop_status: false
        })
    },

    pop3_comp: function (order) {
        swan.showModal({
            content: '亲爱的用户你好,为了确保团购质量和用户体验,您的参团【操作不可逆】,请确认是否参团',
            success: res => {
                if (res.confirm) {
                    const {
                        receiving_person,
                        receiving_number,
                        receiving_address,
                        receiving_name,
                        select
                    } = order;
                    var order_tip = [];
                    this.data.pop_goods_tip.forEach((ele, index) => {
                        order_tip.push({
                            name: ele.name,
                            price: ele.price,
                            num_total: ele.num_total,
                            num: select[index]
                        })
                    });
                    var _ = this;
                    cloud.take_order(_.data.goods_id, {
                        usrIsPaid: false,
                        isPaid: false,
                        host_id: _.data.host_id,
                        receiving_person: receiving_person,
                        receiving_number: receiving_number,
                        receiving_address: receiving_address,
                        receiving_name: receiving_name,
                        goods_id: _.data.goods_id,
                        user_id: getApp().globalData.user_info.uid,
                        order: order_tip,
                        order_num: select
                    }).then(() => {
                        swan.showToast({
                            title: '参团成功!',
                        });
                        _.setData({
                            pop_status: false
                        });
                        _.load_data({
                            _id: _.data.goods_id
                        });
                    })
                }
            }
        });
    },

});
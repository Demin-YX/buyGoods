const db = swan.cloud.database();
const _ = db.command;
const MAX_LIMIT = 1000;

function sout(operation, collection, inData, outData) {
    console.log({
        操作: operation,
        集合: collection,
        入参: inData,
        回参: outData
    })
}

function serr(operation, err) {
    let msg = "";
    if (err.errCode == "400636") {
        msg = "权限异常,不允许操作,Code:400636，请尝试反馈给开发者吧"
    }
    swan.showToast({
        title: msg || '服务器失联了…若无法正常操作,请稍后再试或反馈给我们～',
        icon: "none"
    });
    console.error({
        操作: operation,
        报错: err
    })
}

module.exports = {
    /**
     * 回调结果的ID和错误信息
     * @param {*} collection 集合的名称
     * @param {*} data 新增的数据
     */
    add: function (collection, data) {
        return new Promise((resolve) => {
            db.collection(collection)
                .add({
                    data: data
                })
                .then(res => {
                    sout("/add", collection, data, res._id)
                    resolve(res._id)
                })
                .catch(err => {
                    serr("/add", err)
                });
        })
    },


    /**
     * 验证用户信息有效性
     */
    verify_user_info: function () {
        return new Promise((resolve, reject) => {
            db.collection("user")
                .where({
                    uid: getApp().globalData.user_info.uid
                })
                .get()
                .then(res => {
                    resolve(res.data.length)
                    sout("/verify_user_info", "user", {}, res)
                })
                .catch(err => {
                    serr("/verify_user_info", err)
                })
        })
    },

    /**
     * 首页获取热门的谷子
     * 返回:谷子展示卡片所需的信息
     */
    get_popular_goods: function (limit, offset) {
        var limit_ = limit || 6;
        var offset_ = offset || 0;
        return new Promise(resolve => {
            db.collection('goods')
                .skip(offset_)
                .limit(limit_)
                .get()
                .then(res => {
                    sout("/get_popular_goods", "goods", "", res)
                    var tmp = [];
                    if (!res.data.length) {
                        resolve([])
                    }
                    //取出前4个谷子,不满四个则全部取出
                    res.data.forEach(ele => {
                        this.get_order_num(ele._id).then(number => {
                            var goods_tmp = ele.goods;
                            var price = 0,
                                num = 0;
                            //计算总价格 总数量
                            goods_tmp.forEach(goods => {
                                price += parseFloat(goods.price || 0) * parseFloat(goods.num || 0);
                                num += parseFloat(goods.num || 0);
                            });
                            // console.log(num)
                            tmp.push({
                                goodsID: ele._id,
                                img: ele.image[0],
                                title: ele.name,
                                price: parseFloat(price / num).toFixed(2),
                                person: number,
                                credit: ele.host.host_credit > 4 ? '极好' : (ele.host.host_credit > 3 ? '优秀' : (ele.host.host_credit > 2 ? '良好' : '一般')),
                            })
                            // console.log(tmp, res.data)
                            if (tmp.length == res.data.length) {
                                resolve(tmp);
                            }
                        })
                    });
                })
                .catch(err => {
                    serr("/get_popular_goods", err);
                });
        })
    },

    /**
     * 获取订单数
     */
    get_order_num: function (goods_id) {
        return new Promise((resolve, reject) => {
            db.collection("order")
                .where({
                    goods_id: goods_id
                })
                .get()
                .then(res => {
                    sout("/get_order_num", "order", goods_id, res)
                    resolve(res.data.length)
                })
        })
    },


    /**
     * 通过ID获取谷子的详细信息
     */
    get_goods_detail: function (_id) {
        return new Promise((resolve) => {
            db.collection('goods')
                .where({
                    _id: _id
                })
                .get()
                .then(res => {
                    sout("/get_goods_detail", "goods", {
                        _id
                    }, res)
                    resolve(res.data)
                })
                .catch(err => {
                    serr("/get_goods_detail", err)
                });
        })
    },

    /**
     * 发送评论
     */
    send_comment: function (goods_id, comment) {
        return new Promise((resolve) => {
            db.collection('comment')
                .add({
                    data: {
                        goods_id: goods_id,
                        comment: comment
                    },
                    success: res => {
                        sout("/send_comment", "comment", {
                            goods_id: goods_id,
                            comment: comment
                        }, res)
                        resolve()
                    },
                    fail: err => {
                        serr("/send_comment", err)
                    }
                })
        })
    },

    /**
     * 重新获取评论
     */
    get_comment: function (goods_id) {
        var comment_tmp = [];
        return new Promise(resolve => {
            db.collection('comment')
                .where({
                    goods_id: goods_id,
                })
                .limit(MAX_LIMIT)
                .get()
                .then(res => {
                    sout("/get_comment", "comment", {
                        goods_id
                    }, res)
                    res.data.forEach(element => {
                        let element_tmp = element.comment;
                        element_tmp._id = element._id;
                        element_tmp._author_id = element._cbd_author_id;
                        comment_tmp.push(element_tmp)
                    });
                    resolve(comment_tmp);
                })
                .catch(err => {
                    serr("/get_comment", err)
                })
        })
    },


    /**
     * 删除评论
     */
    del_comment: function (comment_id) {
        return new Promise((resolve, reject) => {
            db.collection('comment').doc(comment_id).remove()
                .then(res => {
                    sout("/del_comment", "comment", {
                        comment_id: comment_id
                    }, res)
                    resolve(res)
                }).catch(err => {
                    serr("/del_comment", err)
                })
        })
    },


    /**
     * 更新谷子的状态
     * 入参1 status - 谷子状态
     * 入参2 num - 物流单号
     */
    update_status: function (goods_id, status, num) {
        return new Promise(resolve => {
            db.collection('goods')
                .doc(goods_id)
                .update({
                    data: {
                        status: status,
                        receive_num: num
                    },
                })
                .then(res => {
                    sout("/update_status", "goods", {
                        data: {
                            status: status,
                            receive_num: num
                        },
                    }, res)
                    resolve(res.stats.updated);
                })
                .catch(err => {
                    serr("/update_status", err)
                })
        })
    },

    /**
     * 下订单
     * 入参1 order - {}
     * order_num[3, 0, 0, 2, 0, 5, ...][谷子1*3，谷子3*4，谷子4*5，……]
     */
    take_order: function (goods_id, order) {
        return new Promise((resolve, reject) => {
            order.head_img = getApp().globalData.user_info.img
            order.user_credit = getApp().globalData.user_info.credit
            db.collection('order')
                .add({
                    data: order,
                    success: res => {
                        sout("/take_order", "order", {
                            goods_id,
                            order
                        }, res);
                        resolve();
                    },
                    fail: err => {
                        serr("/take_order", err);
                    }
                });
        })
    },

    /**
     * 获取订单信息
     * goods_id - 谷子的ID
     */
    get_order: function (goods_id) {
        return new Promise((resolve) => {
            db.collection('order')
                .where({
                    goods_id: goods_id
                })
                .limit(MAX_LIMIT)
                .get()
                .then(res => {
                    sout("/get_order", "order", goods_id, res)
                    resolve(res.data)
                })
                .catch(err => {
                    serr("/get_order", err)
                });
        })
    },

    /**
     * 获取谷子下的所有订单信息
     */
    get_orders_total: function (goods_id) {
        return new Promise((resolve, reject) => {
            db.collection("order").where({
                    goods_id: goods_id
                })
                .get()
                .then(res => {
                    sout("/get_orders_total", "order", goods_id, res)
                    var person = [];
                    res.data.forEach((ele, index) => {
                        var goods_tmp = [];
                        ele.order.forEach(goods => {
                            if (goods.num)
                                goods_tmp.push({
                                    name: goods.name,
                                    price: goods.price,
                                    num: goods.num
                                })
                        })
                        person.push({
                            head_img: ele.head_img,
                            name: ele.receiving_person,
                            credit: ele.user_credit,
                            isMemberPaied: ele.usrIsPaid,
                            goods: goods_tmp,
                            user_id: ele.user_id,
                            order_id: ele._id,
                            receive: {
                                name: ele.receiving_name,
                                num: ele.receiving_number,
                                addr: ele.receiving_address,
                                person: ele.receiving_person
                            }
                        })
                    })
                    getApp().uload()
                    resolve(person)
                })
                .catch(err => {
                    serr("/get_orders_total", err)
                })
        })
    },

    /**
     * 用户标记已付款/未付款
     */
    set_user_paid: function (order_id, paid) {
        return new Promise((resolve, reject) => {
            db.collection("order")
                .doc(order_id)
                .update({
                    data: {
                        usrIsPaid: _.set(paid)
                    }
                })
                .then(res => {
                    sout("/set_user_paid", "order", {
                        order_id,
                        paid
                    }, res)
                    resolve();
                })
        })
    },

    /**
     * 获取支付信息
     * order_ids - 订单编号数组
     */
    get_total_isPaid: function (order_ids) {
        const length = order_ids.length;
        let res_arr = [];
        var index_order = 0;
        return new Promise((resolve, reject) => {
            order_ids.forEach((ele, index) => {
                /**
                 * 获取全部订单支付信息
                 */
                db.collection('paid')
                    .where({
                        order_id: ele
                    })
                    .get()
                    .then(res => {
                        res_arr[index] = res.data[0] ? res.data[0].isPaid : false;
                        index_order++;
                        if (index_order == length) {
                            resolve(res_arr);
                            sout("/get_total_isPaid", "paid", order_ids, res_arr)
                        }
                    })
                    .catch(err => {
                        serr("/get_total_isPaid", err)
                    });
            });
        })
    },


    /**
     * 团长标记已付款/未付款
     * paid - 团长标记是否已付款
     * usrIsPaid - 用户表示是否已付款
     */
    set_host_paid: function (order_id, paid) {
        return new Promise((resolve, reject) => {
            db.collection('paid')
                .where({
                    order_id: order_id
                })
                .get()
                .then(res => {
                    /**
                     * 首次维护支付表
                     */
                    if (res.data.length == 0) {
                        db.collection('paid')
                            .add({
                                data: {
                                    order_id: order_id,
                                    isPaid: paid
                                }
                            })
                            .then(res0 => {
                                sout("/set_host_paid", "paid", {
                                    order_id: order_id,
                                    isPaid: paid
                                }, res0);
                                resolve()
                            })
                            .catch(err0 => {
                                serr("/set_host_paid", err0)
                            });
                    } else {
                        /**
                         * 已有支付表
                         * 更新
                         */
                        db.collection('paid')
                            .doc(res.data[0]._id)
                            .update({
                                data: {
                                    isPaid: paid
                                }
                            })
                            .then(res1 => {
                                sout("/set_host_paid", "paid", {
                                    isPaid: paid
                                }, res1);
                                resolve();
                            })
                            .catch(err1 => {
                                serr("/set_host_paid", err1)
                            })
                    }
                })
        })
    },

    /**
     * 从 host_id recv_id 获取订单
     * @param {*} host_id
     * @param {*} recv_id
     */
    get_msg_from_host_recv: function (host_id, recv_id) {
        return new Promise((resolve, reject) => {
            if (!host_id && recv_id) {
                db.collection("dialog").where({
                        recv_id: recv_id
                    }).limit(MAX_LIMIT).get()
                    .then(res => {
                        resolve(res);
                    }).catch(err => {
                        reject(err)
                    });
            } else if (host_id && !recv_id) {
                db.collection("dialog").where({
                        host_id: host_id
                    }).limit(MAX_LIMIT).get()
                    .then(res => {
                        resolve(res);
                    }).catch(err => {
                        reject(err)
                    });
            } else if (host_id && recv_id) {
                db.collection("dialog").where({
                        recv_id: recv_id,
                        host_id: host_id
                    }).limit(MAX_LIMIT).get()
                    .then(res => {
                        resolve(res);
                    }).catch(err => {
                        reject(err)
                    });
            }
        })
    },

    /**
     * 添加新用户
     */
    add_usr_info: function (info) {
        db.collection('user')
            .where({
                uid: info.uid
            })
            .get()
            .then(res => {
                /* 没有找到就新建 */
                if (!res.data.length) {
                    db.collection("user")
                        .add({
                            data: info
                        })
                        .then(res_1 => {
                            sout("/add_usr_info", "user", info, res_1);
                        })
                        .catch(err => {
                            serr("/add_usr_info", err);
                        });
                }
            })
            .catch(err => {
                serr("/add_usr_info", err);
            });
    },

    /**
     * 获取用户详细信息
     */
    get_usr_info: function (uid) {
        return new Promise((resolve, reject) => {
            db.collection("user")
                .where({
                    uid: uid
                }).get()
                .then(res => {
                    resolve(res.data[0]);
                    sout("/get_usr_info", "user", {
                        uid
                    }, res);
                })
                .catch(err => {
                    serr("/get_usr_info", err);
                });
        })
    },

    /**
     * 补全对话
     */
    completion_dialog: function (host_identify, recv_identify) {
        return new Promise((resolve, reject) => {
            let host_1 = [];
            let host_2 = [];
            let recv_1 = [];
            let recv_2 = [];
            let alter = [];
            let count = 0;
            let hst = host_identify;
            let rcv = recv_identify;
            host_identify.forEach((ele, idx) => {
                host_1.push(ele.host_id);
                host_2.push(ele.recv_id);
            })
            recv_identify.forEach((ele, idx) => {
                recv_1.push(ele.host_id);
                recv_2.push(ele.recv_id);
            })
            recv_1.forEach((ele, idx) => {
                if (host_2.indexOf(ele) < 0) {
                    alter.push({
                        ele: ele,
                        goods_id: recv_identify[idx].goods_id
                    });
                }
            });
            if (!alter.length) resolve({
                hst,
                rcv
            });
            /******************************************
             *
             *
             *             补全收到的聊天对话
             *
             *
             ******************************************/
            alter.forEach((ele) => {
                //不在我维护的表中，新建dialog
                db.collection("dialog").add({
                    data: {
                        host_id: getApp().globalData.user_info.uid,
                        recv_id: ele.ele,
                        goods_id: ele.goods_id,
                        content: []
                    }
                }).then(res => {
                    hst.push({
                        host_id: getApp().globalData.user_info.uid,
                        recv_id: ele.ele,
                        goods_id: ele.goods_id,
                        content: []
                    })
                    count++;
                    if (count == alter.length) resolve({
                        hst,
                        rcv
                    })
                }).catch(err => {
                    serr("/completion_dialog", err)
                })
            })
        })
    },

    /**
     * 找到我为主导的对话
     * @param {*} hst
     */
    get_dialog_by_host: function (hst) {
        const length = hst.length;
        let ret = [];
        return new Promise((resolve, reject) => {
            hst.forEach(ele => {
                /* _id获取谷子信息 */
                this.get_goods_detail(ele.goods_id).then(goods => {
                    this.get_usr_info(ele.recv_id)
                        .then(user => {
                            // console.log("消息内容", ele.content[ele.content.length - 1])
                            ret.push({
                                goods_id: ele.goods_id,
                                usr_id: ele.recv_id,
                                is_read: true,
                                goods_img: goods[0].image[0],
                                head_img: user.img, //头像
                                message_name: user.name, //消息的标题
                                message_content: ele.content.length == 0 ? "暂无消息" : (ele.content[ele.content.length - 1].type == "img" ? '收到一张图片' : ele.content[ele.content.length - 1].content), //消息的最近提示
                                message_recent: ele.content.length == 0 ? "" : ele.content[ele.content.length - 1].time, //最近的时间
                            })
                            if (ret.length == length) resolve(ret)
                        })
                        .catch(err => {
                            serr("/get_dialog_by_host", err)
                        })
                })
            })
        })
    },

    /**
     * @param {*} host_identify 我发起的
     * @param {*} recv_identify 我收到的
     */
    get_msg_total_detail: function (host_identify) {
        return new Promise((resolve) => {
            this.get_dialog_by_host(host_identify).then(res => {
                    resolve(res)
                })
                .catch(err => {
                    serr("/get_msg_total_detail", err)
                })
        })
    },

    /**
     * 通过我的uid
     * 获取和我相关的消息
     * 界面为/pages/message/message
     */
    get_total_msg: function (uid) {
        return new Promise((resolve) => {
            var return_data = [];
            this.get_msg_from_host_recv(uid, "").then(res => {
                /* 我发起的 */
                this.get_msg_from_host_recv("", uid).then(res_1 => {
                    /* 我收到的 */
                    if (!res.data.length && !res_1.data.length) {
                        resolve([]);
                        sout("/get_total_msg", "dialog", uid, [])
                    }
                    this.completion_dialog(res.data, res_1.data)
                        .then(res_2 => {
                            this.get_msg_total_detail(res_2.hst)
                                .then(res_3 => {
                                    sout("/get_total_msg", "dialog", uid, res_3)
                                    resolve(res_3);
                                })
                        })
                }).catch(err_1 => {
                    serr("/get_total_msg", err_1);
                })
            }).catch(err => {
                serr("/get_total_msg", err)
            })
        })
    },

    /**
     * 发起对话
     */
    launch_dialog: function (recv_id, goods_id) {
        return new Promise((resolve, reject) => {
            /******************************************
             *
             *
             *
             *     第一步、判断是否已有对话，他发起的
             *
             *
             *
             ******************************************/
            db.collection('dialog')
                .where({
                    //他发起的
                    host_id: recv_id,
                    recv_id: getApp().globalData.user_info.uid
                })
                .get()
                .then(res => {
                    if (res.data.length) {
                        //有了
                        resolve()
                    } else {
                        /******************************************
                         *
                         *
                         *
                         *     第二步、判断是否已有对话，我发起的
                         *
                         *
                         *
                         ******************************************/
                        db.collection('dialog')
                            .where({
                                host_id: getApp().globalData.user_info.uid,
                                recv_id: recv_id
                            })
                            .get()
                            .then(res => {
                                if (res.data.length) {
                                    resolve()
                                } else {
                                    /******************************************
                                     *
                                     *
                                     *
                                     *         第三步、两边都没有，新建
                                     *
                                     *
                                     *
                                     ******************************************/
                                    db.collection("dialog")
                                        .add({
                                            data: {
                                                host_id: getApp().globalData.user_info.uid,
                                                recv_id: recv_id,
                                                goods_id: goods_id,
                                                content: []
                                            }
                                        })
                                        .then(res => {
                                            sout("/launch_dialog", "dialog", {
                                                host_id: getApp().globalData.user_info.uid,
                                                recv_id: recv_id,
                                                goods_id: goods_id,
                                                content: []
                                            }, res)
                                            resolve();
                                        })
                                        .catch(err => {
                                            serr("/launch_dialog", err);
                                        })
                                }
                            })
                    }
                })
        })
    },


    /**
     * 获取我的留言
     */
    get_mine_leave: function (opposite_id) {
        return new Promise((resolve, reject) => {
            db.collection("dialog")
                .where({
                    host_id: getApp().globalData.user_info.uid,
                    recv_id: opposite_id
                })
                .get()
                .then(res => {
                    resolve(res.data[0]);
                    sout("/get_mine_leave", "dialog", {
                        host_id: getApp().globalData.user_info.uid,
                        recv_id: opposite_id
                    }, res)
                })
                .catch(err => {
                    serr("/get_mine_leave", err);
                })
        })
    },

    /**
     * 获取对方留言
     */
    get_oppose_leave: function (opposite_id) {
        return new Promise((resolve, reject) => {
            db.collection("dialog")
                .where({
                    recv_id: getApp().globalData.user_info.uid,
                    host_id: opposite_id
                })
                .get()
                .then(res => {
                    resolve(res.data[0]);
                    sout("/get_oppose_leave", "dialog", {
                        host_id: getApp().globalData.user_info.uid,
                        recv_id: opposite_id
                    }, res)
                })
                .catch(err => {
                    serr("/get_oppose_leave", err);
                })
        })
    },

    /**
     * 给对方发消息
     */
    send_msg: function (uid, content) {
        console.log(uid, content)
        return new Promise((resolve) => {
            db.collection('dialog')
                .where({
                    host_id: getApp().globalData.user_info.uid,
                    recv_id: uid
                })
                .get()
                .then(res => {
                    console.log(2345)
                    const _id = res.data[0]._id;
                    db.collection('dialog')
                        .doc(_id)
                        .update({
                            data: {
                                content: _.push([content])
                            }
                        })
                        .then(res => {
                            resolve()
                            sout("/send_msg", "dialog", {
                                uid,
                                content
                            }, res)
                        })
                        .catch(err => {
                            serr("/send_msg", err)
                        })
                })
                .catch(err => {
                    console.error(err)
                })
        })
    },

    /**
     * 验证团号是否有效
     */
    verify_goods_id: function (goods_id) {
        return new Promise((resolve) => {
            db.collection("goods")
                .where({
                    _id: goods_id
                })
                .get()
                .then(res => {
                    resolve(res.data.length)
                    sout("/verify_goods_id", "goods", goods_id, res)
                })
        })
    },

    /**
     * 获取谷子模板
     */
    get_goods_template: function (goods_id) {
        return new Promise((resolve, reject) => {
            db.collection("goods")
                .where({
                    _id: goods_id
                })
                .get()
                .then(res => {
                    sout("/get_goods_template", "goods", goods_id, res)
                    resolve(res.data[0])
                })
                .catch(err => {
                    serr("/get_goods_template", err)
                })
        })
    },

    /**
     * 获取我的购买
     */
    get_my_purchase: function () {
        return new Promise((resolve, reject) => {
            db.collection("order")
                .where({
                    user_id: getApp().globalData.user_info.uid
                })
                .get()
                .then(res => {
                    var res_data = [];
                    res.data.forEach(ele => {
                        this.get_goods_detail(ele.goods_id)
                            .then(goods => {
                                console.log({
                                    谷子: goods,
                                    订单: ele
                                })
                                var price = 0;
                                ele.order.forEach(order => {
                                    price += order.price * order.num
                                });
                                res_data.push({
                                    goods_id: goods[0]._id,
                                    img: goods[0].image[0],
                                    title: goods[0].name,
                                    price: price,
                                    goods: [],
                                    status: goods[0].status,
                                    waybill: goods[0].receive_num,
                                    user: {},
                                    minePaid: ele.usrIsPaid
                                })
                                if (res_data.length == res.data.length) {
                                    resolve(res_data)
                                    sout("/get_my_purchase", "order", getApp().globalData.user_info.uid, res_data)
                                }
                            })
                    });
                })
                .catch(err => {
                    serr("/get_my_purchase", err)
                })
        })
    },

    /**
     * 获取我的开团
     */
    get_mine_group: function () {
        return new Promise((resolve, reject) => {
            db.collection("goods")
                .where({
                    _cbd_author_id: getApp().globalData.user_info.uid
                })
                .get()
                .then(res => {
                    var res_tmp = [];
                    res.data.forEach(ele => {
                        res_tmp.push({
                            goods_id: ele._id,
                            img: ele.image[0],
                            title: ele.name,
                            tip: ele.description
                        })
                    });
                    resolve(res_tmp);
                    sout("/get_mine_group", "goods", getApp().globalData.user_info.uid, res)
                })
                .catch(err => {
                    serr("/get_mine_group", err)
                })
        })
    },

    /**
     * 获取指南
     */
    get_guide: function () {
        return new Promise((resolve, reject) => {
            db.collection("guide")
                .get()
                .then(res => {
                    sout("/get_guide", "guide", {}, res)
                    resolve(res.data[0].imgs)
                })
                .catch(err => {
                    serr("/get_guide", err)
                })
        })
    }

}
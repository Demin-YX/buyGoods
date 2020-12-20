const cloud = require("../../../js/cloud_operation");

Page({
    data: {
        isHost: false, //团长视角
        person: [],
        user_id: getApp().globalData.user_info.uid, //用户的ID
    },

    onLoad: function (option) {
        getApp().load()
        cloud.get_orders_total(option.goods_id).then(res => {
            let order_ids = [];
            let person_tmp = res;
            res.forEach(ele => {
                order_ids.push(ele.order_id)
            });
            cloud.get_total_isPaid(order_ids)
                .then(paid => {
                    console.log("paid", paid)
                    person_tmp.forEach((person_tmp_ele, person_tmp_index) => {
                        person_tmp_ele.isPaied = paid[person_tmp_index]
                    })
                    console.log("person_tmp", person_tmp)
                    this.setData({
                        person: person_tmp
                    })
                    getApp().unload()
                })
            // this.setData({
            //     person: res
            // })
        })
        this.setData({
            isHost: option.isMe == "true" ? true : false
        });
    },

    MinePay: function (e) {
        getApp().load()
        const {
            index,
            paid
        } = e;
        const order_id = this.data.person[index].order_id
        cloud.set_user_paid(order_id, !paid)
            .then(() => {
                getApp().unload()
                swan.showToast({
                    title: `${paid?'已标记未付款':'已标记已付款'},此标记仅做为团长参考使用,具体付款信息由团长标记`,
                    icon: 'none',
                });
                this.setData(
                    `person.${index}.isMemberPaied`, !paid
                )
            })
    },

    pay: function (e) {
        const {
            paid,
            index
        } = e;
        getApp().load()
        const order_id = this.data.person[index].order_id
        cloud.set_host_paid(order_id, !paid).then(() => {
            getApp().uload()
            this.setData(
                `person.${index}.isPaied`, !paid
            )
        })
    },

    switchChange: function (e) {
        this.setData({
            isHost: e.detail.checked
        })
        // console.log(e.detail.checked)
    }

});
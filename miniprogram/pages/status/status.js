const cloud = require("../../js/cloud_operation")

Page({
    data: {
        address: "",
        select_range: ["已成团", "已下单", "岛内运输中", "国际运输中"],
        input_num: "",
        goods_id: "",
    },

    onLoad: function (option) {
        const {
            status,
            number,
            goods_id
        } = option;
        this.setData({
            address: status,
            input_num: number,
            goods_id: goods_id
        })
    },

    select_change: function (e) {
        const {
            detail
        } = e;
        this.setData(
            `address`, this.data.select_range[detail.value]
        )
    },

    input: function (e) {
        this.setData(
            `input_num`, e.detail.value
        )
    },

    comp: function () {
        swan.showLoading();
        var _ = this;
        cloud.update_status(this.data.goods_id, this.data.address, this.data.input_num).then(updated => {
            if (updated) {
                swan.hideLoading();
                getApp().lastPage().setData({
                    goods_status: _.data.address,
                    goods_receiving_num: _.data.input_num,
                })
                swan.showToast({
                    title: '更新成功!',
                });
                setTimeout(() => {
                    swan.navigateBack({
                        delta: 0,
                    });
                }, 1000);
            }
        })
    },

});
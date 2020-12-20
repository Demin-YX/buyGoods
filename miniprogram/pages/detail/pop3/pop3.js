const cloud = require("../../../js/cloud_operation");
Component({
    properties: {
        pop_active: {
            type: Boolean
        },
        pop_goods_tip: {
            type: Object
        },
        goods_id: {
            type: String
        }
    },

    data: {
        receiving_person: '', //收货人
        receiving_number: '', //电话号码
        receiving_address: '', //收货地址
        receiving_name: '', //登记的名字
    },

    methods: {
        input: function (e) {
            this.setData({
                receiving_name: e.detail.value
            })
        },
        logistics: function (e) {
            const {
                userName,
                telNumber,
                provinceName,
                cityName,
                countyName,
                townName,
                detailInfo,
            } = e.detail;
            if (userName) {
                this.setData({
                    receiving_person: userName,
                    receiving_number: telNumber,
                    receiving_address: provinceName + cityName + countyName + townName + detailInfo
                });
            }
        },

        minus_btn: function (e) {
            swan.vibrateShort();
            var index = e.currentTarget.dataset.index;
            const {
                num_total,
                num_occupy,
                select
            } = this.data.pop_goods_tip[index];
            var leave = num_total - num_occupy;
            if (select > 0) {
                this.setData({
                    [`pop_goods_tip.${index}.select`]: select - 1
                })
            }

        },

        add_btn: function (e) {
            swan.vibrateShort();
            var index = e.currentTarget.dataset.index;
            const {
                num_total,
                num_occupy,
                select
            } = this.data.pop_goods_tip[index];
            var leave = num_total - num_occupy;
            if (select < leave) {
                this.setData({
                    [`pop_goods_tip.${index}.select`]: select + 1
                })
            }
        },
        pop3_comp: function () {
            var flag = false; //判断用户是否选择了谷子
            var select = [];
            this.data.pop_goods_tip.forEach(ele => {
                if (ele.select) flag = true;
                select.push(ele.select);
            });
            // var toast = `选择的谷子的数量为【${select}】,地址和收货人信息为【${this.data.receiving_person},${this.data.receiving_number},${this.data.receiving_address}】，下单人为【${this.data.receiving_name}】`;
            if (flag && this.data.receiving_person && this.data.receiving_number && this.data.receiving_address) {
                this.triggerEvent('comp', {
                    select: select,
                    receiving_person: this.data.receiving_person,
                    receiving_number: this.data.receiving_number,
                    receiving_address: this.data.receiving_address,
                    receiving_name: this.data.receiving_name
                });
            } else if (!flag) {
                getApp().show("请至少选择一个谷子")
            } else {
                getApp().show("请补全你的地址")
            }
        }
    }
});
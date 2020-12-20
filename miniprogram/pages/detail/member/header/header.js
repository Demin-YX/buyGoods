Component({
    properties: {
        isMine: {
            type: Boolean
        },
        item: {
            type: Object
        }
    },

    attached: function () {
        console.log("data", this.data.item)
    },

    methods: {
        launchMsg: function () {
            // if (this.data.item.user_id != getApp().globalData.user_info.uid) {

            // }
        },
        tapPay: function () {
            /**
             * 团长点击已付款
             */
            this.triggerEvent('pay', {
                paid: this.data.item.isPaied,
                index: this.data.index
            })
        },

        MinePay: function () {
            /**
             * 用户点击我已付款
             */
            this.triggerEvent('minepay', {
                paid: this.data.item.isMemberPaied,
                index: this.data.index
            })
        }
    }
});
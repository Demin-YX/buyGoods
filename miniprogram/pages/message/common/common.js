Component({
    properties: {
        message: {
            type: Object
        }
    },

    data: {},

    attached: function () {
        // console.log("数据", this.data.message)
    },

    methods: {
        msg: function () {
            swan.navigateTo({
                url: '/pages/dialog/dialog?user_id=' + this.data.message.usr_id +
                    "&goods_id=" + this.data.message.goods_id
            });
        }
    }
});
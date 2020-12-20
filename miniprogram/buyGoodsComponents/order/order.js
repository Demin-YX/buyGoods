Component({
    properties: {
        order: {
            type: Object,
            value: {},
        }
    },

    data: {},

    attached: function () {
        // console.log(this.data.order)
    },

    detached: function () {},

    methods: {
        copy: function () {
            this.triggerEvent('copy', {
                num: this.data.order.waybill
            })
        },
        tapGoods: function () {
            swan.navigateTo({
                url: '/pages/detail/detail?_id=' + this.data.order.goods_id
            });
        }
    }
});
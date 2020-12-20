Component({
    properties: {
        goods: {
            type: Object
        }
    },

    methods: {
        tap: function () {
            this.triggerEvent("tapGood",{
                goodsID: this.data.goods.goodsID
            })
        }
    }
});
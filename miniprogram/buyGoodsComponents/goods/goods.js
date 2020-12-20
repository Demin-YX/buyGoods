import goodsCard from "../../js/data";

Component({
    properties: {
        goodsCard: {
            type: Object,
            value: goodsCard.data.goodsCard
        }
    },

    data: {
        loaded: false
    },

    methods: {
        tap: function () {
            swan.navigateTo({
                url: '/pages/detail/detail?_id=' + this.data.goodsCard.goodsID
            });
        },
    }
});
Component({
    properties: {
        goods: {
            type: Object,
            value: {
                goods_id: "ac8a915c-96c6-45f1-b96d-36ff6720b32d",
                img: "https://b.bdstatic.com/searchbox/image/cmsuploader/20180821/1534857615114422.png",
                title: "守泽千秋",
                tip: "备注备注备注备注备注备注备注备注…"
            }
        }
    },

    data: {},

    methods: {
        tap: function () {
            swan.navigateTo({
                url: '/pages/detail/detail?_id=' + this.data.goods.goods_id
            });
        }
    }
});
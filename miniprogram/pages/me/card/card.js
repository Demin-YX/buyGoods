Component({
    properties: {
        img: {
            type: String,
            value: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606923596780&di=dc730e47dc990b4c859da502e691a003&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F35%2F34%2F19300001295750130986345801104.jpg"
        },
        title: {
            type: String,
            value: "守泽千秋"
        },
        cont: {
            type: String,
            value: "备注备注备注备注备注备注备注…"
        },
        goods_id: {
            type: String
        }

    },

    methods: {
        tapGoods: function () {
            swan.navigateTo({
                url: '/pages/detail/detail?_id=' + this.data.goods_id
            });
        }
    }
});
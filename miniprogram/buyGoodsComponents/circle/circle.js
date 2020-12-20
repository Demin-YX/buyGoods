Component({
    properties: {
        propName: { // 属性名
            type: String,
            value: 'val',
            observer: function(newVal, oldVal) {
            }
        },
        circle: {
            type: Object,
            value: ''
        }
    },

    data: {}, // 私有数据，可用于模版渲染

    attached: function () {
    },

    detached: function () {},

    methods: {
        onTap: function () {
            this.setData({
                // 更新属性和数据的方法与更新页面数据的方法类似
            });
        }
    }
});
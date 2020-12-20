Component({
    properties: {
        propName: { // 属性名
            type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: 'val', // 属性初始值（必填）
            observer: function (newVal, oldVal) {
                // 属性被改变时执行的函数（可选）
            }
        }
    },

    data: {
        list: [
            "购买记录",
            "我的开团",
            "全站开团",
            "使用指南"
        ]
    },

    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {},

    detached: function () {},

    methods: {
        tapBtn: function (e) {
            const {
                index
            } = e.currentTarget.dataset;
            // console.log(index)
            if (index == 0) {
                swan.navigateTo({
                    url: "/pages/purchase/purchase"
                })
            } else if (index == 1) {
                swan.navigateTo({
                    url: '/pages/iAmHost/iAmHost'
                });
            } else if (index == 2) {
                swan.navigateTo({
                    url: '/pages/all/all',
                });
            } else if (index == 3) {
                swan.navigateTo({
                    url: '/pages/guide/guide'
                });
            }
        }
    }
});
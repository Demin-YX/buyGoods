Component({
    properties: {
        isHost: {
            type: Boolean
        },
        rows: { //每行有多少列
            type: Number,
            // value: 3
        },
        title: { //首行的内容
            type: Array,
            value: ['谷', '数量', '金额']
        },
        cont: { //中间行的内容
            type: Array,
            value: [
                ['守泽千秋', '×2', '¥200.0'],
                ['守泽千秋', '×2', '¥200.0'],
                ['守泽千秋', '×2', '¥200.0'],
                ['守泽千秋', '×2', '¥200.0'],
            ]
        },
        bottom: { //尾行的内容
            type: Array,
            value: ['总计', '8', '¥800.0'],
        },
        paid: {
            type: Boolean,
            value: true
        },
        receive: {
            type: Object
        }
    },

    data: {
        width: ''
    },

    attached: function () {
        this.setData({
            width: 700 / this.data.rows
        })
        console.log(this.data.receive)
    },

    methods: {
        tap: () => '',
        tapCopy: function () {
            swan.setClipboardData({
                data: `收件人：${this.data.receive.person}，手机号码：${this.data.receive.num}，收件地址：${this.data.receive.addr}`,
                success: res => {
                    swan.showToast({
                        title: '复制成功!'
                    });
                }
            });
        }
    }
});
Component({
    properties: {
        img: {
            type: String
        },
        hide: {
            type: Boolean,
            value: true
        }
    },

    data: {
        input: '',
        value: '',
    },

    globalData: {
        input: '',
    },

    methods: {
        input: function (e) {
            this.globalData.input = e.detail.value;
        },
        send: function () {
            // swan.showNavigationBarLoading();
            // getApp().show(this.globalData.input);
            this.setData({
                value: ""
            })
            this.triggerEvent('send', {
                leave: this.globalData.input
            })
        }
    }
});
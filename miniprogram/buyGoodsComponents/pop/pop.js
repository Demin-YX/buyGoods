Component({
    properties: {
        status: {
            type: Boolean,
            value: false,
            observer: function (val1, val2) {
                if (!val1) {
                    this.setData({
                        pop: false
                    })
                    setTimeout(() => {
                        this.setData({
                            isIn: false
                        })
                    }, 250)
                } else {
                    this.setData({
                        isIn: true
                    })
                    setTimeout(() => {
                        this.setData({
                            pop: true
                        })
                    }, 50)
                }
            }
        },
    },

    data: {
        isIn: false,
        pop: false
    },

    methods: {
        move: function () {
            return;
        },
        tapMask: function () {
            this.setData({
                status: false
            })
        }
    }
});
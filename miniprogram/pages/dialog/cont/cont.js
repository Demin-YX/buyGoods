Component({
    properties: {
        left: {
            type: Object,
            value: {},
            observer: function (newVal, oldVal) {
                setTimeout(() => {
                    swan.pageScrollTo({
                        scrollTop: 2000000,
                        duration: 300
                    });
                }, 200);
                if (oldVal.dialog == null) {
                    this.toArr(newVal, 0);
                } else {
                    const tmp = newVal;
                    const toArr = {
                        usr: tmp.usr,
                        dialog: tmp.dialog.slice(oldVal.dialog.length, newVal.dialog.length)
                    }
                    this.toArr(toArr, 0);
                }
            }
        },
        right: {
            type: Object,
            value: {},
            observer: function (newVal, oldVal) {
                if (oldVal.dialog == null) {
                    this.toArr(newVal, 1);
                } else {
                    const tmp = newVal;
                    const toArr = {
                        usr: tmp.usr,
                        dialog: tmp.dialog.slice(oldVal.dialog.length, newVal.dialog.length)
                    }
                    this.toArr(toArr, 1);
                }
            }
        }
    },

    data: {
        total: []
        /**
         * {
            side: 0, //0-左 1-右
            head_img: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2057588226,2402156864&fm=11&gp=0.jpg", //head_img
            type: "txt", //类型
            content: "已经发货了", //内容
            time: "2020-11-09 10:47"
        }, {
            side: 0, //0-左 1-右
            head_img: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2057588226,2402156864&fm=11&gp=0.jpg", //head_img
            type: "img", //类型
            content: "cloud://buy-goods-xg7nm6m0/img/1604127407998-723.png", //内容
            time: "2020-11-09 10:47"
        }, {
            side: 1, //0-左 1-右
            head_img: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2057588226,2402156864&fm=11&gp=0.jpg", //head_img
            type: "txt", //类型
            content: "已经发货了已经发货了已经发货了已经发货了已经发货了已经发货了已经发货了", //内容
            time: "2020-11-09 10:47"
        }, {
            side: 0, //0-左 1-右
            head_img: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2057588226,2402156864&fm=11&gp=0.jpg", //head_img
            type: "txt", //类型
            content: "已经发货了已经发货了已经发货了已经发货了已经发货了已经发货了已经发货了", //内容
            time: "2020-11-09 10:47"
        }, {
            side: 1, //0-左 1-右
            head_img: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2057588226,2402156864&fm=11&gp=0.jpg", //head_img
            type: "img", //类型
            content: "cloud://buy-goods-xg7nm6m0/img/1604127407998-723.png", //内容
            time: "2020-11-09 10:47"
        },
         */
    }, // 私有数据，可用于模版渲染

    methods: {
        toArr: function (ele, side) {
            var tmp = this.data.total;
            for (var i = 0; i < ele.dialog.length; i++) {
                tmp[tmp.length] = {
                    side: side,
                    head_img: ele.usr.user_headImg,
                    type: ele.dialog[i].type,
                    content: ele.dialog[i].content,
                    time: ele.dialog[i].time
                };
            }
            this.setData({
                total: this.bubble(tmp)
            })
        },
        bubble: function (arr) { //冒泡
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < arr.length - i - 1; j++) {
                    if (arr[j].time > arr[j + 1].time) {
                        var tmp = arr[j]
                        arr[j] = arr[j + 1]
                        arr[j + 1] = tmp
                    }
                }
            }
            return arr;
        },
        preview: function (e) {
            swan.previewImage({
                urls: [e.currentTarget.dataset.url],
            });
        }
    }
});
Component({
    properties: {
        credit: {
            type: String,
            value: '极好', //极好、优秀、良好、一般
            //#009624、#fa224b、#ff9e2a、#0062f9
        },
        host: {
            type: String,
            value: '团长'
        }
    },

    data: {
        // credits: [
        //     { icon: "enrollment-junior-m", color: "#009624" },
        //     { icon: "enrollment-college-m", color: "#fa224b" },
        //     { icon: "enrollment-high-m", color: "#ff9e2a" },
        //     { icon: "enrollment-self-m", color: "#0062f9" },
        // ]
    }, // 私有数据，可用于模版渲染

    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {},

    detached: function() {},

    methods: {
        onTap: function() {
            this.setData({
                // 更新属性和数据的方法与更新页面数据的方法类似
            });
        }
    }
});
var bar_top = function () {
    return new Promise((revolve, reject) => {
        swan.getSystemInfo({
            success: res => {
                revolve(res.statusBarHeight+res.navigationBarHeight/2)
            }
        });
    })
}

exports.bar_top = bar_top;
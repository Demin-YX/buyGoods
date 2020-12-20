var bar_height = function(){
    return new Promise((revolve, reject)=>{
        swan.getSystemInfo({
            success: res => {
                revolve(res.statusBarHeight+res.navigationBarHeight)
            }
        });
    })
}

exports.bar_height = bar_height;
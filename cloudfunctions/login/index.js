// 引用swan-server-sdk，需要通过npm install安装
const cloud = require('swan-server-sdk');

exports.main = (event, context) => {
    // 目前使用SDK, 需要传入context参数, 因此需要在函数正文中调用init进行初始化
    cloud.init(context);

    // event为调用函数时传入参数
    console.log(event)

    // clientContext中包含相关客户端环境信息
    console.log(context.clientContext)

    // 可以通过getSwanContext可以获取调用上下文
    const swanContext = cloud.getSwanContext()

    return {
        event,
        userid: swanContext.USERID,
        appid: swanContext.APPID,
        env: swanContext.ENV
    }
};
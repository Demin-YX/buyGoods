var upImg = function (filePath) {
    return new Promise((resolve, reject) => {
        var cloudPath = "img/" + new Date().getTime() + "-" + Math.floor(Math.random() * 1000) + ".png";
        swan.cloud.uploadFile({
            cloudPath: cloudPath,
            filePath: filePath
        }).then(res => {
            // console.log(res)
            resolve(res.fileID);
        }).catch(err => {
            reject(err);
        });
    });
};

var getImgUrl = function (cloudPath) {
    return new Promise((resolve, reject) => {
        swan.cloud.downloadFile({
            fileID: cloudPath
        }).then(res => {
            resolve(res.tempFilePath);
        }).catch(err => {});
    })
}

export const up = {
    upImg: upImg,
    getImgUrl: getImgUrl
};

// import Promise from 'bluebird'
var Promise = require('bluebird');
var nodeCmd = require('node-cmd');  
// adb kill-server  杀死服务  
// 上面命令结束不了服务就用 taskkill /f /im adb.exe
// adb tcpip 5555
// adb connect IP地址:5555  茹： adb connect 192.168.5.102:5555

const getAsync = Promise.promisify(nodeCmd.get, { multiArgs: true, context: nodeCmd })

// 获取手机截图到电脑
let photoPull = function() { 
    getAsync('adb pull /sdcard/4.png '+__dirname+'/public/photo/').then(data => {
        console.log('图片获取成功');
        return true;
    }).catch(err => {
        console.log('图片获取失败');
        return false;
    }); 
}

//截取手机屏幕
let getPhoto = function () {
    getAsync('adb shell /system/bin/screencap -p /sdcard/4.png').then(data => {
        console.log('图片截取成功');
        photoPull();
    }).catch(err => {
        console.log('图片截取失败');
    }); 
}  

// 传递指令到手机端--实现长安效果
let setPhoto = function (time) {
    getAsync('adb shell input swipe 250 250 251 251 '+time).then(data => {
        if(photoPull()){
            return true;
        }else{
            return false;
        }
        console.log('图片获取成功');
    }).catch(err => {
        console.log('图片获取失败');
        return false;
    });   
} 
// 长安效果
exports.setPhoto = setPhoto;
// 获取截屏图片
exports.getPhoto = getPhoto;
// 获取照片到电脑
exports.photoPull = photoPull;
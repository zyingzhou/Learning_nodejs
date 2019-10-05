// Copyright zhiying.
// Author : zhiying
// URL: https://www.zhouzying.cn
// Date : 2019.10.5
// Description : nodejs spider--crawl comments in netease cloud music.
const  request = require('request');
const neteaseEncrypt = require('./netease_encrypt');

// 薛之谦的演员https://music.163.com/#/song?id=32507038
let arg1 = {"rid":"R_SO_4_32507038","offset":"0","total":"true","limit":"20","csrf_token":""};
let data = neteaseEncrypt(arg1);
let encText = data.encText;
let encSecKey = data.encSecKey;
// console.log(encText.length, encSecKey.length);
let uri =  'https://music.163.com/weapi/v1/resource/comments/R_SO_4_32507038?csrf_token=';
let fromData = {};
fromData['params'] = encText;
fromData['encSecKey'] = encSecKey;
// console.log(fromData);
// header = {"user-agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)Chrome/66.0.3359.181 Safari/537.36"}

request({url: uri, headers:{'User-Agent': 'chrome', "accept": "*/*", "cache-control": "no-cache"}, form:fromData, method:'post'}, (err, res, body)=>{
    if(err){
        console.log('爬取失败');

    }
    
    console.log(body);
})


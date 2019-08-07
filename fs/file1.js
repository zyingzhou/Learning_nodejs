/**
 * Author : zhiying
 * URL: https://www.zhouzying.cn
 * Date : 2019.8.7
 * Description : nodejs学习--fs文件系统--写入流.
 * 
 */
const fs = require('fs');
// const path = require('path');


let filePath = './test.txt';
let writer = fs.createWriteStream(filePath);
writer.write('hello,world\n',err=>{
    if(err){
        console.log('write error');
    }else{
        console.log('write success');
    }
});

writer.end('bye');
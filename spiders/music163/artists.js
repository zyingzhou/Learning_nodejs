/**
 * Author : zhiying
 * URL: https://www.zhouzying.cn
 * Date : 2019.8.6
 * Description : nodejs爬虫--爬取网易云音乐全部歌手信息.
 * 
 */
const request = require('request');

// 为服务器特别指定的，快速的实施jquery的核心操作。
const cheerio = require('cheerio');
const path = require('path');
// 文件操作
const fs = require('fs');


// 获取网页并进行解析
function getHtml(id, initial){
    let uri = 'https://music.163.com/discover/artist/cat?id='+ id + '&initial=' + initial;
    // let filePath = path.resolve(__dirname, 'data') + '/' + id + '_' + inital + '.csv';
    let filePath = path.resolve(__dirname, 'data') + '/' + 'artists.csv';
    
    // 创建流对象
    let writer = fs.createWriteStream(filePath, {flags: 'a'});

    request({url : uri,

    headers : {'user-agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)Chrome/66.0.3359.181 Safari/537.36'},

    method: 'get'},(err, res, body)=>{

        if(err){
            console.log('爬取失败：\n', err);
        }else{
            console.log('爬取成功！');
            let _$ = cheerio.load(body);
            let mLs = _$('.m-cvrlst').html();
            let $ = cheerio.load(mLs);
            $('li').map(function(){
            // artist's  id
            let artId = $(this).find('a').attr('href');
            artId = artId.replace('/artist?id=', '');
            // artist's  url
            let artUrl = 'https://music.163.com/artist?id=' + artId;
            // artist's  name
            let artName = $(this).find('a').attr('title')
            artName = artName.replace('的音乐', '');
            let chunk = artId + ',' + artName + ',' + artUrl + '\n';
            // console.log(chunk);
            // 写入流
            writer.write(chunk, err=>{

                if(err){

                    // console.log('error');
                    console.log('写入出错：\n', err);

                }else{

                    console.log('数据写入成功！');

                    writer.end();
                }
            })
            })


        }

    })
};


// id 数组
var ids = [1001, 1002, 1003, 2001, 2002, 2003, 6001, 6002, 6003, 7001, 7002, 7003, 4001, 4002, 4003];
// inital数组
var initials = [-1, 0, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90] 

try{
    
    for(var i = 0; i < ids.length; i++){
        var id = ids[i];
        
        for(var j = 0; j< initials.length; j++){
            var inital = initials[j];
                getHtml(id, inital); 
                console.log('id为：', id, 'initial为', inital, '数据写入成功！');

        }
    }

}catch(err){

    console.log('网页请求失败，请稍后重试！');

    console.log(err);

};

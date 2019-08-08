/**
 * Author : zhiying
 * URL: https://www.zhouzying.cn
 * Date : 2019.8.6
 * Description : nodejs爬虫--爬取网易云音乐全部歌手的热门歌曲.
 * 
 */

const request = require('request');
// 为服务器特别指定的，快速的实施jquery的核心操作。
const cheerio = require('cheerio');
const path = require('path');
// 文件操作
const fs = require('fs');


var filePath = 'test.csv';
var writer = fs.createWriteStream(filePath);
// 不是地址栏中的地址，需要在控制面板中查看
// 林俊杰做演示
var uri = 'https://music.163.com/artist?id=3684';
request({url : uri,

    headers : {'user-agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)Chrome/66.0.3359.181 Safari/537.36'},

    method: 'get'},(err, res, body)=>{

        if(err){
            console.log('爬取失败：\n', err);
        }else{
            //console.log(res.statusCode, body);
            console.log('爬取成功！');
            
            var _$ = cheerio.load(body);
            var ul = _$('#song-list-pre-cache').html();
            var $ = cheerio.load(ul);
            $('li').map(function(){
            // song's  id
            let songId = $(this).find('a').attr('href');
            songId = songId.replace('/song?id=', '');
            // song's  url
            let songUrl = 'https://music.163.com/song?id=' + songId;
            // song's  name
            let songName = $(this).find('a').text();
            var chunk = songId + ',' + songName + ',' + songUrl + '\n';
            console.log(chunk);
            // 写入流
            
            })
            
        }

    })
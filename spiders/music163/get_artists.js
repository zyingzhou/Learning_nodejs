// Copyright zhiying.
// Author : zhiying
// URL: https://www.zhouzying.cn
// Date : 2019.8.30
// Description : nodejs spider--crawl all artists in netease cloud music.

/**
 * @name getArtists
 * @param {function} [callback] - This will pass results of getArtists. Invoked with (err, [data]),then all artists information is in data. 
 * @return undefined
 * @example
 * 
 * getArtists((err, data)=>{
 *   // TODO
 *   let writer = fs.createWriteStream('./artists.json', 'utf8');
 *   let artists ={};
 *   artists['data'] = data;
 *   writer.write(JSON.stringify(artists));
 *   console.log(data.length);
 * })
 * 
 */
const cheerio = require('cheerio');
const fs = require('fs');
// return a Promise
const rp = require('request-promise');


function getArtists(calllback) {
    let artists = [];
    let ids = [1001, 1002, 1003, 2001, 2002, 2003, 6001, 6002, 6003, 7001, 7002, 7003, 4001, 4002, 4003];
    let initials = [-1, 0, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90];
    let thresHold = ids.length * initials.length;
    // count page numbers which has crawled.
    let count = 0;
    for (let i = 0 ; i < ids.length; i++){
        for (let j = 0; j < initials.length; j++){

            let id = ids[i];
            let initial = initials[j];
    
            let url = 'https://music.163.com/discover/artist/cat?id='+ id + '&initial=' + initial;
            let options = {
                method: 'GET',
                uri: url,
                headers : {'user-agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)Chrome/66.0.3359.181 Safari/537.36'}
            };

            rp(options).then((html)=>{
                let artist = parseHtml(html);
                return artist;
                
            }).then(artist=>{
                // pay attention to the usage of concat.
                // artists.push(artist) is right yet, but the result looks a little ugly.
                artists = artist.concat(artists);
                count ++ ;
                // invoke the callback if all done.
                if(count === thresHold) {
                    calllback(null, artists);
                }
                
            })
    }}
}


function parseHtml(html) {
    let _$ = cheerio.load(html);
    let mLs = _$('.m-cvrlst').html();
    let $ = cheerio.load(mLs);
    let items = [];
    $('li').map(function(){
    let artist = {};
    // artist's  id
    let artId = $(this).find('a').attr('href');
    artId = artId.replace('/artist?id=', '');
    artist['artistId'] = artId;
    // artist's  url
    let artUrl = 'https://music.163.com/#/artist?id=' + artId;
    artist['artistUrl'] = artUrl;
    // artist's  name
    let artName = $(this).find('a').attr('title')
    artName = artName.replace('的音乐', '');
    artist['artistName'] = artName;
    // let chunk = artId + ',' + artName + ',' + artUrl + '\n';
    items.push(artist);                          
    })
    return items;
}

getArtists((err, data)=>{
    let writer = fs.createWriteStream('./data/artists.json', 'utf8');
    let artists ={};
    artists['data'] = data;
    writer.write(JSON.stringify(artists));
    console.log(data.length);
})
// Copyright zhiying.
// Author : zhiying
// URL: https://www.zhouzying.cn
// Date : 2019.10.6
// Description : The module id to get IT book information(include pdf or epub url) for www.allitebooks.org.
const request = require('request');
const cheerio = require('cheerio');
let Books = function(){
    this.catagory = {};
    this.more = true;
    

}



// 获取网页信息
Books.prototype.getpage = function(url, callback){
    request({url: url, method: 'get'}, (err, res, body)=>{
        if(err){
            console(err);
        }else{
            callback(null, body);
        }
    })


}

// 解析首页
Books.prototype.homeParse = function(callback){

    this.getpage('http://www.allitebooks.org', (err, data)=>{

    let body = cheerio.load(data);
    
    let html = body('#side-content').html();
    let $ = cheerio.load(html);
    let item = {};

    // 这里不能使用箭头函数
    $('li').map(function(){
        let bookCategoryUrl = $(this).find('a').attr('href');
        let bookCategoryName = $(this).find('a').text();
        item[bookCategoryName] = bookCategoryUrl;
        // 正确理解this
        // this.catagory[bookCategoryName] = bookCategoryUrl;

        })
    this.catagory = item;
    callback(null, this.catagory);

})
}

// 解析页面内容
Books.prototype.parse = function(url, callback){
    let bookList = [];
    
    this.getpage(url, (err, body)=>{
        if(err){
            console.log('基本页爬取失败');
        }else{
            let src = cheerio.load(body);
            html = src('#main-content').html();
            let $ = cheerio.load(html);
            $('.entry-body').map(function(){
                let book = {};
                let bookName = $(this).find('.entry-title').children().text();
                let bookUrl = $(this).find('.entry-title').children().attr('href');
                let bookAuthor = $(this).find('.entry-author').children().text();
                let bookDescription = $(this).find('.entry-summary').children().text();
                book['bookName'] = bookName;
                book['bookUrl'] = bookUrl;
                book['bookAuthor'] = bookAuthor;
                book['bookDescription'] = bookDescription;
                bookList.push(book);

                //console.log(bookName,':', bookUrl,':', bookAuthor, ':', bookDescription);
            
                })
            let pages = $('.pages').text().replace('Pages', '').split('/')[1];
            let all = pages.trim() || 1;
            callback(null, all, bookList);
            
            

        }
    })
    
    

}

// 抓取下一页
Books.prototype.next = function(){

}

// 判断是否还有页面
Books.prototype.hasNext = function(){

}

//　抓取接口
Books.prototype.scrapy = function(){
    
    let baseUrl = 'http://www.allitebooks.org/web-development/';
    let index = 1;
    let count = 0;
    this.parse(baseUrl, (err, pages, books)=>{
        if(err){
            console.log('爬取接口出现问题');
        }else{
            
            count += books.length;
            console.log(books);
            if(index == 1){
                console.log('web-development总共有',pages,'页');
            }
            console.log('web-development:第',index,'页获取成功!');
            console.log(books);
            for(index = 2; index <= pages; index++){
                uri = baseUrl + 'page/' + index.toString() + '/'
                this.parse(uri, (err, page, book)=>{
                    if(!err){
                        count += books.length;
                        console.log('web-development:第',index,'页获取成功!');
                        console.log(book);
                        
                    }
                })
                if(index == pages){
                    console.log('web-development类全部爬取完成!');
                    console.log('web-development总共有',index,'页,',count,'本书');
                }
            }
            
           
        }

    })
}

// 写入数据库
Books.prototype.writeToDb = function(){

}



// 获取书的下载地址
Books.prototype.getDownloadLink = function(bookName, bookUrl, callback){
    let book = {};
    book['name'] = bookName;
    book['url'] = bookUrl;
    this.getpage(bookUrl, (err, body)=>{
        if(err){
            console.log('获取',bookName,'下载链接失败');
        }else{
            let html = cheerio.load(body);
            let downLink = html('.download-links').children().attr('href');
            book['downloadLink'] = downLink;
            callback(null, book);

        }
        
    })

}


module.exports = Books;
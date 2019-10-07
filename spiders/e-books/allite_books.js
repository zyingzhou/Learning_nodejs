const Books = require('./Books');
const cheerio = require('cheerio');

let books = new Books();

/*
books.getpage('http://www.allitebooks.org', (err, data)=>{

    let body = cheerio.load(data);
    
    let html = body('#side-content').html();
    let $ = cheerio.load(html);
    // 这里不能使用箭头函数
    $('li').map(function(){
        let bookCategoryUrl = $(this).find('a').attr('href');
        let bookCategoryName = $(this).find('a').text();
        console.log(bookCategoryName,':', bookCategoryUrl);
    })

})
*/


// 获取首页测试
books.homeParse((err, data)=>{
    console.log(data);
});

// 获取书的基本信息
url = 'http://www.allitebooks.org/web-development/';
books.parse(url, (err, all, bookList)=>{
    if(!err){
        console.log(all);
        console.log(bookList);
    }
    
    
})

// 书的下载信息
let bookUrl = 'http://www.allitebooks.org/beginning';
let bookName = 'Beginning CSS3';
books.getDownloadLink(bookName, bookUrl, (err, book)=>{
    // console.log(book);
})

// 判断是否能一直往下爬取；
// 不要尝试网站承受不了这么大的压力
// books.scrapy();
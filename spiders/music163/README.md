# 网易云音乐爬虫（nodejs实现）
> 爬取思路：先从全部歌手展示页获取到每一位歌手的id，通过歌手id构造每一位歌手个人主页的URL，然后爬取歌手的全部热门歌曲id及歌曲的名字，最后通过歌曲id构造每首歌曲的主页，接着爬取每一首歌曲的全部评论。具体请参考：
> * [网易云音乐评论爬虫(二):爬取全部热门歌曲及其对应的id号](https://www.zhouzying.cn/34.html "网易云音乐评论爬虫(二):爬取全部热门歌曲及其对应的id号")
> * [网易云音乐评论爬虫(三):爬取歌曲的全部评论](https://www.zhouzying.cn/58.html "网易云音乐评论爬虫(三):爬取歌曲的全部评论") 

## 第一步实现：[爬取全部歌手信息](artists.js "爬取全部歌手信息") 
> * [1.存储成csv文件格式](artists.js "存储成csv文件格式") 
> * [2.存储成json文件格式](get_artists.js "存储成json文件格式") 
>  
## 第二步实现：[爬取热门歌曲](hotsongs.js "爬取热门歌曲")

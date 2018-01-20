# ＰＴＴ 文章列表

##

```js
 const { scraper } = require('ptt-scr');
/**
 *  @param boardName {string} 版名 default: Gossiping
 *  @param pageCounts {number} 往前走幾頁 default:3
 *  @param startPage {number} 開始的頁數  default:0||''
 *  @param categoryPatten {RegExp} 發文分類 正則表達式規則 default: /\[(.+)\]/
 *  @param isScrapContent {boolean} 是否取得內容 default false
 */

 const list = await scraper({boardName,pageCount,startPage,categoryPatten,isScrapContent});
```

## 無取得內容回傳結果

```json
{
    "prePage": "https://www.ptt.cc/bbs/Gossiping/index25458.html",
    "prePageNumber": 25458,
    "items": [
        {
            "title": "[問卦] 123456",
            "category": "問卦",
            "link": "/bbs/Gossiping/M.1505315229.A.8BC.html",
            "athor": "xxx",
            "push": "4",
            "date": " 9/13"
        },
        {
            "title": "[問卦] 765432",
            "category": "問卦",
            "link": "/bbs/Gossiping/M.1505315282.A.6CE.html",
            "athor": "xxx",
            "push": "",
            "date": " 9/13"
        },
        {
            "title": "[問卦] 456788",
            "category": "問卦",
            "link": "/bbs/Gossiping/M.1505315289.A.C11.html",
            "athor": "xxx",
            "push": "",
            "date": " 9/13"
        }
    ]
}
```

## 取得內容回傳結果

```json
   "items": [
        {
            "title": "[PS4] xxxxx",
            "category": "PS4",
            "link": "https://www.ptt.cc//bbs/Gamesale/M.1505559924.A.35F.html",
            "athor": "xxxx",
            "push": "1",
            "date": " 9/16",
            "content": {
                "athor": "xxxx (xxxx)",
                "title": "[PS4] xxxxxx",
                "datetime": "Sat Sep 16 19:05:22 2017",
                "urls": [
                    "https://www.ptt.cc/bbs/Gamesale/M.1505559924.A.35F.html"
                ],
                "content": " ★【物品名稱】：勇者鬥惡龍 : 創世小玩家 ★【語系版本】：中文 ★【徵 求 價】：$1100(含運費) ★【交易方式】：店到店 【保存狀況】：保存良好 【附 註】：只想店到店不想其他方式，謝謝 -- ",
                "publishIP": "36.225.111",
                "editedIP": "",
                "reply":[
                    {
                        "userid": "xxxx",
                        "content": " 已寄信",
                        "ip":"101.13.163.78",
                        "time": "09/16 19:46",
                    }
                ],
                "push": [
                    {
                        "userid": "xxxx",
                        "content": " 已寄信",
                        "ip":"101.13.163.78",
                        "time": "09/16 19:46",
                    }
                ],
                "boo": [],
                "neutral": []
            }
        },
    ]
```

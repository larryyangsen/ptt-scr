# ＰＴＴ 簡單文章列表

## 
```js
 const { scraper } = require('ptt-scr');
/**
 *  @param boardName {string} 版名 default: Gossiping
 *  @param pageCounts {number} 往前走幾頁 default:3
 *  @param startPage {number} 開始的頁數  default:0||''
 *  @param categoryPatten {RegExp} 發文分類 正則表達式規則 default: /\[(.+)\]/
 */

 const list = await scraper(boardName,pageCount,startPage,categoryPatten);
 
```
```json
{
    "prePage":"https://www.ptt.cc/bbs/Gossiping/index25458.html",
    "items":[
         {
         "title": "[問卦] 如何反串進入紫衣神教?",
         "category": "問卦",
         "link": "/bbs/Gossiping/M.1505315229.A.8BC.html",
         "athor": "xxx",
         "push": "4",
         "date": " 9/13"
      },
      {
         "title": "[問卦] 沒人整理的房間像闖空門",
         "category": "問卦",
         "link": "/bbs/Gossiping/M.1505315282.A.6CE.html",
         "athor": "xxx",
         "push": 0,
         "date": " 9/13"
      },
      {
         "title": "[問卦] 剛開學就想換指導教授的八卦？",
         "category": "問卦",
         "link": "/bbs/Gossiping/M.1505315289.A.C11.html",
         "athor": "xxx",
         "push": 0,
         "date": " 9/13"
      },{
          
      }
    ]
}

```
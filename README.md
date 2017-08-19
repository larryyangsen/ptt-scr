# ＰＴＴ 簡單文章列表

## 
```js
 const { scraper } = require('ptt-scr');
 scraper('Baseball').then(re => console.log(JSON.stringify(re,null,4)));

```
```json
[
    {
        "title": "[炸裂] op 幫刪",
        "category": "炸裂",
        "link": "https://www.ptt.cc/bbs/Baseball/M.1503121398.A.457.html",
        "athor": "xxxxxx",
        "push":"1",
        "date": " 8/19"
    }
    {
        "title":"fefef",
    }
]
```
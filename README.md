# Ptt

##  文章列表

```JavaScript
 const { scraper } = require('ptt-scr');
/**
 *  @param boardName {string} 版名 default: Gossiping
 *  @param pageCounts {number} 往前走幾頁 default:3
 *  @param startPage {number} 開始的頁數  default:0||''
 *  @param categoryPattern {RegExp} 發文分類 正則表達式規則 default: /\[(.+)\]/
 *  @param isScrapContent {boolean} 是否取得內容 default false
 */

 console.log(await scraper({boardName,pageCount,startPage,categoryPattern,isScrapContent}));
```

### 僅取得標題

```json
{
    "prePage": "https://www.ptt.cc/bbs/Gossiping/index37854.html",
    "prePageNumber": 37854,
    "items": [
        {
            "title": "Re: [問卦] xxxxxxx？",
            "category": "問卦",
            "link": "https://www.ptt.cc//bbs/Gossiping/M.xxxxxxxx.A.B5A.html",
            "author": "xxxxxxxx",
            "push": "2",
            "date": " 3/03"
        },
        {
            "title": "[新聞] xxxxx",
            "category": "新聞",
            "link": "https://www.ptt.cc//bbs/Gossiping/M.xxxxxxx.A.4BB.html",
            "author": "xxxxxxxxx",
            "push": "4",
            "date": " 3/03"
        },
        {
            "title": "[新聞] xxxxxxx",
            "category": "新聞",
            "link": "https://www.ptt.cc//bbs/Gossiping/M.xxxxxxxx.A.D3D.html",
            "author": "xxxxxx",
            "push": "18",
            "date": " 3/03"
        },
        {
            ...
        }
    ]
}
```

### 取得標體與內容

```json
   {
        "prePage": "https://www.ptt.cc/bbs/Gossiping/index37854.html",
    "prePageNumber": 37854,
    "items": [
        {
            "title": "Re: xxxxxx",
            "category": "問卦",
            "link": "https://www.ptt.cc//bbs/Gossiping/M.xxxxxxxx.A.B5A.html",
            "author": "xxxxxxxxx",
            "push": "2",
            "date": " 3/03",
            "content": {
                "author": "xxxxxx (xxxx xxxx)",
                "title": "Re: [問卦] 千尋太容易暈船？",
                "datetime": "Sat Mar 3 12:04:36 2018",
                "urls": [
                    "https://www.ptt.cc/bbs/Gossiping/M.xxxxxxx.A.B5A.html"
                ],
                "quoteFrom": [
                    "※ 發信站: 批踢踢實業坊(ptt.cc), 來自: xxx.xxx.xxx.xxx ",
                    "※ 文章網址: https://www.ptt.cc/bbs/Gossiping/M.xxxxxxxx.A.B5A.html "
                ],
                "quote": [],
                "content": " 這是選擇的問題 小千 可愛普妹 候選人 鍋爐爺爺 無臉男 寶寶 父役 兄役 青蛙 番台蛙 河神 VS 塔矢亮 要選誰還不清楚嗎 -- ",
                "publishIP": "xxx.xxx.xxx.xxx",
                "editedIP": "",
                "reply": [
                    {
                        "tag": "→",
                        "userid": "xxxxx",
                        "content": " 我都選麗子，供您參考",
                        "time": "03/03 12:05"
                    },
                    {
                        "tag": "→",
                        "userid": "LFD",
                        "content": " xxxxx",
                        "time": "03/03 12:05"
                    },
                    {
                        "tag": "推",
                        "userid": "xxxxx",
                        "content": " 煤渣超可愛",
                        "time": "03/03 12:17"
                    },
                    {
                        "tag": "推",
                        "userid": "xxxxx",
                        "content": " 河神",
                        "time": "03/03 12:22"
                    },
                    {
                        "tag": "推",
                        "userid": "xxxxxx",
                        "content": " 可是塔矢亮也是河神啊",
                        "time": "03/03 12:37"
                    }
                ],
                "push": [
                    {
                        "tag": "推",
                        "userid": "xxxxx",
                        "content": " 煤渣超可愛",
                        "time": "03/03 12:17"
                    },
                    {
                        "tag": "推",
                        "userid": "xxxxxx",
                        "content": " 河神",
                        "time": "03/03 12:22"
                    },
                    {
                        "tag": "推",
                        "userid": "b00668880",
                        "content": " 可是塔矢亮也是河神啊",
                        "time": "03/03 12:37"
                    }
                ],
                "boo": [],
                "neutral": [
                    {
                        "tag": "→",
                        "userid": "xxxx",
                        "content": " 我都選麗子，供您參考",
                        "time": "03/03 12:05"
                    },
                    {
                        "tag": "→",
                        "userid": "xxxxxx",
                        "content": " 選煤渣",
                        "time": "03/03 12:05"
                    }
                ]
            }
        },
        {
            ...
        }
   }
```

## 文章內容

```JavaScript
 const { content } = require('ptt-scr');
 console.log(JSON.stringify(await content('https://www.ptt.cc/bbs/Gossiping/M.xxxxxxxx.A.B1F.html'), null, 4));
```

```json
{
    "link": "https://www.ptt.cc//bbs/Gossiping/M.xxxxxxx.A.B5A.html",
    "content": {
        "author": "xxxxxx (xxxx xxxx)",
        "title": "Re: [問卦] 千尋太容易暈船？",
        "datetime": "Sat Mar 3 12:04:36 2018",
        "urls": ["https://www.ptt.cc/bbs/Gossiping/M.xxxxxxx.A.B5A.html"],
        "quoteFrom": [
            "※ 發信站: 批踢踢實業坊(ptt.cc), 來自: xxx.xxx.xxx.xxx ",
            "※ 文章網址: https://www.ptt.cc/bbs/Gossiping/M.xxxxxxxx.A.B5A.html "
        ],
        "quote": [],
        "content":
            " 這是選擇的問題 小千 可愛普妹 候選人 鍋爐爺爺 無臉男 寶寶 父役 兄役 青蛙 番台蛙 河神 VS 塔矢亮 要選誰還不清楚嗎 -- ",
        "publishIP": "xxx.xxx.xxx.xxx",
        "editedIP": "",
        "reply": [
            {
                "tag": "→",
                "userid": "xxxxx",
                "content": " 我都選麗子，供您參考",
                "time": "03/03 12:05"
            },
            {
                "tag": "→",
                "userid": "LFD",
                "content": " xxxxx",
                "time": "03/03 12:05"
            },
            {
                "tag": "推",
                "userid": "xxxxx",
                "content": " 煤渣超可愛",
                "time": "03/03 12:17"
            },
            {
                "tag": "推",
                "userid": "xxxxx",
                "content": " 河神",
                "time": "03/03 12:22"
            },
            {
                "tag": "推",
                "userid": "xxxxxx",
                "content": " 可是塔矢亮也是河神啊",
                "time": "03/03 12:37"
            }
        ],
        "push": [
            {
                "tag": "推",
                "userid": "xxxxx",
                "content": " 煤渣超可愛",
                "time": "03/03 12:17"
            },
            {
                "tag": "推",
                "userid": "xxxxxx",
                "content": " 河神",
                "time": "03/03 12:22"
            },
            {
                "tag": "推",
                "userid": "b00668880",
                "content": " 可是塔矢亮也是河神啊",
                "time": "03/03 12:37"
            }
        ],
        "boo": [],
        "neutral": [
            {
                "tag": "→",
                "userid": "xxxx",
                "content": " 我都選麗子，供您參考",
                "time": "03/03 12:05"
            },
            {
                "tag": "→",
                "userid": "xxxxxx",
                "content": " 選煤渣",
                "time": "03/03 12:05"
            }
        ]
    }
}
```

## 熱門看版

```JavaScript
     const { hot } = require('ptt-scr');
     console.log(await hot());
```

```json
[
    {
        "name": "Gossiping",
        "title": "◎[八卦板]",
        "count": "13140",
        "class": "綜合"
    },
    {
        "name": "NBA",
        "title": "◎[NBA] 樂透、投票、小天使",
        "count": "4710",
        "class": "籃球"
    },
    {
        "name": "C_Chat",
        "title": "◎[希洽] 再見了！茶度！",
        "count": "2907",
        "class": "閒談"
    },
    {
        "name": "Baseball",
        "title": "◎[棒球] 棒球板徵文活動開始~3/10",
        "count": "2091",
        "class": "棒球"
    },
    {
        "name": "LoL",
        "title": "◎[LoL] 比賽現場人山人海",
        "count": "1619",
        "class": "遊戲"
    },
    {
        "name": "sex",
        "title": "◎[西斯] 洨天使開放報名中",
        "count": "1616",
        "class": "男女"
    },
    {
        "name": "movie",
        "title": "◎[電影] 奧斯卡頒獎 3/5",
        "count": "1592",
        "class": "綜合"
    },
    {
        "name": "MobileComm",
        "title": "◎[通訊] MWC收尾 瀏海94潮",
        "count": "1281",
        "class": "資訊"
    },
    {
        "name": "Stock",
        "title": "◎[股板] 推發文前請閱讀置底板規",
        "count": "1204",
        "class": "學術"
    },
    {
        "name": "WomenTalk",
        "title": "◎[女板] 大家的第一瓶香水是...?",
        "count": "1133",
        "class": "聊天"
    },
    {
        "name": "car",
        "title": "◎[汽車] 開開看吧，很好開的",
        "count": "1053",
        "class": "車車"
    },
    {
        "name": "Lifeismoney",
        "title": "◎[省錢] 2018新年省大錢",
        "count": "1005",
        "class": "省錢"
    },
    {
        "name": "Boy-Girl",
        "title": "◎[男女] 發文選個類別行不",
        "count": "974",
        "class": "心情"
    },
    {
        "name": "ToS",
        "title": "◎[神魔] 黑臉宙斯 is online.",
        "count": "947",
        "class": "轉珠"
    },
    {
        "name": "KR_Entertain",
        "title": "◎[韓綜] Show Me The 新板主!",
        "count": "901",
        "class": "綜藝"
    },
    {
        "name": "BabyMother",
        "title": "◎[媽寶] 願每一個寶貝平安長大",
        "count": "866",
        "class": "家庭"
    },
    {
        "name": "Tech_Job",
        "title": "◎[科技] 新年快樂 恭喜發財 讚讚讚",
        "count": "835",
        "class": "工作"
    },
    {
        "name": "PlayStation",
        "title": "◎[PS4] 3/8 啊~噠噠噠 你已經死了",
        "count": "802",
        "class": "主機"
    },
    {
        "name": "Hearthstone",
        "title": "◎[爐石] 猛瑪年→烏鴉年",
        "count": "785",
        "class": "線上"
    },
    {
        "name": "Japan_Travel",
        "title": "◎春之嵐注意天候　ps延長徵選兩周",
        "count": "712",
        "class": "旅遊"
    },
    {
        ...
    }
]
```

## 使用者紀錄

```JavaScript
     const { user } = require('ptt-scr');
     console.log(await user('xxx'));
```

```json
[
    {
        "title": "[問題] xxxxxxxxxxxxxxxxxxx？ - 看板PlayStation - 批 ...",
        "link": "https://www.ptt.cc/bbs/PlayStation/M.1499496976.A.66F.html",
        "text": "請問.... xxxxxxxxxxxxxxxxxxx-- ※ 發信站: 批踢踢\n實業坊(ptt.cc), 來自: 42.76.163.95 ※ 文章網址: https://www.ptt.cc/bbs/PlayStation/\nM.1499496976.A.66F.html. 推xxxxx: +1 07/08 15:05. → xxxxx: 為何不？ 07/08 15:12. → xxx: 由7月8日至9日 ..."
    },
    {
        "title": "[閒聊] xxxxxxxxxxxxxx 看板PlayStation - 批踢踢實業坊",
        "link": "https://www.ptt.cc/bbs/PlayStation/M.1513773122.A.8CD.html",
        "text": "推xxx: 雙姐妹派的 12/20 21:58. 推xxx: ps4\n中文版 12/20 22:02. 推xxxxxx: 等NS版+1 12/20 22:23. → xxxxx: 3DS跟 12/20 22:41. 推xxxxx: 玩派的… 12\n/20 22:52. 推xxxx: 這麼多！ 12/20 23:25."
    },
    {...}
]
```

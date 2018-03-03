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

## 熱門版

```JavaScript
     const { hot } = require('ptt-scr');
     console.log(await hot());
```

```json
[
    {
        name: "Gossiping",
        title: "◎[八卦板]",
        count: "13418",
        class: "綜合"
    },
    {
        name: "NBA",
        title: "◎[NBA] 樂透、投票、小天使",
        count: "4671",
        class: "籃球"
    },
    {
        name: "C_Chat",
        title: "◎[希洽] 再見了！茶度！",
        count: "2869",
        class: "閒談"
    },
    {
        name: "Baseball",
        title: "◎[棒球] 棒球板徵文活動開始~3/10",
        count: "2077",
        class: "棒球"
    },
    {
        name: "sex",
        title: "◎[西斯] 洨天使開放報名中",
        count: "1684",
        class: "男女"
    },
    {
        name: "movie",
        title: "◎[電影] 奧斯卡頒獎 3/5",
        count: "1597",
        class: "綜合"
    },
    {
        name: "LoL",
        title: "◎[LoL] 比賽現場人山人海",
        count: "1580",
        class: "遊戲"
    },
    {
        name: "MobileComm",
        title: "◎[通訊] MWC收尾 瀏海94潮",
        count: "1264",
        class: "資訊"
    },
    {
        name: "Stock",
        title: "◎[股板] 推發文前請閱讀置底板規",
        count: "1227",
        class: "學術"
    },
    {
        name: "WomenTalk",
        title: "◎[女板] 大家的第一瓶香水是...?",
        count: "1095",
        class: "聊天"
    },
    {
        name: "car",
        title: "◎[汽車] 開開看吧，很好開的",
        count: "1030",
        class: "車車"
    },
    {
        name: "Lifeismoney",
        title: "◎[省錢] 2018新年省大錢",
        count: "1027",
        class: "省錢"
    },
    {
        name: "Boy-Girl",
        title: "◎[男女] 發文選個類別行不",
        count: "957",
        class: "心情"
    },
    {
        name: "ToS",
        title: "◎[神魔] 黑臉宙斯 is online.",
        count: "951",
        class: "轉珠"
    },
    {
        name: "BabyMother",
        title: "◎[媽寶] 願每一個寶貝平安長大",
        count: "884",
        class: "家庭"
    },
    {
        name: "KR_Entertain",
        title: "◎[韓綜] Show Me The 新板主!",
        count: "871",
        class: "綜藝"
    },
    {
        name: "Tech_Job",
        title: "◎[科技] 新年快樂 恭喜發財 讚讚讚",
        count: "823",
        class: "工作"
    },
    {
        name: "PlayStation",
        title: "◎[PS4] 3/8 啊~噠噠噠 你已經死了",
        count: "796",
        class: "主機"
    },
    {
        name: "Hearthstone",
        title: "◎[爐石] 猛瑪年→烏鴉年",
        count: "789",
        class: "線上"
    },
    {
        name: "Japan_Travel",
        title: "◎春之嵐注意天候　ps延長徵選兩周",
        count: "740",
        class: "旅遊"
    },
    {
        name: "KoreaStar",
        title: "◎[韓星] ",
        count: "727",
        class: "韓國"
    },
    {
        name: "Beauty",
        title: "◎《表特板》意淫文字板規新修訂",
        count: "723",
        class: "聊天"
    },
    {
        name: "marvel",
        title: "◎[媽佛] 進板畫面徵求中...",
        count: "655",
        class: "生二"
    },
    {
        name: "joke",
        title: "◎          ＝ joke ＝",
        count: "613",
        class: "娛樂"
    },
    {
        name: "MakeUp",
        title: "◎[美妝] 掏錢買單？只有自己能決定",
        count: "583",
        class: "美容"
    },
    {
        name: "NSwitch",
        title: "◎[NS] 遊戲時 請勿直接拔卡帶",
        count: "518",
        class: "主機"
    },
    {
        name: "MH",
        title: "◎[MH] Carry me Senpai",
        count: "504",
        class: "狩獵"
    },
    {
        name: "e-shopping",
        title: "◎[網購] ES板沒有提供通靈諮詢服務",
        count: "484",
        class: "網購"
    },
    {
        name: "PC_Shopping",
        title: "◎[電蝦] 漲聲何時才能停歇?",
        count: "475",
        class: "硬體"
    },
    {
        name: "Tainan",
        title: "◎[台南] 緊急 廁所沒衛生紙",
        count: "440",
        class: "台南"
    },
    {
        name: "TypeMoon",
        title: "◎[日GO] 問答大賽在星期六晚上！",
        count: "433",
        class: "型月"
    },
    {
        name: "AllTogether",
        title: "◎[歐兔] 發文前請先看置底板規喔",
        count: "427",
        class: "聯誼"
    },
    {
        name: "PokemonGO",
        title: "◎[PMGO] 2/26 台灣燈會在嘉義",
        count: "408",
        class: "抓寶"
    },
    {
        name: "creditcard",
        title: "◎[信用卡] KOKO/Richart→銀行板",
        count: "405",
        class: "理財"
    },
    {
        name: "KanColle",
        title: "◎[艦娘] 二月中旬冬活",
        count: "403",
        class: "艦娘"
    },
    {
        name: "StupidClown",
        title: "◎ 哼哼哼哼",
        count: "386",
        class: "經歷"
    },
    {
        name: "SNSD",
        title: "◎[SNSD] 拼盤演唱會12點準時開賣!",
        count: "385",
        class: "韓國"
    },
    {
        name: "Steam",
        title: "◎本板禁止合購代購買賣等金錢交易",
        count: "364",
        class: "平台"
    },
    {
        name: "basketballTW",
        title: "◎台灣籃球",
        count: "353",
        class: "籃球"
    },
    {
        name: "SportLottery",
        title: "◎[運彩] 籃網騎士 樂透開始",
        count: "351",
        class: "博弈"
    },
    {
        name: "marriage",
        title: "◎[婚姻] (A)=禁自刪 (B)=可自刪",
        count: "348",
        class: "婚姻"
    },
    {
        name: "KoreaDrama",
        title: "◎[韓劇] Misty樂透限時下注中",
        count: "339",
        class: "韓劇"
    },
    {
        name: "TaichungBun",
        title: "◎[台中] 交易新板規執行中 詳置底",
        count: "338",
        class: "台中"
    },
    {
        name: "ONE_PIECE",
        title: "◎[海賊] 來選第12屆板主囉 投票中",
        count: "336",
        class: "日本"
    },
    {
        name: "Japandrama",
        title: "◎[日劇] 家政夫のミタゾノ2",
        count: "331",
        class: "日劇"
    },
    {
        name: "Kaohsiung",
        title: "◎[高雄] 發文前請注意是否違法！",
        count: "331",
        class: "高雄"
    },
    {
        name: "Salary",
        title: "◎[職場] 工作職場板",
        count: "314",
        class: "職場"
    },
    {
        name: "home-sale",
        title: "◎[房板] 天佑花蓮",
        count: "292",
        class: "房屋"
    },
    {
        name: "iOS",
        title: "◎[iOS] …　…　…　…　…　…",
        count: "279",
        class: "系統"
    },
    {
        name: "Lineage",
        title: "◎[天堂&M] 甘特:kxx06 尼懂偶嗎?",
        count: "275",
        class: "線上"
    },
    {
        name: "CFantasy",
        title: "◎[玄幻] 賞燈賞月賞元宵",
        count: "264",
        class: "玄幻"
    },
    {
        name: "HardwareSale",
        title: "◎[硬體買賣] 發文前請詳閱板規",
        count: "250",
        class: "買賣"
    },
    {
        name: "Gamesale",
        title: "◎[遊戲交易] 猜燈謎 (Y/N)",
        count: "245",
        class: "綜合"
    },
    {
        name: "NBA_Film",
        title: "◎ NBA影片版-無限期徵求版主",
        count: "245",
        class: "NBA."
    },
    {
        name: "BeautySalon",
        title: "◎[美保] SunDing 已離職 ＠＠ ",
        count: "245",
        class: "美容"
    },
    { name: "graduate", title: "◎[研所] ", count: "237", class: "研究" },
    {
        name: "japanavgirls",
        title: "◎AV女優板 清新、優質,神人照格式",
        count: "234",
        class: "綜合"
    },
    {
        name: "PuzzleDragon",
        title: "◎[P＆D] 六周年",
        count: "230",
        class: "轉珠"
    },
    {
        name: "OverWatch",
        title: "◎[鬥陣] OWL再度開戰",
        count: "224",
        class: "線上"
    },
    { name: "Food", title: "◎美食板", count: "211", class: "美食" },
    {
        name: "Examination",
        title: "◎[國考] 03/01 11:00 地特放榜 ",
        count: "208",
        class: "考試"
    },
    {
        name: "KoreanPop",
        title: "◎[韓樂] 平昌冬奧後回歸潮",
        count: "198",
        class: "音樂"
    },
    {
        name: "WOW",
        title: "◎[WoW] 大秘邀請賽 II 開跑",
        count: "198",
        class: "線上"
    },
    {
        name: "Drama-Ticket",
        title: "◎藝文票券轉售版 開賣7日內禁徵",
        count: "198",
        class: "舞臺"
    },
    {
        name: "BuyTogether",
        title: "◎[合購] 請靜待站方解除唯讀",
        count: "196",
        class: "買賣"
    },
    {
        name: "YuanChuang",
        title: "◎[原創] 今晚20:00 原創小學堂",
        count: "189",
        class: "原創"
    },
    {
        name: "MuscleBeach",
        title: "◎[健身] 發文前請務必詳閱板規",
        count: "186",
        class: "美體"
    },
    {
        name: "biker",
        title: "◎[Biker]    新聞記得加心得",
        count: "181",
        class: "車車"
    },
    {
        name: "Palmar_Drama",
        title: "◎不是中計就是入魔",
        count: "181",
        class: "布袋"
    },
    { name: "Hunter", title: "◎[獵人] 連載中", count: "179", class: "日本" },
    {
        name: "MLB",
        title: "◎春訓徵文比賽3/1開始！",
        count: "174",
        class: "*MLB"
    },
    {
        name: "Aviation",
        title: "◎[航空] 歡迎來到航空板",
        count: "171",
        class: "交通"
    },
    {
        name: "Soft_Job",
        title: "◎我收假了 我又放假了",
        count: "168",
        class: "工作"
    },
    {
        name: "DSLR",
        title: "◎[單眼] 天祐台灣  天祐花蓮",
        count: "167",
        class: "攝影"
    },
    {
        name: "Hsinchu",
        title: "◎[新竹] 2017/10新板規請見置底",
        count: "165",
        class: "新竹"
    },
    {
        name: "CVS",
        title: "◎便利商店跟你一起開工開啟新生活",
        count: "163",
        class: "資訊"
    },
    {
        name: "Gov_owned",
        title: "◎[國營] 發文前請詳閱板規",
        count: "161",
        class: "國營"
    },
    {
        name: "AC_In",
        title: "◎[裏洽] 舊文被推廣告麻煩來信檢舉",
        count: "159",
        class: "閒談"
    },
    {
        name: "GetMarry",
        title: "◎結婚板-週三廣宣文周日交易文",
        count: "159",
        class: "結婚"
    },
    {
        name: "HatePolitics",
        title: "◎[政黑] 2018板主選舉開始登記",
        count: "158",
        class: "Hate"
    },
    {
        name: "EAseries",
        title: "◎[歐美影集] PTT 27th小天使招生中",
        count: "148",
        class: "歐美"
    },
    {
        name: "Tennis",
        title: "◎Dubai Ψ Svitolina",
        count: "148",
        class: "網球"
    },
    {
        name: "PathofExile",
        title: "◎[PoE] 3.2 soon 板主徵選中~",
        count: "142",
        class: "線上"
    },
    {
        name: "SENIORHIGH",
        title: "◎[高中] 發表算命文請注意置底公告",
        count: "142",
        class: "高中"
    },
    {
        name: "mobilesales",
        title: "◎貼文請詳閱版規超貼水桶1年",
        count: "136",
        class: "資訊"
    },
    {
        name: "Railway",
        title: "◎[鐵道] 站方小天使招考 詳見置底",
        count: "135",
        class: "交通"
    },
    {
        name: "TWICE",
        title: "◎[TWICE]彩彩生日徵圖、徵文活動！",
        count: "135",
        class: "韓國"
    },
    {
        name: "DigiCurrency",
        title: "◎[數位貨幣] 驚驚漲",
        count: "135",
        class: "資訊"
    },
    {
        name: "part-time",
        title: "◎[打工] 2018/1/01起工資NT$140/hr",
        count: "130",
        class: "求職"
    },
    {
        name: "Elephants",
        title: "◎板主票選開放投票至03/07",
        count: "127",
        class: "CPBL"
    },
    { name: "H-GAME", title: "◎H-GAME板", count: "125", class: "綜合" },
    {
        name: "Headphone",
        title: "◎溫馨耳機板 心得文請多加敘述聽感",
        count: "124",
        class: "資訊"
    },
    {
        name: "China-Drama",
        title: "◎[陸劇] ",
        count: "123",
        class: "陸劇"
    },
    {
        name: "HelpBuy",
        title: "◎[代買] 一定要看最新兩篇置底公告",
        count: "122",
        class: "買賣"
    },
    { name: "cat", title: "◎喵板～", count: "122", class: "寵物" },
    {
        name: "Zastrology",
        title: "◎[星座] 十二星座  ",
        count: "119",
        class: "星座"
    },
    {
        name: "nb-shopping",
        title: "◎[筆電瞎] 過年交易注意詐騙",
        count: "117",
        class: "硬體"
    },
    {
        name: "IdolMaster",
        title: "◎[[email protected]]繋げよう、ミルキーウェイ!",
        count: "117",
        class: "偶像"
    },
    {
        name: "PublicServan",
        title: "◎代管期間，請看置底",
        count: "117",
        class: "公職"
    },
    {
        name: "AKB48",
        title: "◎ジャーバージャ 呷飽呷 夾保夾",
        count: "116",
        class: "日本"
    }
]
```

import 'babel-polyfill';
import scraper from './scraper';
import content from './content';
import hot from './hot';
export { scraper, content, hot };

// (async () => {
//     console.log(await hot());
// })();
// import fs from 'fs';
// (async () => {
//     const option = {
//         pageCounts: 10,
//         startPage: 0,
//         categoryPatten: /\[(.+)\]/,
//         boardName: 'nba',
//         isScrapContent: false
//     };
//     console.log(new Date());
//     const list = await scraper(option);
//     // console.log(JSON.stringify(list, null,npx 4));
//     console.log(JSON.stringify(await content(list.items[0])))

//     const csv = list.items.reduce( (pre, cur) => {
//         if (cur.category === '公告' || !cur.title) {
//             return pre;
//         }
//         return (pre += `${cur.category},${cur.title},${cur.link}
// `);
//     }, '');

//     fs.writeFileSync('ptt.csv', csv);
//     console.log(new Date());
// })();

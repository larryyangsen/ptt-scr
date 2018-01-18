import '@babel/polyfill';
import scraper from './scraper';
import content from './content'
export { scraper, content };
// import fs from 'fs';
// (async () => {
//     const option = {
//         pageCounts: 10,
//         startPage: 0,
//         categoryPatten: /\[(.+)\]/,
//         boardName: 'Gamesale',
//         isScrapContent: true
//     };
//     console.log(new Date());
//     const list = await scraper(option);
//     // console.log(JSON.stringify(list, null,npx 4));
//     const csv = list.items.reduce((pre, cur) => {
//         if (cur.category === '公告' || !cur.title) {
//             return pre;
//         }
//         return (pre += `${cur.category},${cur.title},${cur.link}
// `);
//     }, '');

//     fs.writeFileSync('ptt.csv', csv);
//     console.log(new Date());
// })();

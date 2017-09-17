import 'babel-polyfill';
import scraper from './scraper';
export { scraper };

// (async () => {
//     const option = {
//         boardName: 'Baseball',
//         pageCounts: 1,
//         startPage: 0,
//         categoryPatten: /\[(.+)\]/,
//         isScrapContent: true
//     };
//     const list = await scraper(option);
// })();

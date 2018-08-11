import cheerio from 'cheerio';

const prePageSelector = '.btn-group-paging a:nth-child(2)';
const listSelector = '.r-ent';
const titleSelector = '.title a';
const titleLinkSelector = '.title a';
const authorSelector = '.meta .author';
const dateSelector = '.meta .date';
const pushContentSelector = '.nrec';
const pushContent = value => (value ? value.trim() : '');
const getCategory = (value, categoryPattern) => {
    if (value && typeof value === 'string') {
        return value.match(categoryPattern) ? value.match(categoryPattern)[1].trim() : '標題格式錯誤';
    }
};
const fullLink = value => (value ? `https://www.ptt.cc/${value}` : '');
const getPrePageNumber = value => {
    if (value) {
        const [, number] = (/index(\d+).html/).exec(value);
        return +number;
    }
    return 0;
};
export default (html, categoryPattern = /\[(.+)\]/) => {
    let $ = cheerio.load(html);
    const items = [];
    const prePageNumber = getPrePageNumber($(prePageSelector).attr('href'));
    $(listSelector).each((i, el) => {
        $ = $.load(el);
        const title = $(titleSelector).text();
        const category = getCategory(title, categoryPattern);
        const link = fullLink($(titleLinkSelector).attr('href'));
        const author = $(authorSelector).text();
        const push = pushContent($(pushContentSelector).text());
        const date = $(dateSelector).text();
        const item = {
            title,
            category,
            link,
            author,
            push,
            date
        };
        items.push(item);
    });
    return {
        prePageNumber,
        items
    };
};

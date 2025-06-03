import cheerio from 'cheerio';

const prePageSelector = '.btn-group-paging a:nth-child(2)';
const listSelector = '.r-ent';
const titleSelector = '.title a';
const titleLinkSelector = '.title a';
const authorSelector = '.meta .author';
const dateSelector = '.meta .date';
const pushContentSelector = '.nrec';

export interface PttArticleListItem { // Exporting
    title: string;
    category?: string;
    link: string;
    author: string;
    push: string; // pushContent returns string, e.g., "爆", "10", "X1"
    date: string;
}

export interface PttListPage { // Exporting
    prePageNumber: number;
    items: PttArticleListItem[];
}

const pushContent = (value?: string): string => (value ? value.trim() : '');

const getCategory = (value?: string, categoryPattern?: RegExp): string | undefined => {
    if (value && categoryPattern) {
        const match = value.match(categoryPattern);
        return match ? match[1].trim() : undefined; // Return undefined if no match or format error
    }
    return undefined;
};

const fullLink = (value?: string): string => (value ? `https://www.ptt.cc${value}` : ''); // Added missing slash for host

const getPrePageNumber = (value?: string): number => {
    if (value) {
        const match = /index(\d+)\.html/.exec(value);
        if (match && match[1]) {
            return +match[1];
        }
    }
    return 0;
};

export default (html: string, categoryPattern: RegExp = /\[(.+)\]/): PttListPage => {
    const $ = cheerio.load(html);
    const items: PttArticleListItem[] = [];
    const prePageLink = $(prePageSelector).attr('href');
    const prePageNumber = getPrePageNumber(prePageLink);

    $(listSelector).each((i, el) => {
        const $el = $(el); // Create a Cheerio object for the current element
        const titleText = $el.find(titleSelector).text();
        const category = getCategory(titleText, categoryPattern);
        const linkHref = $el.find(titleLinkSelector).attr('href');
        const link = fullLink(linkHref);
        const author = $el.find(authorSelector).text();
        const push = pushContent($el.find(pushContentSelector).text());
        const date = $el.find(dateSelector).text();

        const item: PttArticleListItem = {
            title: titleText.replace(categoryPattern, '').trim(), // Remove category from title
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

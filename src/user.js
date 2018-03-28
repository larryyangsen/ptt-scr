import Request from 'request';
import getUrlContent from './getUrlContent';
import cheerio from 'cheerio';
import { URL } from 'url';
import querystring from 'querystring';
const request = Request.defaults();
const google = 'https://www.google.com';
const googleSearch = `${google}/search`;
const site = '+site:ptt.cc';
const itemElector = 'div.g';
const linkSelector = 'h3.r a';
const descSelector = 'div.s span.st';
const nextSelector = 'td.b > a';
const getSearchResultHTML = async url => await getUrlContent(request, url.toString());

export default async userName => {
    const googleSearchUrl = new URL(googleSearch);
    googleSearchUrl.searchParams.set('q', `${userName}${site}`);
    googleSearchUrl.searchParams.set('oq', `${userName}${site}`);
    googleSearchUrl.searchParams.set('ie', 'UTF-8');
    googleSearchUrl.searchParams.set('lang', 'tw');
    googleSearchUrl.searchParams.set('tld', 'tw');
    googleSearchUrl.searchParams.set('sourceid', 'chrome');
    googleSearchUrl.searchParams.set('num', 100);
    const userGoogleHTML = await getSearchResultHTML(googleSearchUrl);
    let $ = cheerio.load(userGoogleHTML);
    const nextLink = new URL(`${google}${$(nextSelector).attr('href')}`);
    nextLink.searchParams.set('q', `${userName}${site}`);
    $(itemElector).each((i, ele) => {
        $ = $.load(ele);
        let link = '';
        const linkEle = $(linkSelector);
        const destEle = $(descSelector);
        const linkObj = querystring.parse(linkEle.attr('href'));
        const linkTitle = linkEle.text();
        const descText = destEle.text();
        if (linkObj['/url?q']) {
            link = linkObj['/url?q'];
        }
        console.log(i);
        console.log(linkTitle);
        console.log(link);
        console.log(descText);
    });
    console.log(nextLink.toString());
};

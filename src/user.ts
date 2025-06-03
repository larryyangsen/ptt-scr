import RequestLib, { RequestAPI, CoreOptions, RequiredUriUrl, Request as RequestType } from 'request';
import getUrlContent from './getUrlContent';
import cheerio from 'cheerio';
import { URL } from 'url';
import querystring from 'querystring';

// Define the specific type for our RequestAPI instances, matching src/request.ts
type PttRequestAPI = RequestAPI<RequestType, CoreOptions, RequiredUriUrl>;

// For Request.defaults(), the return type is PttRequestAPI.
const requestInstance: PttRequestAPI = RequestLib.defaults({});

const google = 'https://www.google.com';
const googleSearch = `${google}/search`;
const site = '+site:ptt.cc';
const itemSelector = 'div.g'; // Corrected 'itemElector' to 'itemSelector' based on common naming
const linkSelector = 'h3.r a';
const descSelector = 'div.s span.st';
// const nextSelector = 'td.b > a#pnnext'; // Not used in current non-recursive version

export interface GoogleSearchResult { // Exporting
    title: string;
    link: string;
    text: string;
}

const getSearchResultHTML = async (url: URL): Promise<string> => {
    return await getUrlContent(requestInstance, url.toString()); // Use the typed requestInstance
};

const getSearchUrl = (url: URL, userName: string): URL => {
    // url is already a URL object, no need to new URL(url)
    url.searchParams.set('q', `${userName}${site}`);
    url.searchParams.set('oq', `${userName}${site}`); // oq is often original query, fine
    url.searchParams.set('ie', 'UTF-8');
    url.searchParams.set('hl', 'zh-TW'); // Using 'hl' for language is more common for Google
    url.searchParams.set('lr', 'lang_zh-TW'); // Restrict to traditional chinese results
    url.searchParams.set('tld', 'tw'); // Top level domain
    url.searchParams.set('sourceid', 'chrome');
    url.searchParams.set('num', '100'); // Request 100 results
    // url.searchParams.delete('start'); // Ensure start is not carried over if modifying existing URL
    return url;
};

const parseHtml = async (
    html: string,
    _userName: string, // userName is not used in the current non-recursive version's logic
    contents: GoogleSearchResult[] = []
): Promise<GoogleSearchResult[]> => {
    const $ = cheerio.load(html);

    $(itemSelector).each((i, el) => {
        const $el = $(el); // Use $ on the current element
        const linkEle = $el.find(linkSelector);
        const descEle = $el.find(descSelector);

        const title = linkEle.text();
        const href = linkEle.attr('href');
        let link = '';

        if (href) {
            const linkObj = querystring.parse(href);
            const qLink = linkObj['/url?q'];
            if (typeof qLink === 'string') {
                link = qLink;
            } else if (Array.isArray(qLink) && qLink.length > 0) {
                link = qLink[0]; // Take the first one if it's an array
            } else if (!qLink && href.startsWith('/url?')) { // If no '/url?q' but still a redirect
                 link = href; // Use the href directly or attempt to parse it
            } else if (href && !href.startsWith('http') && !href.startsWith('/')) {
                // If it's a relative path from a non-google domain (less likely here)
                // This case might need more context if it occurs.
                // For now, assume google links or full paths.
            } else if (href) {
                 link = href; // Fallback to using href directly if it's a proper link
            }
        }

        const text = descEle.text();

        if (title && link) { // Only push if essential data is present
            contents.push({
                title,
                link,
                text
            });
        }
    });

    // Recursive part is commented out, so we just return current contents
    // if (nextLink) {
    //     nextLink = getSearchUrl(nextLink, userName);
    //     const nextHtml = await getSearchResultHTML(nextLink);
    //     return await parseHtml(nextHtml, userName, contents); // Pass current contents
    // }
    return contents;
};

export default async (userName: string): Promise<GoogleSearchResult[]> => {
    const initialUrl = new URL(googleSearch);
    const googleSearchUrl = getSearchUrl(initialUrl, userName);
    const userGoogleHTML = await getSearchResultHTML(googleSearchUrl);
    // Pass an empty array for the initial call to parseHtml's contents argument
    const results = await parseHtml(userGoogleHTML, userName, []);
    return results;
};

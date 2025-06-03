import request from './request';
import get from './getUrlContent';
import { RequestAPI as OriginalRequestAPI, CoreOptions, RequiredUriUrl, Request as RequestType } from 'request';
import pttRequestInstance from './request'; // Renamed to avoid conflict and indicate it's an instance
import fetchUrlContent from './getUrlContent'; // Renamed 'get' to 'fetchUrlContent'
import scrapList, { PttArticleListItem, PttListPage } from './list';
import scrapContent, { ArticleInput, ArticleContent } from './content'; // ArticleInput is { link, title?, content?: ArticleContent }

const mainUrl = 'https://www.ptt.cc';

// Define the specific type for our RequestAPI instances
type PttRequestAPI = OriginalRequestAPI<RequestType, CoreOptions, RequiredUriUrl>;

export interface ScraperOptions { // Ensure this is exported
    boardName?: string;
    pageCounts?: number;
    startPage?: number;
    categoryPattern?: RegExp;
    isScrapContent?: boolean;
}

// PttArticleWithContent is ArticleInput where 'content' field is populated
export type PttArticleWithContent = ArticleInput; // Ensure this is exported if used by ScraperResult

export interface ScraperResult { // Ensure this is exported
    prePage: string;
    prePageNumber: number;
    items: Array<PttArticleListItem | PttArticleWithContent>;
}

export default async (options: ScraperOptions = {}): Promise<ScraperResult> => {
    const {
        boardName = 'Gossiping',
        pageCounts = 3,
        startPage = 0,
        categoryPattern = /\[(.+)\]/,
        isScrapContent = false
    } = options;

    let boardUrl = `${mainUrl}/bbs/${boardName}/index${startPage || ''}.html`;
    let lastScrapedPrePageNumber = 0;

    const collectedItems: PttArticleListItem[] = [];
    const session: PttRequestAPI = await pttRequestInstance();

    for (let i = 0; i < pageCounts; i++) {
        if (!boardUrl) {
            console.warn("Board URL became invalid, stopping page scrape early.");
            break;
        }
        const html: string = await fetchUrlContent(session, boardUrl); // Use renamed fetchUrlContent
        const listPageData: PttListPage = scrapList(html, categoryPattern);

        if (listPageData.items.length === 0 && i === 0 && startPage !== 0) {
            // If it's the first page requested (not latest) and no items, boardUrl might be wrong
            console.warn(`No items found on ${boardUrl}. Board name or startPage might be incorrect.`);
            // Potentially break or throw error if needed
        }

        collectedItems.push(...listPageData.items);

        // Prepare URL for the next iteration (older page)
        // Ensure prePageNumber is valid before constructing URL
        if (listPageData.prePageNumber > 0) {
            boardUrl = `${mainUrl}/bbs/${boardName}/index${listPageData.prePageNumber}.html`;
            lastScrapedPrePageNumber = listPageData.prePageNumber;
        } else {
            // This might mean it's the first page of the board or an issue.
            // console.warn(`Invalid prePageNumber (${listPageData.prePageNumber}) received from ${boardUrl}. Stopping further page fetching.`);
            boardUrl = ''; // Stop fetching further pages if prePageNumber is not valid
        }
    }

    if (isScrapContent) {
        const contentItems: PttArticleWithContent[] = [];
        const itemsToProcess = [...collectedItems]; // Process a copy
        const totalItemsToFetchContent = itemsToProcess.length;

        // Determine batch size. Avoid division by zero if pageCounts was 0 (though default is 3)
        const batchSize = pageCounts > 0 ? Math.ceil(totalItemsToFetchContent / pageCounts) : totalItemsToFetchContent;

        if (totalItemsToFetchContent > 0 && batchSize > 0) {
            for (let i = 0; i < Math.ceil(totalItemsToFetchContent / batchSize); i++) {
                const currentBatch = itemsToProcess.splice(0, batchSize);
                const contentPromises = currentBatch.map(item => scrapContent(item)); // scrapContent accepts PttArticleListItem

                if (contentPromises.length > 0) {
                    const resolvedContents = await Promise.all(contentPromises);
                    contentItems.push(...resolvedContents);
                }
            }
        }
        return { prePage: boardUrl, prePageNumber: lastScrapedPrePageNumber, items: contentItems };
    }

    return { prePage: boardUrl, prePageNumber: lastScrapedPrePageNumber, items: collectedItems };
};

import xray from 'x-ray';

const prePageSelector = '.btn-group-paging a:nth-child(2)@href';
const listSelector = '.r-ent';
const titleSelector = '.title a';
const titleLinkSelector = '.title a@href';
const authorSelector = '.meta .author';
const dateSelector = '.meta .date';

export default async (
    boardName = 'Gamesale',
    pages = 3,
    categoryPatten = /\[(.+)\]/
) =>
    new Promise((resolve, reject) => {
        const mainUrl = `https://www.ptt.cc/bbs/${boardName}/index.html`;
        const x = xray({
            filters: {
                category: value => {
                    if (value && typeof value === 'string') {
                        return value.match(categoryPatten)
                            ? value.match(categoryPatten)[1].trim()
                            : '標題格式錯誤';
                    }
                }
            }
        });
        x(mainUrl, listSelector, [
            {
                title: titleSelector,
                category: `${titleSelector}|category`,
                link: titleLinkSelector,
                athor: authorSelector,
                date: dateSelector
            }
        ])
            .paginate(prePageSelector)
            .limit(pages)((err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
    });

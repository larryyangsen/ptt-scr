import xray from 'x-ray';
const prePageSelector = '.btn-group-paging a:nth-child(2)@href';
const listSelector = '.r-ent';
const titleSelector = '.title a';
const titleLinkSelector = '.title a@href';
const authorSelector = '.meta .author';
const dateSelector = '.meta .date';
const pushContentSelector = '.nrec';
export default async (html, categoryPatten = /\[(.+)\]/) =>
    new Promise((resolve, reject) => {
        const x = xray({
            filters: {
                category: value => {
                    if (value && typeof value === 'string') {
                        return value.match(categoryPatten)
                            ? value.match(categoryPatten)[1].trim()
                            : '標題格式錯誤';
                    }
                },
                pushContent: value => {
                    if (value) {
                        return value.trim();
                    }
                    return 0;
                },
                prePageNumber: value => {
                    if (value) {
                        const [, number] = (/index(\d+).html/).exec(value);
                        return number;
                    }
                    return 0;
                },
                fullLink: value => {
                    if (value) {
                        return `https://www.ptt.cc/${value}`;
                    }
                    return '';
                }
            }
        });

        x(html, {
            prePageNumber: `${prePageSelector}|prePageNumber`,
            items: x(listSelector, [
                {
                    title: titleSelector,
                    category: `${titleSelector}|category`,
                    link: `${titleLinkSelector}|fullLink`,
                    athor: authorSelector,
                    push: `${pushContentSelector}|pushContent`,
                    date: dateSelector
                }
            ])
        })((err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });

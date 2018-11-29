import scraper from '../src/scraper';
test('get gamesale result', async () => {
    const boardName = 'Gamesale';
    const result = await scraper({ boardName });
    console.log(result);
    expect(result.items).not.toBe(0);
});

import scraper from '../src/scraper';
import { expect } from 'chai';
export default () => {
    describe('has result', () => {
        it('get gamesale result', async () => {
            const result = await scraper('Gamesale');
            expect(result).to.not.have.lengthOf(0);
        });
    });
};

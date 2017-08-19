import scraper from '../src/scraper';
import { expect } from 'chai';
export default () => {
  describe('has result', () => {
    it('get gamesale result', () =>
      new Promise(resolve => {
        //   const result = await scraper('Gamesale');
        return scraper('Gamesale', 0).then(result => {
          expect(result).to.not.have.lengthOf(0);
          resolve();
        });
      }));
  });
};

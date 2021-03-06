import { expect } from 'chai';
import * as _ from 'lodash';
import { Definitions } from './definition';

describe('Definitions', () => {
  const defs = new Definitions({
    en: {
      regex: [/[0-9]{2,3}/],
      name: [1, 2, 3],
      nest: {
        nest1:
        ['a', 'b']
      }
    },
    zh_Hant_TW: {
      name: [4, 5, 6]
    }
  });

  describe('#get()', () => {
    it('get a definition', () => {
      expect(defs.get('name')).eql([1, 2, 3]);
      expect(defs.get('name', 'en')).eql([1, 2, 3]);
      expect(defs.get('name', 'zh-Hant-TW')).eql([4, 5, 6]);
    })
  });

  describe('#arbitrary()', () => {
    it('makes arbitrary', () => {
      const arb = defs.arbitrary('name');
      const a = arb.random;
      const b = arb.locale('zh-Hant-TW').random;
      expect([1, 2, 3].indexOf(a) >= 0).eq(true);
      expect([4, 5, 6].indexOf(b) >= 0).eq(true);
      const arb2 = defs.arbitrary('nest.nest1');
      expect(['a', 'b'].indexOf(arb2.random) >= 0).eq(true);
    });
  });

  describe('#formatter()', () => {
    it("makes a arbitrary of an array of regex string", () => {
      const arb = defs.arbitrary('regex');
      expect(_.isNumber(Number(arb.random))).eq(true);
    });
  });

});
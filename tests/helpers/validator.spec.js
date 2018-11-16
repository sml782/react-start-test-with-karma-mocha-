
import * as Validators from 'helpers/validator';

describe('helpers/validator', () => {
  describe('Function: checkUsername', () => {
    it('Should not return error while input foobar.', () => {
      expect(Validators.checkUsername('foobar')).to.be.empty;
      assert(!Validators.checkUsername('foobar'));
    });
    it('Should return error while empty.', () => {
      expect(Validators.checkUsername('')).to.equal('用户名必须为1-15个字');
      assert.equal(1, '1');
      assert.deepEqual({ a: 1 }, { a: '1' });
      assert.strictEqual(Validators.checkUsername(''), '用户名必须为1-15个字', '对不起不相等')
    });
    it('Should return error while more then 15 words.', () => {
      expect(Validators.checkUsername('abcdefghijklmnop')).to.equal('用户名必须为1-15个字');
      expect(Validators.checkUsername('一二三四五六七八九十一二三四五六')).to.equal('用户名必须为1-15个字');
    });
  });
});

import * as Actions from 'actions/register';

describe('actions/register', () => {
  let actions;
  let dispatchSpy;
  let getStateSpy;
  let xhr;
  let requests;

  beforeEach(function() {
    actions = [];
    dispatchSpy = sinon.spy(action => {
      actions.push(action);
    });

    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function(xh) {
      requests.push(xh);
    };
  });

  afterEach(function() {
    xhr.restore();
  });

  describe('Action: checkUsername', () => {
    it('Should export a constant CHANGE_USERNAME_ERROR.', () => {
      expect(Actions.CHANGE_USERNAME_ERROR).to.equal('CHANGE_USERNAME_ERROR');
    })

    it('Should be exported as a function.', () => {
      expect(Actions.checkUsername).to.be.a('function');
    })

    it('Should be return an action.', () => {
      const action = Actions.checkUsername('foobar');
      expect(action).to.have.property('type', Actions.CHANGE_USERNAME_ERROR);
    })

    it('Should be return an action with error while input empty name.', () => {
      const action = Actions.checkUsername('');
      expect(action).to.have.property('error').to.not.be.empty();
    })
  })

  describe('Action: changeUsername', () => {
    it('Should export a constant CHANGE_USERNAME.', () => {
      expect(Actions.CHANGE_USERNAME).to.equal('CHANGE_USERNAME');
    })

    it('Should be exported as a function.', () => {
      expect(Actions.changeUsername).to.be.a('function');
    })

    it('Should return a function (is a thunk).', () => {
      expect(Actions.changeUsername()).to.be.a('function');
    })

    it('Should be return an action.', () => {
      const action = Actions.checkUsername('foobar');
      expect(action).to.have.property('type', Actions.CHANGE_USERNAME_ERROR);
    })

    it('Should call dispatch CHANGE_USERNAME and CHANGE_USERNAME_ERROR.', () => {
      Actions.changeUsername('hello')(dispatchSpy);
      dispatchSpy.should.have.been.calledTwice;

      expect(actions[0]).to.have.property('type', Actions.CHANGE_USERNAME);
      expect(actions[0]).to.have.property('name', 'hello');
      expect(actions[1]).to.have.property('type', Actions.CHANGE_USERNAME_ERROR);
      expect(actions[1]).to.have.property('error', undefined);
    });
  });

  // 带请求
  describe('Action: changeAjax', () => {
    it('Should call dispatch CHANGE_USERNAME_ERROR.', () => {
      Actions.changeAjax('foo@bar')(dispatchSpy);
      const body = '不能含有特殊字符';

      // 手动设置 ajax response
      requests[0].respond(200, {'Content-Type': 'text/plain'}, body);

      expect(actions[0]).to.have.property('type', Actions. CHANGE_USERNAME_ERROR);
      expect(actions[0]).to.have.property('error', '不能含有特殊字符');
    });
  });

});

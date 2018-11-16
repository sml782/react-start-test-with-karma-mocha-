import React from 'react';
import HomeRoute from 'routes/Home';
import Enzyme, { shallow, render, mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// Enzyme.configure({ adapter: new Adapter() });

describe('(Route) Home', () => {
  let _component;
  let _renderDom;

  beforeEach(() => {
    _component = HomeRoute.component();
    _renderDom = render(<HomeRoute.component />);
  });

  it('Should return a route configuration object', () => {
    expect(typeof HomeRoute).to.equal('object');
  });

  it('Should define a route component', () => {
    expect(_component.type).to.equal('div');
  });

  it('👀 👀 这个孩子是不是img', () => {
    expect(_renderDom.find('h4')).to.exist();
    // console.log(_renderDom.find('h4'));
  });

  class InputV extends React.Component {
    constructor(props) {
      super(props);
      // console.log(this.props);
      this.onKeyDown = this.onKeyDown.bind(this);
    }

    onKeyDown(e) {
      const { onKeyDown } = this.props;
      onKeyDown(e.target.value);
    }

    render() {
      return (
        <input type="text" onKeyDown={this.onKeyDown} />
      );
    }
  }

  it('测试键盘输入事件', () => {
    const keyDown = (value) => {
      assert.equal(value, 1235);
    };
    const wap = mount(<InputV onKeyDown={keyDown} />);
    const input = wap.find('input');
    input.simulate('keyDown', { target: { value: 1235 } });
  });

  it('测试键盘输入事件是否调用', () => {
    const keyDown = sinon.spy();
    const wap = mount(<InputV onKeyDown={keyDown} />);
    const input = wap.find('input');
    input.simulate('keyDown', { keyCode: 65 });

    assert(keyDown.calledOnce, '调用一次');
  });
});

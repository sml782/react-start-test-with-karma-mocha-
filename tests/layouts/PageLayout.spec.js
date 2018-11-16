import React from 'react';
import PropTypes from 'prop-types';
import PageLayout from 'layouts/PageLayout/PageLayout';
import { shallow } from 'enzyme';

/*
 * shallow 浅渲染
 * mount   完整DOM渲染
 * render  cheerio对象
 */

describe('(Layout) PageLayout', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PageLayout />);
  });

  it('renders as a <div>', () => {
    shallow(<PageLayout />).should.have.tagName('div');
  });

  it('renders a project title', () => {
    shallow(<PageLayout />).find('h1').should.have.text('React Redux Starter Kit');
  });

  /*
   * contain(ReactElement|Array<ReactElement>)
   * 检测是否包含 ReactElement
   * 返回 true | false
   */
  it('renders its children inside of the viewport', () => {
    const Child = () => <h2>child</h2>;
    shallow(
      <PageLayout>
        <Child />
      </PageLayout>
    )
      .find('.page-layout__viewport')
      .should.contain(<Child />);
  });
  /*
   * 类似
   * 1. containsAllMatchingElements(Array<ReactElement>)
   * wrapper的内容是否包含参数中的所有react节点, 与contains()类似，但是只接受数组作为参数.
   *
   * 2. matchesElement(ReactElement)
   * wrapper的内容是否匹配参数中的node, 只接受单个node
   *
   * 3. containsAnyMatchingElements(Array<ReactElement>)
   * 字面意思，应该好理解，contains与参数中任何一个node匹配，就返回true
   *
   * 4. containsMatchingElement(ReactElement)
   * 与.contains() 类似，但是只接受单个reactNode作为参数
   *
   */

  it('测试子节点是否存在', () => {
    const wrapper = shallow(<PageLayout />);
    expect(wrapper.find('.page-layout__viewport').children().exists()).to.be.equal(false);
  });

  /*
   * .type()
   * 检测类型
   * 如果它是一个复合组件，这将是组件构造函数。
   * 如果它是本地DOM节点，它将是一个标签名称的字符串。
   * 如果它为null，它依然是null
   * 返回 ：String|Function|null
   */
  it('节点类型', () => {
    expect(shallow(<PageLayout />).type()).to.be.equal('div');
  });

  // at(index) 选择
  // get(index) 返回一个react node，要测试它，得重新渲染。
  it('测试props是否等于预设', () => {
    // console.log(shallow(<PageLayout />).children().at(0).props());
    expect(shallow(<PageLayout />).children().at(0).props().children).to.be.equal('React Redux Starter Kit');
  });

  // childAt 返回一个渲染过的当前wrapper的index索引处的子对象
  it('玩玩 childAt, 检测子节点', () => {
    expect(shallow(<PageLayout />).childAt(0).type()).to.equal('h1');
  });

  // lengthOf 长度
  it('expect lengthOf', () => {
    expect(shallow(<PageLayout />).children()).to.have.lengthOf(5);
  });

  // 通过遍历树中当前节点的祖先，从自身开始，返回与选择器匹配的第一个元素的wrapper。
  it('closest(selector) => ShallowWrapper', () => {
    expect(shallow(<PageLayout />).closest('h1')).to.have.lengthOf(1);
  });

  // 直接选出第一个符合要求的节点
  it('closest(selector) => ShallowWrapper', () => {
    expect(shallow(<PageLayout />).closest('h1')).to.have.lengthOf(1);
  });

  /*
   * .debug([options]) => String
   * `beautiful` ReactHTML 字符串
   *
   * .html()
   * 返回当前渲染树的渲染HTML字符串
   */
  it('.debug([options]) => String', () => {
    console.log(wrapper.debug())
    console.log(wrapper.html());
    // console.log(document);
  });

  /*
   * .dive([options]) => ShallowWrapper
   * 浅渲染当前wrapper中的一个复合子组件
   *
   * 参数
   * 1. options: 与 shallow 第二个参数类似
   *
   * 与 shallow 区别
   * dive     只能在单个非DOM组件元素节点的包装器上调用,
   * shallow  的目标只能是单独的wrapper(即浅渲染对象，可以是div span)
   */
  it('.dive([options]) => ShallowWrapper', () => {
    function Bar() {
      return (
        <div>
          <div className="in-bar" />
        </div>
      );
    }
    function Foo() {
      return (
        <div>
          <Bar />
        </div>
      );
    }

    const wap = shallow(<Foo />);
    // 浅渲染，Bar 在当前wrapper中只会渲染成 <Bar />，所以找不到其包含的 '.in-bar'
    expect(wap.find('.in-bar')).to.have.lengthOf(0);
    expect(wap.find(Bar)).to.have.lengthOf(1);
    // 使用 .dive 后 就可以了
    expect(wap.find(Bar).dive().find('.in-bar')).to.have.lengthOf(1);

    console.log(wap.debug());
    console.log(wap.find(Bar).dive().debug());
  });

  /*
   * .equals(ReactElement) => Boolean
   * 会忽略属性为 undefined, 返回 true | false
   */

  /*
   * .every(selector) => Boolen
   * 检查所有节点是否与参数中的选择器匹配。
   *
   * .everyWhere(fn) => Boolen
   * 参数为函数
   */
  it('every(selector) => Boolen, everyWhere(fn) => Boolen', () => {
    const wap = shallow((
      <div>
        <div className="foo qoo" />
        <div className="foo boo" />
        <div className="foo hoo" />
      </div>
    ));
    // TODO: every
    expect(wap.find('.foo').every('.foo')).to.equal(true);
    expect(wap.find('.foo').every('.qoo')).to.equal(false);
    expect(wap.find('.foo').every('.bar')).to.equal(false);

    // TODO: everyWhere
    expect(wap.find('.foo').everyWhere(n => n.hasClass('foo'))).to.equal(true);
    expect(wap.find('.foo').everyWhere(n => n.hasClass('qoo'))).to.equal(false);
    expect(wap.find('.foo').everyWhere(n => n.hasClass('bar'))).to.equal(false);
  });

  /*
   * .filter(selector) => ShallowWrapper
   * 过滤，从wrapper中筛选出与参数中的selector匹配的节点
   *
   * .filterWhere(fn) => ShallowWrapper
   * 参数为函数
   */
  it('filter(selector) => ShallowWrapper, filterWhere(fn) => ShallowWrapper', () => {
    const wap = shallow((
      <div>
        <div className="foo qoo" />
        <div className="foo bar" />
        <div className="foo hoo" />
      </div>
    ));
    // TODO: filter
    expect(wap.find('.foo').filter('.bar')).to.have.lengthOf(1);

    // TODO: filterWhere
    const complexFoo = wap.find('.foo').filterWhere(n => typeof n.type() !== 'string');
    expect(complexFoo).to.have.lengthOf(0);
  });


  /*
   * .unmount() => Self
   * 卸载组件的方法。这可用于模拟通过卸载/装载生命周期的组件。
   */
  it('.unmount() => Self', () => {
    const spy = sinon.spy();

    class Foo extends React.Component {
      constructor(props) {
        super(props);
        this.componentWillUnmount = spy;
      }

      render() {
        const { id } = this.props;
        return (
          <div className={id}>
            {id}
          </div>
        );
      }
    }
    Foo.propTypes = {
      id: PropTypes.string.isRequired,
    };
    const wap = shallow(<Foo id="foo" />);
    expect(spy).to.have.property('callCount', 0);
    wap.unmount();
    expect(spy).to.have.property('callCount', 1);
  });

  /*
   * .update() => Self
   * 强制重新渲染。如果外部某些东西可能正在某处更新组件的状态，那么在检查渲染输出之前运行很有用。
   * //! 注意：只能在也是根实例的包装器实例上调用。
   * TODO: 未生效
   */
  it('.update() => Self', () => {
    class ImpureRender extends React.Component {
      constructor(props) {
        super(props);
        this.count = 0;
      }

      render() {
        this.count += 1;
        console.log(this.count);
        return <div>{this.count}</div>;
      }
    }

    const wrapper = shallow(<ImpureRender />);
    expect(wrapper.text()).to.equal('1');
    wrapper.update();
    expect(wrapper.text()).to.equal('1');
  });

  /*
   * .first() => ShallowWrapper
   * 将匹配节点集减少到集合中的第一个节点。
   *
   * .some(selector) => Boolean
   * 如果当前包装器中的至少一个节点与提供的选择器匹配，则为True。
   *
   * .someWhere(fn) => Boolean
   *
   */
});

describe('数据相关', () => {
  /*
   * props
   * setProps({})
   *
   * state
   * setState({})
   */
  it('props', () => {
    // TODO: expect 相关
    // equal 相当于 ===
    // deep.equal 深度相等，可判断 Object
    // deep.equal === eql
    expect(shallow(<PageLayout />).children().at(0).props().children).to.be.equal('React Redux Starter Kit');
  });

  /*
   * .context(key<String>) TODO: options 并未传入组件
   * 返回值将是this.context
   * key 不提供 -> this.context
   * key 提供 -> this.context[key]
   *
   * 要渲染的根组件必须具有contextTypes静态属性。
   */
  it('context(key<String>)', () => {
    const wrapper = shallow(
      <PageLayout />,
      { context: { foo: 10 }, props: { bar: 30 } }
    );

    expect(wrapper.context().foo).to.equal(10);
    expect(wrapper.context('foo')).to.equal(10);

    wrapper.setContext({ name: 'foo' });
    expect(wrapper.context().name).to.equal('foo');
  });
});

describe('事件相关', () => {
  /*
   * .simulate(event[, ...args]) => Self
   *
   * 参数
   * 1. event  - 模拟的事件名称
   * 2. ...arg - 传递给事件处理程序的模拟事件对象
   */
  it('.simulate(event[, ...args]) => Self', () => {
    class Foo extends React.Component {
      constructor(props) {
        super(props);
        this.state = { count: 0 };
      }

      render() {
        const { count } = this.state;
        return (
          <div>
            <div className={`clicks-${count}`}>
              {count} clicks
            </div>
            <a href="url" onClick={() => { this.setState({ count: count + 1 }); }}>
              Increment
            </a>
          </div>
        );
      }
    }
    const wrapper = shallow(<Foo />);

    expect(wrapper.find('.clicks-0').length).to.equal(1);
    wrapper.find('a').simulate('click');
    expect(wrapper.find('.clicks-0').length).to.equal(0);
  });

  /*
   * .simulateError(error) => Self
   *
   * 参数
   * 1. error  - 抛出的错误
   */
  it('.simulateError(error) => Self', () => {
    // const error = new Error('hi!');
    // wrapper.find(Something).simulateError(error);

    // expect(spy).to.have.property('callCount', 1);
  })


  /*
   * .tap(intercepter) => Self
   * 拦截器
   * intercepter是自己调用的。在调试方法链中的节点时，这很有用
   */
  it('.tap(intercepter) => Self', () => {
    const result = shallow((
      <ul>
        <li>xxx</li>
        <li>yyy</li>
        <li>zzz</li>
      </ul>
    )).find('li')
      .tap(n => console.log(n.debug()))
      .map(n => n.text());
    console.log(2222222222, result);
  })

  /*
   *
   */
});

/*
 * .shallow([options]) => ShallowWrapper
 *
 * 参数
 * options<context, disableLifecycleMethods>
 * options.disableLifecycleMethods：（Boolean[optional]）
 * 如果设置为true，componentDidMount 则不在组件上调用
 * 并且componentDidUpdate在setProps和 setContext 之后不调用。默认为false
 */

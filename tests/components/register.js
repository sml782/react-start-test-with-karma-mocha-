import React from 'react'
import { bindActionCreators } from 'redux'
import { Register } from 'components/Register'
import { shallow } from 'enzyme'
import {
  FormGroup,
  FormControl,
  FormLabel,
  FormError,
  FormTip,
  Dropdown,
  Button,
  TextInput
} from 'componentPath/basic/form'

describe('rdappmsg/trade_edit/componets/Plan', () => {
  let _props, _spies, _wrapper
  let register = {
    username: '',
    usernameError: ''
  }

  beforeEach(() => {
    _spies = {}
    _props = {
      register,
      ...bindActionCreators({
        onChangeUsername: (_spies.onChangeUsername = sinon.spy()),
        onSubmit: (_spies.onSubmit = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<Register {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should has two children.', () => {
    expect(_wrapper.children()).to.have.length(2);
  })

  it('Each element of form should be <FormGroup>.', () => {
      _wrapper.children().forEach(function (node) {
        expect(node.is(FormGroup)).to.equal(true);
      })
  })

  it('Should render username properly.', () => {
    expect(_wrapper.find(TextInput).prop('value')).to.be.empty
    _wrapper.setProps({register: {...register, username: 'foobar' }})
    expect(_wrapper.find(TextInput).prop('value')).to.equal('foobar')
  })

  it('Should call onChangeUsername.', () => {
    _spies.onChangeUsername.should.have.not.been.called
    _wrapper.find(TextInput).prop('onChange')('hello')
    _spies.dispatch.should.have.been.called

  })
})

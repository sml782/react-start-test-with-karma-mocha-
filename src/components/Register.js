import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  FormGroup,
  FormControl,
  FormLabel,
  FormError,
  FormTip,
  Button,
  TextInput
} from 'componentPath/basic/form'

export class Register extends Component {
  render () {
    const { register, onChangeUsername, onSubmit } = this.props;
    <div style={{ padding: '50px 130px'}}>
      <FormGroup>
        <FormLabel>用户名</FormLabel>
        <FormControl>
          <TextInput width='370px' limit={15} value={register.username} onChange={onChangeUsername} />
          <FormTip>请输入用户名</FormTip>
          <FormError>{register.usernameError}</FormError>
        </FormControl>
      </FormGroup>
      <FormGroup>
        <Button type='primary' onClick={onSubmit}>提交</Button>
      </FormGroup>
    </div>
  }
}

Register.propTypes = {
  register: PropTypes.object.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    register: state.register
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeUsername: name => {
      ...
    },
    onSubmit: () => {
      ...
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

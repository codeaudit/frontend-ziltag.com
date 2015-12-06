import React, {Component} from 'react'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class ZiltagMapLoginForm extends Component {
  render() {
    const {
      onUserChange,
      onPasswordChange,
      onSubmit
    } = this.props

    return (
      <div className='ziltag-ziltag-map-login-form'>
        <input onChange={onUserChange}/>
        <input onChange={onPasswordChange}/>
        <div onClick={onSubmit}>POST</div>
      </div>
    )
  }
}

export default ZiltagMapLoginForm

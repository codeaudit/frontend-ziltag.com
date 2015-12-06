import React, {Component} from 'react'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class ZiltagMapSignUpForm extends Component {
  render() {
    const {
      onNameChange,
      onEmailChange,
      onSubmit
    } = this.props

    return (
      <div className='ziltag-ziltag-map-sign-up-form'>
        <input onChange={onNameChange}/>
        <input onChange={onEmailChange}/>
        <div onClick={onSubmit}>POST</div>
      </div>
    )
  }
}

export default ZiltagMapSignUpForm

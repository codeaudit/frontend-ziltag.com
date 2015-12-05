import React, {Component} from 'react'
import AuthDialog from '../ZiltagMapAuthDialog'
import TextField from '../ZiltagMapTextField'

class ZiltagMapLoginForm extends Component {
  render() {
    const {
      onUserChange,
      onPasswordChange,
      onSubmit
    } = this.props

    return (
      <AuthDialog select="login">
        <TextField onChange={onUserChange} name="login" placeholder="Email or Username" icon="email" />
        <TextField onChange={onPasswordChange} name="password" placeholder="Password" icon="password" />
        <div onClick={onSubmit} className="auth-dialog__submit">Login</div>
        <div className="auth-dialog__footer auth-dialog__footer--blue"><a href="#">Forget password?</a></div>
      </AuthDialog>
    )
  }
}

export default ZiltagMapLoginForm

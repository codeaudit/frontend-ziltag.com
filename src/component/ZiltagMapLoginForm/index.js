import React, {Component} from 'react'
import AuthDialog from '../ZiltagMapAuthDialog'
import TextField from '../ZiltagMapTextField'

class ZiltagMapLoginForm extends Component {
  render() {
    return (
      <AuthDialog select="login">
        <TextField name="login" placeholder="Email or Username" icon="email" />
        <TextField name="password" placeholder="Password" icon="password" />
        <div className="auth-dialog__submit">Login</div>
        <div className="auth-dialog__footer auth-dialog__footer--blue"><a href="#">Forget password?</a></div>
      </AuthDialog>
    )
  }
}

export default ZiltagMapLoginForm

import React, {Component} from 'react'
import classNames from 'classnames/bind'

try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}

class ZiltagMapAuthDialog extends React.Component {
  render(){
    return(
      <div className="auth-dialog">
        <div className="auth-dialog__content">
          {this.props.children}
        </div>
        <div className="auth-dialog__actions">
          <div className={classNames('auth-dialog__action', {'auth-dialog__action--active': this.props.select == 'sign-up'})}>Sign Up</div>
          <div className={classNames('auth-dialog__action', {'auth-dialog__action--active': this.props.select == 'login'})}>Login</div>
          <div className="auth-dialog__cancel">Cancel</div>
        </div>
      </div>
    )
  }
}

export default ZiltagMapAuthDialog
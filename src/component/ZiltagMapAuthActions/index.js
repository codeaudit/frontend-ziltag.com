import React, {Component} from 'react'
import classNames from 'classnames/bind'

try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}

class ZiltagMapAuthActions extends React.Component {
  render(){
    return(
      <div className="ziltag-ziltag-map-auth-actions">
        <div className={classNames('ziltag-ziltag-map-auth-actions__action', {'ziltag-ziltag-map-auth-actions__action--active': this.props.select == 'sign-up'})} onClick={this.props.onSignUpClick} >Sign Up</div>
        <div className={classNames('ziltag-ziltag-map-auth-actions__action', {'ziltag-ziltag-map-auth-actions__action--active': this.props.select == 'login'})} onClick={this.props.onLoginClick} >Login</div>
        <div className="ziltag-ziltag-map-auth-actions__cancel">Cancel</div>
      </div>
    )
  }
}

ZiltagMapAuthActions.defaultProps = {
  select: 'sign-up'
}

export default ZiltagMapAuthActions
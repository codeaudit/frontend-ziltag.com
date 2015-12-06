import React, {Component} from 'react'
import classNames from 'classnames/bind'
import ZiltagMapDialog from '../ZiltagMapDialog'
import ZiltagMapAuthActions from '../ZiltagMapAuthActions'
import ZiltagMapLoginForm from '../ZiltagMapLoginForm'
import ZiltagMapSignUpForm from '../ZiltagMapSignUpForm'
import ZiltagMapAuthentication from '../ZiltagMapAuthentication'

try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}

class ZiltagMapAuthDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {select: this.props.select || 'default'}
  }

  clickSignUp(){
    this.setState({select: 'sign-up'})
  }

  clickLogin(){
    this.setState({select: 'login'})
  }

  render(){
    const {
      select
    } = this.state

    const eventProps = {
      onSignUpClick: this.clickSignUp.bind(this),
      onLoginClick: this.clickLogin.bind(this)
    }

    switch(select){
      case 'sign-up':
        var content = <ZiltagMapSignUpForm />
        break
      case 'login':
        var content = <ZiltagMapLoginForm />
        break
      default:
        return <ZiltagMapAuthentication {...eventProps} />
    }

    return(
      <ZiltagMapDialog content={content} side={<ZiltagMapAuthActions select={select} {...eventProps} />} />
    )
  }
}

ZiltagMapAuthActions.defaultProps = {
  select: 'sign-up'
}

export default ZiltagMapAuthDialog
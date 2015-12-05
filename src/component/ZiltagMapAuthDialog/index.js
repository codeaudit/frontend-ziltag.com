import React, {Component} from 'react'
import classNames from 'classnames/bind'
import ZiltagMapDialog from '../ZiltagMapDialog'
import ZiltagMapAuthActions from '../ZiltagMapAuthActions'
import ZiltagMapLoginForm from '../ZiltagMapLoginForm'
import ZiltagMapSignUpForm from '../ZiltagMapSignUpForm'

try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}

class ZiltagMapAuthDialog extends React.Component {
  render(){
    const {
      select
    } = this.props

    switch(select){
      case 'sign-up':
        var content = <ZiltagMapSignUpForm />
        break
      case 'login':
        var content = <ZiltagMapLoginForm />
        break
      default:
        console.error(`Unknown Property: ${select}`)
    }

    return(
      <ZiltagMapDialog content={content} side={<ZiltagMapAuthActions select={select}/>} />
    )
  }
}

ZiltagMapAuthActions.defaultProps = {
  select: 'sign-up'
}

export default ZiltagMapAuthDialog
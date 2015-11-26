import React, {Component} from 'react'

import Logo from '../Logo'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class BasePage extends Component {
  render() {
    const {
      children
    } = this.props

    return (
      <div>
        <div className='ziltag-base-page__head'>
          <Logo/>
        </div>
          base test passed {children}
       </div>
    )
  }
}

export default BasePage

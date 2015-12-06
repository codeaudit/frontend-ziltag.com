import React, {Component} from 'react'
import classNames from 'classnames/bind'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class ZiltagMapTextField extends React.Component {
  render(){
    const {
      icon,
      ...inputAttrs
    } = this.props
    return(
      <div className="ziltag-ziltag-map-text-field">
        <input type="text" className={classNames('ziltag-ziltag-map-text-field__input', `ziltag-ziltag-map-text-field__input--${icon}`)} {...inputAttrs}/>
      </div>
    )
  }
}

export default ZiltagMapTextField
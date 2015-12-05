import React, {Component} from 'react'
import classNames from 'classnames/bind'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class ZiltagMapTextField extends React.Component {
  render(){
    let {icon, ...inputAttrs} = this.props
    return(
      <div className="text-field">
        <input type="text" className={classNames('text-field__input', `text-field__input--${icon}`)} {...inputAttrs}/>
      </div>
    )
  }
}

export default ZiltagMapTextField
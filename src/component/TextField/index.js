import React, {Component} from 'react'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class TextField extends React.Component {
  render(){
    let {src, ...inputAttrs} = this.props
    return(
      <div className="text-field">
        <img src={src} className="text-field__image" />
        <input type="text" className="text-field__input" {...inputAttrs}/>
      </div>
    );
  }
}

export default TextField
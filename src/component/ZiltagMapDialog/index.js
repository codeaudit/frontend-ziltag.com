import React, {Component} from 'react'

try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}

class ZiltagMapDialog extends React.Component {
  render(){
    return(
      <div className="ziltag-ziltag-map-dialog">
        <div className="ziltag-ziltag-map-dialog__content">
          {this.props.content || this.props.children}
        </div>
        <div className="ziltag-ziltag-map-dialog__side">
          {this.props.side}
        </div>
      </div>
    )
  }
}

export default ZiltagMapDialog
import React, {Component} from 'react'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class ZiltagMapDialog extends Component {
  render() {
    const {
      children
    } = this.props

    const group = children.reduce((prev, curr) => {
      if (curr.type) {
        if (typeof curr.type == 'string') {
          var type = curr.type
        } else if (typeof curr.type == 'function') {
          var type = curr.type.name
        }
      }

      if (!prev[type]) {
        prev[type] = []
      }
      prev[type].push(curr)

      return prev
    }, {})

    return (
      <div className='ziltag-ziltag-map-dialog'>
        <div className='ziltag-ziltag-map-dialog__col0'>
          {group['p']}
        </div>
        <div className='ziltag-ziltag-map-dialog__col1'>
          {group['nav']}
        </div>
      </div>
    )
  }
}

export default ZiltagMapDialog

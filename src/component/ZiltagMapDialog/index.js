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

    if (Array.isArray(children)) {
      var group = children.reduce((prev, curr) => {
        const type = do {
          if (typeof curr.type === 'string') {
            curr.type
          } else if (typeof curr.type === 'function') {
            curr.type.name
          } else {
            null
          }
        }

        if (!prev[type]) {
          prev[type] = []
        }
        prev[type].push(curr)

        return prev
      }, {})
    }

    if (group) {
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
    } else {
      return (
        <div className='ziltag-ziltag-map-dialog'>
          {children}
        </div>
      )
    }
  }
}

export default ZiltagMapDialog

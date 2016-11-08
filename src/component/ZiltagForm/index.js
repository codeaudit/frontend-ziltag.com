import React, {Component} from 'react'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class ZiltagForm extends Component {
  render() {
    const {
      children
    } = this.props

    const group = children.reduce((prev, curr) => {
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

    return (
      <div className='ziltag-ziltag-form'>
        <div className='ziltag-ziltag-form__col0'>
          {group['h1']}
          {group['p']}
          {group['input']}
          {group['footer']}
        </div>
        <div className='ziltag-ziltag-form__col1'>
          {group['nav']}
        </div>
      </div>
    )
  }
}

export default ZiltagForm

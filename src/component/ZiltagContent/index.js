import React, {Component} from 'react'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class ZiltagContent extends Component {
  render() {
    const {
      content,
      author,
      usr
    } = this.props

    if (usr && usr.name == author.name) {
      var edit_operator_components = (
        <div className='ziltag-ziltag-content__row'>
          <div className='ziltag-ziltag-content__edit-operator'>Edit</div>
          <div className='ziltag-ziltag-content__edit-operator'>Delete</div>
        </div>
      )
    }

    return (
      <div className='ziltag-ziltag-content'>
        <div className='ziltag-ziltag-content__text'>{content}</div>
        {edit_operator_components}
      </div>
    )
  }
}

export default ZiltagContent

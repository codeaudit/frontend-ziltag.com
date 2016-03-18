import React, {Component} from 'react'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class Ziltag404Page extends Component {
  render() {
    return (
      <div className="body">
        <div className="box">
          <div className="box__title">Oops.</div>
          <div className="box__subtitle">Sorry, the page you’re looking for doesn’t exist.</div>
          <div className="box__footer">Go back to <a href="https://ziltag.com">ziltag.com</a> or <a href="mailto:hi@ziltag.com">contact us</a>.</div>
        </div>
      </div>
    )
  }
}

export default Ziltag404Page

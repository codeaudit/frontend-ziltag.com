import React, {Component} from 'react'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class Ziltag404Page extends Component {
  render() {
    return (
      <div className='ziltag-ziltag-404-page'>
        <div className='ziltag-ziltag-404-page__main'>
          <h1>Oops.</h1>
          <p className='ziltag-ziltag-404-page__explanation'>
            Sorry, the page you’re looking for doesn’t exist.
          </p>
          <p className='ziltag-ziltag-404-page__suggestion'>
            Go back to <a href='/'>ziltag.com</a> or <a href='mailto:hi@ziltag.com'>contact us</a>.
          </p>
        </div>
      </div>
    )
  }
}

export default Ziltag404Page

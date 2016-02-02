import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {pushState} from 'redux-router'
import classNames from 'classnames'

import BasePage from '../../component/BasePage'
import Avatar from '../../component/Avatar'
import * as actors from '../../actor'


try {
  if (__WEBPACK__) {
    require('./index.css')
    var robot_src = require('./robot.png')
  }
} catch (e) {}


class ZiltagMapPage extends Component {

  constructor(props) {
    super(props)
    this.actors = bindActionCreators({...actors, pushState}, this.props.dispatch)
  }

  componentDidMount() {
    const {router} = this.props
    this.actors.fetch_current_user()
    this.actors.fetch_ziltag_map(router.params.id)
    .then(action => this.actors.can_create_ziltag_map_page_stream({id: router.params.id}))
  }

  anchorify(text) {
    if (!text) {
      return text
    }

    const regex = new RegExp(
      '\\b((?:[a-z][\\w-]+:(?:\\/{1,3}|[a-z0-9%])|www\\d{0,3}[.]|[a-z0-9.\\-]+[.][a-z]{2,4}\\/)(?:[^\\s()<>]+|\\(([^\\s()<>]+|(\\([^\\s()<>]+\\)))*\\))+(?:\\(([^\\s()<>]+|(\\([^\\s()<>]+\\)))*\\)|[^\\s`!()\\[\\]{};:' + '\'' + '.,<>?«»“”‘’]))',
      'ig'
    )
    const delimiter = String.fromCharCode('\u0008')

    return text.replace(regex, url => {
      return delimiter + url + delimiter
    })
    .split(delimiter)
    .map((token, i) => {
      let key = 'anchorify-text-' + i
      if (regex.test(token)) {
        return <span className='ziltag-ziltag-map-page__anchorify-text' key={key}>{token}</span>
      } else {
        return <span key={key} >{token}</span>
      }
    })
  }

  render() {
    const {
      ziltag_map
    } = this.props

    const {
      fetch_ziltag
    } = this.actors

    var summary_components = ziltag_map.ziltags && ziltag_map.ziltags.map(ziltag => {
      return (
        <Link
          className={
            classNames(
              {
                'ziltag-ziltag-map-page__ziltag': true,
                'ziltag-ziltag-map-page__ziltag--activated': ziltag.co_div.activated
              }
            )
          }
          to={ziltag.link}
          onClick={(e) => {
            fetch_ziltag(ziltag.id)
            e.stopPropagation()
          }}
          key={`ziltag-summary-${ziltag.id}`}
        >
          <Avatar
            className='ziltag-ziltag-map-page__ziltag-user-avatar'
            src={ziltag.usr.avatar}
          />
          <div className='ziltag-ziltag-map-page__ziltag-main'>
            <div className='ziltag-ziltag-map-page__ziltag-user-name'>
              {ziltag.usr.name}
            </div>
            <div className='ziltag-ziltag-map-page__ziltag-content'>
              {this.anchorify(ziltag.content)}
            </div>
          </div>
        </Link>
      )
    })

    if (!(summary_components && summary_components.length)) {
      summary_components = [
        <div
          className='ziltag-ziltag-map-page__ziltag'
        >
          <Avatar
            className='ziltag-ziltag-map-page__ziltag-user-avatar'
            src={robot_src}
          />
          <div className='ziltag-ziltag-map-page__ziltag-main'>
            <div className='ziltag-ziltag-map-page__ziltag-user-name'>
              Ziltag Robot
            </div>
            <div className='ziltag-ziltag-map-page__ziltag-content'>
              There is currently no tag on this image.<br/>
              You can be the first to tag on it!<br/>
              Just click anywhere on the image to start.<br/>
            </div>
          </div>
        </div>
      ]
    }

    return (
      <div className='ziltag-ziltag-map-page'>
        <BasePage
          {...this.props}
          {...this.actors}
        >
          <h1 className='ziltag-ziltag-map-page__heading'>People are tagging...</h1>
          {summary_components}
        </BasePage>
      </div>
    )
  }
}

export default connect(state => state)(ZiltagMapPage)

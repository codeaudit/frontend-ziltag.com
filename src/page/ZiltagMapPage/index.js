import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {pushState} from 'redux-router'
import classNames from 'classnames'

import BasePage from '../../component/BasePage'
import Avatar from '../../component/Avatar'
import * as actors from '../../actor'


try {
  if (__WEBPACK__) {
    require('./index.css')
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
        return <a key={key} href={token} target='_blank'>{token}</a>
      } else {
        return <span key={key} >{token}</span>
      }
    })
  }

  render() {
    const {
      ziltag_map
    } = this.props

    const summary_components = ziltag_map.ziltags && ziltag_map.ziltags.map(ziltag => {
      return (
        <div
          className={
            classNames(
              {
                'ziltag-ziltag-map-page__ziltag': true,
                'ziltag-ziltag-map-page__ziltag--activated': ziltag.co_div.activated
              }
            )
          }
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
        </div>
      )
    })

    return (
      <div className='ziltag-ziltag-map-page'>
        <BasePage
          {...this.props}
          {...this.actors}
        >
          <h1 className='ziltag-ziltag-map-page__heading'>Summary</h1>
          {summary_components}
        </BasePage>
      </div>
    )
  }
}

export default connect(state => state)(ZiltagMapPage)

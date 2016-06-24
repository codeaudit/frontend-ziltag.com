import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {pushState} from 'redux-router'
import classNames from 'classnames'

import BasePage from '../../component/BasePage'
import Avatar from '../../component/Avatar'
import Ziltag404Page from '../../component/Ziltag404Page'

import * as actors from '../../actor'


try {
  if (__WEBPACK__) {
    require('./index.css')
    var robot_src = require('./robot.png')
  }
} catch (e) {}

if (process.env.NODE_ENV != 'production') {
  const NODE_ENV = require('../../../env').NODE_ENV
  if (NODE_ENV == 'dev') {
    var DevTools = require('../../devtool').default
    var ENABLE_DEVTOOL = require('../../../env').ENABLE_DEVTOOL
  }
}


class ZiltagMapPage extends Component {
  constructor(props) {
    super(props)
    this.actors = bindActionCreators({...actors, pushState}, this.props.dispatch)
    this.state = {is_mounted: false}
  }

  componentDidMount() {
    const {router} = this.props
    const {
      fetch_current_user,
      fetch_ziltag_map,
      can_create_ziltag_map_page_stream,
      can_update_client_state,
      set_current_ziltag_map_id
    } = this.actors

    can_update_client_state()

    fetch_current_user()
    fetch_ziltag_map(router.params.id)
    .then(action => {
      if (!action.payload.value.error) {
        can_create_ziltag_map_page_stream({id: router.params.id})
        set_current_ziltag_map_id({id: router.params.id})
      }
    })

    this.setState({is_mounted: true})
  }

  componentWillReceiveProps(next_props) {
    if (next_props.params.id != this.props.params.id) {
      const {
        fetch_current_user,
        fetch_ziltag_map,
        can_create_ziltag_map_page_stream,
        set_current_ziltag_map_id
      } = this.actors

      set_current_ziltag_map_id({id: next_props.params.id})
      fetch_current_user()
      fetch_ziltag_map(next_props.params.id)
      .then(action => {
        if (!action.payload.value.error) {
          can_create_ziltag_map_page_stream({id: next_props.params.id})
          set_current_ziltag_map_id({id: next_props.params.id})
        }
      })
    }
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
        return <span key={key}>{token}</span>
      }
    })
  }

  render() {
    const {
      ziltag_maps,
      ziltags,
      co_divs,
      current_ziltag_map_id,
      errors
    } = this.props

    const {
      fetch_ziltag,
      hover_on_ziltag,
      unhover_on_ziltag,
      deactivate_ziltag_reader
    } = this.actors

    const ziltag_map = ziltag_maps[current_ziltag_map_id] || {}
    const current_ziltags = Object.keys(ziltags)
      .map(ziltag_id => ziltags[ziltag_id])
      .filter(({map_id}) => map_id === ziltag_map.id)

    if (errors.ziltag_map) {
      return <Ziltag404Page/>
    }

    try {
      var full_url = window.location.href
      var is_iframe = window != window.parent
    } catch (e) {}

    var summary_components = current_ziltags.map(ziltag => {
      return (
        <Link
          className={
            classNames({
              'ziltag-ziltag-map-page__ziltag': true,
              'ziltag-ziltag-map-page__ziltag--activated': co_divs[ziltag.id].activated
            })
          }
          to={`/ziltags/${ziltag.id}`}
          onClick={(e) => {
            fetch_ziltag(ziltag.id)
            e.stopPropagation()
          }}
          onMouseEnter={() => hover_on_ziltag(ziltag.id)}
          onMouseLeave={() => unhover_on_ziltag(ziltag.id)}
          key={`ziltag-summary-${ziltag.id}`}
        >
          {ziltag.usr && <Avatar
            className='ziltag-ziltag-map-page__ziltag-user-avatar'
            src={ziltag.usr.avatar}
          />}
          {ziltag.usr && <div className='ziltag-ziltag-map-page__ziltag-main'>
            <div className='ziltag-ziltag-map-page__ziltag-user-name'>
              {ziltag.usr.name}
            </div>
            <div className='ziltag-ziltag-map-page__ziltag-content'>
              {this.anchorify(ziltag.content)}
            </div>
          </div>}
        </Link>
      )
    })

    if (!(summary_components && summary_components.length)) {
      summary_components = [
        <div
          className='ziltag-ziltag-map-page__ziltag'
          key='ziltag-summary-default'
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
        {
          current_ziltag_map_id &&
          <BasePage
            {...this.props}
            {...this.actors}
            {...{ziltag_map}}
            ziltags={current_ziltags}
          >
            <h1 className='ziltag-ziltag-map-page__heading'>
              People are tagging...
              <div
                style={{
                  visibility: is_iframe ? 'visible' : 'hidden'
                }}
                className='ziltag-ziltag-map-page__close'
                onClick={deactivate_ziltag_reader}
              >
              </div>
            </h1>
            {summary_components}
          </BasePage>
        }
        {
          process.env.NODE_ENV != 'production'
          ? this.state.is_mounted && ENABLE_DEVTOOL && <DevTools/>
          : ''
        }
      </div>
    )
  }
}

export default connect(state => state)(ZiltagMapPage)

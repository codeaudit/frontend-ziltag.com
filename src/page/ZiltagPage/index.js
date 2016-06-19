import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {pushState} from 'redux-router'
import classNames from 'classnames'

import BasePage from '../../component/BasePage'
import ZiltagContent from '../../component/ZiltagContent'
import ZiltagComment from '../../component/ZiltagComment'
import ZiltagCommentInput from '../../component/ZiltagCommentInput'
import PseudoComment from '../../component/PseudoComment'
import Avatar from '../../component/Avatar'
import SocialMediaMenu from '../../component/SocialMediaMenu'
import Ziltag404Page from '../../component/Ziltag404Page'

import * as actors from '../../actor'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}

if (process.env.NODE_ENV != 'production') {
  const NODE_ENV = require('../../../env').NODE_ENV
  if (NODE_ENV == 'dev') {
    var DevTools = require('../../devtool').default
    var ENABLE_DEVTOOL = require('../../../env').ENABLE_DEVTOOL
  }
}


class ZiltagPage extends Component {
  constructor(props) {
    super(props)
    this.actors = bindActionCreators({...actors, pushState}, this.props.dispatch)
    this.state = {is_mounted: false}
  }

  componentDidMount() {
    const {router} = this.props
    const {
      fetch_current_user,
      fetch_ziltag,
      fetch_ziltag_map,
      can_create_ziltag_page_stream,
      can_update_client_state,
      set_current_ziltag_id
    } = this.actors

    can_update_client_state()
    set_current_ziltag_id(router.params.id)

    fetch_current_user()
    fetch_ziltag(router.params.id)
    .then(action => {
      return fetch_ziltag_map(action.payload.value.map_id)
    })
    .then(action => can_create_ziltag_page_stream({id: router.params.id}))
    .catch(e => e)

    this.setState({is_mounted: true})
  }

  componentWillReceiveProps(next_props) {
    if (next_props.params.id != this.props.params.id) {
      const {
        fetch_current_user,
        fetch_ziltag,
        fetch_ziltag_map,
        can_create_ziltag_page_stream,
        set_current_ziltag_id
      } = this.actors

      can_create_ziltag_page_stream({
        id: next_props.params.id
      })
      set_current_ziltag_id(next_props.params.id)

      fetch_current_user()
      fetch_ziltag(next_props.params.id)
      .then(action => {
        return fetch_ziltag_map(action.payload.value.map_id)
      })
      .then(action => can_create_ziltag_page_stream({id: next_props.params.id}))
      .catch(e => e)
    }
  }

  componentWillUpdate(next_props) {
    const {current_ziltag_id, current_ziltag_map_id} = next_props
    const {pushState} = this.actors
    if (!current_ziltag_id) {
      pushState(null, `/ziltag_maps/${current_ziltag_map_id}`)
    }
  }

  render() {
    const {
      ziltags,
      current_ziltag_id,
      current_user,
      ziltag_maps,
      comments,
      ziltag_editor,
      current_ziltag_map_id,
      ziltag_comment_input,
      pseudo_comment,
      social_media_menu,
      client_state,
      errors
    } = this.props

    const {
      ziltag_comment_input_changed,
      create_ziltag_comment,
      ziltag_editor_changed,
      ziltag_comment_editor_changed,
      activate_social_media_menu,
      deactivate_social_media_menu,
      deactivate_ziltag_reader,
      pushState
    } = this.actors

    const {
      is_mobile
    } = client_state

    const current_ziltag = ziltags[current_ziltag_id] || {}
    const ziltag_map = ziltag_maps[current_ziltag_map_id] || {}

    if (ziltag_map.ziltags) {
      var current_ziltags = []
      for (const ziltag_id of ziltag_map.ziltags.map(ziltag => ziltag.id)) {
        current_ziltags.push(ziltags[ziltag_id])
      }
    } else {
      var current_ziltags = []
    }

    if (errors.ziltag) {
      return <Ziltag404Page/>
    }

    try {
      var full_url = window.location.href
      var is_iframe = window != window.parent
    } catch (e) {}

    const current_comments = Object.keys(comments)
      .map(comment_id => comments[comment_id])
      .filter(({ziltag_id}) => ziltag_id === current_ziltag.id)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    if (current_comments) {
      var comment_components = current_comments.map(
        comment => (
          <ZiltagComment
            {...this.props}
            {...this.actors}
            {...comment}
            usr={current_user.usr}
            author={comment.usr}
            onChange={e => {
              ziltag_comment_editor_changed({
                ...e,
                id: comment.id
              })
            }}
            key={comment.id}
          />
        )
      )
    }

    if (pseudo_comment.mode) {
      var comment_input_area = (
        <PseudoComment
          {...this.props}
          {...this.actors}
          {...ziltag_comment_input}
          {...pseudo_comment}
        />
      )
    } else {
      var comment_input_area = (
        <ZiltagCommentInput
          {...this.props}
          {...this.actors}
          {...current_user}
          onChange={ziltag_comment_input_changed}
          onSubmit={() => {
            create_ziltag_comment(
              current_ziltag_id, ziltag_comment_input.content
            )
          }}
        />
      )
    }

    const created_at = new Date(current_ziltag.created_at)
    const month = [
      'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.',
      'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'
    ][created_at.getMonth()]
    const date = created_at.getDate()
    const year = created_at.getFullYear()
    const created_at_div = (
      <div className='ziltag-ziltag-page__op-date'>
        <span className='ziltag-ziltag-page__op-clock-icon'>🕓</span>{month} {date}, {year}
      </div>
    )

    const op_name_component = (
      <div className='ziltag-ziltag-page__op-name'>
        {current_ziltag.usr && current_ziltag.usr.name}
      </div>
    )

    if (is_mobile) {
      var op_left_component = (
        <div className='ziltag-ziltag-page__op-left'>
          {op_name_component}
          {created_at_div}
        </div>
      )
    } else {
      var op_left_component = (
        <div className='ziltag-ziltag-page__op-left'>
          {created_at_div}
          {op_name_component}
        </div>
      )
    }

    return (
      <div
        onClick={() => {
          deactivate_social_media_menu()
        }}
        className={
          classNames('ziltag-ziltag-page', {
            'ziltag-ziltag-page--mobile': is_mobile
          })
        }
      >
        {
          current_ziltag.content &&
          <BasePage
            {...this.props}
            {...this.actors}
            {...{ziltag_map}}
            ziltags={current_ziltags}
          >
            <div className='ziltag-ziltag-page__op'>
              {current_ziltag.usr && <Avatar
                className='ziltag-ziltag-page__op-avatar'
                src={current_ziltag.usr.avatar}
              />}
              {op_left_component}
              <div className='ziltag-ziltag-page__op-right'>
                <div
                  style={{
                    visibility: is_iframe ? 'visible' : 'hidden'
                  }}
                  className='ziltag-ziltag-page__close'
                  onClick={deactivate_ziltag_reader}
                >
                </div>
                {
                  !is_mobile &&
                  <div
                    onClick={(e) => {
                      activate_social_media_menu()
                      e.stopPropagation()
                    }}
                    className='ziltag-ziltag-page__share'
                  >
                  </div>
                }
                <SocialMediaMenu
                  activated={social_media_menu.activated}
                  url={full_url}
                  className='ziltag-ziltag-page__social-media-menu'
                >
                </SocialMediaMenu>
              </div>
            </div>
            <ZiltagContent
              {...this.props}
              {...this.actors}
              {...current_ziltag}
              usr={current_user.usr}
              author={current_ziltag.usr}
              mode={ziltag_editor.mode}
              onChange={ziltag_editor_changed}
            />
            {
              !is_mobile &&
              <h2>Comments</h2>
            }
            {
              !is_mobile &&
              comment_input_area
            }
            {
              !is_mobile &&
              comment_components
            }
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

export default connect(state => state)(ZiltagPage)

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {pushState} from 'redux-router'

import BasePage from '../../component/BasePage'
import ZiltagContent from '../../component/ZiltagContent'
import ZiltagComment from '../../component/ZiltagComment'
import ZiltagCommentInput from '../../component/ZiltagCommentInput'
import PseudoComment from '../../component/PseudoComment'
import Avatar from '../../component/Avatar'
import SocialMediaMenu from '../../component/SocialMediaMenu'

import * as actors from '../../actor'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class ZiltagPage extends Component {

  constructor(props) {
    super(props)
    this.actors = bindActionCreators({...actors, pushState}, this.props.dispatch)
  }

  componentDidMount() {
    const {router} = this.props
    this.actors.fetch_current_user()
    this.actors.fetch_ziltag(router.params.id)
    .then(action => this.actors.fetch_ziltag_map(action.payload.value.map_id))
    .then(action => this.actors.can_create_ziltag_page_stream({id: router.params.id}))
  }

  componentWillReceiveProps(next_props) {
    if (next_props.params.id != this.props.params.id) {
      this.actors.can_create_ziltag_page_stream({
        id: next_props.params.id
      })
    }
  }

  componentWillUpdate(next_props) {
    const {current_ziltag} = next_props
    const {pushState} = this.actors
    if (current_ziltag.deleted) {
      pushState(null, `/ziltag_maps/${current_ziltag.map_id}`)
    }
  }

  render() {
    const {
      current_ziltag,
      current_user,
      ziltag_comment_input,
      pseudo_comment,
      social_media_menu
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

    try {
      var full_url = window.location.href
    } catch (e) {}

    if (current_ziltag.comments) {
      var comment_components = current_ziltag.comments.map(
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
              current_ziltag.id, ziltag_comment_input.content
            )
          }}
        />
      )
    }

    return (
      <div
        onClick={() => {
          deactivate_social_media_menu()
        }}
        className='ziltag-ziltag-page'
      >
        {current_ziltag.content && <BasePage
          {...this.props}
          {...this.actors}
        >
          <div className='ziltag-ziltag-page__op'>
            {current_ziltag.usr && <Avatar
              className='ziltag-ziltag-page__op-avatar'
              src={current_ziltag.usr.avatar}
            />}
            <div className='ziltag-ziltag-page__op-left'>
              <div className='ziltag-ziltag-page__op-prompt'>
                Tag created by
              </div>
              <div className='ziltag-ziltag-page__op-name'>
                {current_ziltag.usr && current_ziltag.usr.name}
              </div>
            </div>
            <div className='ziltag-ziltag-page__op-right'>
              <div
                className='ziltag-ziltag-page__close'
                onClick={deactivate_ziltag_reader}
              >
              </div>
              <div
                onClick={(e) => {
                  activate_social_media_menu()
                  e.stopPropagation()
                }}
                className='ziltag-ziltag-page__share'
              >
              </div>
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
            onChange={ziltag_editor_changed}
          />
          <h2>Comments</h2>
          {comment_input_area}
          {comment_components}
        </BasePage>}
      </div>
    )
  }
}

export default connect(state => state)(ZiltagPage)

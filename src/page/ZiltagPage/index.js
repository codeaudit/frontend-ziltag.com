import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {pushState} from 'redux-router'

import BasePage from '../../component/BasePage'
import ZiltagContent from '../../component/ZiltagContent'
import ZiltagComment from '../../component/ZiltagComment'
import ZiltagCommentInput from '../../component/ZiltagCommentInput'
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
    this.actors.fetch_current_user()
    this.actors.fetch_ziltag(this.props.router.params.id)
    .then(action => this.actors.fetch_ziltag_map(action.payload.value.map_id))
  }

  render() {
    const {
      current_ziltag,
      current_user,
      ziltag_comment_input
    } = this.props

    const {
      ziltag_comment_input_changed,
      create_ziltag_comment,
      ziltag_editor_changed,
      ziltag_comment_editor_changed
    } = this.actors

    if (current_ziltag.comments) {
      var comment_components = current_ziltag.comments.map(
        comment => (
          <ZiltagComment
            {...this.props}
            {...this.actors}
            {...comment}
            {...current_user}
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

    return (
      <div className='ziltag-ziltag-page'>
        <BasePage
          {...this.props}
          {...this.actors}
        >
          <div className='ziltag-ziltag-page__op'>
            <img
              className='ziltag-ziltag-page__op-avatar'
              src={current_ziltag.usr && current_ziltag.usr.avatar}
            />
            <div className='ziltag-ziltag-page__op-left'>
              <div className='ziltag-ziltag-page__op-prompt'>
                Tag created by
              </div>
              <div className='ziltag-ziltag-page__op-name'>
                {current_ziltag.usr && current_ziltag.usr.name}
              </div>
            </div>
            <div className='ziltag-ziltag-page__op-right'>
              <div className='ziltag-ziltag-page__close'>
              </div>
              <div className='ziltag-ziltag-page__share'>
              </div>
            </div>
          </div>
          <ZiltagContent
            {...this.props}
            {...this.actors}
            {...current_ziltag}
            {...current_user}
            author={current_ziltag.usr}
            onChange={ziltag_editor_changed}
          />
          <h2>Comments</h2>
          <ZiltagCommentInput
            {...current_user}
            onChange={ziltag_comment_input_changed}
            onSubmit={() => {
              create_ziltag_comment(
                current_ziltag.id, ziltag_comment_input.content
              )
            }}
            ziltag_comment_input={ziltag_comment_input}
          />
          {comment_components}
        </BasePage>
      </div>
    )
  }
}

export default connect(state => state)(ZiltagPage)

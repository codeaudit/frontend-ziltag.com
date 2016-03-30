import React, {Component} from 'react'
import ZiltagForm from '../ZiltagForm'
import Avatar from '../Avatar'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class PseudoComment extends Component {
  render() {
    const {
      content,
      mode,
      join_form,
      sign_in_form,
      current_user,
      pseudo_comment_join,
      pseudo_comment_sign_in,
      deactivate_pseudo_comment,
      current_user_join,
      current_user_sign_in,
      fetch_current_user,
      join_form_name_changed,
      join_form_email_changed,
      sign_in_form_user_changed,
      sign_in_form_password_changed
    } = this.props

    function join() {
      const {
        name,
        email
      } = join_form

      current_user_join(name, email)
      .then(({payload}) => {
        if (!payload.value.error) {
          fetch_current_user()
          deactivate_pseudo_comment()
        }
      })
    }

    function sign_in() {
      const {
        user,
        password
      } = sign_in_form

      current_user_sign_in(user, password)
      .then(({payload}) => {
        if (!payload.value.error) {
          fetch_current_user()
          deactivate_pseudo_comment()
        }
      })
    }

    if (mode == 'sign_in') {
      var component = (
        <div className='ziltag-pseudo-comment'>
          <ZiltagForm>
            <input
              onChange={sign_in_form_user_changed}
              onKeyPress={(e) => {
                if (e.key == 'Enter') {
                  sign_in()
                }
              }}
              type='email'
              placeholder='Email'
              autoFocus
            />
            <input
              onChange={sign_in_form_password_changed}
              onKeyPress={(e) => {
                if (e.key == 'Enter') {
                  sign_in()
                }
              }}
              type='password'
              placeholder='Password'
            />
            <nav>
              <div onClick={pseudo_comment_join} className='ziltag-ziltag-form__link'>Join</div>
              <div onClick={pseudo_comment_sign_in} className='ziltag-ziltag-form__link ziltag-ziltag-form__link--activated'>Sign In</div>
              <div onClick={deactivate_pseudo_comment} className='ziltag-ziltag-form__link' type='cancel'>Cancel</div>
            </nav>
            <footer>
              <div>
                <h1
                  onClick={sign_in}
                  className={'ziltag-ziltag-form__submit'}
                >
                  Sign In
                </h1>
              <span className='ziltag-ziltag-form__prompt'>{current_user.prompt}</span>
            </div>
              <p><a href='/users/password/new'>Forgot password?</a></p>
            </footer>
          </ZiltagForm>
        </div>
      )
    } else if (mode == 'join') {
      var component = (
        <div className='ziltag-pseudo-comment'>
          <ZiltagForm>
            <input
              onChange={join_form_name_changed}
              onKeyPress={(e) => {
                if (e.key == 'Enter') {
                  join()
                }
              }}
              type='name'
              placeholder='Username'
              autoFocus
            />
            <input
              onChange={join_form_email_changed}
              onKeyPress={(e) => {
                if (e.key == 'Enter') {
                  join()
                }
              }}
              type='email'
              placeholder='Email'
            />
            <nav>
              <div onClick={pseudo_comment_join} className='ziltag-ziltag-form__link ziltag-ziltag-form__link--activated'>Join</div>
              <div onClick={pseudo_comment_sign_in} className='ziltag-ziltag-form__link'>Sign In</div>
              <div onClick={deactivate_pseudo_comment} className='ziltag-ziltag-form__link' type='cancel'>Cancel</div>
            </nav>
            <footer>
              <div>
                <h1
                  onClick={join}
                  className={'ziltag-ziltag-form__submit'}
                >
                  Join
                </h1>
              <span className='ziltag-ziltag-form__prompt'>{current_user.prompt}</span>
            </div>
              <p>Signing up means you agree with our <a>Terms</a> and <a>Privacy Policy</a>.</p>
            </footer>
          </ZiltagForm>
        </div>
      )
    } else if (mode == 'read') {
      var component = (
        <div className='ziltag-pseudo-comment'>
          <Avatar className='ziltag-pseudo-comment__user-avatar'/>
          <div className='ziltag-pseudo-comment__main'>
            <div className='ziltag-pseudo-comment__text'>
              {content}
            </div>
            <strong>
              Oops! You need to have an account to post the comment.
            </strong>
          </div>
          <nav>
            <div
              className='ziltag-ziltag-form__link'
              onClick={pseudo_comment_join}
            >
              Join
              </div>
            <div
              className='ziltag-ziltag-form__link'
              onClick={pseudo_comment_sign_in}
            >
              Sign In
            </div>
            <div
              className='ziltag-ziltag-form__link'
              type='cancel'
              onClick={deactivate_pseudo_comment}
            >
              Cancel
            </div>
          </nav>
        </div>
      )
    }

    return component
  }
}

export default PseudoComment
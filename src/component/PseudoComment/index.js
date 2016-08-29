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
      forgot_password_form,
      current_user,
      current_ziltag_id,
      current_ziltag_map_id,
      pseudo_comment_join,
      pseudo_comment_sign_in,
      pseudo_comment_forgot_password,
      deactivate_pseudo_comment,
      current_user_join,
      current_user_sign_in,
      forgot_password,
      fetch_current_user,
      join_form_name_changed,
      join_form_email_changed,
      sign_in_form_user_changed,
      sign_in_form_password_changed,
      forgot_password_form_email_changed
    } = this.props

    function join() {
      const {
        name,
        email
      } = join_form

      current_user_join(name, email)
      .then(({payload}) => {
        if (!payload.value.error) {
          fetch_current_user({
            ziltag_map_id: current_ziltag_map_id
          })
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
          fetch_current_user({
            ziltag_map_id: current_ziltag_map_id
          })
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
              name='email'
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
              name='password'
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
              <p><a onClick={pseudo_comment_forgot_password}>Forgot password?</a></p>
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
              name='name'
              placeholder='Name'
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
              name='email'
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
              <p>
                Signing up means you agree with our <a target='_blank' href='http://blog.ziltag.com/post/136853735385/terms-of-service'>Terms</a> and <a target='_blank' href='http://blog.ziltag.com/tagged/policy'>Privacy Policy</a>.
              </p>
            </footer>
          </ZiltagForm>
        </div>
      )
    } else if (mode == 'forgot_password') {
      var component = (
        <div className='ziltag-pseudo-comment'>
          <ZiltagForm>
            <h1 className='ziltag-pseudo-comment__head'>Forgot your password?</h1>
            <p className='ziltag-pseudo-comment__prompt'>Please enter your email to reset.</p>
            <input
              onChange={forgot_password_form_email_changed}
              onKeyPress={(e) => {
                if (e.key == 'Enter') {
                  forgot_password()
                }
              }}
              type='email'
              name='email'
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
                  onClick={forgot_password}
                  className={'ziltag-ziltag-form__submit'}
                >
                  Send
                </h1>
              <span className='ziltag-ziltag-form__prompt'>{current_user.prompt}</span>
            </div>
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
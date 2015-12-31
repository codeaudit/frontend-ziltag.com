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
      sign_up_form,
      login_form,
      current_user,
      pseudo_comment_sign_up,
      pseudo_comment_login,
      deactivate_pseudo_comment,
      current_user_sign_up,
      current_user_login,
      fetch_current_user,
      sign_up_form_name_changed,
      sign_up_form_email_changed,
      login_form_user_changed,
      login_form_password_changed
    } = this.props

    if (mode == 'login') {
      var component = (
        <div className='ziltag-pseudo-comment'>
          <ZiltagForm>
            <input
              onChange={login_form_user_changed}
              type='email'
              placeholder='Email'
              autoFocus
            />
            <input onChange={login_form_password_changed} type='password' placeholder='Password'/>
            <nav>
              <div onClick={pseudo_comment_sign_up} className='ziltag-ziltag-form__link'>Sign Up</div>
              <div onClick={pseudo_comment_login} className='ziltag-ziltag-form__link ziltag-ziltag-form__link--activated'>Login</div>
              <div onClick={deactivate_pseudo_comment} className='ziltag-ziltag-form__link' type='cancel'>Cancel</div>
            </nav>
            <footer>
              <div>
                <h1
                  onClick={() => {
                    const {
                      user,
                      password
                    } = login_form

                    current_user_login(user, password)
                    .then(({payload}) => {
                      if (!payload.value.error) {
                        fetch_current_user()
                        deactivate_pseudo_comment()
                      } else {
                        throw payload.value.error
                      }
                    })
                  }}
                  className={'ziltag-ziltag-form__submit'}
                >
                  Login
                </h1>
              <span className='ziltag-ziltag-form__prompt'>{current_user.prompt}</span>
            </div>
              <p><a>Forget password?</a></p>
            </footer>
          </ZiltagForm>
        </div>
      )
    } else if (mode == 'sign_up') {
      var component = (
        <div className='ziltag-pseudo-comment'>
          <ZiltagForm>
            <input
              onChange={sign_up_form_name_changed}
              type='name'
              placeholder='Username'
              autoFocus
            />
            <input onChange={sign_up_form_email_changed} type='email' placeholder='Email'/>
            <nav>
              <div onClick={pseudo_comment_sign_up} className='ziltag-ziltag-form__link ziltag-ziltag-form__link--activated'>Sign Up</div>
              <div onClick={pseudo_comment_login} className='ziltag-ziltag-form__link'>Login</div>
              <div onClick={deactivate_pseudo_comment} className='ziltag-ziltag-form__link' type='cancel'>Cancel</div>
            </nav>
            <footer>
              <div>
                <h1
                  onClick={() => {
                    const {
                      name,
                      email
                    } = sign_up_form

                    current_user_sign_up(name, email)
                    .then(({payload}) => {
                      if (!payload.value.errors) {
                        fetch_current_user()
                        deactivate_pseudo_comment()
                      }
                    })
                  }}
                  className={'ziltag-ziltag-form__submit'}
                >
                  Sign Up
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
              Oops! You need to have an account to post a comment.
            </strong>
          </div>
          <nav>
            <div
              className='ziltag-ziltag-form__link'
              onClick={pseudo_comment_sign_up}
            >
              Sign Up
              </div>
            <div
              className='ziltag-ziltag-form__link'
              onClick={pseudo_comment_login}
            >
              Login
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
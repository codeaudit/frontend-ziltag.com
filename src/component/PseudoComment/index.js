import React, {Component} from 'react'
import ZiltagForm from '../ZiltagForm'


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

    if (mode == 'sign_up') {
      var component = (
        <ZiltagForm>
          <input onChange={sign_up_form_name_changed} type='name' placeholder='Username'/>
          <input onChange={sign_up_form_email_changed} type='email' placeholder='Email'/>
          <nav>
            <div onClick={pseudo_comment_sign_up} className='ziltag-ziltag-form__link ziltag-ziltag-form__link--activated'>Sign Up</div>
            <div onClick={pseudo_comment_login} className='ziltag-ziltag-form__link'>Login</div>
            <div onClick={deactivate_pseudo_comment} className='ziltag-ziltag-form__link' type='cancel'>Cancel</div>
          </nav>
          <footer>
            <h1 onClick={() => {
              const {
                name,
                email
              } = sign_up_form

              current_user_sign_up(name, email)
              .then(() => {
                fetch_current_user()
                deactivate_pseudo_comment()
              })
            }}
            className={'ziltag-ziltag-form__submit'}
          >
            Sign Up
          </h1>
            <p>Signing up means you agree with our <a>Terms</a> and <a>Privacy Policy</a>.</p>
          </footer>
        </ZiltagForm>
      )
    } else if (mode == 'login') {
      var component = (
        <ZiltagForm>
          <input onChange={login_form_user_changed} type='email' placeholder='Email'/>
          <input onChange={login_form_password_changed} type='password' placeholder='Password'/>
          <nav>
            <div onClick={pseudo_comment_sign_up} className='ziltag-ziltag-form__link'>Sign Up</div>
            <div onClick={pseudo_comment_login} className='ziltag-ziltag-form__link ziltag-ziltag-form__link--activated'>Login</div>
            <div onClick={deactivate_pseudo_comment} className='ziltag-ziltag-form__link' type='cancel'>Cancel</div>
          </nav>
          <footer>
            <h1 onClick={() => {
              const {
                user,
                password
              } = login_form

              current_user_login(user, password)
              .then(() => {
                fetch_current_user()
                deactivate_pseudo_comment()
              })
            }}
            className={'ziltag-ziltag-form__submit'}
          >
            Login
          </h1>
            <p><a>Forget password?</a></p>
          </footer>
        </ZiltagForm>
      )
    } else if (mode == 'read') {
      var component = (
        <div className='ziltag-pseudo-comment'>
          <img className='ziltag-pseudo-comment__user-avatar'/>
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
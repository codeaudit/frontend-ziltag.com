import React, {Component} from 'react'
import classNames from 'classnames'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


export default class AuthForm extends Component {
  state = {}

  change_mode(mode) {
    this.props.handle_change_mode({mode})
    this.props.handle_refresh()
  }

  handle_username_change(e) {
    this.setState({username: e.target.value})
  }

  handle_password_change(e) {
    this.setState({password: e.target.value})
  }

  handle_email_change(e) {
    this.setState({email: e.target.value})
  }

  render() {
    const {mode} = this.props

    const contained_component = do {
      if (mode === 'log_in') {
        [
          <input
            placeholder='Username' key='auth-form-log-in-username'
            onChange={e => this.handle_username_change(e)}
            onKeyPress={e => {
              if (e.key == 'Enter') {
                this.props.handle_log_in(this.state.username, this.state.password)
              }
            }}
            autoFocus
          />,
          <input
            type='password'
            placeholder='Password' key='auth-form-log-in-password'
            onChange={e => this.handle_password_change(e)}
            onKeyPress={e => {
              if (e.key == 'Enter') {
                this.props.handle_log_in(this.state.username, this.state.password)
              }
            }}
          />,
          this.props.error && <p className='ziltag-auth-form__warning' key='auth-form-warning'>
            <strong>{this.props.error}</strong>
          </p>,
          <p key='auth-form-log-in-forgot-password'>
            <a onClick={() => this.change_mode('forgot_password')}>Forgot password?</a>
          </p>,
          <a
            className='ziltag-auth-form__button'
            key='auth-form-button'
            onClick={() => {
              this.props.handle_log_in(this.state.username, this.state.password)
            }}
          >
            Log in
          </a>,
          <a
            className='ziltag-auth-form__switch'
            key='auth-form-switch'
            onClick={() => this.change_mode('create_account')}
          >
            Create account
          </a>
        ]
      } else if (mode === 'create_account') {
        [
          <input
            placeholder='Username' key='auth-form-create-account-username'
            onChange={e => this.handle_username_change(e)}
            onKeyPress={e => {
              if (e.key == 'Enter') {
                this.props.handle_create_account(this.state.username, this.state.email)
              }
            }}
            autoFocus
          />,
          <input
            placeholder='Email' key='auth-form-create-account-email'
            onChange={e => this.handle_email_change(e)}
            onKeyPress={e => {
              if (e.key == 'Enter') {
                this.props.handle_create_account(this.state.username, this.state.email)
              }
            }}
          />,
          this.props.error && <p className='ziltag-auth-form__warning' key='auth-form-warning'>
            <strong>{this.props.error}</strong>
          </p>,
          <p key='auth-form-prompt'>
            By creating account, you agree to our <a target='_blank' href='http://blog.ziltag.com/terms/'>terms</a> and <a target='_blank' href='http://blog.ziltag.com/privacy/'>privacy policy</a>.
          </p>,
          <a
            className='ziltag-auth-form__button'
            key='auth-form-button'
            onClick={() => {
              this.props.handle_create_account(this.state.username, this.state.email)
            }}
          >
            Create account
          </a>,
          <a
            className='ziltag-auth-form__switch'
            key='auth-form-switch'
            onClick={() => this.change_mode('log_in')}
          >
            Log in
          </a>
        ]
      } else if (mode === 'forgot_password') {
        [
          <input
            placeholder='Email' key='auth-form-forgot-password-email'
            onChange={e => this.handle_email_change(e)}
            onKeyPress={e => {
              if (e.key == 'Enter') {
                this.props.handle_forgot_password({email: this.state.email})
                e.preventDefault()
              }
            }}
            autoFocus
          />,
          this.props.error && <p className='ziltag-auth-form__warning' key='auth-form-warning'>
            <strong>{this.props.error}</strong>
          </p>,
          <p key='auth-form-prompt'>
            We'll send you a password reset email.
          </p>,
          <a
            className='ziltag-auth-form__button'
            key='auth-form-button'
            onClick={() => {
              this.props.handle_forgot_password({email: this.state.email})
            }}
          >
            Send
          </a>
        ]
      } else if (mode === 'post_forgot_password') {
        [
          <div className='ziltag-auth-form__tick' key='auth-form-tick'>✔</div>,
          <p className='ziltag-auth-form__post_forgot_password_prompt' key='auth-form-prompt'>Password reset email sent.</p>
        ]
      }
    }

    return (
      <form
        className={classNames('ziltag-auth-form', this.props.className)}
        style={{
          zIndex: 6
        }}
        onClick={this.props.onClick}
      >
        {contained_component}
      </form>
    )
  }
}

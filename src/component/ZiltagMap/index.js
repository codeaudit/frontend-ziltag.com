import React, {Component} from 'react'
import {Link} from 'react-router'
import classNames from 'classnames'

import Ziltag, {meta_class_name as ziltag_class_name} from '../Ziltag'
import CoDiv from '../CoDiv'
import ZiltagPreview from '../ZiltagPreview'
import ZiltagInput from '../ZiltagInput'
import ZiltagMapDialog from '../ZiltagMapDialog'
import ZiltagForm from '../ZiltagForm'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class ZiltagMap extends Component {
  render() {
    const {
      fetch_ziltag,
      fetch_ziltag_map,
      fetch_current_user,
      hover_on_ziltag,
      unhover_on_ziltag,
      activate_ziltag_input,
      deactivate_ziltag_input,
      ziltag_input_changed,
      ziltag_input_join,
      ziltag_input_sign_in,
      current_user_sign_in,
      current_user_join,
      sign_in_form_user_changed,
      sign_in_form_password_changed,
      join_form_name_changed,
      join_form_email_changed,
      forgot_password_form_email_changed,
      create_ziltag,
      forgot_password,
      push,
      resend_verification_mail,
      resend_verification_mail_tip,
      ziltag_input_forgot_password,
      ziltag_map,
      ziltags,
      co_divs,
      ziltag_input,
      sign_in_form,
      join_form,
      current_ziltag_id,
      current_user,
      client_state,
      style
    } = this.props

    const {
      is_mobile
    } = client_state

    function join() {
      const {
        name,
        email
      } = join_form

      current_user_join(name, email)
      .then(({payload}) => {
        if (!payload.value.error) {
          fetch_current_user({
            ziltag_map_id: ziltag_map.id
          })
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
            ziltag_map_id: ziltag_map.id
          })
          deactivate_ziltag_input()
        }
      })
    }

    const ziltag_components = ziltags.map(
      ziltag => {
        ziltag.x_px = ziltag.x * ziltag_map.width
        ziltag.y_px = ziltag.y * ziltag_map.height

        ziltag.activated = (
          ziltag.id === current_ziltag_id && !ziltag_input.activated
        )
        ? true : false

        return [
          <Link
            to={`/ziltags/${ziltag.id}`}
          >
            <Ziltag
              onMouseEnter={() => {
                if (!is_mobile) {
                  deactivate_ziltag_input()
                  hover_on_ziltag(ziltag.id)
                }
              }}
              onMouseLeave={() => {
                if (!is_mobile) {
                  unhover_on_ziltag(ziltag.id)
                }
              }}
              ziltag={ziltag}
              key={ziltag.id}
            />
          </Link>,
          <CoDiv
            ziltag={ziltag}
            co_div={co_divs[ziltag.id]}
            ziltag_map={ziltag_map}
            key={'co-div-' + ziltag.id}
          >
            <ZiltagPreview content={ziltag.content} author={ziltag.usr.name}/>
          </CoDiv>
        ]
      }
    )

    const co_div_child_component = do {
      if (current_user.usr) {
        if (current_user.usr.confirmed) {
          <ZiltagInput
            onChange={ziltag_input_changed}
            onSubmit={() => {
              const {
                map_id,
                x,
                y,
                content
              } = ziltag_input

              create_ziltag(map_id, x, y, content)
              .then((action) => {
                fetch_ziltag(action.payload.value.id)
                push(`/ziltags/${action.payload.value.id}`)
                fetch_ziltag_map(ziltag_map.id)
                deactivate_ziltag_input()
              })
            }}
            ziltag_input={ziltag_input}
          />
        } else if (resend_verification_mail_tip.initiator && resend_verification_mail_tip.initiator.ziltag_map_id === ziltag_map.id) {
          <ZiltagMapDialog>
            <p className='ziltag-ziltag-comment__warn'>
              Confirmation email sent. Please check you inbox.
            </p>
          </ZiltagMapDialog>
        } else {
          <ZiltagMapDialog>
            <p>
              <strong>Please verify your account to post a tag.</strong>
              <br/>
              Haven’t received confirmation email?
            </p>
            <nav>
              <div
                className='ziltag-ziltag-form__link'
                onClick={() => {resend_verification_mail({
                  initiator: {
                    ziltag_map_id: ziltag_map.id
                  }
                })}}
              >
                Resend Email
              </div>
            </nav>
          </ZiltagMapDialog>
        }
      } else {
        if (ziltag_input.mode === 'join') {
          <ZiltagForm>
            <input
              onChange={join_form_name_changed}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
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
                if (e.key === 'Enter') {
                  join()
                }
              }}
              type='email'
              name='email'
              placeholder='Email'
            />
            <nav>
              <div onClick={ziltag_input_join} className='ziltag-ziltag-form__link ziltag-ziltag-form__link--activated'>Create account</div>
              <div onClick={ziltag_input_sign_in} className='ziltag-ziltag-form__link'>Log in</div>
              <div onClick={deactivate_ziltag_input} className='ziltag-ziltag-form__link' type='cancel'>Cancel</div>
            </nav>
            <footer>
              <div>
                <h1
                  onClick={join}
                  className={'ziltag-ziltag-form__submit'}
                >
                  Create account
                </h1>
                <span className='ziltag-ziltag-form__prompt'>{current_user.prompt}</span>
              </div>
              <p>
                Create account means you agree with our <a target='_blank' href='http://blog.ziltag.com/terms/'>Terms</a> and <a target='_blank' href='http://blog.ziltag.com/privacy/'>Privacy Policy</a>.
              </p>
            </footer>
          </ZiltagForm>
        } else if (ziltag_input.mode === 'post_join') {
          <ZiltagMapDialog>
            <p>
              <strong>
                Thank you for creating account. A verification email has sent.
              </strong>
              <br/>
              Please check your inbox to verify your account. Thank you.
            </p>
          </ZiltagMapDialog>
        } else if (ziltag_input.mode === 'sign_in') {
          <ZiltagForm>
            <input
              onChange={sign_in_form_user_changed}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
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
                if (e.key === 'Enter') {
                  sign_in()
                }
              }}
              type='password'
              name='password'
              placeholder='Password'
            />
            <nav>
              <div onClick={ziltag_input_join} className='ziltag-ziltag-form__link'>Create account</div>
              <div onClick={ziltag_input_sign_in} className='ziltag-ziltag-form__link ziltag-ziltag-form__link--activated'>Log in</div>
              <div onClick={deactivate_ziltag_input} className='ziltag-ziltag-form__link' type='cancel'>Cancel</div>
            </nav>
            <footer>
              <div>
                <h1
                  onClick={sign_in}
                  className={'ziltag-ziltag-form__submit'}
                >
                  Log in
                </h1>
                <span className='ziltag-ziltag-form__prompt'>{current_user.prompt}</span>
              </div>
              <p><a onClick={ziltag_input_forgot_password}>Forgot password?</a></p>
            </footer>
          </ZiltagForm>
        } else if (ziltag_input.mode === 'forgot_password') {
          <ZiltagForm>
            <h1 className='ziltag-forgot-password-form__head'>Forgot your password?</h1>
            <p>Please enter your email to reset.</p>
            <input
              onChange={forgot_password_form_email_changed}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  forgot_password()
                }
              }}
              type='email'
              name='email'
              placeholder='Email'
            />
            <nav>
              <div onClick={ziltag_input_join} className='ziltag-ziltag-form__link ziltag-ziltag-form__link--activated'>Create account</div>
              <div onClick={ziltag_input_sign_in} className='ziltag-ziltag-form__link'>Log in</div>
              <div onClick={deactivate_ziltag_input} className='ziltag-ziltag-form__link' type='cancel'>Cancel</div>
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
        } else {
          <ZiltagMapDialog>
            <p>
              <strong>Oops! You need to have an account to post a tag.</strong>
            </p>
            <nav>
              <div onClick={ziltag_input_join} className='ziltag-ziltag-form__link'>Create account</div>
              <div onClick={ziltag_input_sign_in} className='ziltag-ziltag-form__link'>Log in</div>
            </nav>
          </ZiltagMapDialog>
        }
      }
    }

    const ziltag_input_components = ziltag_input.activated && [
      <Ziltag
        onClick={(e) => {
          e.stopPropagation()
        }}
        ziltag={ziltag_input}
        key='pseudo_ziltag'
      />,
      <CoDiv
        onClick={(e) => {
          e.stopPropagation()
        }}
        ziltag={ziltag_input}
        co_div={ziltag_input.co_div}
        ziltag_map={ziltag_map}
        key='ziltag_input'
      >
        {co_div_child_component}
      </CoDiv>
    ]

    return (
      <div
        style={style}
        className={
          classNames(
            'ziltag-ziltag-map',
            {
              'ziltag-ziltag-map--mobile': is_mobile
            }
          )
        }
      >
        <img
          className='ziltag-ziltag-map__img'
          src={ziltag_map.src}
        />
        {
          !ziltag_input.activated && current_user.permissions && current_user.permissions.includes('create_ziltag') &&
          <div className='ziltag-ziltag-map__prompt'>
            click anywhere to tag
          </div>
        }
        <div
          className='ziltag-ziltag-map__container'
          onClick={(e) => {
            function is_overlapping(point1, point2) {
              const distance = Math.sqrt(
                Math.pow(point1.x - point2.x, 2) +
                Math.pow(point1.y - point2.y, 2)
              )

              const radius = 10
              return distance < 2 * radius
            }

            if (e.target.classList.contains(ziltag_class_name)) {
              return
            }

            const radius = 10
            const x_px = e.nativeEvent.offsetX
            const y_px = e.nativeEvent.offsetY
            const x = x_px / ziltag_map.width
            const y = y_px / ziltag_map.height

            if (
              !is_mobile &&
              x_px > radius &&
              x_px <= ziltag_map.width - radius &&
              y_px > radius &&
              y_px <= ziltag_map.height - radius &&
              !ziltag_map.ziltags.filter(ziltag => is_overlapping(
                {x: ziltag.x * ziltag_map.width, y: ziltag.y * ziltag_map.height},
                {x: x_px, y: y_px}
              )).length
            ) {
              if (current_user.permissions && current_user.permissions.includes('create_ziltag')) {
                activate_ziltag_input({x_px, y_px, x, y, map_id: ziltag_map.id})
              }
              e.stopPropagation()
            }
          }}
        >
          {ziltag_input_components}
          {ziltag_components}
        </div>
      </div>
    )
  }
}

export default ZiltagMap

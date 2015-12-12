import React, {Component} from 'react'
import {Link} from 'react-router'

import Ziltag from '../Ziltag'
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
      ziltag_input_sign_up,
      ziltag_input_login,
      current_user_login,
      current_user_sign_up,
      login_form_user_changed,
      login_form_password_changed,
      sign_up_form_name_changed,
      sign_up_form_email_changed,
      create_ziltag,
      pushState,
      ziltag_map,
      ziltag_input,
      login_form,
      sign_up_form,
      current_ziltag,
      current_user
    } = this.props

    const ziltag_components = ziltag_map.ziltags && ziltag_map.ziltags.map(
      ziltag => {
        ziltag.x_px = ziltag.x * ziltag_map.width
        ziltag.y_px = ziltag.y * ziltag_map.height

        ziltag.activated = ziltag.id == current_ziltag.id
        ? true : false

        return [
          <Link
            to={ziltag.link}
            onClick={(e) => {
              fetch_ziltag(ziltag.id)
              e.stopPropagation()
            }}
          >
            <Ziltag
              onMouseEnter={() => hover_on_ziltag(ziltag.id)}
              onMouseLeave={() => unhover_on_ziltag(ziltag.id)}
              ziltag={ziltag}
              key={ziltag.id}
            />
          </Link>,
          <CoDiv
            ziltag={ziltag}
            ziltag_map={ziltag_map}
            key={'p' + ziltag.id}
          >
            <ZiltagPreview ziltag={ziltag}/>
          </CoDiv>
        ]
      }
    )

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
        ziltag_map={ziltag_map}
        key='ziltag_input'
      >
        {
          current_user.usr
          ? current_user.usr.confirmed
            ? <ZiltagInput
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
                    pushState(null, `/ziltags/${action.payload.value.id}`)
                    fetch_ziltag_map(ziltag_map.id)
                    deactivate_ziltag_input()
                  })
                }}
                ziltag_input={ziltag_input}
              />
            : <ZiltagMapDialog>
                <p>
                  <strong>Please verify your account to post a tag.</strong>
                  <br/>
                  Haven’t receive confirmation email?
                </p>
                <nav>
                  <div className='ziltag-ziltag-form__link'>Resend Email</div>
                </nav>
              </ZiltagMapDialog>
          : ziltag_input.mode == 'login'
          ? <ZiltagForm>
              <input onChange={login_form_user_changed} type='email' placeholder='Email'/>
              <input onChange={login_form_password_changed} type='password' placeholder='Password'/>
              <nav>
                <div onClick={ziltag_input_sign_up} className='ziltag-ziltag-form__link'>Sign Up</div>
                <div onClick={ziltag_input_login} className='ziltag-ziltag-form__link ziltag-ziltag-form__link--activated'>Login</div>
                <div onClick={deactivate_ziltag_input} className='ziltag-ziltag-form__link' type='cancel'>Cancel</div>
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
                    deactivate_ziltag_input()
                  })
                }}
                className={'ziltag-ziltag-form__submit'}
              >
                Login
              </h1>
                <p><a>Forget password?</a></p>
              </footer>
            </ZiltagForm>
          : ziltag_input.mode == 'sign_up'
          ? <ZiltagForm>
              <input onChange={sign_up_form_name_changed} type='name' placeholder='Username'/>
              <input onChange={sign_up_form_email_changed} type='email' placeholder='Email'/>
              <nav>
                <div onClick={ziltag_input_sign_up} className='ziltag-ziltag-form__link ziltag-ziltag-form__link--activated'>Sign Up</div>
                <div onClick={ziltag_input_login} className='ziltag-ziltag-form__link'>Login</div>
                <div onClick={deactivate_ziltag_input} className='ziltag-ziltag-form__link' type='cancel'>Cancel</div>
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
                    deactivate_ziltag_input()
                  })
                }}
                className={'ziltag-ziltag-form__submit'}
              >
                Sign Up
              </h1>
                <p>Signing up means you agree with our <a>Terms</a> and <a>Privacy Policy</a>.</p>
              </footer>
            </ZiltagForm>
          : <ZiltagMapDialog>
              <p>
                <strong>Oops! You need to have an account to post a tag.</strong>
              </p>
              <nav>
                <div onClick={ziltag_input_sign_up} className='ziltag-ziltag-form__link'>Sign Up</div>
                <div onClick={ziltag_input_login} className='ziltag-ziltag-form__link'>Login</div>
              </nav>
            </ZiltagMapDialog>
        }
      </CoDiv>
    ]

    return (
      <div
        style={{
          width: ziltag_map.width,
          height: ziltag_map.height
        }}
        className='ziltag-ziltag-map'
      >
        <img
          className='ziltag-ziltag-map__img'
          src={ziltag_map.src}
        />
        {
          !ziltag_input.activated &&
          <div className='ziltag-ziltag-map__prompt'>
            click anywhere to tag
          </div>
        }
        <div
          style={{
            width: ziltag_map.width,
            height: ziltag_map.height,
          }}
          className='ziltag-ziltag-map__container'
          onClick={(e) => {
            const radius = 12
            const x_px = e.nativeEvent.offsetX
            const y_px = e.nativeEvent.offsetY
            const x = x_px / ziltag_map.width
            const y = y_px / ziltag_map.height
            if (
              x_px > radius &&
              x_px <= ziltag_map.width - radius &&
              y_px > radius &&
              y_px <= ziltag_map.height - radius
            ) {
              activate_ziltag_input({x_px, y_px, x, y, map_id: ziltag_map.id})
              e.stopPropagation()
            }
          }}
        >
          {
            ziltag_input.activated
            ? ziltag_input_components
            : ziltag_components
          }
        </div>
      </div>
    )
  }
}

export default ZiltagMap

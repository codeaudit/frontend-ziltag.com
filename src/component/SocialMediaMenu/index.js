import React, {Component} from 'react'
import classNames from 'classnames'
import {FacebookButton, TwitterButton} from 'react-social'

import DropDownMenu, {Item} from '../DropDownMenu'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class SocialMediaMenu extends Component {
  render() {
    const {
      activated,
      url,
      fbAppId
    } = this.props

    const style = {
      display: activated ? 'block' : 'none'
    }

    return (
      <DropDownMenu
        style={style}
        className='ziltag-ziltag-page__social-media-menu'
      >
        <Item>
          <FacebookButton
            appId={fbAppId}
            url={url}
            className={classNames(
              'ziltag-social-media-menu__button',
              'ziltag-social-media-menu__button--facebook'
            )}
          >
            Facebook
          </FacebookButton>
        </Item>
        <Item>
          <TwitterButton
            url={url}
            className={classNames(
              'ziltag-social-media-menu__button',
              'ziltag-social-media-menu__button--twitter'
            )}
          >
            Twitter
          </TwitterButton>
        </Item>
      </DropDownMenu>
    )
  }
}

export default SocialMediaMenu

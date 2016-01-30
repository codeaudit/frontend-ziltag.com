import React, {Component} from 'react'
import classNames from 'classnames'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class MediaCarousel extends Component {
  render() {
    const {
      content,
      disable
    } = this.props

    const {
      youtube_ids
    } = content

    if (youtube_ids) {
      var youtube_components = youtube_ids.map((id, i) => {
        if (i == 0) {
          var active = true
        }

        if (i == 1) {
          var next = true
        }

        return <iframe
          className={
            classNames({
              'ziltag-media-carousel__youtube': true,
              'ziltag-media-carousel__youtube--active': active,
              'ziltag-media-carousel__youtube--next': next,
              'ziltag-media-carousel__youtube--unstaged': !(active || next)
            })
          }
          src={`https://www.youtube.com/embed/${id}`}
          allowFullScreen
          key={`youtube-${id}`}
        >
        </iframe>
      })
    }

    if (disable) {
      var mask = <div className='ziltag-media-carousel__mask'></div>
    }

    return (
      <div className='ziltag-media-carousel'>
        {mask}
        {youtube_components}
      </div>
    )
  }
}

export default MediaCarousel

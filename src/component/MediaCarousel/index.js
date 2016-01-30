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

    let active_index = 0
    let next_index = 0
    let end_index = youtube_ids ? youtube_ids.length - 1 : 0

    if (youtube_ids) {
      var youtube_components = youtube_ids.map((id, i) => {
        if (i == 0) {
          var active = true
          active_index = i
        }

        if (i == 1) {
          var next = true
          next_index = i
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

    var have_prev_indicator = active_index == 0 ? false : true
    var have_next_indicator = active_index == end_index ? false: true

    if (have_prev_indicator) {
      var prev_indicator = (
        <div className={classNames([
          'ziltag-media-carousel__indicator',
          'ziltag-media-carousel__indicator--prev'
        ])}>
        </div>
      )
    }

    if (have_next_indicator) {
      var next_indicator = (
        <div className={classNames([
          'ziltag-media-carousel__indicator',
          'ziltag-media-carousel__indicator--next'
        ])}>
        </div>
      )
    }

    return (
      <div className='ziltag-media-carousel'>
        {mask}
        {prev_indicator}
        {next_indicator}
        {youtube_components}
      </div>
    )
  }
}

export default MediaCarousel

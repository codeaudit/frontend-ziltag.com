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
      disable,
      onNext,
      onPrev
    } = this.props

    const {
      youtube_ids,
      active_index,
      end_index,
      direction
    } = content

    if (youtube_ids) {
      var youtube_components = youtube_ids.map((id, i) => {
        if (i == active_index) {
          var active = true
        }

        if (i == active_index + 1) {
          var next = true
        }

        if (direction == 'next') {
          if (i == active_index - 1) {
            var active_to_unstaged = true
          } else if (i == active_index) {
            var next_to_active = true
          } else if (i == active_index + 1) {
            var unstaged_to_next = true
          }
        } else if (direction == 'prev') {
          if (i == active_index + 1) {
            var active_to_next = true
          } else if (i == active_index) {
            var unstaged_to_active = true
          } else if (i == active_index + 2) {
            var next_to_unstaged = true
          }
        }

        return <iframe
          className={
            classNames({
              'ziltag-media-carousel__youtube': true,
              'ziltag-media-carousel__youtube--active': active,
              'ziltag-media-carousel__youtube--next': next,
              'ziltag-media-carousel__youtube--unstaged': !(active || next),
              'ziltag-media-carousel__youtube--active-to-unstaged': active_to_unstaged,
              'ziltag-media-carousel__youtube--next-to-active': next_to_active,
              'ziltag-media-carousel__youtube--unstaged-to-next': unstaged_to_next,
              'ziltag-media-carousel__youtube--unstaged-to-active': unstaged_to_active,
              'ziltag-media-carousel__youtube--active-to-next': active_to_next,
              'ziltag-media-carousel__youtube--next-to-unstaged': next_to_unstaged
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
        <div
          className={classNames([
            'ziltag-media-carousel__indicator',
            'ziltag-media-carousel__indicator--prev'
          ])}
          onClick={onPrev}
        >
        </div>
      )
    }

    if (have_next_indicator) {
      var next_indicator = (
        <div
          className={classNames([
            'ziltag-media-carousel__indicator',
            'ziltag-media-carousel__indicator--next'
          ])}
          onClick={onNext}
        >
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

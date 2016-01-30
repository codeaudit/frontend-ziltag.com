import React, {Component} from 'react'


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
      var youtube_components = youtube_ids.map(id => (
        <iframe
          className='ziltag-media-carousel__youtube'
          src={`https://www.youtube.com/embed/${id}`}
          allowFullScreen
          key={`youtube-${id}`}
        >
        </iframe>
      ))
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

import React, {Component} from 'react'


try {
  if (__WEBPACK__) {
    require('./index.css')
  }
} catch (e) {}


class MediaCarousel extends Component {
  render() {
    const {
      content
    } = this.props

    const {
      youtube_ids
    } = content

    if (youtube_ids) {
      var youtube_components = youtube_ids.map(id => (
        <iframe
          className='ziltag-media-carousel__youtube'
          src={`https://www.youtube.com/embed/${id}`}
          allowfullscreen
        >
        </iframe>
      ))
    }

    return (
      <div className='ziltag-media-carousel'>
        {youtube_components}
      </div>
    )
  }
}

export default MediaCarousel

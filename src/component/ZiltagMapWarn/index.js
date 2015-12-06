import React, {Component} from 'react'
import ZiltagMapAuthDialog from '../ZiltagMapAuthDialog'
import ZiltagMapVerification from '../ZiltagMapVerification'


class ZiltagMapWarn extends Component {
  render() {
    const {
      type
    } = this.props

    switch(type){
      case 'authentication':
        return <ZiltagMapAuthDialog />
        break
      case 'verification':
        return <ZiltagMapVerification />
        break
      default:
        return console.error(`Unknown Type: ${type}`)
    }
  }
}

export default ZiltagMapWarn

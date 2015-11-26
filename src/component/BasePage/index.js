import React, {Component} from 'react'

import Logo from '../Logo'


class BasePage extends Component {
	render() {
		const {
			children
		} = this.props

		return <div><Logo/>base {children}</div>
	}
}

export default BasePage

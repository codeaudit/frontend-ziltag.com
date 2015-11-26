import React, {Component} from 'react'


class BasePage extends Component {
	render() {
		const {
			children
		} = this.props

		return <div>base {children}</div>
	}
}

export default BasePage

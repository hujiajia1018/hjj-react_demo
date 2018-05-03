import React, { Component } from 'react'
import BotNav from './bottomnav'

class Main extends Component{
	render(){
		return(
			<div>
				{this.props.children}
				<BotNav />
			</div>
		)
	}
}

export default Main
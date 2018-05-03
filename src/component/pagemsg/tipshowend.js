import React, { Component } from 'react'
import loadingimg from 'images/loading2.gif'

class TipShowEnd extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="tipshowend">
				<div className="tip_type">
					<p><img src={loadingimg} />{this.props.text}</p>
				</div>
			</div>
		)
	}
}

export default TipShowEnd
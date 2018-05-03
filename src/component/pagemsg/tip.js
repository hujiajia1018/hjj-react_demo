import React, { Component } from 'react'
import loadingimg from 'images/loading.gif'

class Tip extends Component{
	constructor(props){
		super(props);
	}
	render(){
		let icon = '';
		if(this.props.type=='loading'){
			icon = <img src={loadingimg} />
		}else if(this.props.type=='nodata'){
			icon = <i className="icon2 nodata"></i>
		}else if(this.props.type=='tiperro'){
			icon = <i className="icon2 tiperro"></i>
		}
		return (
			<div className="tip">
				<div className="tip_type">
					{icon}
					<p>{this.props.text}</p>
				</div>
			</div>
		)
	}
}

export default Tip
import React, { Component } from 'react'
import 'css/tipselect'

class TipOnlyMsg extends Component{
	constructor(props){
		super(props);
	}
	close=(event)=>{ 
		if(event.target.tagName.toLowerCase()=='p'){
			this.props.close(1);
		}else{
			this.props.close(0);
		}
	}
	render(){
		return (
			<div className="tipselect" onClick={this.close}>
				<div className="tip_only_msg">
					<p>{this.props.text}</p>
				</div>
			</div>
		)
	}
}

export default TipOnlyMsg
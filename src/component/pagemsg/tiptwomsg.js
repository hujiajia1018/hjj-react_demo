import React, { Component } from 'react'
import 'css/tipselect'

class TipTwoMsg extends Component{
	constructor(props){
		super(props);
	}
	close=(event)=>{
		const datatype = event.target.getAttribute("data-type");
		if(event.target.classList.contains('tipselect')){
			this.props.tipclose('close');
		}else{
			this.props.tipclose(datatype);
		}
	}
	render(){
		return (
			<div className="tipselect" onTouchEnd={this.close}>
				<div className="tip_two_msg">
					{
						Object.keys(this.props.text).map((key ,index)=>{
							return <p key={index} data-type={key}>{this.props.text[key]}</p>
						})
					}
				</div>
			</div>
		)
	}
}

export default TipTwoMsg
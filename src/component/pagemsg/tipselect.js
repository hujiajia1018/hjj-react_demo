import React, { Component } from 'react'
import api from 'api/api'
import 'css/tipselect'

class TipSelect extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount=()=>{
		api.lock();
	}
	componentWillUnmount=()=>{
		api.unlock();
	}
	fn1=()=>{
		this.props.handleclose();
	}
	fn2=()=>{
		this.props.handleclose(1);
	}
	render(){
		return (
			<div className="tipselect">
				<div className="tipbd">
					<p dangerouslySetInnerHTML={{__html: this.props.text[0] }}/>
					<p>
						{
							this.props.text[1]!='' ? <span onClick={this.fn1}>{this.props.text[1]}</span> : ''
						}
						{
							this.props.text[2]!='' ? <span onClick={this.fn2}>{this.props.text[2]}</span> : ''
						}
					</p>
				</div>
			</div>
		)
	}
}

export default TipSelect
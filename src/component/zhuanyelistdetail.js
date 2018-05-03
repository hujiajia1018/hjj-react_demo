import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { zhuanye } from 'api/config'
import api from 'api/api'
import 'css/zhuanye'

class ZhuanYeList extends Component{
	constructor(props){
		super(props);
	}
	close=(event)=>{
		const el = event.target;
		el.classList.add('active');
		this.props.close(el.getAttribute('data-id'));
	}
	render(){
		return(
			<ul className="zhuanyeul2">
				{
					Object.keys(this.props.data).map((key)=>{
						return <li className={this.props.selected==key ? "active" : ''} onClick={this.close} key={key} data-id={this.props.data[key].id}>{this.props.data[key].name}</li>
					})
				}
			</ul>
		)
	}
}
export default ZhuanYeList
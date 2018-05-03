import React, { Component } from 'react'
import { connect } from 'react-redux'
import api from 'api/api'
import { city } from 'api/config'
import 'css/selectcity'

class SelectCity extends Component{
	constructor(props){
		super(props);
		this.state = {
			city : []
		}
	}
	selectcity =(event)=>{
		const id = api.closest(event.target ,'li') ? api.closest(event.target ,'li').getAttribute('data-cityid') : ''
		this.props.selectcityid({ 
			id : id,
			text : event.target.textContent
		});
	}
	render(){
		return(
			<div className="selectcity">
				<div className="hd">
					<span></span>
					<span>选择城市</span>
					<span onClick={this.selectcity}>取消</span>
				</div>
				<p>该职位在以下城市招聘</p>
				<ul>
					{
						this.props.citydata.map((key ,index)=>{
							return key==this.props.cityid ? 
								<li className="oncity" onClick={this.selectcity} key={index} data-cityid={key}><p>{city[key]}</p></li>
								: <li key={index} onClick={this.selectcity} data-cityid={key}><p>{city[key]}</p></li>
						})
					}
				</ul>
			</div>
		)
	}
}
const mapStateToProps = (state ,ownProps) =>{
	return {
		userstate : state.UserState
	}
}
SelectCity = connect(mapStateToProps)(SelectCity)
export default SelectCity
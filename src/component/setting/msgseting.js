import React, { Component } from 'react'
import { Link,hashHistory } from 'react-router'
import api from 'api/api'
import 'css/appsetting'

class MsgSetting extends Component{
	constructor(props){
		super(props);
		this.animate = false;
		this.state = {
			isopen : 0
		}
	}
	componentDidMount=()=>{
		const actiontype = "getremotepush";
		api.webview(actiontype ,(res)=>{
			this.setState({ "isopen" : res.result.push_switch });
		});
	}
	close=()=>{
		this.props.handleclose();
	}
	set=(event)=>{
		const elClass = api.closest(event.target ,'em').classList;
		let opration = 0;
		if(this.animate){
			return false;
		}
		this.animate = true;
		if(elClass.contains('on')){
			elClass.remove('on');
			opration = 1;
		}else{
			elClass.add('on');
			opration = 0;
		}
		setTimeout(()=>{ this.animate = false; },210);
		const actiontype = "setremotepush?param={\"push_switch\":\""+opration+"\"}";
		api.webview(actiontype);
	}
	render(){
		return(
			<div className="appsetting" id="msgsetting">
				<div className="hd">
					<span onClick={this.close}><i className="icon3"></i></span>
					<span>通知设置</span>
					<span></span>
				</div>
				<ul className="setlist">
					<li><span>接收新消息通知</span><em onClick={this.set} className={!this.state.isopen ? 'on' : ''}><b></b></em></li>
				</ul>
			</div>
		)
	}
}

export default MsgSetting
import React, { Component } from 'react'
import { Link,hashHistory } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import api from 'api/api'
import MsgSeting from './msgseting'
import SafeSetting from './safesetting'
import AboutApp from './aboutapp'
import 'css/appsetting'

class AppSetting extends Component{
	constructor(props){
		super(props);
		this.state = {
			isopenmsgset : false,
			isopenabout : false,
			issafe : false
		}
	}
	componentDidMount=()=>{
		window.scrollTo(0,0);
	}
	logout=()=>{
		api.webview("logout");
		api.setLocalStorage("token" ,'');
		hashHistory.push('/login');
	}
	close=()=>{
		this.setState({ "isopenmsgset" : !this.state.isopenmsgset });
	}
	close2=()=>{
		this.setState({ "isopenabout" : !this.state.isopenabout });
	}
	close3=()=>{
		this.setState({ "issafe" : !this.state.issafe });
	}
	render(){
		/*<li onClick={this.close}><span>通知设置</span><i className="icon"></i></li>*/
		/*<li onClick={this.close2}><span>关于</span><i className="icon"></i></li>*/
		return(
			<div className="appsetting">
				<div className="hd">
					<span><Link to="/me"><i className="icon3"></i></Link></span>
					<span>设置</span>
					<span></span>
				</div>
				<ul className="setlist">
					<li onClick={this.close3}><span>账号安全</span><i className="icon"></i></li>
					
					<li onClick={this.logout}><span>退出登录</span></li>
				</ul>
				<ReactCSSTransitionGroup transitionName="msgsetAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.issafe ? <SafeSetting handleclose={this.close3}/> : ''}
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="msgsetAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.isopenmsgset ? <MsgSeting handleclose={this.close}/> : ''}
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="msgsetAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.isopenabout ? <AboutApp handleclose={this.close2}/> : ''}
				</ReactCSSTransitionGroup>
			</div>
		)
	}
}

export default AppSetting
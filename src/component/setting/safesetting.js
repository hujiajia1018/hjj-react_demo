import React, { Component } from 'react'
import { Link ,hashHistory } from 'react-router'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import api from 'api/api'
import AccountMobile from './accountmobile'
import SecurityEmail from './securityemail'
import 'css/appsetting'

class SafeSetting extends Component{
	constructor(props){
		super(props);
		this.state = {
			isMobile : false,
			isEmail : false,
			account_mobile : '',
			security_email : '未绑定'
		}
	}
	componentDidMount=()=>{
		api.FetchGet('/hyb-stu/stu_resume/base/read').then((res)=>{
			if(res.data.resume){
				this.setState({
					"account_mobile" : res.data.resume.account_mobile,
					"security_email" : res.data.resume.security_email ? res.data.resume.security_email : '未绑定'
				});
			}	
		});
	}
	close=()=>{
		this.props.handleclose();
	}
	openmobile=()=>{
		this.setState({ "isMobile" : !this.state.isMobile });
	}
	openemail=(email)=>{
		typeof email == 'string' ? this.setState({ "isEmail" : !this.state.isEmail ,"security_email" : email }) : this.setState({ "isEmail" : !this.state.isEmail  });
	}
	render(){
		return(
			<div className="appsetting" id="msgsetting">
				<div className="hd">
					<span onClick={this.close}><i className="icon3"></i></span>
					<span>设置</span>
					<span></span>
				</div>
				<ul className="setlist">
					<li onClick={this.openmobile}><span>手机号</span><span className="safeem">{this.state.account_mobile}</span></li>
					<li onClick={this.openemail}><span>绑定邮箱</span><span className="safeem">{this.state.security_email}</span></li>
				</ul>
				<ReactCSSTransitionGroup transitionName="memessageAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{ this.state.isMobile ? <AccountMobile text={this.state.account_mobile} close={this.openmobile} /> : '' }
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="memessageAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{ this.state.isEmail ? <SecurityEmail text={this.state.security_email} close={this.openemail} /> : '' }
				</ReactCSSTransitionGroup>
			</div>
		)
	}
}
const mapStateToProps = (state ,ownProps) =>{
	return {
		userstate : state.UserState
	}
}
export default SafeSetting
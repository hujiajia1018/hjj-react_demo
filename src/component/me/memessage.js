import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import 'css/memessage'
import api from 'api/api'
import { uploadImg } from 'api/config'
import bbs_icon from 'images/icon6.png'
import ChangeNickName from './nickname'
import AccountMobile from './accountmobile'
import SecurityEmail from './securityemail'

class MeMessage extends Component{
	constructor(props){
		super(props);
		this.state = {
			isNickName : false,
			isMobile : false,
			isEmail : false,
			bbs_icon : '',
			account_mobile : '',
			security_email : '',
			nick_name : ''
		}
	}
	componentDidMount=()=>{
		api.FetchGet('/hyb-stu/stu_resume/base/read').then((res)=>{
			if(res.data.resume){
				this.setState({
					"bbs_icon" : res.data.resume.bbs_icon,
					"account_mobile" : res.data.resume.account_mobile,
					"security_email" : res.data.resume.security_email,
					"nick_name" : res.data.resume.nick_name 
				});
			}	
		});
	}
	changeimg=()=>{
		const actiontype = "savetoalbum?param={\"token\":\""+this.props.userstate.token+"\" ,\"upload_type\":\""+0+"\"}";
		api.webview(actiontype ,this.getimg);
	}
	getimg=(obj)=>{
		api.FetchPost('/hyb-stu/stu_my/save_update',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({ "bbs_icon" : uploadImg + obj.result.avatar_url  })
		}).then(({res})=>{
			this.setState({ "bbs_icon" : uploadImg + obj.result.avatar_url });
			api.webview("userheadicon?param={\"token\":\""+this.props.userstate.token+"\" ,\"user_icon_url\":\""+uploadImg+obj.result.avatar_url+"?r="+Math.random(1)+"\"}");
		});
	}
	opennickname=(name)=>{
		(typeof name).toLowerCase()=='string' ? this.setState({ "isNickName" : !this.state.isNickName ,"nick_name" : name }) : this.setState({ "isNickName" : !this.state.isNickName });
	}
	openmobile=(mobile)=>{
		(typeof mobile).toLowerCase()=='string' ? this.setState({ "isMobile" : !this.state.isMobile ,"account_mobile" : mobile }) : this.setState({ "isMobile" : !this.state.isMobile });
	}
	openemail=(email)=>{
		(typeof email).toLowerCase()=='string' ? this.setState({ "isEmail" : !this.state.isEmail ,"security_email" : email }) : this.setState({ "isEmail" : !this.state.isEmail });
	}
	render(){
		return(
			<div className="memessage">
				<div className="hd">
					<span><Link to="/me"><i className="icon"></i>返回</Link></span>
					<span>个人信息</span>
					<span></span>
				</div>
				<div className="bd">
					<ul>
						<li className="useicon" onClick={this.changeimg}><span>个人头像</span><span><img src={this.state.bbs_icon ? this.state.bbs_icon +"?r="+Math.random(1) : bbs_icon +"?r="+Math.random(1) }/></span></li>
						<li onClick={this.opennickname}><span>昵称</span><span>{this.state.nick_name}<i className="icon"></i></span></li>
						<li onClick={this.openmobile}><span>手机号</span><span>{this.state.account_mobile}<i className="icon"></i></span></li>
						<li onClick={this.openemail}><span>绑定邮箱</span><span>{this.state.security_email ? this.state.security_email : '未绑定'}<i className="icon"></i></span></li>
					</ul>
				</div>
				<ReactCSSTransitionGroup transitionName="memessageAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{ this.state.isNickName ? <ChangeNickName text={this.state.nick_name} close={this.opennickname} /> : '' }
				</ReactCSSTransitionGroup>
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
MeMessage = connect(mapStateToProps)(MeMessage)
export default MeMessage
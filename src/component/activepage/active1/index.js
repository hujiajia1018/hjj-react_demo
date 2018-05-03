import React, { Component } from 'react'
import { Link ,hashHistory } from 'react-router'
import Tip from 'component/pagemsg/tip'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Share from 'component/share'
import icon1 from './icon1.jpg'
import api from 'api/api'
import './active1'

class Active extends Component{
	constructor(props){
		super(props);
		this.state = {
			isopenshare : false,
			value : '',
			mycode : '',
			youcode : '',
			inviting_number : ''
		}
	}
	componentDidMount=()=>{
		api.FetchPost('/hyb-stuuser/stu_user/get_invitation_code',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token
		}).then(({res})=>{
			this.setState({ "mycode" : res.data.code ,'youcode' : res.data.other_code ,'inviting_number' : res.data.inviting_number ? res.data.inviting_number : 0  });
		},(res)=>{
			api.tip_msg(res.data.errors.error);
		});
	}
	changecode=(event)=>{
		this.setState({ value : event.target.value.trim() });
	}
	goback=()=>{
		hashHistory.goBack();
	}
	weshare =()=>{
		this.setState({ "isopenshare" : !this.state.isopenshare });
	}
	tosubmit =()=>{
		if(this.state.youcode){
			return false;
		}
		if(!this.state.value){
			api.tip_msg('请输入助威码');
			return false;
		}
		if(!/^[0-9a-zA-Z]{6}$/.test(this.state.value)){
			api.tip_msg('请输入正确的助威码');
			return false;
		}


		api.FetchPost(`/hyb-stuuser/stu_user/inviting_friends/${this.state.value}`,{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token
		}).then(({res})=>{
			this.setState({ "youcode" : this.state.value });
		},(res)=>{
			api.tip_msg(res.data.errors.error);
		});
	}
	render(){
		return (
			<div className="active1">
				<div className="hd">
					<span onClick={this.goback}><i className="icon3"></i></span>
					<span>邀请有礼</span>
					<span onTouchEnd={this.weshare}><i className="icon3 sharebtn"></i></span>
				</div>
				<img src={icon1} className="banner"/>
				<div className="content">
					<div className="help">
						<div>
							<span>我的助威码</span>
							<em>已为我助威{this.state.inviting_number}人</em>
						</div>
						<div></div>
						<div>
							<span>填写他人助威码</span>
						</div>
					</div>
					<div className="help two">
						<div>
							<p>{this.state.mycode}</p>
						</div>
						<div><i className={this.state.youcode ? 'on' : ''}></i></div>
						<div>
							<p>
							{
								this.state.youcode ? this.state.youcode : <input maxLength="6" autoCapitalize="off" autoComplete="off" onChange={this.changecode} autoComplete="off"/>
							}
							</p>
						</div>
					</div>
				</div>
				<p className={this.state.youcode ? "sub on" : "sub"} onClick={this.tosubmit}>{this.state.youcode ? '已助威' : '为他助威'}</p>
				<div className="faq">
					<h2><span>活动须知</span></h2>
					<p>1.本活动有效期9.12~10.12</p>
					<p>2.邀请人数达到30人，即可获得我们准备的大礼一份</p>
					<p>3.兑换礼品时请在微信公众号@小牛接招后台回复截图，联系方式和地址</p>
					<p>4.如果对我们有什么好的意见和建议，也请告诉我们，也会有小礼物唷</p>
					<p className="end">最终解释权归<span>@小牛接招</span>所有</p>
				</div>
				<ReactCSSTransitionGroup transitionName="shareAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.isopenshare ? <Share closeShare={this.weshare} shareKind="0" shareContent={this.sharobject} /> : ''}
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
Active = connect(mapStateToProps)(Active)
export default Active
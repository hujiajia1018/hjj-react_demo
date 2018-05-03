import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import api from 'api/api'
import { uploadImg } from 'api/config'
import "css/me"
import usericonimg from 'images/icon6.png'
import TipOnlyMsg from 'component/pagemsg/tiponlymsg'
import Tip from 'component/pagemsg/tip'

class Me extends Component{
	constructor(props){
		super(props);
		this.state = {
			userbgicon : '',
			usericonimg : '',
			user_name : '',
			publishNum : 0, //发布数量
			subscribeNum : 0, //订阅数量
			fansNum : 0, //粉丝数量
			submittedNum : 0,//已投递数量
			writtenExamNum : 0,//笔试数量
			interviewNum : 0, //面试数量
			offerNum : 0, //录用数量
			followPositionNum : 0,//收藏职位数量
			followEntNum : 0,//收藏企业数量
			dynamicsNum : 0, //动态数量
			composeNum : 0, //创作数量
			totalscore : '',
			tip : false,
			status : 'pending',
			isnews : 0 //是否有新消息
		}
	}
	componentDidMount=()=>{
		api.FetchGet('/hyb-stu/stu_my/home',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token
		}).then((res)=>{
			this.setState({
				"totalscore" : res.data.total_score,
				"usericonimg" : res.data.base_info && res.data.base_info.icon ? res.data.base_info.icon.split("?r=")[0] : usericonimg,
				"userbgicon" : res.data.base_info ? res.data.base_info.background_page : '',
				"user_name" : res.data.base_info ? res.data.base_info.user_name : '',
				"publishNum" : res.data.info.publish_num,
				"subscribeNum" : res.data.info.subscribe_num,
				"fansNum" : res.data.info.fans_num,
				"submittedNum" : res.data.info.submitted_num,
				"writtenExamNum" : res.data.info.written_exam_num,
				"interviewNum" : res.data.info.interview_num,
				"offerNum" : res.data.info.offer_num,
				"followPositionNum" : res.data.info.follow_position_num,
				"followEntNum" : res.data.info.follow_ent_num,
				"dynamicsNum" : res.data.info.dynamics_num,
				"composeNum" : res.data.info.compose_num,
				"status" : 'success'
			});
		},()=>{
			this.setState({"status" : "erro"})
		});
		api.FetchPost('/hyb-stu/stu_user_notify_message/exists_mail',{
			"UserKey" : this.props.userstate.userKey,
			"token" : this.token
		}).then(({res})=>{
			/*this.setState({ "isnews" : res.data.mail_count },()=>{
				api.webview("pushnotification?param={\"token\":\""+this.props.userstate.token+"\"}" ,this.getisnews);
			});*/
			this.setState({ "isnews" : res.data.mail_count > 0 ? res.data.mail_count : 0 });
		});
	}
	/*getisnews=(res)=>{
		this.setState({ "isnews" : res.result.title_type });
	}*/
	getbgimg=(obj)=>{
		api.FetchPost('/hyb-stu/stu_my/background/update',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({ 
				background_page : uploadImg + obj.result.avatar_url + '?r='+Math.random(1)
			})
		}).then(({res})=>{
			this.setState({ "userbgicon" : uploadImg + obj.result.avatar_url +"?r="+Math.random(1) ,"tip" : false });
		})
	}
	changebg=(event)=>{
		if(event.target.classList.contains('hd')){
			this.setState({ "tip" : true });
		}
	}
	appnav=(a)=>{
		if(a){
			const actiontype = "savetoalbum?param={\"token\":\""+this.props.userstate.token+"\" ,\"upload_type\":\""+1+"\"}";
			api.webview(actiontype ,this.getbgimg);
		}else{
			this.setState({ "tip" : false });
		}
	}
	qcode=()=>{
		api.webview("jumpqrcode?param={\"token\":\""+this.props.userstate.token+"\"}" ,this.qcodecalllback);
	}
	qcodecalllback=(res)=>{
		api.FetchGet(`/hyb-stuuser/stu_user/scan_code/${res.result.qrcode_uid}`,{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token
		})
	}
	showpage=()=>{
		let bgicon = {};
		if(this.state.userbgicon){
			bgicon = {
				backgroundImage : 'url('+this.state.userbgicon+')'
			}
		}
		/*<div className={this.state.userbgicon ? 'hd blurmode' : 'hd'} style={bgicon} onClick={this.changebg}>*/
		return <div className="me">
				<div className={this.state.userbgicon ? 'hd blurmode' : 'hd'} style={bgicon}>
					<div className="usericon">
						<Link to="/resume">
							<b><img src={this.state.usericonimg +'?r='+Math.random(1) } /></b>
							<p>{this.state.user_name ? this.state.user_name : '填写真实姓名'}<i className="icon3"></i></p>
						</Link>
					</div>
					<i className="icon3 qcode" style={{"display" : "none"}} onClick={this.qcode}></i>
				</div>
				<div className="box">
					<div className="boxbd">
						<ul>
							<li><Link to="/delivery"><p>{this.state.submittedNum}</p><p>已投递</p></Link></li>
							<li><Link to="/writtentest"><p>{this.state.writtenExamNum}</p><p>笔试</p></Link></li>
							<li><Link to="/interviewtest"><p>{this.state.interviewNum}</p><p>面试</p></Link></li>
							<li><Link to="/offerletter"><p>{this.state.offerNum}</p><p>录用</p></Link></li>
						</ul>
					</div>
				</div>
				<ul className="melist">
					<li><Link to={{ "pathname" : "/resume" }}>
							<i className="icon3 a"></i>
							<p className="edit">
								编辑简历
								{/*{ this.state.totalscore>=60 ? '' : <span className="red"></span> }
								<span>完整度{this.state.totalscore}%</span>*/}
							</p>
							</Link>
					</li>
					<li><Link to="/interestposition"><i className="icon3 b"></i><p>收藏的职位</p></Link></li>
					<li><Link to="/followcompany"><i className="icon3 c"></i><p>关注的公司</p></Link></li>
					{/*<li><Link to="/sysmessage">
							<i className="icon3 d"></i>
							<p className="edit">
								消息
								{ this.state.isnews ? <span className="red m"></span> : '' }
								{ this.state.isnews ? <span>您有{this.state.isnews}条未读消息</span> : '' }
							</p>
						</Link>
					</li>*/}
					<li><Link to={{ "pathname" : "/activepage1" }}>
							<i className="icon3 g"></i>
							<p className="edit">
								邀请有礼<span>邀请好友</span>
							</p>
							</Link>
					</li>
				</ul>
				<ul className="melist mar">
					<li><Link to="/suggestions"><i className="icon3 e"></i><p>意见反馈</p></Link></li>
					<li><Link to="/appsetting"><i className="icon3 f"></i><p>设置</p></Link></li>
				</ul>
				<ReactCSSTransitionGroup transitionName="tipselectAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{ this.state.tip ? <TipOnlyMsg text="上传封面" close={this.appnav} /> : '' }
				</ReactCSSTransitionGroup>
			</div>
	}
	render(){
		return(
			<div className="mebor">
			{
				this.state.status=='pending' ? <Tip text="" type="loading" /> : this.state.status=='success' ? this.showpage() : <Tip text="出错误了" type="tiperro" />
			}
			</div>
		)
	}
}
const mapStateToProps = (state ,ownProps) =>{
	return {
		userstate : state.UserState
	}
}
Me = connect(mapStateToProps)(Me)
export default Me
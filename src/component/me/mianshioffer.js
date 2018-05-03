import React, { Component } from 'react'
import { Link ,hashHistory } from 'react-router'
import { connect } from 'react-redux'
import api from 'api/api'
import 'css/offer'
import { city ,zhiwei ,xueli ,mianshi ,downbapp  } from 'api/config'

class Offer extends Component{
	constructor(props){
		super(props);
		this.state = {
			ent_id : '',
			plan_id : '',
			full_name : "",
			position_name : "",
			start_time : "",
			user_name : "",
			isopentime : false,
			interview_date : {},
			time : '请选择你的时间',
			batch_id : '',
			hr_message : '',
			position_name : '',
			choose_time : '',
			expire_date : '',
			server_time : ''
		}
	}
	componentDidMount=()=>{
		api.FetchGet(`/hyb-stu/stu_interview/offer/${this.props.location.state.id}`,{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token
		}).then((res)=>{
			this.setState({ 
				"ent_id" : res.data.ent_id,
				"plan_id" : res.data.plan_id,
				"full_name" : res.data.full_name,
				"plan_name" : res.data.plan_name,
				"start_time" : res.data.start_time,
				"user_name" : res.data.user_name,
				"hr_message" : res.data.hr_message,
				"position_name" : res.data.position_name,
				"choose_time" : res.data.choose_time,
				"expire_date" : res.data.expire_date,
				"server_time" : res.data.server_time
			},()=>{
				if(new Date(res.data.expire_date.replace(/-/g,"/")) < new Date(res.data.server_time.replace(/-/g,"/"))){
					api.tip_msg('面试邀请函已过期','fixedmode');
					setTimeout(()=>{
						this.passtime(res.data.ent_id ,res.data.plan_id ,this.props.location.state.id);
					},1000);
				}
			});
		},()=>{
			api.tip_msg('失败');
		});
	}
	passtime=(ent_id ,plan_id ,positionid)=>{
		let obj = {
    		"confirm" : 2,
    		"plan_id" : plan_id,
    		"position_id" : positionid,
    		"ent_id" : ent_id
    	};

		api.FetchPost(`/hyb-stu/stu_notify/interview/confirm`,{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify(obj)
		}).then(({res})=>{
			hashHistory.goBack();
		});
	}
	goback=()=>{
		hashHistory.goBack();
	}
	render(){
		return(
			<div className="offer" id="mianshi">
				<div className="hd">
					<i className="icon3" onClick={this.goback}></i>
					<Link to={{ "pathname" : "/positiondetail" ,state : { "id" : this.props.location.state.id }}}><span>职位详情</span></Link>
				</div>
				<div className="bd">
					<p className="title">{this.state.user_name}，您好！</p>
					<br/>
					<p className="kg"><span>{this.state.full_name}</span> 邀请你参加 <span>{this.state.position_name}</span> 在线面试</p>
					<p className="kg">请在下方选择最适合您的面试时间，{api.settime(this.state.expire_date)} 前未选择将视为放弃。</p>
					{
						this.state.hr_message ? <p className="kg kg2"><em>(HR温馨寄语：{this.state.hr_message})</em></p> : ''
					}
				</div>
				<div className="ft">
					{
						this.state.choose_time ? <b>已选面试时间：{api.settime(this.state.choose_time)}</b> : ''
					}
					<Link to={{ "pathname" : "/selecttimem" ,state : { "expiredate" : this.state.expire_date ,"positionid" : this.props.location.state.id ,"entid" : this.state.ent_id ,"planid" : this.state.plan_id }}}>
						<span className="totime">{this.state.choose_time ? '更改面试时间' : '请选择面试时间'}</span>
					</Link>
					<em>
						请在电脑安装并使用红云榜考试系统进行在线笔试/面试<br/>
						下载地址：{downbapp}<br/>
						(目前只支持Windows系统)
					</em>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state ,ownProps) =>{
	return {
		userstate : state.UserState
	}
}
Offer = connect(mapStateToProps)(Offer)
export default Offer
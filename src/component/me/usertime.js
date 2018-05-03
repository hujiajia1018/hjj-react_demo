import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Link ,hashHistory } from 'react-router'
import { connect } from 'react-redux'
import TipSelect from 'component/pagemsg/tipselect'
import api from 'api/api'
import 'css/usertime'

class UserTime extends Component{
	constructor(props){
		super(props);
		this.state = {
			reson : '',
			tipselect : false
		}
		this.len = 0;
		this.ismodify = false;
		this.tipmsg = ['您的修改尚未保存' ,'取消' ,'放弃'];
	}
	setreson=(event)=>{
		this.len = event.target.value.length;
		this.ismodify = event.target.value ? true : false;
		this.setState({ "reson" : event.target.value });
	}
	opentipselect=()=>{
		if(this.ismodify && !this.state.tipselect){
			this.setState({ "tipselect" : true });
		}else{
			hashHistory.goBack();
		}
	}
	back=(a)=>{
		a==1 ? hashHistory.goBack() : this.setState({ "tipselect" : false });
	}
	sub=()=>{
		let url = '';
		if(this.props.location.state.type==1){
			url = '/hyb-stu/stu_interview/alter/interview';
		}else{
			url = '/hyb-stu/stu_written/alter/written';
		}

		api.FetchPost(url,{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({ "msg" : this.state.reson ,"plan_id" : this.props.location.state.planid ,"position_id" : this.props.location.state.positionid })
		}).then(({res})=>{
			api.tip_msg('提交成功');
			setTimeout(()=>{
				hashHistory.goBack();
			},1000);
		});
	}
	render(){
		return(
			<div className="usertime">
				<div className="hd">
					<span onClick={this.opentipselect}><i className="icon3"></i></span>
					<span>申请改时间</span>
					<span></span>
				</div>
				<div className="titlemsg">
					<i className="icon3"></i>申请改时间后，原考试时间将不可用
				</div>
				<div className="usertimebd">
					<h1>更改原因及时间</h1>
					<textarea maxLength="30" placeholder="请输入最适合你的时间及申请原因......" value={this.state.reson} ref="textareaelm" onChange={this.setreson}></textarea>
					<p className="len">{this.len}/30</p>
				</div>
				<p className="sub" onClick={this.sub}>提交</p>
				<ReactCSSTransitionGroup transitionName="tipselectAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.tipselect ? <TipSelect text={this.tipmsg} handleclose={this.back}/> : ''}
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
UserTime = connect(mapStateToProps)(UserTime)
export default UserTime
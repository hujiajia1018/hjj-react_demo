import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SetWorkList } from 'action/worklistAction'
import TipSelect from 'component/pagemsg/tipselect'
import api from 'api/api'

class WorkDetail extends Component{
	constructor(props){
		super(props);
		this.state = this.props.detail ? {
			tipselect : false,
			id : this.props.detail.id,
			url : this.props.detail.url,
			work_desc : this.props.detail.work_desc,
			user_id : this.props.detail.user_id,
			number : this.props.detail.work_desc.length
		} : {
			tipselect : false,
			id : '',
			url : '',
			work_desc : '',
			user_id : '',
			number : 0
		};
		this.tipmsg = ['您的修改尚未保存' ,'取消' ,'放弃'];
		this.ismodify = false;
		this.hassubmit = false;
	}
	seturl=(event)=>{
		this.setState({ "url" : event.target.value });
		this.ismodify = true;
	}
	setwork_desc=(event)=>{
		this.ismodify = true;
		event.target.value.length > 30 ? this.refs.textareaelm.classList.add('redbor') : this.refs.textareaelm.classList.remove('redbor');
		this.setState({ "work_desc" : event.target.value ,"number" : event.target.value.length  });
	}
	back=(a)=>{
		a==1 ? this.props.close(5 ,'iswork') : this.setState({ "tipselect" : false });
	}
	opentipselect=()=>{
		if(this.ismodify && !this.state.tipselect){
			this.setState({ "tipselect" : true });
		}else{
			this.props.close(5 ,'iswork');
		}
	}
	sub=()=>{
		if(!this.state.url || !this.state.work_desc || this.state.number > 30){
			return false;
		}
		if(this.hassubmit){
			return false;
		}
		this.hassubmit = true;
		this.props.setWorkList({
			token : this.props.userstate.token,
			UserKey : this.props.userstate.userKey,
			body : JSON.stringify({
				"id" : this.state.id,
				"url" : this.state.url,
				"work_desc" : this.state.work_desc
			})
		},()=>{
			this.props.close();
		},()=>{
			this.hassubmit = false;
		});
	}
	render(){
		return(
			<div className="education" id="editedu">
				<div className="hd">
					<span className="edu" onClick={this.opentipselect}><i className="icon3"></i></span>
					<span className="edu">个人作品</span>
					<span className="edu"></span>
				</div>
				<ul className="editedu">
					<li><span>链接地址</span><input type="text" value={this.state.url} onChange={this.seturl}/></li>
					<li className="pertext"><span>作品简述</span>
						<textarea maxLength="30" value={this.state.work_desc} onChange={this.setwork_desc} ref="textareaelm"></textarea>
						<span className="number">({this.state.number}/30)</span>
					</li>
				</ul>
				<p className="complete" onClick={this.sub}>完成</p>
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
const mapDispatchToProps = (dispath) =>{
	return {
		setWorkList : bindActionCreators(SetWorkList ,dispath)
	}
}

WorkDetail = connect(mapStateToProps ,mapDispatchToProps)(WorkDetail)
export default WorkDetail
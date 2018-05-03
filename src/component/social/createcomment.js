import React, { Component } from 'react'
import { Link ,hashHistory } from 'react-router'
import { connect } from 'react-redux'
import api from 'api/api'
import 'css/merelease'
import usericonimg from 'images/icon6.png'

class CreateComment extends Component{
	constructor(props){
		super(props);
		this.state = {
			content : '',
			msg : this.props.msg,
			icon : this.props.msg.icon,
			name : this.props.msg.name,
			number : 0
		}
		this.anonymous_type = 0;
		this.ajax = [
			'/hyb-stu/stu_user_comment/save_comment',
			'/hyb-stu/stu_user_answer/save_answer',
			'/hyb-stu/stu_user_answer/save_answer'
		]
	}
	componentDidMount=()=>{
		api.lock();
	}
	componentWillUnmount=()=>{
		api.unlock();
	}
	createart=()=>{
		let obj = {};
		if(this.props.socialtype==0){
			obj = { 
				"hot_point_id" : this.state.msg.hot_point_id, 
				"hot_point_user_id" : this.state.msg.user_id,
				"content" : this.state.content,
				"anonymous_type" : this.anonymous_type,
				"anonymous_name" : this.state.name
			}
		}else if(this.props.socialtype==1){
			obj = { 
				"comment_id" : this.state.msg.comment_id, 
				"comment_user_id" : this.state.msg.comment_user_id,
				"comment_name" : this.state.msg.comment_name,
				"content" : this.state.content,
				"anonymous_type" : this.anonymous_type,
				"anonymous_name" : this.state.name,
				"hot_point_id" : this.state.msg.hotpointid, 
			}
		}else if(this.props.socialtype==2){
			obj = { 
				"comment_id" : this.state.msg.comment_id, 
				"comment_user_id" : this.state.msg.comment_user_id,
				"comment_name" : this.state.msg.comment_name,
				"content" : this.state.content,
				"anonymous_type" : this.anonymous_type,
				"anonymous_name" : this.state.name,
				"answer_id" : this.state.msg.answerid,
				"hot_point_id" : this.state.msg.hotpointid, 
			}
		}

		api.FetchPost(this.ajax[this.props.socialtype] ,{
			UserKey : this.props.userstate.userKey,
			token : this.token,
			body : JSON.stringify(obj)
		}).then(({res})=>{
			if(this.props.socialtype==0){
				this.props.close(res.data.comment);
			}else if(this.props.socialtype==1){
				this.props.close(res.data.comment_dto);
			}else if(this.props.socialtype==2){
				this.props.close(res.data.comment_dto);
			}
		});
	}
	change=(event)=>{
		const content = event.target.value.trim();
		this.setState({ "content" : event.target.value.trim() ,"number" : content.length });
	}
	goback=()=>{
		this.props.close();
	}
	changeanonymous=()=>{
		if(this.anonymous_type==0){
			this.anonymous_type = 1;
			this.setState({ "name" : '匿名' ,"icon" : usericonimg });
		}else{
			this.anonymous_type = 0;
			this.setState({ "name" : this.props.msg.name ,"icon" : this.props.msg.icon });
		}
	}
	render(){
		return(
			<div className="merelease" id="mereleaseanimate">
				<div className="hd">
					<span onClick={this.goback}><i className="icon"></i>返回</span>
					<span className="creatimg" onClick={this.changeanonymous}><img src={this.state.icon ? this.state.icon : usericonimg} /><em>{this.state.name}</em></span>
					<span onClick={this.createart}>评论</span>
				</div>
				<div className="content">
					<textarea maxLength="300" placeholder={this.props.defaultmsg} onChange={this.change}>{this.content}</textarea>
					<p>{this.state.number}/300</p>
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
CreateComment = connect(mapStateToProps)(CreateComment)
export default CreateComment

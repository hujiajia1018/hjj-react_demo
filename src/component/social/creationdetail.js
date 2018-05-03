import React, { Component } from 'react'
import { Link ,hashHistory } from 'react-router'
import { connect } from 'react-redux'
import api from 'api/api'
import 'css/merelease'
import usericonimg from 'images/icon6.png'

class CreationDetail extends Component{
	constructor(props){
		super(props);
		this.state = {
			content : '',
			msg : '',
			praise_status : '',
			status : 'pending',
			like : ''
		}
		this.page = 1;
	}
	componentDidMount=()=>{
		this.getdata();
	}
	componentDidUpdate =()=>{
		document.addEventListener('scroll',this.scroll,false);
	}
	componentWillUnmount=()=>{
		document.removeEventListener('scroll',this.scroll);
	}
	scroll=(event)=>{
		let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
		const el = document.querySelectorAll('.dynamicdetail div.box:last-child')[0];
		if(!el){
			return;
		}
		
		if(this.state.status!='pending'){
			if(scrolltop + window.innerHeight + 10 >= Math.ceil(document.body.scrollHeight)){
				++this.page;
				this.getdata();
			}
		}
	}
	getdata=()=>{
		api.FetchPost('/hyb-stu/stu_user_hot_point/find_one_article',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({ 
				hot_point_id : this.props.location.state.hotpointid,
				subscribe_user_id : this.props.location.state.userid
			})
		}).then(({res})=>{
			if(this.page==1){
				this.setState({ "like" : res.data.have_collection ,"msg" : res.data.message ,"praise_status" : res.data.praise_status ,"status" : "success" ,"content" : res.data.article_content ,"comment_list" : res.data.article_content });
			}else{
				if(res.data.article_content.length){
					this.setState({ "status" : "success" ,"comment_list" : this.state.comment_list.concat(res.data.article_content) });
				}
			}
		});
	}
	dingyue=()=>{
		api.FetchPost('/hyb-stu/stu_user_subscribe/save_subscribe',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({
				subscribe_user_id : this.props.location.state.userid,
				subscribe_user_name : this.props.location.state.name,
				subscribe_user_icon : this.props.location.state.icon,
				subscribe_type : this.state.msg=='订阅' ? 0 : 1
			})
		}).then(({res})=>{
			this.setState({ "msg" : res.data.message });
		});
	}
	dianzan=()=>{
		api.FetchPost('/hyb-stu/stu_user_hot_point/praise_count_inc',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({
				hot_point_id : this.props.location.state.hotpointid,
				hot_point_user_id : this.props.location.state.userid,
				praise_type : this.state.praise_status ? 1 : 0
			})
		}).then(({res})=>{
			this.setState({ "praise_status" : this.state.praise_status ? 0 : 1 });
		});
	}
	setlike=()=>{
		api.FetchPost('/hyb-stu/stu_user_article_collection/save_article_collection',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({
				hot_point_id : this.props.location.state.hotpointid,
				collection_type : this.state.like ? 1 : 0
			})
		}).then(({res})=>{
			this.setState({ 'like' : res.data.have_collection });
		});
	}
	goback=()=>{
 		hashHistory.goBack();
	}
	render(){
		return(
			<div className="merelease" id="creationdetail">
				<div className="hd">
					<span onClick={this.goback}><i className="icon"></i>返回</span>
					<span>长文章</span>
					<span onClick={this.setlike}><i className={this.state.like ? "icon xing on" : "icon xing"}></i></span>
				</div>
				<div className="creationdetail">
					<div className="usermsg">
						<img src={this.props.location.state.icon ? this.props.location.state.icon : usericonimg} />
						<span>{this.props.location.state.name}</span>
						<em onClick={this.dingyue}>{this.state.msg}</em>
					</div>
					<div className="content">
						{this.state.content}
					</div>
					<div className={this.state.praise_status==0 ? "zana" : "zana on"} onClick={this.dianzan}>
						<p><i className="icon"></i></p>
					</div>
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
CreationDetail = connect(mapStateToProps)(CreationDetail)
export default CreationDetail
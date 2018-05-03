import React, { Component } from 'react'
import { Link,hashHistory } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import api from 'api/api'
import 'css/merelease'
import usericonimg from 'images/icon6.png'
import TipTwoMsg from 'component/pagemsg/tiptwomsg'
import Tip from 'component/pagemsg/tip'
import CreatComment from './createcomment'

class DynamicDetail extends Component{
	constructor(props){
		super(props);
		this.state = {
			hot_point : {},
			comment_list : [],
			status : 'pending',
			iscomment : false,
			tip : false
		}
		this.text = {
			"huifu" : "回复",
			"remove" : "删除"
		}
		this.defaultmsg = '';
		this.socialtype = '';
		this.page = 1;
		this.remain = true;
	}
	componentDidMount=()=>{
		api.FetchPost('/hyb-stu/stu_user_hot_point/find_one_hot_point',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({ 
				hot_point_id : this.props.location.state.pointid 
			})
		}).then(({res})=>{
			if(this.page==1){
				this.setState({ "status" : "success" ,"hot_point" : res.data.hot_point ,"comment_list" : res.data.comment_list });
			}else{
				if(res.data.comment_list.length){
					this.setState({ "status" : "success" ,"comment_list" : this.state.comment_list.concat(res.data.comment_list) });
				}
			}
		});
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
		if(!el || !this.remain){
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
		api.FetchPost('/hyb-stu/stu_user_comment/find_comment_list',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({ 
				"hot_point_user_id" : 1,
				"page_size" : this.page,
				"hot_point_id" : 1,
				"create-time" : 1
			})
		}).then(({res})=>{
			this.remain = res.data.remain;
			this.setState({ "hfstatus" : "success" ,"status" : "success" ,"comment_list" : this.state.comment_list.concat(res.data.comment_list) });
		});
	}
	removemsg=()=>{
		api.FetchPost('/hyb-stu/stu_user_collection/cancel_collection',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({ 
				collection_id : this.props.location.state.collectionid
			})
		}).then(({res})=>{
			api.tip_msg('删除成功');
			setTimeout(()=>{
				hashHistory.push('/dynamic');
			},500);
		})
	}
	getmorecomment=(event)=>{
		const el = api.closest(event.target ,'div.huifu') ,elm = api.closest(event.target ,'p.all') ,comment_id = el.getAttribute('data-commentid');
		let create_time = '' ,pagesize = elm.getAttribute('data-pagesize');

		if(el.querySelectorAll('p').length>3){
			if(el.querySelectorAll('p.all').length){
				create_time = el.querySelectorAll('p')[el.querySelectorAll('p').length-2].getAttribute('data-time');
			}else{
				create_time = el.querySelectorAll('p')[el.querySelectorAll('p').length-1].getAttribute('data-time');
			}
		}

		api.FetchPost('/hyb-stu/stu_user_answer/find_answer_list',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({ 
				comment_id : comment_id,
				create_time : create_time,
				page_size : pagesize
			})
		}).then(({res})=>{
			if(res.data.answer_list.length){
				let list = [].concat(this.state.comment_list);
				list.map((item ,index)=>{
					if(item.comment_mongo_info.comment_id == comment_id){
						if(pagesize==1){
							item.answer_list = res.data.answer_list;
						}else{
							item.answer_list = item.answer_list.concat(res.data.answer_list);
						}
						item.answer_count = res.data.remain_count;
					}
				});
				this.setState({ "comment_list" : list });
				elm.setAttribute('data-pagesize' ,++pagesize);
			}
		})
	}
	creatcomment=(event)=>{
		const el = event.target.tagName.toLowerCase()=='span' ? api.getTarget(event.target ,'p') : event.target;
		this.socialtype = el.getAttribute('data-showtype');
		if(this.socialtype==0){ // 增加评论
			this.text = {
				"huifu" : "回复"
			}
			this.defaultmsg = '快来评论吧....';
			this.defaultobj = this.state.hot_point;
		}else if(this.socialtype==1){ // 增加评论的回复
			this.text = {
				"huifu" : "回复",
				"remove" : "删除"
			}
			this.defaultobj = {
				"comment_id" : el.getAttribute('data-commentid'),
				"comment_user_id" : el.getAttribute('data-userid'),
				"comment_name" : el.getAttribute('data-username'),
				"icon" : this.state.hot_point.icon,
				"name" : this.state.hot_point.name,
				"hotpointid" : this.state.hot_point.hot_point_id,
				"isanswer" : 0
			}
			this.defaultmsg = '回复....';
		}else if(this.socialtype==2){ // 对评论回复的 回复
			this.text = {
				"huifu" : "回复",
				"remove" : "删除"
			}
			this.defaultobj = {
				"comment_id" : el.getAttribute('data-commentid'),
				"comment_user_id" : el.getAttribute('data-userid'),
				"comment_name" : el.getAttribute('data-username'),
				"icon" : this.state.hot_point.icon,
				"name" : this.state.hot_point.name,
				"answerid" : el.getAttribute('data-answerid'),
				"hotpointid" : this.state.hot_point.hot_point_id,
				"isanswer" : 1
			}
			this.defaultmsg = `回复 ${el.getAttribute('data-username')} :`;
		}
		this.setState({ "tip" : !this.state.tip });
	}
	close=(obj)=>{ 
		if(obj==void 0){
			this.setState({ "iscomment" : !this.state.iscomment });
		}else{
			if(this.socialtype==0){ // 增加评论
				this.setState({ "iscomment" : !this.state.iscomment ,"comment_list" : new Array({ "comment_mongo_info" : obj }).concat(this.state.comment_list) });
			}else if(this.socialtype==1 || this.socialtype==2){ // 轮对的回复  回复的回复
				let list = [].concat(this.state.comment_list);
				list.map((item)=>{
					if(item.comment_mongo_info.comment_id==this.defaultobj.comment_id){
						item.answer_count = obj.answer_count;
						item.answer_list = obj.answer_list;
					}
				});
				this.setState({ "iscomment" : !this.state.iscomment ,"comment_list" : list });
			}
		}
	}
	tipclose=(type)=>{
		if(type=='close'){
			this.setState({ "tip" : false });
		}else if(type=='huifu'){
			this.setState({ "iscomment" : !this.state.iscomment ,"tip" : false });
		}else if(type="remove"){
			if(this.defaultobj.isanswer==0){
				api.FetchPost('/hyb-stu/stu_user_comment/delete_comment',{ // 删除评论
					UserKey : this.props.userstate.userKey,
					token : this.props.userstate.token,
					body : JSON.stringify({ 
						comment_id : this.defaultobj.comment_id
					})
				}).then(({res})=>{
					let list = [].concat(this.state.comment_list) ,index = '';
					list.map((item ,i)=>{
						if(item.comment_mongo_info.comment_id==this.defaultobj.comment_id){
							index = i;
						}
					});
					list.splice(index,1);
					this.setState({ "comment_list" : list ,"tip" : false });
				});
			}
			if(this.defaultobj.isanswer==1){
				api.FetchPost('/hyb-stu/stu_user_answer/delete_answer',{ // 删除评论的回复
					UserKey : this.props.userstate.userKey,
					token : this.props.userstate.token,
					body : JSON.stringify({ 
						answer_id : this.defaultobj.answerid
					})
				}).then(({res})=>{
					let list = [].concat(this.state.comment_list) ,index = '';
					list.map((item)=>{
						if(item.answer_list && item.answer_list.length){
							item.answer_list.map((answer ,i)=>{
								if(answer.answer_id==this.defaultobj.answerid){
									index = i;
								}
							});
							item.answer_list.splice(index,1);
						}
					});
					this.setState({ "comment_list" : list ,"tip" : false });
				});
			}
		}
	}
	dianzan=(event)=>{
		const praise_type = event.target.classList.contains('on') ? 1 : 0,
			comment_id = event.target.getAttribute('data-commentid'),
			comment_user_id = event.target.getAttribute('data-userid'),
			comment_name = event.target.getAttribute('data-username'),
			hot_point_id = this.state.hot_point.hot_point_id;

			api.FetchPost('/hyb-stu/stu_user_comment/praise_comment_count_inc',{
				UserKey : this.props.userstate.userKey,
				token : this.props.userstate.token,
				body : JSON.stringify({ 
					praise_type : praise_type,
					comment_id : comment_id,
					comment_user_id : comment_user_id,
					comment_name : comment_name,
					hot_point_id : hot_point_id
				})
			}).then(({res})=>{
				let list = [].concat(this.state.comment_list);
				list.map((item ,index)=>{
					if(item.comment_mongo_info.comment_id == comment_id){
						item.comment_mongo_info.praise_status = praise_type ? 0 : 1;
						item.comment_mongo_info.praise_count = praise_type==1 ? --item.comment_mongo_info.praise_count : ++item.comment_mongo_info.praise_count;
					}
				});
				this.setState({ "comment_list" : list });
			});
	}
	render(){
		return(
			<div className="merelease">
				<div className="hd">
					<span><Link to="/dynamic"><i className="icon"></i>返回</Link></span>
					<span>详情</span>
					<span></span>
				</div>
				<div className="box" data-time={this.state.hot_point.create_time} data-id={this.state.hot_point.hot_point_id}>
					<div className="boxhd">
						<img src={this.state.hot_point.icon ? this.state.hot_point.icon : usericonimg} />
						<p>
							<span>{this.state.hot_point.name}</span>
							<span>{this.state.hot_point.create_time}</span>
						</p>
					</div>
					<div className="boxbd">
						<p onClick={this.creatcomment} data-showtype="0">{this.state.hot_point.content}</p>
						<ul className="imglist">
						{
							this.state.hot_point.pictures ? this.state.hot_point.pictures.map((pic ,index)=>{
								return <li key={index}><img src={pic} /></li>
							}) : ''
						}
						</ul>
						<p className="remove" onClick={this.removemsg}>删除</p>
					</div>
					<div className="ft2">
						<span>评论</span>
						<span>{this.state.hot_point.comment_count}</span>
					</div>
				</div>
				<div className="dynamicdetail">
					{
						!this.state.comment_list.length ? <p className="nomsg">还木有热评论 快来抢占沙发啦~</p>
						: this.state.comment_list.map((item ,index)=>{
							return <div className="box" key={index}>
										<div className="left">
											<img src={item.comment_mongo_info.icon ? item.comment_mongo_info.icon : usericonimg} />
										</div>
										<div className="right">
											<h2>{ (item.comment_mongo_info.anonymous_type==1 && item.comment_mongo_info.anonymous_name) ? item.comment_mongo_info.anonymous_name : item.comment_mongo_info.anonymous_name }</h2>
											<h3>{item.comment_mongo_info.create_time}
												<p className="zan">
													<i onClick={this.dianzan} data-username={item.comment_mongo_info.name} data-userid={item.comment_mongo_info.user_id} data-commentid={item.comment_mongo_info.comment_id} className={item.comment_mongo_info.praise_status==1 ? 'icon a on' : 'icon a' }></i>
													<em>{item.comment_mongo_info.praise_count}</em>
													<i className="icon b on"></i>
												</p>
												<p className="nr"
													onClick={this.creatcomment} 
													data-showtype="1"
													data-commentid={item.comment_mongo_info.comment_id} 
													data-userid={item.comment_mongo_info.user_id}
													data-username={item.comment_mongo_info.name}
												>
													{item.comment_mongo_info.content}
												</p>
												{
													item.answer_list && item.answer_list.length ? 
													<div className="huifu" data-commentid={item.comment_mongo_info.comment_id} >
														{
															item.answer_list.map((answer ,key)=>{
																return answer.type==0
																		? <p onClick={this.creatcomment} data-answerid={answer.answer_id} data-time={answer.create_time} key={key} data-showtype="2" data-username={answer.name} data-userid={answer.user_id} data-commentid={answer.comment_id}><span>{answer.name}</span>：{answer.content}</p>
																		: <p onClick={this.creatcomment} data-answerid={answer.answer_id} data-time={answer.create_time} key={key} data-showtype="2" data-username={answer.name} data-userid={answer.user_id} data-commentid={answer.comment_id}><span>{answer.name}</span> 回复 <span>{answer.comment_name}</span>：{answer.content}</p>
															})
														}
														{
															item.answer_count > 2 ? <p onClick={this.getmorecomment} data-pagesize="1" className="all"><span>共{item.answer_count}条回复> </span></p> : ''
														}
													</div> : ''
												}
											</h3>
										</div>
									</div>
						})
					}
				</div>
				<ReactCSSTransitionGroup transitionName="mereleaseAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{ this.state.iscomment ? <CreatComment socialtype={this.socialtype} text={this.text} msg={this.defaultobj} defaultmsg={this.defaultmsg} close={this.close} /> : '' }
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="tipselectAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{ this.state.tip ? <TipTwoMsg text={this.text} tipclose={this.tipclose} /> : '' }
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
DynamicDetail = connect(mapStateToProps)(DynamicDetail)
export default DynamicDetail
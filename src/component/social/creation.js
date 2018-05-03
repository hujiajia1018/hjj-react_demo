import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import api from 'api/api'
import 'css/merelease'
import usericonimg from 'images/icon6.png'
import Tip from 'component/pagemsg/tip'
import TipSelect from 'component/pagemsg/tipselect'

class Creation extends Component{
	constructor(props){
		super(props);
		this.state = {
			status : 'pending',
			list : [],
			tipselect : false
		}
		this.collection_time = '';
		this.page = 1;
		this.remain = true;
		this.tipmsg = ['该内容不存在，是否取消收藏？' ,'否' ,'是'];
		this.elmdiv = '';
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
	getdata=()=>{
		api.FetchPost('/hyb-stu/stu_user_article_collection/find_article_collection_list',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({ 
				collection_time : this.collection_time,
				page_size : this.page
			})
		}).then(({res})=>{ 
			if(this.page>1 && api.isEmptyObject(res.data.article_collection_map)){
				return false;
			}
			this.remain = res.data.remain;
			if(!api.isEmptyObject(res.data.article_collection_map)){
				if(api.isEmptyObject(this.state.list)){
					this.setState({ "list" : res.data.article_collection_map ,"status" : 'success' });
				}else{
					let list = Object.assign({}, this.state.list);
					let newlist = {};
					Object.keys(list).map((key)=>{
						Object.keys(res.data.article_collection_map).map((key2)=>{
							if(!list[key2]){
								if(newlist[key2]){
									newlist[key2] = [];
								}
								newlist[key2] = res.data.article_collection_map[key2];
							}else{
								if(!newlist[key]){
									newlist[key] = [];
								}
								if(res.data.article_collection_map[key]!=void 0){
									newlist[key] = list[key].concat(res.data.article_collection_map[key]);
								}else{
									newlist[key] = list[key];
								}
							}
						});
					});
					this.setState({ "list" : Object.assign(newlist, list) ,"status" : 'success' });
				}
				let last = Object.keys(res.data.article_collection_map)[Object.keys(res.data.article_collection_map).length-1];
				last = res.data.article_collection_map[last];
				last = last[last.length-1];
				this.collection_time = last.collection_time;
			}else{
				this.setState({ "status" : 'nodata' });
			}
		},()=>{
			this.setState({ "status" : 'error' });
		});
	}
	scroll=(event)=>{
		let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
		const el = document.querySelectorAll('.box:last-child')[0];
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
	actionzan=(event)=>{
		const el = api.closest(event.target ,'span') ,el_i = el.querySelectorAll('i')[0] ,div = api.closest(event.target ,'div.box');
		let praise_type = 0;
		
		if(el_i.classList.contains('on')){
			praise_type = 1;
		}
		api.FetchPost('/hyb-stu/stu_user_hot_point/praise_count_inc',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({
				praise_type : praise_type,   
				hot_point_id : el.getAttribute('data-id'),
				hot_point_user_id : el.getAttribute('data-userid')
			})
		}).then(({res})=>{
			if(praise_type==1){
				el.querySelectorAll('em')[0].textContent = --el.querySelectorAll('em')[0].textContent;
				el_i.classList.remove('on');
			}else{
				el.querySelectorAll('em')[0].textContent = ++el.querySelectorAll('em')[0].textContent;
				el_i.classList.add('on');
			}
		})
	}
	cancel=(event)=>{
		const div = api.closest(event.target ,'div.box');
		if(div.getAttribute('data-status')==1){
			this.setState({ "tipselect" : !this.state.tipselect });
			this.elmdiv = div;
		}
	}
	opentipselect=(isopen)=>{
		if((isopen==1 && this.state.tipselect) || !this.state.tipselect){
			const key = this.elmdiv.getAttribute('data-key') ,id = this.elmdiv.getAttribute('data-id');
			let indexkey = '' ,list = Object.assign({}, this.state.list);
			list[key].map((item ,index)=>{
				if(item.collection_id == id){
					indexkey = index ;
				}
			});
			api.FetchPost('/hyb-stu/stu_user_article_collection/cancel_article_collection',{
				UserKey : this.props.userstate.userKey,
				token : this.props.userstate.token,
				body : JSON.stringify({    
					collection_id : this.elmdiv.getAttribute('data-id')
				})
			}).then(({res})=>{
				list[key].splice(indexkey,1);
				if(Object.keys(list).length==1 && list[key].length==0){
					this.page = 1;
					this.setState({ "list" : [] ,"status" : "nodata" ,"tipselect" : !this.state.tipselect})
				}else{
					this.setState({ "list" : list ,"tipselect" : !this.state.tipselect});
				}
				this.elmdiv = '';
			},(res)=>{
				this.setState({ "tipselect" : !this.state.tipselect});
				this.elmdiv = '';
			});
		}else{
			this.setState({ "tipselect" : !this.state.tipselect });
		}
	}
	render(){
		return(
			<div className="merelease">
				<div className="hd">
					<span><Link to="/me"><i className="icon"></i>返回</Link></span>
					<span>收藏创作</span>
					<span></span>
				</div>
				{
					this.page==1 && this.state.status=='pending' ? <Tip text="" type="loading" /> 
						: this.page==1 && this.state.status=='nodata' ? <Tip text="抱歉，暂时没有相关内容" type="nodata" />
						: this.page==1 && this.state.status=='error' ? <Tip text="出错误了" type="tiperro" />
						: Object.keys(this.state.list).sort().reverse().map((key ,index)=>{
							return <div key={key} className="dynamic">
								<h1>{key}</h1>
								{
									this.state.list[key].map((item ,index)=>{
										return <div className="box" key={item.article_collection_id} data-key={key} data-id={item.article_collection_id} data-status={item.collection_status} onClick={this.cancel} >
													{
														item.collection_status==1 ? <i className="cancel"></i> : ''
													}
													<div className="boxhd">
														<img src={item.icon ? item.icon : usericonimg} />
														{ item.collection_status==0 ? 
														<p>
															<Link to={{ "pathname" : "/creationsocial" ,state : { "pointid" : item.hot_point_id } }} >
																<span>{item.name}</span>
																<span>{item.collection_time}</span>
															</Link>
														</p>
														: <p>
															<span>{item.name}</span>
															<span>{item.collection_time}</span>
														</p>
														}
													</div>
													<div className="boxbd">
														<ul className="imglist">
															<li className="long">
																{
																	item.pictures ? <Link to={{ "pathname" : "/creationdetail" ,state : { "hotpointid" : item.hot_point_id ,"name" : item.name ,"icon" : item.icon ,"userid" : item.user_id } }}><img src={item.pictures[0]} /></Link> : ''
																}
																{ item.collection_status==0 ? 
																	<Link to={{ "pathname" : "/creationdetail" ,state : { "hotpointid" : item.hot_point_id ,"name" : item.name ,"icon" : item.icon ,"userid" : item.user_id } }}>
																		<p>
																			<em>{item.summary && item.summary.length > 30 ? api.substring(item.summary ,30 ,'...') : item.summary}</em>
																			{item.summary && item.summary.length > 30 ? <span>【长文】</span> : ''}
																		</p>
																	</Link> : <p>
																			<em>{item.summary && item.summary.length > 30 ? api.substring(item.summary ,30 ,'...') : item.summary}</em>
																			{item.summary && item.summary.length > 30 ? <span>【长文】</span> : ''}
																		</p>
																}
															</li>
														</ul>
													</div>
													<div className="ft">
														<span><i className="icon b"></i>{item.comment_count}</span>
														<span onClick={this.actionzan} data-status={item.praise_status} data-id={item.hot_point_id} data-userid={item.user_id}><i className={item.praise_status==1 ? "icon a on" : "icon a"}></i><em>{item.praise_count}</em></span>
													</div>
												</div>
									})
								}
							</div>
						})
				}
				<ReactCSSTransitionGroup transitionName="moneyAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.tipselect ? <TipSelect text={this.tipmsg} handleclose={this.opentipselect}/> : ''}
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
Creation = connect(mapStateToProps)(Creation)
export default Creation
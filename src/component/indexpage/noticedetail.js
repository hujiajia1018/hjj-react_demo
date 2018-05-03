import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import api from 'api/api'
import 'css/noticedetail'
import Tip from 'component/pagemsg/tip'
import Tipshowend from 'component/pagemsg/tipshowend'
import sysicon from 'images/icon16.png'
import icon17 from 'images/icon17.png'
import icon23 from 'images/icon23.png'
import icon24 from 'images/icon24.png'
import icon25 from 'images/icon25.png'
import icon26 from 'images/icon26.png'
import icon27 from 'images/icon27.png'

class NoticeDetail extends Component{
	constructor(props){
		super(props);
		this.state = {
			messagetype : this.props.location.state.messagetype,
			entid : this.props.location.state.entid,
			mailid : this.props.location.state.mailid,
			list : {},
			status : "pending"
		}

		this.ajax = [
			'/hyb-stu/stu_user_notify_message/find_system_mail_list',
			'/hyb-stu/stu_user_notify_message/find_message_list'
		]

		if(this.state.messagetype==0){
			this.params = {
				"create_time" : '',
				"page_size" : 1
			}
		}else{
			this.params = {
				"ent_id" : this.props.location.state.entid,                                                  //企业id
				"page_size" : 1,
				"mail_id" : this.props.location.state.mailid,    
				"send_time" : ''
			}
		}

		this.page = 1;
		this.username = '';
	}
	componentDidMount(){
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
		const el = document.querySelectorAll('div.box:last-child')[0];

		if(!el || !this.remain){
			return false;
		}
		this.params.send_time = el.getAttribute('data-time');
		
		if(this.state.status!='pending'){
			if(scrolltop + window.innerHeight + 10 >= Math.ceil(document.body.scrollHeight)){
				this.params.page_size = ++this.page;
				this.getdata();
			}
		}
	}
	getdata=()=>{
		api.FetchPost(this.ajax[this.state.messagetype],{
			"UserKey" : this.props.userstate.userKey,
			"token" : this.token,
			body : JSON.stringify(this.params)
		}).then(({res})=>{
			const resdata = res.data.system_map ? res.data.system_map : res.data.message_map;
			this.remain = res.data.remain;
			this.username = res.data.username;

			if(this.page>1 && api.isEmptyObject(resdata)){
				return false;
			}
			
			if(!api.isEmptyObject(resdata)){
				if(api.isEmptyObject(this.state.list)){
					setTimeout(()=>{
						this.setState({ "list" : resdata ,"status" : 'success' },()=>{
							document.addEventListener('scroll',this.scroll,false);
						});
					},500);
				}else{
					let list = Object.assign({}, this.state.list);
					let newlist = {};
					Object.keys(list).map((key)=>{
						Object.keys(resdata).map((key2)=>{
							if(!list[key2]){
								if(newlist[key2]){
									newlist[key2] = [];
								}
								newlist[key2] = resdata[key2];
							}else{
								if(!newlist[key]){
									newlist[key] = [];
								}
								if(resdata[key]!=void 0){
									newlist[key] = list[key].concat(resdata[key]);
								}else{
									newlist[key] = list[key];
								}
							}
						});
					});
					setTimeout(()=>{
						this.setState({ "list" : Object.assign(newlist, list) ,"status" : 'success' },()=>{
							document.addEventListener('scroll',this.scroll,false);
						});
					},500);
				}
			}else{
				this.setState({ "status" : 'nodata' });
			}
		});
	}
	showsyslist=()=>{
		return Object.keys(this.state.list).map((key)=>{
			return <div className="box" key={key} data-time={key}>
						<h2>{key}</h2>
						<ul>
							{
								this.state.list[key].map((item ,index)=>{
									return <li key={item.system_message_id}>
												<p className="left">
													<img src={sysicon} />
												</p>
												<p className="right">
													{ 
														item.system_type==1
														? <Link to={{ "pathname" : "/" ,state : { "userid" : item.subscribe_user_id }}}>{item.content}</Link>
														: item.content
													}
												</p>
										</li>
								})
							}
						</ul>
					</div>
		});
	}
	showtitle=(obj)=>{
		if(obj.message_type==1){
			return `笔试邀请-${obj.position_name}`;
		}
		if(obj.message_type==2){
			return `面试邀请-${obj.position_name}`;
		}
		if(obj.message_type==3){
			return `录用邀请-${obj.position_name}`;
		}
		if(obj.message_type==4){
			return `${obj.position_name}笔试时间更改-${obj.written_exam_time}`; 
		}
		if(obj.message_type==5){
			return `笔试取消-${obj.position_name}`;
		}
		if(obj.message_type==6){
			return `面试取消-${obj.position_name}`;
		}
	}
	showimg=(type)=>{
		if(type==1){
			return icon17;
		}
		if(type==2){
			return icon24;
		}
		if(type==3){
			return icon23;
		}
		if(type==4){
			return icon27;
		}
		if(type==5){
			return icon26;
		}
		if(type==6){
			return icon25;
		}
	}
	showcomlist=()=>{
		return Object.keys(this.state.list).sort().reverse().map((key)=>{
			return <div className="box" key={key} data-time={key}>
						<h2>{key}</h2>
						<ul>
							{
								this.state.list[key].map((item ,index)=>{
									return <li key={item.message_id}>
											<div className="combox">
												<h3>{this.showtitle(item)}</h3>
												{item.message_type < 4 ? <img src={this.showimg(item.message_type)} /> : ''}
												<div className="combd">
													<p>{item.message_type!=3 ? `您好,${this.username}同学,收到你的简历` : ''}</p>
													{
														item.message_type==1 
														? <Link to={{ "pathname" : "/offer" ,state : { "id" : item.position_id }}}><p className="que"><span>阅读原文</span><i className="icon3"></i></p></Link>
														: item.message_type==2 
														? <Link to={{ "pathname" : "/mianshioffer" ,state : { "id" : item.position_id ,"planid" : item.plan_id }}}><p className="que"><span>阅读原文</span><i className="icon3"></i></p></Link>
														: item.message_type==3
														? <Link to={{ "pathname" : "/luyongoffer" ,state : { "id" : item.position_id }}}><p className="que"><span>阅读原文</span><i className="icon3"></i></p></Link>
														: ''
													}
												</div>
											</div>
									</li>
								})
							}
						</ul>
					</div>
		});
	}
	render(){
		return(
			<div className="noticedetail">
				<div className="hd">
					<span><Link to="/sysmessage"><i className="icon3"></i></Link></span>
					<span>{this.state.messagetype==0 ? '系统消息' : this.props.location.state.companyname}</span>
					<span></span>
				</div>
				<div className="bd">
					{
						this.page==1 && this.state.status=='pending' ? <Tip text="" type="loading" /> 
						: this.page==1 && this.state.status=='nodata' ? <Tip text="抱歉，暂时没有相关内容" type="nodata" />
						: this.page==1 && this.state.status=='error' ? <Tip text="出错误了" type="tiperro" />
						: this.state.status=='success' && this.state.messagetype==0 ? this.showsyslist() : this.showcomlist()
					}
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
NoticeDetail = connect(mapStateToProps)(NoticeDetail)
export default NoticeDetail
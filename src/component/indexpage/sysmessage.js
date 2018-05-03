import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import api from 'api/api'
import Tip from 'component/pagemsg/tip'
import Tipshowend from 'component/pagemsg/tipshowend'
import css from 'css/indexpage'
import companylogo from 'images/companylogo.png'
import sysicon from 'images/icon16.png'

class SysMessage extends Component{
	constructor(props){
		super(props);
		this.state = {
			status : "",
			list : []
		}
		this.last_send_time = '';
		this.page = 1;
		this.remain = true;
	}
	componentDidMount(){
		window.scrollTo(0 ,0);
		this.getlist();
		api.webview("touchmail?param={\"token\":\""+this.props.userstate.token+"\"}");
	}
	getlist=()=>{
		this.setState({ "status" : "pending" } ,()=>{
			api.FetchPost('/hyb-stu/stu_user_notify_message/find_mail_list',{
				"UserKey" : this.props.userstate.userKey,
				"token" : this.token,
				body : JSON.stringify({ "page_size" : this.page, "last_send_time" : this.last_send_time })
			}).then(({res})=>{
				setTimeout(()=>{
					this.remain = res.data.remain;
					if(this.page==1 && !res.data.notify_message_list.length){ 
						this.setState({ "status" : "nodata" });
					}else if(this.page==1 && res.data.notify_message_list.length){
						this.setState({ "status" : "success" ,"list" : res.data.notify_message_list });
					}else if(this.page>1 && res.data.notify_message_list.length){
						this.setState({ "status" : "success" ,"list" : this.state.list.concat(res.data.notify_message_list) });
					}else{
						this.setState({ "status" : "success" });
					}
				},500);
			});
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
		const el = document.querySelectorAll('ul.syslist li:last-child')[0];
		if(!el || !this.remain){
			return false;
		}
		this.last_send_time = el.getAttribute('data-time');
		
		if(this.state.status!='pending'){
			if(scrolltop + window.innerHeight + 10 >= Math.ceil(document.body.scrollHeight)){
				++this.page;
				this.getlist();
			}
		}
	}
	render(){
		return(
			<div className="indexPage" id="syslist">
				<div className="hd2">
					<span><Link to="/me"><i className="icon3"></i></Link></span>
					<span>消息</span>
					<span></span>
				</div>
				<ul className="syslist">
					{ this.page==1 && this.state.status=='pending' ? <Tip text="" type="loading" /> : '' }
					{ this.page==1 && this.state.status=='error' ? <Tip text="出错误了" type="tiperro" /> : '' }
					{ this.page==1 && this.state.status=='nodata' ? <Tip text="抱歉，暂时没有相关内容" type="nodata" /> : '' }
					{
						this.state.list.map((item ,index)=>{
							return item.message_type==1 ? <li key={index} data-time={item.last_send_time}>
								<Link to={{ "pathname" : "/noticedetail" ,state : { "mailcount" : item.mail_count ,"companyname" : item.title ,"messagetype" : item.message_type ,"entid" : item.ent_id ,"mailid" : item.mail_id }}}>
									<div className="left">
										<label>
											<img src={item.message_type==0 ? sysicon : item.ent_logo ? item.ent_logo : companylogo} />
											{item.mail_count ? <b>{item.mail_count}</b> : ''}
										</label>
									</div>
									<div className="right">
										<p><span>{item.title}</span><em>{api.showdaytext(item.last_send_time)}</em></p>
										<p>{item.content}</p>
									</div>
								</Link>
							</li> : ''
						})
					}
				</ul>
				{ this.page > 1 && this.state.status=='pending' ? <Tipshowend text="加载中请稍等"/> : '' }
			</div>
		)
	}
}
const mapStateToProps = (state ,ownProps) =>{
	return {
		userstate : state.UserState
	}
}
SysMessage = connect(mapStateToProps)(SysMessage)
export default SysMessage
import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import api from 'api/api'
import 'css/merelease'
import usericonimg from 'images/icon6.png'
import Tip from 'component/pagemsg/tip'
import { fankui } from 'api/config'

class Suggestions extends Component{
	constructor(props){
		super(props);
		this.state = {
			status : 'pending',
			list : []
		}
		this.create_time = '';
		this.page = 1;
		this.select = 0;
		this.ajax = [
			'/hyb-stu/stu_user_suggestion/find_auditing_status_suggestion_list',
			'/hyb-stu/stu_user_suggestion/find_user_suggestion_list'
		]
		this.remain = true;
		this.haszijidianji = false; 
	}
	componentDidMount=()=>{
		window.scrollTo(0,0);
		this.getdata();
	}
	componentDidUpdate =()=>{
		document.addEventListener('scroll',this.scroll,false);
	}
	componentWillUnmount=()=>{
		document.removeEventListener('scroll',this.scroll);
	}
	getdata=()=>{
		api.FetchPost(this.ajax[this.select],{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({ 
				create_time : this.create_time,
				page_size : this.page  
			})
		}).then(({res})=>{
			this.remain = res.data.remain;
			if(this.page==1 && !res.data.suggestion_list.length){
				this.setState({ "status" : 'nodata' });
			}else if(this.page==1 && res.data.suggestion_list.length){
				this.setState({ "status" : 'success' ,'list' : res.data.suggestion_list });
				this.create_time = res.data.suggestion_list[res.data.suggestion_list.length-1].create_time;
			}else if(res.data.suggestion_list.length){
				this.setState({ "status" : 'success' ,'list' : this.state.concat(res.data.suggestion_list) });
				this.create_time = res.data.suggestion_list[res.data.suggestion_list.length-1].create_time;
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
	change=(event)=>{
		if(!event.target.classList.contains('on')){
			document.querySelectorAll('ul.nav li.on')[0].classList.remove('on');
			event.target.classList.add('on');
			this.select = event.target.getAttribute('data-id');
			this.page = 1;
			this.create_time = '';
			this.haszijidianji = false;
			this.getdata();
		}
	}
	action=(event)=>{
		const el = api.getTarget(event.target ,'span') ,e = event.target,
			params = el.getAttribute('data-type')=='praise' ? {"suggestion_id" : el.getAttribute('data-id') ,"praise" : 1} : {"suggestion_id" : el.getAttribute('data-id') ,"tread" : 1}; 
		
		if(this.haszijidianji){
			return false;
		}

		api.FetchPost('/hyb-stu/stu_user_suggestion/praise_tread_suggestion',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify(params)
		}).then(({res})=>{
			this.haszijidianji = true;
			el.querySelectorAll('b')[0].innerHTML = el.querySelectorAll('b')[0].innerHTML*1 + 1;
			el.querySelectorAll('i')[0].classList.add('on');
		});
	}
	render(){
		return (
			<div className="merelease">
				<div className="hd">
					<span><Link to="/me"><i className="icon3"></i></Link></span>
					<span>意见反馈</span>
					<span><Link to="/addsuggestions">添加</Link></span>
				</div>
				<ul className="nav">
					<li className="on" data-id="0" onClick={this.change}>用户反馈</li>
					<li data-id="1" onClick={this.change}>我的反馈</li>
				</ul>
				<div className="bd">
					{
						this.page==1 && this.state.status=='pending' ? <Tip text="" type="loading" /> 
						: this.state.status=='nodata' ? <Tip text="抱歉，暂时没有相关内容" type="nodata" />
						: this.state.status=='error' ? <Tip text="出错误了" type="tiperro" />
						: this.state.list.map((item ,index)=>{
							return <div className="box" key={index}>
										<div className="boxhd">
											<b><img src={item.icon ? item.icon : usericonimg} /></b>
											<p>{item.name}</p>
											<em><i className="icon3"></i>{fankui[item.suggestion_type]}</em>
										</div>
										<div className="boxbd">
											<p>{item.content}</p>
											<ul className="imglist specbackimg">
											{
												item.pictures && item.pictures.length ? item.pictures.map((pic ,i)=>{
													return <li key={i} style={{"backgroundImage":"url("+pic+")"}}></li>
												}) : ''
											}
											</ul>
										</div>
										<div className="ft">
											<span data-id={item.suggestion_id} onClick={this.action} data-type="tread"><i className={item.suggestion_status==1 ? "icon3 a on" : "icon3 a"}></i><b>{item.tread_count}</b></span>
											<span data-id={item.suggestion_id} onClick={this.action} data-type="praise"><i className={item.suggestion_status==0  ? "icon3 c on" : "icon3 c"}></i><b>{item.praise_count}</b></span>
										</div>
									</div>
						})
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
Suggestions = connect(mapStateToProps)(Suggestions)
export default Suggestions
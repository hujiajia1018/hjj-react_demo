import React, { Component } from 'react'
import { Link ,hashHistory } from 'react-router'
import { connect } from 'react-redux'
import api from 'api/api'
import "css/subscription"
import usericonimg from 'images/icon6.png'
import Tip from 'component/pagemsg/tip'

class MyFans extends Component{
	constructor(props){
		super(props);
		this.state = {
			list : [],
			status : 'pending'
		}
		this.subscribe_time = '';
		this.page = 1;
		this.remain = true;
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
		const el = document.querySelectorAll('ul.list li:last-child')[0];
		if(!el){
			return;
		}
		
		if(this.state.status!='pending'){
			if(scrolltop + window.innerHeight + 10 >= Math.ceil(document.body.scrollHeight)){
				this.getdata();
			}
		}
	}
	getdata=()=>{
		api.FetchPost('/hyb-stu/stu_user_subscribe/find_user_fans_list',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({ 
				subscribe_time : this.subscribe_time,
				page_size : this.page  
			})
		}).then(({res})=>{
			this.remain = res.data.remain;
			if(this.page==1 && !res.data.subscribe_list.length){
				this.setState({ "status" : 'nodata' });
			}else if(this.page>1 && res.data.subscribe_list.length){
				this.setState({ "list" : this.state.list.concat(res.data.subscribe_list) ,"status" : 'success' });
			}else if(this.page==1 && res.data.subscribe_list.length){
				this.setState({ "list" : res.data.subscribe_list ,"status" : 'success' });
			}
		},()=>{
			this.setState({ "status" : 'error' });
		});
	}
	componentDidUpdate =()=>{
		document.addEventListener('scroll',this.scroll,false);
	}
	componentWillUnmount=()=>{
		document.removeEventListener('scroll',this.scroll);
	}
	select=(event)=>{
		const el = api.closest(event.target ,'li');
		if(el.classList.contains('on')){
			el.classList.remove('on');
			event.target.textContent='订阅';
		}else{
			el.classList.add('on');
			event.target.textContent='已订阅';
		}
	}
	back=()=>{
		let array = [] ,elm = document.querySelectorAll('ul.dy li.on');
		for(let item of elm){
			array.push({ "subscribe_id" : item.getAttribute('data-id') });
		}
		api.FetchPost('/hyb-stu/stu_user_subscribe/cancel_subscribe_multi',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({ 
				subscribe_ids : array
			})
		}).then((res)=>{
			hashHistory.push('/me');
		});
	}
	scroll=(event)=>{
		let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
		const el = document.querySelectorAll('ul.dy li:last-child')[0];
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
	render(){
		return(
			<div className="subscription">
				<div className="hd">
					<span onClick={this.back}><i className="icon"></i>返回</span>
					<span>粉丝</span>
					<span></span>
				</div>
				<div className="bd">
					<ul className="dy">
						{
							this.state.status=='success' ? this.state.list.map((item ,index)=>{
								return  <li key={index} data-id={item.subscribe_id}><img src={usericonimg} /><span>{item.subscribe_user_name}</span><em onClick={this.select}>订阅</em></li>
							}) : this.state.status=='pending' ? <Tip text="" type="loading" /> : this.state.status=='nodata' ? <Tip text="抱歉，暂时没有相关内容" type="nodata" /> : <Tip text="出错误了" type="tiperro" />
						}
					</ul>
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
MyFans = connect(mapStateToProps)(MyFans)
export default MyFans
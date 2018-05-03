import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { clearCompanyList } from 'action/companylistAction'
import { clearPositionList } from 'action/positionlistAction'
import { GetMyJobList ,RemoveJob } from 'action/aboutmyjobAction'
import api from 'api/api'
import { hangye ,zhiwei } from 'api/config'
import Tip from 'component/pagemsg/tip'
import Myjob from './myjob'
import 'css/job'

class Manage extends Component{
	constructor(props){
		super(props);
		this.state = {
			isopen : false
		}

		this.id = '';
		this.confirmMoney = '';
		this.confirmDirection = '';
		this.confirmJob = '';
		this.touchX = 0;
		this.animate = false;
	}
	componentDidMount(){
		this.props.getjoblist({
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token
		});
	}
	getposition=(id)=>{
		return id ? zhiwei[id.substring(0,3)].children[id.substring(0,6)].children[id].name : '';
	}
	gethangye=(id)=>{
		if(id){
			let list = id.split(',') ,name = [];
			list.map((val)=>{
				name.push(hangye[val]);
			})
			return name.join(' ');
		}else{
			return '';
		}
	}
	linkstate=(id)=>{
		let list = id.split(',') ,name = [];
		list.map((val)=>{ 
			name.push({ key : val , value : hangye[val] });
		})
		return name;
	}
	linkmoney=(salary)=>{
		return salary ? salary.split('-') : [];
	}
	openmyjob=(event)=>{
		if(this.animate || event.target.tagName.toLowerCase()=='b'){
			return;
		}
		const el = api.closest(event.target ,'li') ,id = el ? el.getAttribute('data-id') : '';
		if(id){
			this.props.aboutmyjob.list.map((item)=>{
				if(item.id == id){
					this.id = item.id;
					this.confirmMoney = this.linkmoney(item.expect_salary);
					this.confirmDirection = this.linkstate(item.user_industry);
					this.confirmJob = item.position_type_id;
					this.setState({ "isopen" : true });
				}
			})
		}else{
			this.id = '';
			this.confirmMoney = '';
			this.confirmDirection = '';
			this.confirmJob = '';
			this.setState({ "isopen" : true });
		}
	}
	back=()=>{
		this.setState({ "isopen" : false });
	}
	backtopersonmsg=()=>{
		this.props.back(3);
	}
	remove =(event)=>{
		const id = api.closest(event.target ,'li').getAttribute('data-id');
		this.props.RemoveJob({
			token : this.props.userstate.token,
			UserKey : this.props.userstate.userKey,
			id : id
		});
		this.props.clearpositionList();
		this.props.clearcompanyList();
		document.querySelectorAll('.managejoblist li.showbtn')[0].classList.remove('showbtn');
	}
	handleBind = (event)=>{
		if(event.type=='touchstart'){
			this.touchStart(event);
		}else if(event.type=='touchmove'){
			this.touchMove(event);
		}
	}
	touchStart = (event)=>{
		this.touchX = event.targetTouches[0].pageX;
		this.hasshow = document.querySelectorAll('.managejoblist li.showbtn');
	}
	touchMove = (event)=>{
		event.preventDefault();
		let dir = event.targetTouches[0].pageX - this.touchX ,direction = dir > 0 ? 1 : -1;// 鼠往左  -1  鼠标往右  1
		const el = api.closest(event.target ,'li');
		
		if(document.querySelectorAll('.managejoblist li').length==1){
			return;
		}

		if(this.hasshow.length && direction<0){
			this.hasshow[0].classList.remove('showbtn');
			return;
		}
		
		const end = ()=>{
			setTimeout(()=>{
				this.animate = false;
			},200);
		}

		if(!this.animate && Math.abs(dir)>=30){ 
			if(direction>0){
				el.classList.remove('showbtn');
			}else{
				el.classList.add('showbtn');
			}
			this.animate = true;
			window.addEventListener('touchend' ,end ,false);
		}
	}
	render(){
		return (
			<div className="job" id="manage">
				<div className="hd">
					{
						this.props.back ? <span onClick={this.backtopersonmsg}><i className="icon3"></i></span> : <Link to="/position"><span><i className="icon3"></i></span></Link>
					}
					<span>管理求职意向</span>
					<span></span>
				</div>
				<div className="box">
					<div className="titlemsg"><i className="icon3"></i>多个求职意向时 左划删除不需要的求职意向</div> 
					<ul className="managejoblist">
						{  
							this.props.aboutmyjob.status =='pending' ? <Tip text="" type="loading" />
							: this.props.aboutmyjob.status =='nodata' ? <Tip text="抱歉，暂时没有相关内容" type="nodata" />
							: this.props.aboutmyjob.status =='success' ? this.props.aboutmyjob.list.map((item ,key)=>{
								return <li key={key} data-id={item.id} onClick={this.openmyjob} onTouchStart={this.handleBind} onTouchMove={this.handleBind}>
										<div>
											<p><span>{this.getposition(item.position_type_id)}</span><span>{item.expect_salary}</span></p>
											<p><span>{this.gethangye(item.user_industry)}</span><span>{item.update_time.split(' ')[0]} 创建</span></p>
										</div>
										<b onClick={this.remove}>删除</b>
									</li>
							}) : <Tip text="出错误了" type="tiperro" />
						}
					</ul>
					<ReactCSSTransitionGroup transitionName="jobAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
						{this.state.isopen ? <Myjob back={this.back} id={this.id} confirmMoney={this.confirmMoney} confirmDirection={this.confirmDirection} confirmJob={this.confirmJob} /> : ''}
					</ReactCSSTransitionGroup>
					{ (this.props.aboutmyjob.status =='success' && this.props.aboutmyjob.list.length<3) ? <p className="adduserjob" onClick={this.openmyjob}>增加求职意向</p> : '' }
				</div>
			</div>
		)
	}
}
const mapDispatchToProps = (dispath) =>{
	return {
		getjoblist : bindActionCreators(GetMyJobList ,dispath),
		RemoveJob : bindActionCreators(RemoveJob ,dispath),
		clearcompanyList : bindActionCreators(clearCompanyList ,dispath),
		clearpositionList : bindActionCreators(clearPositionList ,dispath)
	}
}
const mapStateToProps = (state ,ownProps) =>{
	return {
		userstate : state.UserState,
		aboutmyjob : state.AboutMyJob
	}
}
Manage = connect(mapStateToProps ,mapDispatchToProps)(Manage)
export default Manage
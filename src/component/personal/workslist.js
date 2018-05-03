import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { GetWorkList ,RemoveWorkList } from 'action/worklistAction'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Tip from 'component/pagemsg/tip'
import 'css/education'
import api from 'api/api'
import WorkDetail from './workdetail'

class WorkList extends Component{
	constructor(props){
		super(props);
		this.state = {
			detail : {
				id : '',
				url : '',
				work_desc : '',
				user_id : ''
			},
			isopen : false
		}

		this.touchX = 0;
		this.animate = false;
	}
	componentDidMount(){
		this.props.getworklist({
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token
		})
	}
	back=()=>{
		this.props.back(5);
	}
	setWorkdetail=(event)=>{
		if(!this.animate && event.target.tagName.toLowerCase()!='b'){
			const id = api.closest(event.target ,'li').getAttribute('data-id');
			this.setState({"isopen" : true ,"detail" : Object.assign({}, this.state.detail, this.props.worklist.list[id])});
		}
	}
	close=()=>{
		this.setState({ "isopen" : !this.state.isopen });
	}
	newedu=()=>{
		this.setState({ "isopen" : !this.state.isopen ,"detail" : Object.assign({}, {
			"id" : '',
			"url" : '',
			"work_desc" : '',
			"user_id" : ''
		}) });
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
		this.hasshow = document.querySelectorAll('.educationlist li.showbtn');
	}
	touchMove = (event)=>{
		event.preventDefault();
		let dir = event.targetTouches[0].pageX - this.touchX ,direction = dir > 0 ? 1 : -1;// 鼠往左  -1  鼠标往右  1
		const el = api.closest(event.target ,'li');
		
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
	removework=(event)=>{
		const el = api.closest(event.target ,'li'),
				id = el.getAttribute('data-id'),
				itemid = el.getAttribute('data-item-id');

		this.props.removelist({
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token
		},id ,itemid);
	}
	render(){
		return(
			<div className="education">
				<div className="hd">
					<span className="edu" onClick={this.back}><i className="icon3"></i></span>
					<span className="edu">个人作品</span>
					{
						this.props.worklist.list.length>3 ? <span className="edu"></span> : <span className="edu" onClick={this.newedu}>新建</span>
					}
				</div>
				<ul className="educationlist">
					{
						this.props.worklist.status == 'pending' ? <Tip text="" type="loading" />
						: this.props.worklist.status == 'nodata' ? <Tip text="请完善个人作品" type="nodata" />
						: this.props.worklist.status =='success' 
						? this.props.worklist.list.map((item ,index)=>{
							return <li onClick={this.setWorkdetail} onTouchStart={this.handleBind} onTouchMove={this.handleBind} key={item.id} data-item-id={item.id} data-id={index} >
								<div>
									<p className="timetitle"><i className="icon3 worklisticon"></i>作品{index+1}</p>
									<p className="timecon">
										<em className="worklink">{item.url}</em>
										<em>作品简述：{item.work_desc}<br/>…</em>
										<i className="icon3"></i>
									</p>
								</div>
								<b onClick={this.removework}>删除</b>
							</li>
						}) : <Tip text="出错误了" type="tiperro" />
					}
				</ul>
				<ReactCSSTransitionGroup transitionName="personmessageAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{ this.state.isopen ? <WorkDetail detail={this.state.detail} close={this.close} /> : '' }
				</ReactCSSTransitionGroup>
			</div>
		)
	}
}
const mapStateToProps = (state ,ownProps) =>{
	return {
		userstate : state.UserState,
		worklist : state.WorkList
	}
}
const mapDispatchToProps = (dispath) =>{
	return {
		getworklist : bindActionCreators(GetWorkList ,dispath),
		removelist : bindActionCreators(RemoveWorkList ,dispath)
	}
}

WorkList = connect(mapStateToProps ,mapDispatchToProps)(WorkList)
export default WorkList
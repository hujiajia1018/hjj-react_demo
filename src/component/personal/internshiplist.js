import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { GetInternShipList ,RemoveInternShipList } from 'action/internshiplistAction'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Tip from 'component/pagemsg/tip'
import 'css/education'
import api from 'api/api'
import InternshipDetail from './internshipdetail'

class InternShiplist extends Component{
	constructor(props){
		super(props);
		this.state = {
			detail : {
				ent_name : '',  
				position_name : '', 
				start_time : '',
				end_time : '',
				intern_desc : '',
				id : ''
			},
			isopen : false
		}

		this.touchX = 0;
		this.animate = false;
	}
	componentDidMount(){
		this.props.getlist({
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token
		})
	}
	back=()=>{
		this.props.back(9);
	}
	changeday=(val)=>{
		const day = val.split('-');
		return `${day[0]}年${day[1]}月`;
	}
	setEduDetail=(event)=>{
		if(!this.animate && event.target.tagName.toLowerCase()!='b'){
			const id = api.closest(event.target ,'li').getAttribute('data-id');
			this.setState({"isopen" : true ,"detail" : Object.assign({}, this.state.detail, this.props.interlist.list[id])});
		}
	}
	close=()=>{
		this.setState({ "isopen" : !this.state.isopen });
	}
	newedu=()=>{
		this.setState({ "isopen" : !this.state.isopen ,"detail" : Object.assign({}, {
			"ent_name" : '',  
			"position_name" : '', 
			"start_time" : '',
			"end_time" : '',
			"intern_desc" : '',
			"id" : ''
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
	removeedu=(event)=>{
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
					<span className="edu">实习经历</span>
					{
						this.props.interlist.list.length>3 ? <span className="edu"></span> : <span className="edu" onClick={this.newedu}>新建</span>
					}
				</div>
				<ul className="educationlist">
					{
						this.props.interlist.status == 'pending' ? <Tip text="" type="loading" />
						: this.props.interlist.status == 'nodata' ? <Tip text="请完善实习经历" type="nodata" />
						: this.props.interlist.status =='success' 
						? this.props.interlist.list.map((item ,index)=>{
							return <li onClick={this.setEduDetail} onTouchStart={this.handleBind} onTouchMove={this.handleBind} key={item.id} data-item-id={item.id} data-id={index} >
								<div>
									<p className="timetitle"><i className="icon3"></i>{this.changeday(item.start_time)} - {this.changeday(item.end_time)}</p>
									<p className="timecon">
										<em className="graduated">{item.ent_name}</em>
										<em>担任职位：{item.position_name}<br/>…</em>
										<i className="icon3"></i>
									</p>
								</div>
								<b onClick={this.removeedu}>删除</b>
							</li>
						}) : <Tip text="出错误了" type="tiperro" />
					}
				</ul>
				<ReactCSSTransitionGroup transitionName="personmessageAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{ this.state.isopen ? <InternshipDetail detail={this.state.detail} close={this.close} /> : '' }
				</ReactCSSTransitionGroup>
			</div>
		)
	}
}
const mapStateToProps = (state ,ownProps) =>{
	return {
		userstate : state.UserState,
		interlist : state.InternShipList
	}
}
const mapDispatchToProps = (dispath) =>{
	return {
		getlist : bindActionCreators(GetInternShipList ,dispath),
		removelist : bindActionCreators(RemoveInternShipList ,dispath)
	}
}

InternShiplist = connect(mapStateToProps ,mapDispatchToProps)(InternShiplist)
export default InternShiplist
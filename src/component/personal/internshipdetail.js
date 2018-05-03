import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SetInternShipList } from 'action/internshiplistAction'
import Picker from 'plugins/picker/index'
import TipSelect from 'component/pagemsg/tipselect'
import 'css/education'
import api from 'api/api'

class InternShipDetail extends Component{
	constructor(props){
		super(props);
		this.ismodify = false;
		this.state = this.props.detail ? {
			istip : false,
			ispicker : false,
			tipselect : false,
			ent_name : this.props.detail.ent_name,
			position_name : this.props.detail.position_name,
			start_time : this.props.detail.start_time,
			end_time : this.props.detail.end_time,
			intern_desc : this.props.detail.intern_desc,
			id : this.props.detail.id
		} : {
			istip : false,
			ispicker : false,
			tipselect : false,
			ent_name : '',
			position_name : '',
			start_time : '',
			end_time : '',
			intern_desc : '',
			id : ''
		};
		this.tipmsg = ['您的修改尚未保存' ,'取消' ,'放弃'];

		this.pickerval = {};
		this.picktext = '';
		this.openwho = '';

		this.day = {
			"year" : {
				initval : "2004年",
				val : ["2000年","2001年","2002年","2003年","2004年","2005年","2006年","2007年","2008年","2009年","2010年","2011年","2012年","2013年","2014年","2015年","2016年","2017年","2018年","2019年","2020年"]
			},
			"month" : {
				initval : "05月",
				val : ["01月","02月","03月","04月","05月","06月","07月","08月","09月","10月","11月","12月"]
			}
		}
		
		this.daytext = "时间";
		this.experienceNumber = this.props.detail ? this.props.detail.intern_desc.length : 0;
		this.hassubmit = false;
	}
	back=(a)=>{
		a==1 ? this.props.close(9 ,'isinternship') : this.setState({ "tipselect" : false });
	}
	setactive=(event)=>{
		this.setState({ "ent_name" : event.target.value });
		this.ismodify = true;
	}
	setdutyrole=(event)=>{
		this.setState({ "position_name" : event.target.value });
		this.ismodify = true;
	}
	setexperience=(event)=>{
		this.experienceNumber = event.target.value.length;
		this.experienceNumber > 300 ? this.refs.textareaelm.classList.add('redbor') : this.refs.textareaelm.classList.remove('redbor');
		this.setState({ "intern_desc" : event.target.value });
		this.ismodify = true;
	}
	getdata=(obj ,issave)=>{
		if(issave){
			let day = (obj.year+obj.month).replace(/([0-9]+).([0-9]+)./,'$1-$2');
			if(this.openwho=='time1'){
				this.setState({ "ispicker" : false ,"start_time" : day });
			}
			if(this.openwho=='time2'){
				this.setState({ "ispicker" : false ,"end_time" : day });
			}
			this.ismodify = true;
		}else{
			this.setState({ "ispicker" : false });
		}
	}
	open=(event)=>{
		this.openwho = api.closest(event.target ,'li').getAttribute('data-type');
		if(this.openwho=='time1' || this.openwho=='time2'){
			let time = '';
			if(this.openwho=='time1' && this.state.start_time){
				time = this.state.start_time.split('-');
			}
			if(this.openwho=='time2' && this.state.end_time){
				time = this.state.end_time.split('-');
			}
			if(time){
				this.day.year.initval = `${time[0]}年`;
				this.day.year.val = api.roller(time[0] ,this.day.year.val);
			
				this.day.month.initval = `${time[1]}月`;
				this.day.month.val = api.roller(time[1] ,this.day.month.val);
			}
			
			this.pickerval = this.day;
			this.picktext = this.daytext;
			this.setState({ "ispicker" : true });
		}
	}
	opentipselect=()=>{
		if(this.ismodify && !this.state.tipselect){
			this.setState({ "tipselect" : true });
		}else{
			this.props.close(9 ,'isinternship');
		}
	}
	sub=()=>{
		if(this.experienceNumber>300 || !this.state.ent_name || !this.state.position_name || !this.state.intern_desc || !this.state.start_time || !this.state.end_time){
			return false;
		}
		if(this.hassubmit){
			return false;
		}
		this.hassubmit = true;
		this.props.setlist({
			token : this.props.userstate.token,
			UserKey : this.props.userstate.userKey,
			body : JSON.stringify({
				"ent_name" : this.state.ent_name,
				"position_name" : this.state.position_name,
				"start_time" : this.state.start_time,
				"end_time" : this.state.end_time,
				"intern_desc" : this.state.intern_desc,
				"id" : this.state.id
			})
		},()=>{
			this.props.close();
		},()=>{
			this.hassubmit = false;
		});
	}
	render(){
		return(
			<div className="education" id="editedu">
				<div className="hd">
					<span className="edu" onClick={this.opentipselect}><i className="icon3"></i></span>
					<span className="edu">实习经历</span>
					<span className="edu"></span>
				</div>
				<ul className="editedu">
					<li><span>公司名称</span><input maxLength="30" type="text" value={this.state.ent_name} onChange={this.setactive}/></li>
					<li><span>职位名称</span><input maxLength="30" type="text" value={this.state.position_name} onChange={this.setdutyrole}/></li>
					<li onClick={this.open} data-type="time1"><span>开始时间</span><b>{this.state.start_time}</b></li>
					<li onClick={this.open} data-type="time2"><span>结束时间</span><b>{this.state.end_time}</b></li>
					<li className="pertext"><span>实习简述</span><textarea ref="textareaelm" maxLength="300" value={this.state.intern_desc} onChange={this.setexperience}></textarea><span className="number">({this.experienceNumber}/300)</span></li>
				</ul>
				<ReactCSSTransitionGroup transitionName="pickerMsgAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.ispicker ? <Picker pickerval={this.pickerval} handle={this.getdata} titletext={this.picktext}/> : ''}
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="tipselectAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.tipselect ? <TipSelect text={this.tipmsg} handleclose={this.back}/> : ''}
				</ReactCSSTransitionGroup>	
				<p className="complete" onClick={this.sub}>完成</p>
			</div>
		)
	}
}
const mapStateToProps = (state ,ownProps) =>{
	return {
		userstate : state.UserState
	}
}
const mapDispatchToProps = (dispath) =>{
	return {
		setlist : bindActionCreators(SetInternShipList ,dispath)
	}
}
InternShipDetail = connect(mapStateToProps ,mapDispatchToProps)(InternShipDetail)
export default InternShipDetail

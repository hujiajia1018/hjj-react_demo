import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SetEducationList } from 'action/educationAction'
import Picker from 'plugins/picker/index'
import TipSelect from 'component/pagemsg/tipselect'
import ZhuanYeList from 'component/zhuanyelist'
import 'css/education'
import api from 'api/api'
import { xueli } from 'api/config'

class EducationDetail extends Component{
	constructor(props){
		super(props);
		this.state = {
			istip : false,
			ispicker : false,
			iszhiwei : false,
			tipselect : false,
			id : '',
			graduated_from : '', //毕业院校
			edu_level : '', //学历
			dept_level : '', //专业
			dept_level_name : '', //专业名称
			enrollment_date : '', //入学时间
			graduated_date : '',//毕业时间
			duty : ''   //担任职务
		}
		this.ismodify = false;
		this.tipmsg = ['您的修改尚未保存' ,'取消' ,'放弃'];

		this.pickerval = {};
		this.picktext = '';
		this.openwho = '';

		this.xueli = {
			"xl" : {
				initval : "本科",
				val : ["博士","大专","本科","硕士"]
			}
		}
		this.xuelitext = '';

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
		this.hassubmit = false;
	}
	componentDidMount(){
		this.setState( this.props.detail ? {
			"id" : this.props.detail.id ,
			"graduated_from" : this.props.detail.graduated_from ,
			"edu_level" : this.props.detail.edu_level,
			"dept_level" : this.props.detail.dept_level,
			"dept_level_name" : this.props.detail.dept_level_name,
			"enrollment_date" : this.props.detail.enrollment_date,
			"graduated_date" : this.props.detail.graduated_date,
			"duty" : this.props.detail.duty
		} : {
			"id" : '',
			"graduated_from" : '',
			"edu_level" : '',
			"dept_level" : '',
			"dept_level_name" : '',
			"enrollment_date" : '',
			"graduated_date" : '',
			"duty" : ''
		});
	}
	back=(a)=>{
		a==1 ? this.props.close(4 ,'isEducation') : this.setState({ "tipselect" : false });
	}
	opentipselect=()=>{
		if(this.ismodify && !this.state.tipselect){
			this.setState({ "tipselect" : true });
		}else{
			this.props.close(4 ,'isEducation');
		}
	}
	setxuexiao=(event)=>{
		this.setState({ "graduated_from" : event.target.value });
		this.ismodify = true;
	}
	setduty=(event)=>{
		this.setState({ "duty" : event.target.value });
		this.ismodify = true;
	}
	setdeptname=(event)=>{
		this.setState({ "dept_level_name" : event.target.value });
		this.ismodify = true;
	}
	getdata=(obj ,issave)=>{
		if(issave){
			if(this.openwho=='xueli'){
				Object.keys(xueli).map((key)=>{
					if(xueli[key]==obj.xl){
						this.setState({ "ispicker" : false ,"edu_level" : key });
					}
				});
			}else{
				let day = (obj.year+obj.month).replace(/([0-9]+).([0-9]+)./,'$1-$2');
				if(this.openwho=='time1'){ /*入学时间*/
					this.setState({ "ispicker" : false ,"enrollment_date" : day });
				}
				if(this.openwho=='time2'){ /*毕业时间*/
					this.setState({ "ispicker" : false ,"graduated_date" : day });
				}
			}
			this.ismodify = true;
		}else{
			this.setState({ "ispicker" : false });
		}
	}
	open=(event)=>{
		this.openwho = api.closest(event.target ,'li').getAttribute('data-type');
		if(this.openwho=='xueli'){
			if(this.state.edu_level!=''){
				if(xueli[this.state.edu_level]=='本科'){
					this.xueli.xl.initval = '本科';
					this.xueli.xl.val = ["博士","大专","本科","硕士"];
				}
				if(xueli[this.state.edu_level]=='博士'){
					this.xueli.xl.initval = '博士';
					this.xueli.xl.val = ["本科","硕士","博士","大专"];
				}
				if(xueli[this.state.edu_level]=='大专'){
					this.xueli.xl.initval = '大专';
					this.xueli.xl.val = ["硕士","博士","大专","本科"];
				}
				if(xueli[this.state.edu_level]=='硕士'){
					this.xueli.xl.initval = '大专';
					this.xueli.xl.val = ["大专","本科","硕士","博士"];
				}
			}

			this.pickerval = this.xueli;
			this.picktext = this.xuelitext;
			this.setState({ "ispicker" : true });
		}
		if(this.openwho=='time1' || this.openwho=='time2'){
			let time = '';
			if(this.state.enrollment_date && this.openwho=='time1'){
				time = this.state.enrollment_date.split('-');
			}
			if(this.state.graduated_date && this.openwho=='time2'){
				time = this.state.graduated_date.split('-');
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
		if(this.openwho=='zhiwei'){
			this.setState({ "iszhiwei" : true });
		}
	}
	closezhiweilist=(id)=>{
		if(api.isNumber(id)){
			this.setState({ "iszhiwei" : false ,"dept_level" : id });
			this.ismodify = true;
		}else{
			this.setState({ "iszhiwei" : false });
		}
	}
	sub=()=>{
		if(!this.state.graduated_from || !this.state.edu_level || !this.state.dept_level_name || !this.state.enrollment_date || !this.state.graduated_date){
			api.tip_msg('请填写必填信息','fixedmode');
			return false;
		}
		if(this.hassubmit){
			return false;
		}
		/* || !this.state.dept_level  */
		this.hassubmit = true;
		this.props.setedulist({
			token : this.props.userstate.token,
			UserKey : this.props.userstate.userKey,
			body : JSON.stringify({
				"id" : this.state.id,
				"graduated_from" : this.state.graduated_from,
				"edu_level" : this.state.edu_level,
				"dept_level" : this.state.dept_level,
				"dept_level_name" : this.state.dept_level_name,
				"enrollment_date" : this.state.enrollment_date,
				"graduated_date" : this.state.graduated_date,
				"duty" : this.state.duty
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
					<span className="edu">教育背景</span>
					<span className="edu"></span>
				</div>
				<ul className="editedu">
					<li className="litile">必填信息</li>
					<li><span><label>*</label>学校</span><input maxLength="30" type="text" value={this.state.graduated_from} onChange={this.setxuexiao}/></li>
					<li onClick={this.open} data-type="xueli"><span><label>*</label>学历</span><b>{xueli[this.state.edu_level]}</b></li>
					<li style={{"display":"none"}} onClick={this.open} data-type="zhiwei"><span><label>*</label>专业类别</span><b>{api.getzhuanyename(this.state.dept_level)}</b></li>
					<li><span><label>*</label>专业名称</span><input maxLength="30" type="text" value={this.state.dept_level_name} onChange={this.setdeptname}/></li>
					<li onClick={this.open} data-type="time1"><span><label>*</label>入学时间</span><b>{this.state.enrollment_date}</b></li>
					<li onClick={this.open} data-type="time2"><span><label>*</label>毕业时间</span><b>{this.state.graduated_date}</b></li>
					<li className="litile">选填信息</li>
					<li><span>担任职务</span><input maxLength="30" type="text" value={this.state.duty} onChange={this.setduty}/></li>
				</ul>
				<ReactCSSTransitionGroup transitionName="pickerMsgAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.ispicker ? <Picker pickerval={this.pickerval} handle={this.getdata} titletext={this.picktext}/> : ''}
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="zhuanyeAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.iszhiwei ? <ZhuanYeList close={this.closezhiweilist} selected={this.state.dept_level} /> : ''}
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
		setedulist : bindActionCreators(SetEducationList ,dispath)
	}
}
EducationDetail = connect(mapStateToProps ,mapDispatchToProps)(EducationDetail)
export default EducationDetail

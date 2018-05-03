import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Link ,hashHistory } from 'react-router'
import { connect } from 'react-redux'
import api from 'api/api'
import { sex ,uploadImg ,xueli } from 'api/config'
import 'css/newme'
import Tip from 'component/pagemsg/tip'
import TipSelect from 'component/pagemsg/tipselect'
import Picker from 'plugins/picker/index'
import userpic from 'images/icon6.png'
import boy from 'images/icon41.png'
import boychecked from 'images/icon42.png'
import girl from 'images/icon43.png'
import girlchecked from 'images/icon44.png'

class Me extends Component{
	constructor(props){
		super(props);
		this.state = {
			userimg : '',
			status : 'pending',
			tipselect : false,
			sex : '',
			user_name : '',
			graduated_from : '',
			dept_level_name : '',
			edu_level : '',
			mobile : '',
			email : '',
			ispicker : false
		}

		this.pickerval = {};
		this.xueli = {
			"xl" : {
				initval : "本科",
				val : ["博士","大专","本科","硕士"]
			}
		}
		this.xuelitext = '';

		this.ismodify = false;
		this.tipmsg = ['您的修改尚未保存' ,'取消' ,'放弃'];
	}
	componentDidMount=()=>{
		api.FetchGet('/hyb-stu/stu_resume/base/read').then((res)=>{
			if(res.data.resume){ 
				this.setState({ 
					"status" : "success",
					"userimg" : res.data.resume.icon ? res.data.resume.icon.split('?r=')[0] : '',
					"user_name" : res.data.resume.user_name ? res.data.resume.user_name : '',
					"sex" : res.data.resume.sex ? res.data.resume.sex : '',
					"mobile" : res.data.resume.account_mobile ? res.data.resume.account_mobile : '',
					"email" : res.data.resume.email ? res.data.resume.email : '',
					"graduated_from" : res.data.resume.graduated_from ? res.data.resume.graduated_from : '',
					"dept_level_name" : res.data.resume.dept_level_name ? res.data.resume.dept_level_name : '',
					"edu_level" : res.data.resume.edu_level ? res.data.resume.edu_level : ''
				},()=>{
					window.scrollTo(0,0);
				});
			}else{
				this.setState({ "status" : "success" },()=>{
					window.scrollTo(0,0);
				});
			}
		},(res)=>{
			this.setState({ "status" : "erro" });
		});
	}
	tipfn=(a)=>{
		a==1 ? hashHistory.goBack() : this.setState({ "tipselect" : false });
	}
	back=()=>{
		if(this.ismodify && this.state.status=='success'){
			this.setState({ "tipselect" : true });
		}else{
			hashHistory.goBack();
		}
	}
	setuser_name =(event)=>{
		this.setState({ "user_name" : event.target.value });
		this.ismodify = true;
	}
	setugraduated_from =(event)=>{
		this.setState({ "graduated_from" : event.target.value });
		this.ismodify = true;
	}
	setdept_level_name =(event)=>{
		this.setState({ "dept_level_name" : event.target.value });
		this.ismodify = true;
	}
	setemail =(event)=>{
		this.setState({ "email" : event.target.value });
		this.ismodify = true;
	}
	setsex =(event)=>{
		this.setState({ "sex" : event.target.getAttribute('data-sex') });
		this.ismodify = true;
	}
	open=(event)=>{
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
	getdata=(obj ,issave)=>{
		if(issave){
			Object.keys(xueli).map((key)=>{
				if(xueli[key]==obj.xl){
					this.setState({ "ispicker" : false ,"edu_level" : key });
				}
			});
			this.ismodify = true;
		}else{
			this.setState({ "ispicker" : false });
		}
	}
	setuserimg=()=>{
		const actiontype = "savetoalbum?param={\"token\":\""+this.props.userstate.token+"\" ,\"upload_type\":\""+6+"\"}";
		api.webview(actiontype ,this.getwebviewimg);
		this.ismodify = true;
	}
	getwebviewimg=(obj)=>{
		this.setState({ "userimg" : uploadImg + obj.result.avatar_url });
		api.webview("userheadicon?param={\"token\":\""+this.props.userstate.token+"\" ,\"user_icon_url\":\""+uploadImg+obj.result.avatar_url+"?r="+Math.random(1)+"\"}");
	}
	showpage(){
		return <div className="newmebd">
					<p className="title">简历照片</p>
					<div className="uploadimg" onClick={this.setuserimg}>
						<img src={this.state.userimg ? this.state.userimg + "?r="+Math.random(1) : userpic} />
					</div>
					<p className="title">性别</p>
					<div className="sexselect">
						<img onClick={this.setsex} data-sex="1" src={this.state.sex==1 ? boychecked : boy} />
						<img onClick={this.setsex} data-sex="2" src={this.state.sex==2 ? girlchecked : girl} />
					</div>
					<p className="title">基本信息</p>
					<div className="detailmsd">
						<ul>
							<li>姓　名<input type="text" placeholder="请填写" value={this.state.user_name} onChange={this.setuser_name}/></li>
							<li>学　校<input type="text" placeholder="请填写" value={this.state.graduated_from} onChange={this.setugraduated_from}/></li>
							<li>专　业<input type="text" placeholder="请填写" value={this.state.dept_level_name} onChange={this.setdept_level_name}/></li>
							<li onClick={this.open}>学　历<span>{xueli[this.state.edu_level] ? xueli[this.state.edu_level] : '请选择'}</span></li>
							<li>邮　箱<input type="text" placeholder="请填写" value={this.state.email} onChange={this.setemail} /></li>
							<li>手机号<span>{this.state.mobile}</span></li>
						</ul>
					</div>
					<p className="save" onClick={this.sub}>保 存</p>
				</div>
	}
	sub =()=>{
		if(!this.state.user_name || !this.state.sex || !this.state.edu_level || !this.state.email || !this.state.dept_level_name || !this.state.graduated_from){
			api.tip_msg('请填写必填信息','fixedmode');
			return false;
		}
		api.webview("upresumeinfo?param={\"stu_name\":\""+this.state.user_name+"\" ,\"token\":\""+this.props.userstate.token+"\" }");
		
		api.FetchPost('/hyb-stu/stu_resume/base/add_update',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({ 
				"icon" : this.state.userimg,
				"user_name" : this.state.user_name,
				"sex" : this.state.sex,
				"mobile" : this.state.mobile,
				"email" : this.state.email,
				"graduated_from" : this.state.graduated_from,
				"dept_level_name" : this.state.dept_level_name,
				"edu_level" : this.state.edu_level
			})
		}).then((res)=>{
			hashHistory.goBack();
		});
	}
	render(){
		return(
			<div className="newme">
				<div className="hd">
					<span onClick={this.back}><i className="icon3"></i></span>
					<span>编辑简历</span>
					<span></span>
				</div>
				{
					this.state.status=='pending' ? <Tip text="" type="loading" /> : this.state.status=='success' ? this.showpage() : <Tip text="出错误了" type="tiperro" />
				}
				<ReactCSSTransitionGroup transitionName="tipselectAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.tipselect ? <TipSelect text={this.tipmsg} handleclose={this.tipfn}/> : ''}
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="pickerMsgAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.ispicker ? <Picker pickerval={this.pickerval} handle={this.getdata} titletext={this.picktext}/> : ''}
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
Me = connect(mapStateToProps)(Me)
export default Me
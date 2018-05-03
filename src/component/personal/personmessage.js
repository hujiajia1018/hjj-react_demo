import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { sex ,uploadImg } from 'api/config'
import 'css/personmessage'
import userpic from 'images/icon6.png'
import api from 'api/api'
import Picker from 'plugins/picker/index'
import Tip from 'component/pagemsg/tip'
import TipSelect from 'component/pagemsg/tipselect'

class PersonMessage extends Component{
	constructor(props){
		super(props);
		this.state = {
			isPicker : false,
			icon : '',
			user_name : '',
			sex : '',
			birthday : '',
			mobile : '',
			email : '',
			residence_address : '',
			hobby : '',
			evaluation : '',
			status : 'pending',
			tipselect : false
		}
		this.ismodify = false;
		this.evaluationNumber = 0;
		this.tipmsg = ['您的修改尚未保存' ,'取消' ,'放弃'];

		this.pickerval = {};
		this.picktext = '';
		this.pickertype = '';

		this.piacksex = {
			"sex" : {
				initval : '男',
				val : ['男','女']
			}
		}
		this.sextext = '';

		this.birthday = {
			"year" : {
				initval : "1995年",
				val : ["1991年","1992年","1993年","1994年","1995年","1996年","1997年","1998年","1999年","2000年","2001年","2002年","2003年","2004年","2005年","2006年","2007年","2008年","2009年","2010年","2011年","2012年","2013年","2014年","2015年","2016年","2017年","2018年","2019年","2020年","1970年","1971年","1972年","1973年","1974年","1975年","1976年","1977年","1978年","1979年","1980年","1981年","1982年","1983年","1984年","1985年","1986年","1987年","1988年","1989年","1990年"]
			},
			"month" : {
				initval : "05月",
				val : ["01月","02月","03月","04月","05月","06月","07月","08月","09月","10月","11月","12月"]
			}
		}
		this.birthdaytext = "时间";
	}
	componentDidMount=()=>{  
		api.FetchGet('/hyb-stu/stu_resume/base/read').then((res)=>{	
			if(res.data.resume){
				this.evaluationNumber = res.data.resume.evaluation ? res.data.resume.evaluation.length : 0;
				this.setState({ 
					"status" : "success",
					"birthday" : res.data.resume.birthday ? res.data.resume.birthday : '',
					"icon" : res.data.resume.icon ? res.data.resume.icon.split('?r=')[0] : '',
					"user_name" : res.data.resume.user_name ? res.data.resume.user_name : '',
					"sex" : res.data.resume.sex ? res.data.resume.sex : '',
					"mobile" : res.data.resume.mobile ? res.data.resume.mobile : '',
					"email" : res.data.resume.email ? res.data.resume.email : '',
					"residence_address" : res.data.resume.residence_address ? res.data.resume.residence_address : '',
					"hobby" : res.data.resume.hobby ? res.data.resume.hobby : '',
					"evaluation" : res.data.resume.evaluation ? res.data.resume.evaluation : ''
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
	back=()=>{
		hashHistory.goBack();
	}
	getdata=(obj ,issave)=>{
		if(this.pickertype =='sex'){
			issave ? Object.keys(sex).map((key)=>{
				if(sex[key]==obj.sex){
					this.setState({ "sex" : key ,"isPicker" : false});
				}
			}) : this.setState({ "isPicker" : false});
		}

		if(this.pickertype == 'birthday'){
			if(issave){
				let birthday = (obj.year+obj.month).replace(/([0-9]+).([0-9]+)./,'$1-$2');
				this.setState({ "birthday" : birthday ,"isPicker" : false});
			}else{
				this.setState({ "isPicker" : false});
			}
		}
	}
	openpicker=(event)=>{
		const pickertype = api.getTarget(event.target ,'li').getAttribute('data-type');
		if(pickertype=='sex'){
			if(this.state.sex==2){
				this.piacksex = {
					"sex" : {
						initval : '女',
						val : ['女','男']
					}
				}
			}
			
			this.pickertype = pickertype;
			this.pickerval = this.piacksex;
			this.picktext = this.sextext;
		}
		if(pickertype=="birthday"){
			if(this.state.birthday){ 
				const birthday = this.state.birthday.split('-');
				this.birthday.year.initval = `${birthday[0]}年`;
				this.birthday.year.val = api.roller(birthday[0] ,this.birthday.year.val);
				
				this.birthday.month.initval = `${birthday[1]}月`;
				this.birthday.month.val = api.roller(birthday[1] ,this.birthday.month.val);
			}

			this.pickertype = pickertype;
			this.pickerval = this.birthday;
			this.picktext = this.birthdaytext;
		}
		this.setState({ "isPicker" : true });
	}
	setuser_name =(event)=>{
		this.setState({ "user_name" : event.target.value });
		this.ismodify = true;
	}
	setmobile =(event)=>{
		this.setState({ "mobile" : event.target.value });
		this.ismodify = true;
	}
	setemail =(event)=>{
		this.setState({ "email" : event.target.value });
		this.ismodify = true;
	}
	setaddress =(event)=>{
		this.setState({ "residence_address" : event.target.value });
		this.ismodify = true;
	}
	sethobby =(event)=>{
		this.setState({ "hobby" : event.target.value });
		this.ismodify = true;
	}
	setevaluation =(event)=>{
		this.evaluationNumber = event.target.value.length;
		this.evaluationNumber > 140 ? this.refs.textareaelm.classList.add('redbor') : this.refs.textareaelm.classList.remove('redbor');
		this.setState({ "evaluation" : event.target.value });
		this.ismodify = true;
	}
	tipfn=(a)=>{
		a==1 ? hashHistory.goBack() : this.setState({ "tipselect" : false });
	}
	sub =()=>{
		if(!this.state.user_name || !this.state.sex || !this.state.birthday || !this.state.mobile || !this.state.email){
			api.tip_msg('请填写必填信息','fixedmode');
			return false;
		}
		if(this.evaluationNumber>140){
			return false;
		}
		api.FetchPost('/hyb-stu/stu_resume/base/add_update',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({ 
				"icon" : this.state.icon,
				"user_name" : this.state.user_name,
				"sex" : this.state.sex,
				"birthday" : this.state.birthday,
				"mobile" : this.state.mobile,
				"email" : this.state.email,
				"residence_address" : this.state.residence_address,
				"hobby" : this.state.hobby,
				"evaluation" : this.state.evaluation
			})
		}).then((res)=>{
			this.back();
		})
	}
	opentipselect=()=>{
		if(this.ismodify && this.state.status=='success'){
			this.setState({ "tipselect" : true });
		}else{
			hashHistory.goBack();
		}
	}
	setuserimg=()=>{
		const actiontype = "savetoalbum?param={\"token\":\""+this.props.userstate.token+"\" ,\"upload_type\":\""+6+"\"}";
		api.webview(actiontype ,this.getwebviewimg);
		this.ismodify = true;
	}
	getwebviewimg=(obj)=>{
		this.setState({ "icon" : uploadImg + obj.result.avatar_url });
		api.webview("userheadicon?param={\"token\":\""+this.props.userstate.token+"\" ,\"user_icon_url\":\""+uploadImg+obj.result.avatar_url+"?r="+Math.random(1)+"\"}");
	}
	showpage=()=>{
		return <div>
				<ul className="permsg">
					<li className="userimg" onClick={this.setuserimg}><b><img src={this.state.icon ? this.state.icon + "?r="+Math.random(1) : userpic + "?r="+Math.random(1)} /></b></li>
					<li className="litile">必填信息</li>
					<li><span><label>*</label>姓名</span><input maxLength="30" type="text" value={this.state.user_name} onChange={this.setuser_name}/></li>
					<li onClick={this.openpicker} data-type="sex"><span><label>*</label>性别</span><b>{sex[this.state.sex] ? sex[this.state.sex] : ''}</b></li>
					<li onClick={this.openpicker} data-type="birthday"><span><label>*</label>出生日期</span><b>{this.state.birthday.replace(/([0-9]+).([0-9]+)/,'$1年$2月')}</b></li>
					<li><span><label>*</label>联系电话</span><input maxLength="11" type="tel" value={this.state.mobile} onChange={this.setmobile} /></li>
					<li><span><label>*</label>电子邮箱</span><input maxLength="30" type="email" value={this.state.email} onChange={this.setemail} /></li>
					<li className="litile">选填信息</li>
					<li><span>户籍地址</span><input maxLength="30" type="text" value={this.state.residence_address} onChange={this.setaddress} /></li>
					<li><span>兴趣爱好</span><input maxLength="30" type="text" value={this.state.hobby} onChange={this.sethobby}/></li>
					<li className="pertext"><span>自我评价</span><textarea ref="textareaelm" maxLength="140" value={this.state.evaluation} onChange={this.setevaluation}></textarea><span className="number">({this.evaluationNumber}/140)</span></li>
				</ul>
				<p className="complete" onClick={this.sub}>保存</p>
				</div>
	}
	render(){
		return(
			<div className="personmessage">
				<div className="hd" ref="hd">
					<span onClick={this.opentipselect}><i className="icon3"></i></span>
					<span>基本信息</span>
					<span></span>
				</div>
				<div className="dingwei">
				{
					this.state.status=='pending' ? <Tip text="" type="loading" /> : this.state.status=='success' ? this.showpage() : <Tip text="出错误了" type="tiperro" />
				}
				</div>
				<ReactCSSTransitionGroup transitionName="pickerMsgAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.isPicker ? <Picker pickerval={this.pickerval} handle={this.getdata} titletext={this.picktext}/> : ''}
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="tipselectAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.tipselect ? <TipSelect text={this.tipmsg} handleclose={this.tipfn}/> : ''}
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
PersonMessage = connect(mapStateToProps)(PersonMessage)
export default PersonMessage

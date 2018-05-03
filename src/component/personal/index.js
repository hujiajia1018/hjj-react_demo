import React, { Component } from 'react'
import { Link ,hashHistory } from 'react-router'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import PcPerson from './pcperson'
import ManageJob from 'component/aboutmyjob/manage'
import api from 'api/api'
import 'css/resume'

import EducationList from './educationlist'
import EduDetail from './educationdetail'

import WorkList from './workslist'
import WorkDetail from './workdetail'

import CertificateList from './certificatelist'
import CertDetail from './certificatedetail'

import SchoolList from './schoollist'
import SchoolDetail from './schooldetail'

import Projectlist from './projectlist'
import ProjectDetail from './projectdetail'

import Internshiplist from './internshiplist'
import InternshipDetail from './internshipdetail'

class Resume extends Component{
	constructor(props){
		super(props);
		this.state = {
			isPcPerson : false,
			isManage : false,
			isEducation : false,
			iscertificate : false,
			isschool : false,
			iswork : false,
			isproject : false,
			isinternship : false,
			exp : {
				id : '',
	            user_id : 0,
	            base_info : 0,   //个人信息完善度
	            career_objective : 0,   //求职意向完善度
	            certificate : 0,        //荣誉证书完善度
	            edu_background : 0,     //教育背景完善度
	            works : 0,              //个人作品完善度
	            campus_exp : 0,         //校园经历完善度
	            project_exp : 0,        //项目经历完善度
	            intern_exp : 0,         //实习经历完善度
	            total_score : 0        //总完善度
			}
		}
	}
	componentDidMount=()=>{
		window.scrollTo(0,0);
		this.getallscore();
	}
	getallscore=()=>{
		api.FetchGet('/hyb-stu/stu_resume/score/all',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token
		}).then((res)=>{
			this.setState({ "exp" : Object.assign({}, res.data.resume) });
		})
	}
	animate=(a ,issave)=>{
		a==2 && this.setState({ "isPcPerson" : !this.state.isPcPerson });
		a==3 && this.setState({ "isManage" : !this.state.isManage });
		a==4 && this.setState({ "isEducation" : !this.state.isEducation });
		a==5 && this.setState({ "iswork" : !this.state.iswork });
		a==6 && this.setState({ "iscertificate" : !this.state.iscertificate });
		a==7 && this.setState({ "isschool" : !this.state.isschool });
		a==8 && this.setState({ "isproject" : !this.state.isproject });
		a==9 && this.setState({ "isinternship" : !this.state.isinternship });
		this.getallscore();
	}
	openPcPerson =()=>{
		this.setState({ "isPcPerson" : true });
	}
	openmanage=()=>{
		this.setState({ "isManage" : true });
	}
	openeducation=()=>{
		this.setState({ "isEducation" : true });
	}
	openwork=()=>{
		this.setState({ "iswork" : true });
	}
	openiscertificate=()=>{
		this.setState({ "iscertificate" : true });
	}
	openschool=()=>{
		this.setState({ "isschool" : true });
	}
	openproject=()=>{
		this.setState({ "isproject" : true });
	}
	openinternship=()=>{
		this.setState({ "isinternship" : true });
	}
	goback=()=>{
		hashHistory.goBack();
	}
	render(){
		/*<span className="resumehd" onClick={this.openPcPerson}><i className="icon3 pcicon"></i></span>*/
		return (
			<div className="resume" >
				<div className="hd">
					<span className="resumehd" onClick={this.goback}><i className="icon3"></i></span>
					<span className="resumehd">我的简历</span>
					<span className="resumehd"></span>
				</div>
				<div className="titlemsg">
					<i className="icon3"></i>简历完整度大于60%才可以投递，当前{this.state.exp.total_score}%
				</div>
				<p className="titletext">基本信息</p>
				<ul className="resume">
					{
						this.props.location.state && this.props.location.state.positionid 
						? <li><Link to={{ "pathname" : '/personmsg' ,state : {"positionid" : this.props.location.state.positionid } }}><p>个人资料{this.state.exp.base_info>=24 ? <i className="icon3 b"></i> :  ''}<i className="icon a"></i></p></Link></li> 
						: <li><Link to={{ "pathname" : '/personmsg' }}>个人资料{this.state.exp.base_info>=24 ? <i className="icon3 b"></i> :  ''}<i className="icon a"></i></Link></li>
					}
					<li style={{"display":"none"}} onClick={this.openmanage}>管理求职意向{this.state.exp.career_objective>=12 ? <i className="icon3 b"></i> :  ''}<i className="icon a"></i></li>
					<li onClick={this.openeducation}>教育背景{this.state.exp.edu_background>=24 ? <i className="icon3 b"></i> :  ''}<i className="icon a"></i></li>
				</ul>
				<p className="titletext">加分信息<i className="icon3"></i></p>
				<ul className="resume">
					<li onClick={this.openwork}>个人作品{this.state.exp.works>=8 ? <i className="icon3 b"></i> :  ''}<i className="icon a"></i></li>
					<li onClick={this.openiscertificate}>荣誉证书{this.state.exp.certificate>=2 ? <i className="icon3 b"></i> :  ''}<i className="icon a"></i></li>
				</ul>
				<p className="titletext">在校经历<i className="icon3"></i></p>
				<ul className="resume">
					<li onClick={this.openschool}>校园经历{this.state.exp.campus_exp>=10 ? <i className="icon3 b"></i> :  ''}<i className="icon a"></i></li>
					<li onClick={this.openproject}>项目经历{this.state.exp.project_exp>=10 ? <i className="icon3 b"></i> :  ''}<i className="icon a"></i></li>
					<li onClick={this.openinternship}>实习经历{this.state.exp.intern_exp>=10 ? <i className="icon3 b"></i> :  ''}<i className="icon a"></i></li>
				</ul>
				{
					this.props.location.state && this.props.location.state.positionid 
					? <div className="sub"><Link to={{ "pathname" : "/resumepreview" ,"state" : { "positionid" : this.props.location.state.positionid } }}>预览简历</Link></div>
					: <div className="sub"><Link to={{ "pathname" : "/resumepreview" }}>预览简历</Link></div> 
				}
				<ReactCSSTransitionGroup transitionName="personmessageAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.isPcPerson ? <PcPerson back={this.animate}/> : ''}
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="personmessageAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.isManage ? <ManageJob back={this.animate}/> : ''}
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="personmessageAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.isEducation ? !this.state.exp.edu_background ? <EduDetail close={this.animate}/> : <EducationList back={this.animate} /> : '' }
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="personmessageAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.iswork ? !this.state.exp.works ? <WorkDetail close={this.animate} /> : <WorkList back={this.animate} /> : ''}
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="personmessageAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.iscertificate ? !this.state.exp.certificate ? <CertDetail close={this.animate} /> : <CertificateList back={this.animate} /> : ''}
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="personmessageAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.isschool ? !this.state.exp.campus_exp ? <SchoolDetail close={this.animate}/> : <SchoolList back={this.animate} /> : ''}
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="personmessageAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.isproject ? !this.state.exp.project_exp ? <ProjectDetail close={this.animate}/> : <Projectlist back={this.animate} /> : ''}
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="personmessageAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.isinternship ? !this.state.exp.intern_exp ? <InternshipDetail close={this.animate}/> : <Internshiplist back={this.animate} /> : ''}
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
Resume = connect(mapStateToProps)(Resume)
export default Resume
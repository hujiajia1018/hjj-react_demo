import React, { Component } from 'react'
import { Link ,hashHistory } from 'react-router'
import 'css/resumepreview'
import { connect } from 'react-redux'
import userpic from 'images/icon6.png'
import api from 'api/api'
import { xueli,hangye } from 'api/config'
import Tip from 'component/pagemsg/tip'

class ResumePreview extends Component{
	constructor(props){
		super(props);
		this.state = {
			base_info : {
				icon : '',
				sex : '',
				mobile : '',
				birthday : '',
				edu_level : '',
				graduated_from : '',
				residence_address : '',
				mobile : '',
				email : '',
				hobby : '',
				evaluation : '',
				user_name : ''
			},
			campus_experiences : [],
			career_objective_infos : [],
			certificates : [],
			edu_backgrounds : [],
			intern_experiences : [],
			works : [],
			project_experiences : [],
			status : 'pending'
		}
	}
	componentDidMount(){
		api.FetchGet('/hyb-stu/stu_resume/resume/preview',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token
		}).then((res)=>{
			setTimeout(()=>{
				this.setState({
					"base_info" : Object.assign({}, this.state.base_info, res.data.base_info),
					"campus_experiences" : res.data.campus_experiences,
					"career_objective_infos" : res.data.career_objective_infos,
					"certificates" : res.data.certificates,
					"edu_backgrounds" : res.data.edu_backgrounds,
					"works" : res.data.works,
					"intern_experiences" : res.data.intern_experiences,
					"project_experiences" : res.data.project_experiences,
					"status" : "success"
				});
			},500);
		},()=>{
			this.setState({ "status" : "error" });
		})
	}
	showposition=(infos)=>{
		let a = [];
		infos.map((item)=>{
			a.push(api.getzhiweiname(item.position_type_id))
		});
		return a.join(' ');
	}
	setdata=(d)=>{
		return `${d.split('-')[0]}年${d.split('-')[1]}月`;
	}
	goback=()=>{
 		hashHistory.goBack();
	}
	gethangye=(id)=>{
		let list = id.split(',') ,name = [];
		list.map((val)=>{
			name.push(hangye[val]);
		})
		return name.join(' ');
	}
	showpage=()=>{
		return <div>
				<div className="hd">
					<div className="imgbor">
						<img src={this.state.base_info.icon ? this.state.base_info.icon : userpic} />
						<p>
							<b>个人简历</b>
							<span>姓名：{this.state.base_info.user_name}</span>
							<span className="x">学校：{this.state.base_info.graduated_from ? this.state.base_info.graduated_from : '未完善'}</span>
							<span>意向：{this.showposition(this.state.career_objective_infos)}</span>
						</p>
					</div>
					<i className="icon3" onClick={this.goback}></i>
				</div>
				<div className="box">
					<div className="title"><i className="icon3 a"></i>基本资料</div>
					<div className="boxbd">
						{
							!this.state.base_info.mobile ? <div className="boxbd" ><p className="nomsg">完善更多信息<br/>可增加求职的机会哦～</p></div>
							: <div>
								<p className="other">出生日期 : {this.state.base_info.birthday}</p>
								<p className="other">最高学历 : {this.state.base_info.edu_level ? xueli[this.state.base_info.edu_level] : ''}</p>
								<p className="other">毕业院校 : {this.state.base_info.graduated_from ? this.state.base_info.graduated_from : ''}</p>
								<p className="other">户籍地址 : {this.state.base_info.residence_address}</p>
								<p className="other">联系电话 : {this.state.base_info.mobile}</p>
								<p className="other">电子邮箱 : {this.state.base_info.email}</p>
								<p className="other">兴趣爱好 : {this.state.base_info.hobby}</p>
								<p className="other">自我评价 : <em dangerouslySetInnerHTML={{__html: this.state.base_info.evaluation}}/></p>
							</div>
						}
					</div>
				</div>
				<div className="box borbot">
					<div className="title"><i className="icon3 b"></i>求职意向</div>
					{
						this.state.career_objective_infos ? this.state.career_objective_infos.map((item ,index)=>{
							return <div className="boxbd borbot" key={index}>
								<div>
									<p className="other">{api.getzhiweiname(item.position_type_id)}<span>{item.expect_salary}</span></p>
									<p className="other">期望行业 : {item.user_industry ? this.gethangye(item.user_industry) : '不限'}</p>
								</div>
							</div>
						}) : <div className="boxbd" ><p className="nomsg">完善更多信息<br/>可增加求职的机会哦～</p></div>
					}
				</div>
				<div className="box">
					<div className="title marbot"><i className="icon3 c"></i>教育背景</div>
					{
						this.state.edu_backgrounds.length ? this.state.edu_backgrounds.map((item ,index)=>{
							return <div className={index==(this.state.edu_backgrounds.length-1) ? "timebox nobor" : "timebox"} key={index}>
								<div className="timehd">
									{this.setdata(item.enrollment_date)} - {this.setdata(item.graduated_date)}
								</div>
								<div className="timebd">
									<p>{item.graduated_from}</p>
									<p>{xueli[item.edu_level]} · {api.getzhuanyename(item.dept_level)}</p>
									<p>{item.dept_level_name}</p>
									<p>{item.duty}</p>
								</div>
							</div>
						}) : <div className="boxbd" ><p className="nomsg">完善更多信息<br/>可增加求职的机会哦～</p></div>
					}
				</div>
				<div className="box">
					<div className="title"><i className="icon3 d"></i>个人作品</div>
					{
						this.state.works.length ? this.state.works.map((item ,index)=>{
							return <div className="boxbd borbot" key={index}>
								<div>
									<p className="other unline">{item.url}</p>
									<p className="other">{item.work_desc}</p>
								</div>
							</div>
						}) : <div className="boxbd" ><p className="nomsg">完善更多信息<br/>可增加求职的机会哦～</p></div>
					}
				</div>
				<div className="box">
					<div className="title"><i className="icon3 e"></i>荣誉证书</div>
					{
						this.state.certificates.length ? this.state.certificates.map((item ,index)=>{
							return <div className="boxbd" key={index}>
								{item.cert_name}
							</div>
						}) : <div className="boxbd" ><p className="nomsg">完善更多信息<br/>可增加求职的机会哦～</p></div>
					}
				</div>
				<div className="box">
					<div className="title marbot"><i className="icon3 f"></i>校园经历</div>
					{
						this.state.campus_experiences.length ? this.state.campus_experiences.map((item ,index)=>{
							return <div className={(this.state.campus_experiences.length-1)==index  ? "timebox nobor" : "timebox"} key={index}>
								<div className="timehd">
									{this.setdata(item.start_time)} - {this.setdata(item.end_time)}
								</div>
								<div className="timebd">
									<p>{item.activity_name}</p>
									<p>担任角色 : {item.duty_role}</p>
									<p dangerouslySetInnerHTML={{__html: item.experience}} />
								</div>
							</div>
						}) : <div className="boxbd" ><p className="nomsg">完善更多信息<br/>可增加求职的机会哦～</p></div>
					}
				</div>
				<div className="box">
					<div className="title marbot"><i className="icon3 g"></i>项目经历</div>
					{
						this.state.project_experiences.length ? this.state.project_experiences.map((item ,index)=>{
							return <div className={(this.state.project_experiences.length-1)==index ? "timebox nobor" : "timebox"} key={index}>
								<div className="timehd">
									{this.setdata(item.start_time)} - {this.setdata(item.end_time)}
								</div>
								<div className="timebd">
									<p>{item.project_name}</p>
									<p>担任角色 : {item.duty}</p>
									<p dangerouslySetInnerHTML={{__html: item.project_desc}} />
								</div>
							</div>
						}) : <div className="boxbd" ><p className="nomsg">完善更多信息<br/>可增加求职的机会哦～</p></div>
					}
				</div>
				<div className="box">
					<div className="title marbot"><i className="icon3 h"></i>实习经历</div>
					{
						this.state.intern_experiences.length ? this.state.intern_experiences.map((item ,index)=>{
							return <div className={(this.state.intern_experiences.length-1)==index ? "timebox nobor" : "timebox"} key={index}>
								<div className="timehd">
									{this.setdata(item.start_time)} - {this.setdata(item.end_time)}
								</div>
								<div className="timebd">
									<p>{item.ent_name}</p>
									<p>担任角色 : {item.position_name}</p>
									<p dangerouslySetInnerHTML={{__html: item.intern_desc}} />
								</div>
							</div>
						}) : <div className="boxbd" ><p className="nomsg">完善更多信息<br/>可增加求职的机会哦～</p></div>
					}
				</div>
				</div>
	}
	render(){
		return(
			<div className="resumepreview">
				{
					this.state.status=='pending' ? <Tip text="" type="loading" /> : this.state.status=='success' ? this.showpage() : <Tip text="出错误了" type="tiperro" />
				}
			</div>
		)
	}
}
const mapStateToProps = (state ,ownProps) =>{
	return {
		userstate : state.UserState
	}
}
ResumePreview = connect(mapStateToProps)(ResumePreview)
export default ResumePreview
import React, { Component } from 'react'
import { Link ,hashHistory } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import api from 'api/api'
import { city ,xueli ,sex ,hangye ,mianshi ,yingyongbao } from 'api/config'
import 'css/positiondetail'
import companylogo from 'images/companylogo.png'
import Share from 'component/share'
import Tip from 'component/pagemsg/tip'
import TipSelect from 'component/pagemsg/tipselect'
import SubmitCity from './submitcity'

class PositionDetail extends Component{
	constructor(props){
		super(props);
		this.state = {
			status : 'pending',
			cityid : '',
			msg : {},
			isopenshare : false,
			description : '',
			citydescription : '',
			descriptionstatus : false,
			citydescriptionstatus : false,
			tipstatus : false,
			companydetailcity : '',
			isSubmitCity : false
		}
		this.deslength = '';
		this.description = '';
		this.simpledes = '';

		this.simpledescity = '';
		this.citydeslength = '';
		this.citydes = '';
		this.sharobject = {};
	}
	componentDidMount=()=>{
		api.FetchGet(`/hyb-stu/stu_position/detail/${this.props.location.state.id}`,{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token
		}).then((res)=>{
			setTimeout(()=>{
				this.des = res.data.position_detail.job_description;
				this.deslength = res.data.position_detail.job_description.length;
				
				let citystring = api.getcitylist(res.data.position_detail.city);
				this.citydes = citystring;
				this.citydeslength = citystring.length;
				this.simpledescity = api.substring(citystring ,60 ,'.....');

				let salary_minmax = api.getsalary(res.data.position_detail.salary_min ,res.data.position_detail.salary_max);
				this.sharobject = {
					"share_title" : `【小牛接招】${res.data.position_detail.full_name}正在招聘 ${res.data.position_detail.position_name}(${salary_minmax})，快来下载小牛接招应聘吧`,
					"share_desc" : `${this.fulitext(res.data.position_detail.labels)} ${this.citydes}`,
					"share_icon" : res.data.position_detail.logo,
					"share_jump_url" : `${yingyongbao.position}?positionId=${this.props.location.state.id}`
				}

				if(this.deslength>130){ 
					this.simpledes = api.substring(res.data.position_detail.job_description ,130 ,'.....');
					this.setState({ "msg" :  Object.assign({}, res.data.position_detail) ,"description" : this.simpledes });
				}else{
					this.setState({ "msg" :  Object.assign({}, res.data.position_detail) ,"description" : this.des });
				}

				if(this.citydeslength>60){
					this.setState({ "citydescription" : this.simpledescity ,"companydetailcity" : res.data.position_detail.city.split(',') });
				}else{
					this.setState({ "citydescription" : this.citydes ,"companydetailcity" : res.data.position_detail.city.split(',')}); 
				}

				this.setState({ "status" : 'success' });
			},500);
		},()=>{
			this.setState({ "status" : 'erro' });
		});
		window.scrollTo(0 ,0);
	}
	openshare=()=>{
		this.setState({ "isopenshare" : !this.state.isopenshare });
	}
	setdesstatus=()=>{
		!this.state.descriptionstatus ? this.setState({ "description" : this.des ,"descriptionstatus" : true }) : this.setState({ "description" : this.simpledes ,"descriptionstatus" : false });
	}
	setcitydesstatus=()=>{  
		!this.state.citydescriptionstatus ? this.setState({ "citydescription" : this.citydes  ,"citydescriptionstatus" : true }) : this.setState({ "citydescription" : this.simpledescity ,"citydescriptionstatus" : false });
	}
	setfollow=()=>{
		const follow = this.state.msg.follow ? 0 : 1;
		api.FetchPost('/hyb-stu/stu_position/position_follow' ,{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({ "position_id" : this.state.msg.id ,"status" : follow })
		}).then((res)=>{
			this.setState({ "msg" : Object.assign({}, this.state.msg, {"follow" : follow } )});
			follow ? api.tip_msg('收藏成功') : api.tip_msg('取消收藏');
		},(res)=>{
			follow ? api.tip_msg('收藏失败') : api.tip_msg('取消失败');
		})
	}
	testsub=(a)=>{
		if(this.state.companydetailcity.length==1){
			this.sub(this.state.companydetailcity[0]);
		}else{
			this.setState({ "isSubmitCity" : !this.state.isSubmitCity },()=>{
				setTimeout(()=>{ typeof a == 'string' && this.sub(a); },410);
			});
		}
	}
	sub=(citystring)=>{
		api.FetchPost('/hyb-stu/stu_position/position_submit' ,{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({ "submit_city" : citystring ,"position_id" : this.state.msg.id })
		}).then((res)=>{
			this.setState({ "tipstatus" : false ,"msg" : Object.assign({}, this.state.msg, {"submit_status" : 1}) });
			api.tip_msg('投递成功','fixedmode');
		},(res)=>{
			if(res.code==410){
				this.tipmsg = ['您尚未创建简历' ,'' ,'立即创建'];
				this.setState({ "tipstatus" : true });
			}
			if(res.code==411){
				this.tipmsg = ['您的简历不完善' ,'' ,'立即完善'];
				this.setState({ "tipstatus" : true });
			}
		})
	}
	fulitext=(list)=>{
		let name = [];
		if(list.length){
			list.map((item,index)=>{
				if(index < 3){
					name.push(item.label_name);
				}
			});
			return name.join(' ');
		}else{
			return '';
		}
	}
	fuli=(list)=>{
		let name = [];
		if(list.length){
			list.map((item,index)=>{
				if(index < 3){
					name.push(`<b>${item.label_name}</b>`);
				}
			});
			return name.join(' ');
		}else{
			return '';
		}
	}
	routeback=()=>{
		hashHistory.goBack();
	}
	showpage=()=>{
		/*<p className="other">性 别：{sex[this.state.msg.sex_type]}</p>*/
		return <div>
					<div className="hd">
						<em onClick={this.routeback}><i className="icon3"></i></em> 
						<span>职位详情</span>
						<span>{this.state.msg.follow ? <i className="icon3 xing" onClick={this.setfollow}></i> : <i className="icon3 xing on" onClick={this.setfollow}></i>}<i className="icon3 sharebtn" onClick={this.openshare}></i></span>
					</div>
					<div className="jobnamebor">
						<div className="jobname">
							<p><span className="l">{this.state.msg.position_name}</span><span className="r money">{api.getsalary(this.state.msg.salary_min ,this.state.msg.salary_max)}</span></p>
							<p><span className="l">{this.state.msg.full_name}</span><span className="r">{api.showdaytext(this.state.msg.update_time)}</span></p>
							<p><span><i className="icon3 xueli"></i>{xueli[this.state.msg.edu_level]}</span></p>
							<p><span dangerouslySetInnerHTML={{__html: this.fuli(this.state.msg.labels) }} /></p>
							{this.state.msg.submit_status ? <p className={api.msstatus(this.state.msg.submit_status) ? "icon5 jieduan jieduan2" : "icon5 jieduan"}>{mianshi[this.state.msg.submit_status]}</p> : ''}
						</div>
					</div>
					<div className="companynamebor">
						<div className="companyname">
							<Link to={{ pathname : '/companydetail' ,state : { "cityid" : this.state.companydetailcity[0] ,"id" : this.state.msg.ent_id ,"positionid" : this.props.location.state.id } }}>
								<p className="a"><img src={this.state.msg.logo ? this.state.msg.logo : companylogo} /></p>
								<p className="b"><span>{this.state.msg.full_name}</span><span>{hangye[this.state.msg.industry_type]}　|　{this.state.msg.position_count}个热门职位</span></p>
								<i className="icon po"></i> 
							</Link>
						</div>
					</div>
					<div className="box">
						<div className="title">
							<i className="icon3 b"></i>职位详情
						</div>
						<div className="boxbd">
							<p className="textdetail" dangerouslySetInnerHTML={{__html: this.state.description}}></p>
							{
								this.deslength > 130 ? this.state.descriptionstatus ? <p className="ms" onClick={this.setdesstatus}><i className="icon on"></i></p> : <p className="ms" onClick={this.setdesstatus}><i className="icon"></i></p> : ''
							}
						</div>
					</div>
					<div className="box">
						<div className="title">
							<i className="icon3 a"></i>工作城市
						</div>
						<div className="boxbd">
							<p className="other" dangerouslySetInnerHTML={{__html: this.state.citydescription}}></p>
							{
								this.citydeslength > 60 ? this.state.citydescriptionstatus ? <p className="ms" onClick={this.setcitydesstatus}><i className="icon on"></i></p> : <p className="ms" onClick={this.setcitydesstatus}><i className="icon"></i></p> : ''
							}
						</div>
					</div>
					<div className="box">
						<div className="title">
							<i className="icon3 c"></i>拟招计划
						</div>
						<div className="boxbd">
							<p className="other">{this.state.msg.recruitment_number ? '拟招：'+this.state.msg.recruitment_number+'人' : '尚未公布'}</p>
						</div>
					</div>
					<div className="box">
						<div className="title">
							<i className="icon3 d"></i>附加要求
						</div>
						<div className="boxbd">

							<p className="other">专业类型：{api.getzhuanyename(this.state.msg.dept_level)}</p>
						</div>
					</div>
					{
						!this.state.msg.type && !this.state.msg.submit_status 
						? <div className="sub" onClick={this.testsub}>投递简历</div> 
						: !this.state.msg.type && this.state.msg.submit_status 
						? <div className="sub hastou">已投递</div> : ''
					}
				</div>
	}
	opentipselect=(isopen)=>{
		isopen && hashHistory.push({pathname : '/resume' ,state : { "positionid" : this.props.location.state.id }});
	}
	render(){
		return(
			<div className="positiondetail">
				{
					this.state.status=="pending" 
					? <Tip text="" type="loading" /> 
					: this.state.status=='success' 
					? this.showpage() 
					: <div className="erroshow"><div className="hd">
						<em onClick={this.routeback}><i className="icon3"></i></em> 
						<span>职位详情</span>
						<span></span>
					</div>
					<Tip text="出错误了" type="tiperro" /></div>
				}
				<ReactCSSTransitionGroup transitionName="shareAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.isopenshare ? <Share id={this.props.location.state.id} closeShare={this.openshare} shareKind="0" shareContent={this.sharobject} /> : ''}
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="shareAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.tipstatus ? <TipSelect text={this.tipmsg} handleclose={this.opentipselect}/> : ''}
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="shareAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.isSubmitCity ? <SubmitCity citydata={this.state.companydetailcity} closecityselect={this.testsub}/> : ''}
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
PositionDetail = connect(mapStateToProps)(PositionDetail)
export default PositionDetail

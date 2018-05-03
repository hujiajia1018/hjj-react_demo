import React, { Component } from 'react'
import { Link ,hashHistory } from 'react-router'
import { connect } from 'react-redux'
import api from 'api/api'
import Tip from 'component/pagemsg/tip'
import Ratelist from './ratelist'
import DataCount from './datacount'
import 'css/delivery'
import { city ,zhiwei ,xueli ,mianshi ,sex ,hangye } from 'api/config'

class WrittenRefuse extends Component{
	constructor(props){
		super(props);
		this.state = {
			positionid : this.props.location.state.id,
			cityid : '',
			default_page : {},
			position_stu_statistics : {},
			submitted_position : {},
			starttime : '',
			endtime : '',
			middle_node : [],
			selected : this.props.location.state.selected,
			pagestatus : 'pending',
			op :'',
			plan_type : "",
			specialplanid : "",
			submit_status : this.props.location.state.submit_status || ''
		}
		this.ajaxstatue = true;
		this.fromname = ['bishiyaoqing','daibishi','yibishi','bishiyijujue','yitoudi','mianshiyaoqing','daimianshi','yimianshi','mianshiyijujue','luyongyaoqing','jieshouluyong','luyongjujue'];
		this.selectedname = ['笔试邀请','待笔试','已笔试','已处理','简历状态','面试邀请','待面试','已面试','已处理','录用邀请','接受录用','已处理'];
		
	}
	componentWillUnmount=()=>{
		this.ajaxstatue = false;
	}
	componentDidMount=()=>{
		api.FetchPost(`/hyb-stu/stu_written/common/detail/${this.state.positionid}`,{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token
		}).then(({res})=>{
			if(this.ajaxstatue){
				this.setState({
					"starttime" : res.data.start_node,
					"submitted_position" : res.data.ent_position,
					"endtime" : res.data.end_node ? res.data.end_node : '',
					"middle_node" : res.data.middle_node,
					"cityid" : res.data.ent_position.submit_city,
					"op" : (res.data.op!=void 0) ? res.data.op : '',
					"plan_id" : res.data.middle_node.length ? res.data.middle_node[res.data.middle_node.length-1].plan_id : '',
					"plan_type" : res.data.middle_node.length ? res.data.middle_node[res.data.middle_node.length-1].plan_type : '',
					"specialplanid" : res.data.reject_plan_id ? res.data.reject_plan_id : '' /*所有的拒绝中才有 其他时候没有这个字段*/
				},()=>{ 
					this.datacountfn();
				});
			}
		},()=>{
			this.setState({ "pagestatus" : "error" });
		});
	}
	changeplanid=(plan_id ,selected)=>{
		this.setState({ "plan_id" : plan_id ,"selected" : selected },()=>{
			this.datacountfn();
		});
	}
	datacountfn=()=>{ 
		if(this.state.selected==1){ //待笔试
			api.FetchPost('/hyb-stu/stu_written/wait/detail',{ 
				UserKey : this.props.userstate.userKey,
				token : this.props.userstate.token,
				body : JSON.stringify({ "position_id" : this.state.positionid ,"plan_id" : this.state.plan_id ,"ent_id" : this.state.submitted_position.ent_id })
			}).then(({res})=>{
				this.ajaxstatue && this.setState({
					"position_stu_statistics" : res.data.position_stu_statistics,
					"default_page" : res.data.default_page,
					"pagestatus" : "success"
				});
			});
		}
		if(this.state.selected==6){ //待面试
			api.FetchPost('/hyb-stu/stu_interview/wait/detail',{ 
				UserKey : this.props.userstate.userKey,
				token : this.props.userstate.token,
				body : JSON.stringify({ "position_id" : this.state.positionid ,"plan_id" : this.state.plan_id ,"ent_id" : this.state.submitted_position.ent_id })
			}).then(({res})=>{
				this.ajaxstatue && this.setState({
					"position_stu_statistics" : res.data.position_stu_statistics,
					"default_page" : res.data.default_page,
					"pagestatus" : "success"
				});
			});
		}
		if(this.state.selected==2){ //已笔试
			api.FetchPost('/hyb-stu/stu_written/attend/detail',{ 
				UserKey : this.props.userstate.userKey,
				token : this.props.userstate.token,
				body : JSON.stringify({ "position_id" : this.state.positionid ,"plan_id" : this.state.plan_id ,"ent_id" : this.state.submitted_position.ent_id })
			}).then(({res})=>{
				this.ajaxstatue && this.setState({
					"position_stu_statistics" : res.data.position_stu_statistics,
					"default_page" : res.data.default_page,
					"pagestatus" : "success"
				});
			})
		}
		if(this.state.selected==7){ //已面试
			api.FetchPost('/hyb-stu/stu_interview/attend/detail',{ 
				UserKey : this.props.userstate.userKey,
				token : this.props.userstate.token,
				body : JSON.stringify({ "position_id" : this.state.positionid ,"plan_id" : this.state.plan_id ,"ent_id" : this.state.submitted_position.ent_id })
			}).then(({res})=>{
				this.ajaxstatue && this.setState({
					"position_stu_statistics" : res.data.position_stu_statistics,
					"default_page" : res.data.default_page,
					"pagestatus" : "success"
				});
			})
		}
		if(this.state.selected==3 || this.state.selected==8 || this.state.selected==9 || this.state.selected==10 || this.state.selected==11){
			this.ajaxstatue && this.setState({ "pagestatus" : "success" ,"default_page" : {} });
		}
		if(this.state.selected==4){ //已投递
			api.FetchPost(`/hyb-stu/stu_position/position_submit/detail_common/${this.state.positionid}`,{
				UserKey : this.props.userstate.userKey,
				token : this.props.userstate.token
			}).then(({res})=>{
				this.ajaxstatue && this.setState({ 
					"position_stu_statistics" : res.data.position_stu_statistics,
					"pagestatus" : "success",
					"default_page" : res.data.default_page,
				});
			})
		}
		if(this.state.selected==10){ //已录用
			api.FetchPost(`/hyb-stu/stu_offer/accept/detail`,{
				UserKey : this.props.userstate.userKey,
				token : this.props.userstate.token
			}).then(({res})=>{ 
				this.ajaxstatue && this.setState({ 
					"pagestatus" : "success",
					"default_page" : res.data.default_page
				});
			})
		}
	}
	showpage=()=>{
		return <div className="bd">
					<ul className="poslist modepage">
						<li>
							<Link to={{ "pathname" : "/positiondetail" ,state : { "id" : this.state.positionid ,"selected" : this.state.selected }}}>
								<p><span className="title">{this.state.submitted_position.position_name}</span>{this.state.submitted_position.status ? <em className="jieduan">{mianshi[item.status]}</em> : ''}<b className="red">{api.getsalary(this.state.submitted_position.salary_min ,this.state.submitted_position.salary_max)}</b></p>
								<p><span>{this.state.submitted_position.full_name}</span><b>{api.showdaytext(this.state.submitted_position.update_time)}</b></p>
								<p><span><i className="icon3 locat"></i>{api.showmorecity('已选' ,this.state.cityid)}</span><em><i className="icon3 xueli"></i>{xueli[this.state.submitted_position.edu_level]}</em></p>
								{this.state.submitted_position.type!=0 ? <i className="disablemsg"></i> : ''}
							</Link>
						</li>
					</ul>
					<Ratelist op={this.state.op} starttime={this.state.starttime} zhongjian={this.state.middle_node} endtime={this.state.endtime} changeplanid={this.changeplanid} modeselected={this.props.location.state.selected}/>
					<DataCount 
						position_stu_statistics={this.state.position_stu_statistics}
						submitted_position={this.state.submitted_position}
						showtype={this.fromname[this.state.selected]}
						default_page={this.state.default_page}
						plantype={this.state.plan_type}
						positionid={this.state.positionid}
						specialplanid={this.state.specialplanid}
						submit_status={this.state.submit_status}
					/>
				</div>
	}
	goback=()=>{
		hashHistory.goBack();
	}
	render(){
		return(
			<div className="delivery" id="modedata">
				<div className="hd">
					<span onClick={this.goback}><i className="icon3"></i></span>
					<span>{this.selectedname[this.props.location.state.selected]}</span>
					<span></span>
				</div>
				{
					this.state.pagestatus =='pending' ? <Tip text="" type="loading" />
					: this.state.pagestatus =='error' ? <Tip text="出错误了" type="tiperro" /> 
					: this.state.pagestatus =='success' ? this.showpage() : ''
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
WrittenRefuse = connect(mapStateToProps)(WrittenRefuse)
export default WrittenRefuse

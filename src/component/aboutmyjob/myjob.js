import React, { Component } from 'react'
import { Link ,hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FetchSetMyJob } from 'action/aboutmyjobAction'
import { clearCompanyList } from 'action/companylistAction'
import { clearPositionList } from 'action/positionlistAction'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import api from 'api/api'
import { zhiwei } from 'api/config'
import 'css/myjob'
import Picker from 'plugins/picker/index'
import JobDirection from './jobdirection'
import JobSelect from './job'
import TipSelect from 'component/pagemsg/tipselect'

class Myjob extends Component {
	constructor(props){
		super(props);
		this.ismodify = false;
		this.pickerval = {
			"a" : {
				initval : '2',
				val : ['11','12','不限','1','2','3','4','5','6','7','8','9','10']
			},
			"b" : {
				initval : '4',
				val : ['19','20','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18']
			}
		}
		this.state = {
			id : this.props.id ? this.props.id : null,
			isDirection : false,
			isJob : false,
			isMoney : false, 
			confirmMoney : this.props.confirmMoney ? this.props.confirmMoney : [],
			confirmDirection : this.props.confirmDirection ? this.props.confirmDirection : [],
			confirmJob : this.props.confirmJob ? [this.props.confirmJob] : [],
			tipselect : false
		}
		this.tipmsg = ['您的修改尚未保存' ,'取消' ,'放弃'];
		this.hasclick = false;
	}
	handleDisplay = (event)=>{
		const name = event.target.tagName.toLowerCase()!='li' ? event.target.parentNode.getAttribute('name') : event.target.getAttribute('name');
		this.opencComponent(name);
	}
	opencComponent = (name ,val)=>{
		switch(name){
			case 'money' : 
				if(this.state.confirmMoney.length){
					if(this.state.confirmMoney.length==1){/*money 不限的时候*/
						this.pickerval.a.initval = '2';
						this.pickerval.a.val = this.pickerval.a.val;

						this.pickerval.b.initval = '4';
						this.pickerval.b.val = this.pickerval.b.val;
					}else{
						this.pickerval.a.initval = parseInt(this.state.confirmMoney[0]);
						this.pickerval.a.val = api.roller(this.pickerval.a.initval ,this.pickerval.a.val);
					
						this.pickerval.b.initval = parseInt(this.state.confirmMoney[1]);
						this.pickerval.b.val = api.roller(this.pickerval.b.initval ,this.pickerval.b.val);
					}
				}
				this.setState({ "isMoney" : !this.state.isMoney });
				break;
			case 'direction' : 
				if(val){
					this.ismodify = true;
					this.setState({ "isDirection" : !this.state.isDirection ,"confirmDirection" : val.length ? val : [] }) 
				}else{
					this.setState({ "isDirection" : !this.state.isDirection });
				}
				break;
			case 'job' : 
				if(val && val.length){
					this.ismodify = true;
					this.setState({ "isJob" : !this.state.isJob ,"confirmJob" : [].concat(val) });
				}else{
					this.setState({ "isJob" : !this.state.isJob });
				}
				break;
		}
	}
	getUserMoney = ({a ,b} ,type)=>{
		if(type){
			a=='不限' ? this.setState({ 'confirmMoney' : ['不限'] }) : this.setState({ 'confirmMoney' : [ a ? a!='不限' ? `${a}k` : a : this.state.confirmMoney[0], b ? `${b}k` : this.state.confirmMoney[1]] });
			this.ismodify = true;
		}
		this.setState({ "isMoney" : false });
	}
	submit = ()=>{
		const a = this.state.confirmMoney.join('-'),
			c = this.state.confirmJob.join(',');

		let b = this.organize(',')== '不限' ? '不限' : this.organize(',');
		if(!a && !c){
			api.tip_msg('请完善求职意向');
			return;
		}
		if(!a){
			api.tip_msg('请选择期望薪资');
			return;
		}
		if(!c){
			api.tip_msg('请选择期望职位');
			return;
		}

		b = b=='不限' ? '' : this.organize(',');
		if(this.hasclick){
			return;
		}
		this.hasclick = true;
		this.props.clearpositionList();
		this.props.clearcompanyList();
		this.props.FetchSetMyJob({
			token : this.props.userstate.token,
			UserKey : this.props.userstate.userKey,
			body : JSON.stringify({ "id" : this.state.id ,"expect_salary" : a ,"user_industry" : b, "user_position" : c ,"status" : 1 })	
		},(msg)=>{
			if(msg){
				this.hasclick = false;
				api.tip_msg(msg);
			}else{
				this.props.back ? this.props.back() : hashHistory.push('/indexpage');
			}
		});

	}
	organize = (a ,render)=>{
		let userDirection = [];
		if(this.state.confirmDirection.length){
			if(this.state.confirmDirection.length==1 && !this.state.confirmDirection[0].key && !this.state.confirmDirection[0].value){
				return '不限';
			}else{
				this.state.confirmDirection.map((obj)=>{
					render=='render' ? userDirection.push(obj.value) : userDirection.push(obj.key);
				});
				return userDirection.join(a);
			}
		}else{
			return '不限';
		}
	}
	opentipselect=(isopen)=>{
		if(this.ismodify && !this.state.tipselect){
			this.setState({ "tipselect" : !this.state.tipselect });
		}else{
			if((isopen==1 && this.state.tipselect) || !this.state.tipselect){
				this.props.back();
			}else{
				this.setState({ "tipselect" : !this.state.tipselect });
			}
		}
	}
	render(){
		let userjob = [] ,userMoney = this.state.confirmMoney.length>1 ? this.state.confirmMoney.join('-') : this.state.confirmMoney[0],
			userDirection = this.organize(',' ,'render') ? this.organize(',' ,'render') : '不限';

		this.state.confirmJob.length && this.state.confirmJob.map((key)=>{
			userjob.push(zhiwei[key.slice(0,3)].children[key.slice(0,6)].children[key].name);
		})
		return(
			<div className="myjob" >
				<div className="hd">
					{ this.props.back ? <em onClick={this.opentipselect}><i className="icon3"></i></em> : <em></em> }
					<span>求职意向</span>
					<span></span>
				</div>
				<div className="box">
					<ul className="myjoblist">
						<li style={{"display":"none"}} onClick={this.handleDisplay} name="direction"><span>行业方向</span><em>{userDirection}</em><i className="icon"></i></li>
						<li onClick={this.handleDisplay} name="job"><span>期望职位</span><em>{userjob.join(',')}</em><i className="icon"></i></li>
						<li onClick={this.handleDisplay} name="money"><span>期望薪资</span><em>{userMoney}</em><i className="icon"></i></li>
					</ul>
				</div>
				{
					this.props.id ? <p className="complete" onClick={this.submit}>保存</p> : <p className="complete" onClick={this.submit}>完成</p>
				}
				<ReactCSSTransitionGroup transitionName="pickerMsgAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.isMoney ? <Picker pickerval={this.pickerval} handle={this.getUserMoney} trytest="1" titletext="期望月薪（千元/每月）"/> : ''}
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="jobAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.isDirection ? <JobDirection handleclose={this.opencComponent} directionArray={this.state.confirmDirection} /> : ''}
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="jobAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.isJob ? <JobSelect handleclose={this.opencComponent} onSlected={this.state.confirmJob}/> : ''}
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="moneyAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.tipselect ? <TipSelect text={this.tipmsg} handleclose={this.opentipselect}/> : ''}
				</ReactCSSTransitionGroup>
			</div>
		)
	}
}

const mapStateToProps = (state ,ownProps) =>{
	return {
		aboutmyjob : state.AboutMyJob,
		userstate : state.UserState
	}
}
const mapDispatchToProps = (dispath) =>{
	return {
		clearcompanyList : bindActionCreators(clearCompanyList ,dispath),
		clearpositionList : bindActionCreators(clearPositionList ,dispath),
		FetchSetMyJob : bindActionCreators(FetchSetMyJob ,dispath)
	}
}

Myjob = connect(mapStateToProps ,mapDispatchToProps)(Myjob);
export default Myjob
import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SetCertificatelist } from 'action/certificatelistAction'
import TipSelect from 'component/pagemsg/tipselect'
import api from 'api/api'

class CertDetail extends Component{
	constructor(props){
		super(props);
		this.ismodify = false;
		this.state = {
			tipselect : false,
			id : this.props.detail ? this.props.detail.id : '',
			cert_name : this.props.detail ? this.props.detail.cert_name : ''
		}
		this.tipmsg = ['您的修改尚未保存' ,'取消' ,'放弃'];
		this.hassubmit = false;
	}
	seturl=(event)=>{
		this.setState({ "url" : event.target.value });
	}
	setcertname=(event)=>{
		this.setState({ "cert_name" : event.target.value });
		this.ismodify = true;
	}
	opentipselect=()=>{
		if(this.ismodify && !this.state.tipselect){
			this.setState({ "tipselect" : true });
		}else{
			this.props.close(6 ,'iscertificate');
		}
	}
	back=(a)=>{
		a==1 ? this.props.close(6 ,'iscertificate') : this.setState({ "tipselect" : false });
	}
	sub=()=>{
		if(!this.state.cert_name){
			return false;
		}
		if(this.hassubmit){
			return false;
		}
		this.hassubmit = true;
		this.props.setList({
			token : this.props.userstate.token,
			UserKey : this.props.userstate.userKey,
			body : JSON.stringify({
				"id" : this.state.id,
				"cert_name" : this.state.cert_name
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
					<span className="edu">荣誉证书</span>
					<span className="edu"></span>
				</div>
				<ul className="editedu">
					<li><span>证书名称</span><input maxLength="30" type="text" value={this.state.cert_name} onChange={this.setcertname}/></li>
				</ul>
				<p className="complete" onClick={this.sub}>完成</p>
				<ReactCSSTransitionGroup transitionName="tipselectAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.tipselect ? <TipSelect text={this.tipmsg} handleclose={this.back}/> : ''}
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
const mapDispatchToProps = (dispath) =>{
	return {
		setList : bindActionCreators(SetCertificatelist ,dispath)
	}
}

CertDetail = connect(mapStateToProps ,mapDispatchToProps)(CertDetail)
export default CertDetail
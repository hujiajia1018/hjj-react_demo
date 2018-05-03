import React, { Component } from 'react'
import { Link ,hashHistory } from 'react-router'
import { connect } from 'react-redux'
import api from 'api/api'
import 'css/luyongdetail'

class OfferDetail extends Component{
	constructor(props){
		super(props);
		this.state = {
			ent_name : '',
			hire_status : '',
			hr_message : ""
		}
		this.hassubmit = false;
	}
	componentDidMount=()=>{
		api.FetchGet(`/hyb-stu/stu_offer/detail/${this.props.location.state.id}`,{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token
		}).then((res)=>{
			this.setState({
				"hire_status" : res.data.hire_status,
				"ent_name" : res.data.ent_name,
				"hr_message" : res.data.hr_message
			});
		},()=>{
			api.tip_msg('失败');
		});
	}
	goback=()=>{
		hashHistory.goBack();
	}
	confir=(event)=>{
		if(this.hassubmit){
			return false;
		}
		this.hassubmit = true;
		const datatype = event.target.getAttribute('data-type');

		api.FetchPost('/hyb-stu/stu_notify/offer/confirm' ,{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({
				"confirm" : datatype,
				"position_id" : this.props.location.state.id
			})
		}).then(({res})=>{
			this.hassubmit = false;
			this.setState({ "hire_status" : datatype*1+1 });
		},()=>{
			this.hassubmit = false;
			api.tip_msg('失败');
		});
	}
	render(){
		return(
			<div className="luyongdetail">
				<div className="hd">
					<span onClick={this.goback}><i className="icon3"></i></span> 
					<span>offer详情</span>
					<span></span>
				</div>
				<div className="bd">
					<h1>{this.state.ent_name}-录用通知</h1>
					<div className="content" dangerouslySetInnerHTML={{__html: this.state.hr_message }}/>
				</div>
				<div className="sub">
					{
						this.state.hire_status==2
						? <p>已接受录用</p>
						: this.state.hire_status==3
						? <p>已拒绝录用</p>
						: this.state.hire_status==1
						? <div><p data-type="2" onClick={this.confir}>拒绝录用</p><p data-type="1" onClick={this.confir}>接受录用</p></div>
						: ''
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state ,ownProps) =>{
	return {
		userstate : state.UserState
	}
}
OfferDetail = connect(mapStateToProps)(OfferDetail)
export default OfferDetail
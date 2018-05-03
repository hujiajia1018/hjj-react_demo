import React, { Component } from 'react'
import { Link ,hashHistory } from 'react-router'
import { connect } from 'react-redux'
import api from 'api/api'
import 'css/offer'
import { city ,zhiwei ,xueli ,mianshi ,downbapp } from 'api/config'

class Offer extends Component{
	constructor(props){
		super(props);
		this.state = {
			ent_id : '',
			plan_id : '',
			ent_name : "",
			position_name : "",
			user_name : "",
			city : '',
			intention_time : '',
			plan_name : ''
		}
	}
	componentDidMount=()=>{
		api.FetchGet(`/hyb-stu/stu_offer/offer/${this.props.location.state.id}`,{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token
		}).then((res)=>{
			this.setState({ 
				"ent_id" : res.data.ent_id,
				"plan_id" : res.data.plan_id,
				"ent_name" : res.data.ent_name,
				"plan_name" : res.data.plan_name,
				"user_name" : res.data.user_name,
				"city" : res.data.city,
				"intention_time" : res.data.intention_time,
				"position_name" : res.data.position_name
			});
		},()=>{
			api.tip_msg('失败');
		});
	}
	goback=()=>{
		hashHistory.goBack();
	}
	settime=(a)=>{
		if(a){
			const g = a.split(':');
			return `${g[0]}:${g[1]}`;
		}
	}
	render(){
		return(
			<div className="offer" id="luyong">
				<div className="hd">
					<i className="icon3" onClick={this.goback}></i>
					<Link to={{ "pathname" : "/positiondetail" ,state : { "id" : this.props.location.state.id }}}><span>职位详情</span></Link>
				</div>
				<div className="bd">
					<p className="title">{this.state.user_name}，您好！</p>
					<p className="kg"><span>{this.state.ent_name}</span>向你发来了<span>{this.state.position_name}</span>的录用邀请。请在下方查看Offer详情，超时未选择将视为放弃。</p>
					<div className="luymsg">
						<p>录用城市 : {city[this.state.city]}</p>
						<p>入职时间 : {this.settime(this.state.intention_time)}</p>
					</div>
				</div>
				<div className="ft">
					<Link to={{ "pathname" : "/offerdetail" ,state : { "id" : this.props.location.state.id }}}><span>查看详情</span></Link>
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
Offer = connect(mapStateToProps)(Offer)
export default Offer
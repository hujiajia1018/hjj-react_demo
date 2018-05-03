import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import TipSelect from 'component/pagemsg/tipselect'
import 'css/memessage'
import api from 'api/api'

class NickName extends Component{
	constructor(props){
		super(props);
		this.state = {
			"name" : this.props.text,
			"tipselect" : false
		}
		this.ismodify = false;
		this.tipmsg = ['您的修改尚未保存' ,'取消' ,'放弃'];
	}
	setname=(event)=>{
		this.ismodify = event.target.value.trim()=='' ? false : true;
		this.setState({ "name" : event.target.value.trim() });
	}
	save=()=>{
		if(!this.state.name){
			return false;
		}
		api.FetchPost('/hyb-stu/stu_my/save_update',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({ "nick_name" : this.state.name })
		}).then(({res})=>{
			api.webview("modifynickname?param={\"token\":\""+res.data.token+"\" ,\"nick_name\":\""+this.state.name+"\"}");
			this.props.close(this.state.name);
		});
	}
	fanhui=()=>{
		this.ismodify ? this.setState({ "tipselect" : true }) : this.props.close();
	}
	back=(a)=>{
		a==1 ? this.props.close() : this.setState({ "tipselect" : false });
	}
	render(){
		return(
			<div className="memessage" id="memessagemodify">
				<div className="hd">
					<span onClick={this.fanhui}><i className="icon"></i>返回</span>
					<span>修改昵称</span>
					<span className={this.ismodify ? '' : 'huise'} onClick={this.save}>保存</span>
				</div>
				<div className="bd">
					<ul>
						<li className="s"><input type="text" maxLength="8" value={this.state.name} onChange={this.setname}/></li>
					</ul>
				</div>
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
NickName = connect(mapStateToProps)(NickName)
export default NickName
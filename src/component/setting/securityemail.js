import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import TipSelect from 'component/pagemsg/tipselect'
import 'css/memessage'
import api from 'api/api'
import icon29 from 'images/icon29.png'
import icon30 from 'images/icon30.png'

class SecurityEmail extends Component{
	constructor(props){
		super(props);
		this.state = {
			"text" : '',
			"verification" : '',
			"tipselect" : false,
			"time" : '',
			"isempty" : true
		}
		this.ismodify = false;
		this.tipmsg = ['您的修改尚未保存' ,'取消' ,'放弃'];
		this.issend = false;
	}
	componentWillUnmount(){
		clearInterval(this.state.timer);
	}
	fanhui=()=>{
		this.ismodify ? this.setState({ "tipselect" : true }) : this.props.close();
	}
	back=(a)=>{
		a==1 ? this.props.close() : this.setState({ "tipselect" : false });
	}
	changeverif=(event)=>{
		this.setState({ "verification" : event.target.value.trim() });
		this.refs.erro.classList.remove('show');
		this.issend && event.target.value.trim() ? this.setState({ "isempty" : false}) : this.setState({ "isempty" : true});
	}
	changetext=(event)=>{
		const val = event.target.value.trim();
		this.ismodify = true;
		if(val==''){
			this.setState({ "text" : val });
			this.refs.code.classList.add('huise');
		}else{
			this.setState({ "text" : val });
			this.refs.code.classList.remove('huise');
			this.refs.erro.classList.remove('show');
		}	
	}
	getcode=()=>{
		let i = 60 ,time = '';
		if(this.issend || this.refs.code.classList.contains('huise')){
			return false;
		}
		this.issend = true;
		if(api.isEmail(this.state.text)){
			this.refs.erro.classList.remove('show');
			api.FetchPost('/hyb-stu/stu_email/send',{
				UserKey : this.props.userstate.userKey,
				token : this.props.userstate.token,
				body : JSON.stringify({ "to" : this.state.text })
			}).then(({res})=>{
				time = setInterval(()=>{
					this.refs.code.textContent = (--i)+'秒后重发';
					this.setState({ 'timer' : time });
					if(i==0){
						clearInterval(time);
						this.issend = false;
						this.setState({ 'timer':'' });
						this.refs.code.textContent = '获取验证码';
					}
				},1000);
			},(res)=>{
				this.setState({ "text" : '' });
				this.refs.emialinput.value = '';
				this.refs.erro.textContent = res.data.message;
				this.refs.erro.classList.add('show');
				this.issend = false;
			});
		}else{
			this.setState({ "text" : '' });
			this.refs.code.classList.add('huise');
			this.refs.emialinput.value = '';
			this.ismodify = false;
			this.issend = false;
			this.refs.erro.textContent = '请输入正确的邮箱地址';
			this.refs.erro.classList.add('show');
		}
	}
	sub=()=>{
		this.refs.erro.classList.remove('show');
		if(!api.isEmail(this.state.text)){
			this.refs.erro.textContent = '请输入正确的邮箱地址';
			this.refs.erro.classList.add('show');
			return false;
		}
		if(!this.state.verification){
			this.refs.erro.textContent = '请输入验证码';
			this.refs.erro.classList.add('show');
			return false;
		}else{
			api.FetchPost('/hyb-stu/stu_my/save_update',{
				UserKey : this.props.userstate.userKey,
				token : this.props.userstate.token,
				body : JSON.stringify({ "security_email" : this.state.text ,"email_code" : this.state.verification })
			}).then(({res})=>{
				api.tip_msg('操作成功');
				setTimeout(()=>{
					this.props.close(this.state.text);
				},1100);
			},(res)=>{
				if(res.code==405){
					this.refs.erro.textContent = '邮箱与验证码不匹配';
					this.refs.verification.value = '';
					this.refs.erro.classList.add('show');
				}
			})
		}
	}
	render(){
		return(
			<div className="memessage" id="memessagemodify">
				<div className="hd">
					<span onClick={this.fanhui}><i className="icon3"></i></span>
					<span>{this.props.text=='未绑定' ? '绑定邮箱' : '更改邮箱'}</span>
					<span></span>
				</div>
				{
					this.props.text=='未绑定' ? <div className="msg"><i className="icon3"></i>为提高安全性，建议您立即绑定邮箱</div> : ''
				}
				<div className="bd">
					<p className="old">
						<img src={this.state.isshowmsg ? icon29 : icon30} />
						<span>您当前绑定：{this.props.text}</span>
					</p>
					<div className="abor">
						<p className="a"><input type="text" placeholder="请输入邮箱" onChange={this.changetext} ref="emialinput"/></p>
						<p className="a"><input className="verification" type="tel" maxLength="6"  placeholder="请输入验证码" ref="verification" onChange={this.changeverif} autoComplete="off"/><span className="huise" onClick={this.getcode} ref="code">点击获取</span></p>
					</div>
					<div className={this.state.isempty ? "sub huisebg" : "sub"} onClick={this.sub}>{this.props.text=='未绑定' ? '立即绑定邮箱' : '确认修改邮箱'}</div>
					<div className="erro" ref="erro"></div>
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
SecurityEmail = connect(mapStateToProps)(SecurityEmail)
export default SecurityEmail
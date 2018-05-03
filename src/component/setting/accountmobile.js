import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import TipSelect from 'component/pagemsg/tipselect'
import 'css/memessage'
import api from 'api/api' 
import icon7 from 'images/icon7.png'

class AccountMobile extends Component{
	constructor(props){
		super(props);
		this.state = {
			"text" : '',
			"verification" : '',
			"tipselect" : false,
			"time" : ''
		}
		this.ismodify = false;
		this.tipmsg = ['您的修改尚未保存' ,'取消' ,'放弃'];
		this.issend = false;

		this.finishcode = false;
		this.finishnumber = false;
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
		this.finishcode = event.target.value.trim()!='' ? true : false;
		this.setState({ "verification" : event.target.value.trim() });
		this.refs.erro.classList.remove('show');
		this.testsub();
	}
	changetext=(event)=>{
		const val = event.target.value.trim();
		if(val==''){
			this.refs.code.classList.add('vdisable');
			this.ismodify = false;
			this.finishnumber = false;
		}else{
			if(val.length==11){
				this.refs.code.classList.remove('vdisable');
				this.finishnumber = true;
			}else{
				this.refs.code.classList.add('vdisable');
				this.finishnumber = false;
			}
			this.ismodify = true;
		}
		this.testsub();
		this.setState({ "text" : event.target.value.trim() });
		this.refs.erro.classList.remove('show');
	}
	testsub=()=>{
		this.finishnumber && this.finishcode ? this.refs.subbtn.classList.remove('huisebg') : this.refs.subbtn.classList.add('huisebg');
	}
	getcode=()=>{
		let i = 60 ,time = '';
		if(this.issend || this.refs.code.classList.contains('vdisable')){
			return false;
		}
		if(this.props.text==this.state.text){
			this.refs.erro.textContent = '请输入其他的手机号';
			this.refs.erro.classList.add('show');
			return false;
		}
		this.issend = true;
		if(api.isPhoneNumberTest(this.state.text)){
			this.refs.erro.classList.remove('show');
			api.FetchPost('/hyb-stu/mobile/send',{
				UserKey : this.props.userstate.userKey,
				token : this.props.userstate.token,
				body : JSON.stringify({ "mobile" : this.state.text })
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
				this.refs.erro.textContent = res.data.message;
				this.refs.erro.classList.add('show');
				this.issend = false;
			});
		}else{
			this.refs.erro.textContent = '请输入正确的手机号';
			this.setState({ "text" : '' },()=>{
				this.refs.phonenumber.value='';
			});
			this.refs.erro.classList.add('show');
		}
	}
	sub=()=>{
		this.refs.erro.classList.remove('show');
		if(!this.state.verification){
			this.refs.erro.textContent = '请输入验证码';
			this.refs.erro.classList.add('show');
			return false;
		}else if(!api.isPhoneNumberTest(this.state.text)){
			this.refs.erro.textContent = '请输入正确的手机号';
			this.refs.erro.classList.add('show');
		}else{
			api.FetchPost('/hyb-stu/stu_my/save_update',{
				UserKey : this.props.userstate.userKey,
				token : this.props.userstate.token,
				body : JSON.stringify({ "account_mobile" : this.state.text ,"sms_code" : this.state.verification })
			}).then(({res})=>{
				if(this.props.text){
					api.tip_msg('操作成功 请重新登录');
					setTimeout(()=>{
						api.webview("logout");
						api.setLocalStorage("token" ,'');
						hashHistory.push('/login');
					},1100);
				}else{
					api.tip_msg('绑定成功');
					setTimeout(()=>{ this.props.close(); },1100);
				}
			},(res)=>{
				if(res.code==405){
					this.refs.erro.textContent = '手机号与验证码不匹配';
					this.setState({ "verification" : '' },()=>{
						this.refs.verification.value='';
					});
					this.refs.erro.classList.add('show');
				}else{
					this.refs.erro.textContent = res.data.message;
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
					<span>更改手机</span>
					<span></span>
				</div>
				<div className="bd">
					<p className="old">
						<img src={icon7} />
						<span>您当前手机：{this.props.text}</span>
					</p>
					<div className="abor">
						<p className="a"><input type="tel" maxLength="11" placeholder="请输入新的有效手机号码" ref="phonenumber" onChange={this.changetext}/></p>
						<p className="a"><input className="verification huise" type="tel" maxLength="6"  placeholder="请输入验证码" ref="verification" onChange={this.changeverif} autoComplete="off"/><span className="vdisable" onClick={this.getcode} ref="code">点击获取</span></p>
					</div>
					<div ref="subbtn" className="sub huisebg" onClick={this.sub}>确认修改手机号码</div>
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
AccountMobile = connect(mapStateToProps)(AccountMobile)
export default AccountMobile
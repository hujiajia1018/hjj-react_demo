import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { Fetchlogin } from 'action/loginAction'
import imgsrc2X from 'images/logo@2x.png'
import api from 'api/api'
import 'css/login'

class Login extends Component {
	constructor(props) {
		super(props);
		this.erroEl = null;
		this.state = {
			phoneNumber : '',
			timer : 0,
			UserKey : ''
		}
		this.haveclicknumberConde = false;
		this.time = null;
	}
	componentWillUnmount(){
		clearInterval(this.state.timer);
	}
	componentDidMount = ()=>{
		this.erroEl = document.querySelectorAll("p.erro")[0];
	}
	usernameChange = (e)=>{
		const el = document.querySelectorAll("i.close")[0].classList;
		e.target.value ? el.contains('opc') && el.remove('opc') : el.add('opc');
	}
	clear = (e) =>{
		this.refs.username.value = '';
		document.querySelectorAll("i.close")[0].classList.add('opc');
		this.erroEl.classList.add('opc');
	}
	isPhoneNumber = ()=>{
		let phoneNumber = this.refs.username.value.trim();
		if(phoneNumber && api.isPhoneNumberTest(phoneNumber)){
			this.setState({"phoneNumber" : phoneNumber});
			this.erroEl.classList.add('opc');
			return true;
		}else{
			this.erroEl.querySelectorAll('span')[0].textContent = '请输入正确的手机号';
			this.erroEl.classList.remove('opc');
			return false;
		}
	}
	getCode = (e) =>{
		let el = document.querySelectorAll('i.vfbtn')[0] ,i = 60 ,phoneNumber = this.refs.username.value.trim();
		if(this.state.timer || this.haveclicknumberConde) return false;
		this.haveclicknumberConde = true;
		el.textContent = '发送验证码中';
		api.FetchPost('/hyb-stuuser/mobile/send' ,{
			UserKey : this.state.UserKey,
			body : JSON.stringify({ "mobile" : phoneNumber })
		}).then(({res ,userKey})=>{
			this.time = setInterval(()=>{ 
				el.textContent = (--i)+'秒后重发';
				el.classList.add('c');
				this.setState({'timer':this.time});
				if(i<=0){
					this.setState({'timer':''},()=>{
						clearInterval(this.time);
						el.classList.remove('c');
						el.textContent = '重新获取';
					});
				}
			},1000);
			this.haveclicknumberConde = false;
			this.setState({ "phoneNumber" : phoneNumber ,"UserKey" : userKey });
		},(res)=>{
			if(res.code==402){
				this.setState({'timer':''},()=>{
					clearInterval(this.time);
					el.classList.remove('c');
					el.textContent = '获取验证码';
				});
			}else{
				if(res.code==400){
					this.erroEl.querySelectorAll('span')[0].textContent = res.reason;
				}else{
					this.erroEl.querySelectorAll('span')[0].textContent = res.data.message;
				}
				el.textContent = '重新获取';
				this.erroEl.classList.remove('opc');
			}
			this.haveclicknumberConde = false;
		});
	}
	numberCondeInit = ()=>{
		if(!this.isPhoneNumber()) return;
		this.getCode();
	}
	loginSubmit = ()=>{
		const val = this.refs.verification.value.trim(),
			  el = document.querySelectorAll('i.vfbtn')[0];

		if(!this.isPhoneNumber()) return;
		if(!val){
			this.erroEl.querySelectorAll('span')[0].textContent = '验证码错误';
			this.erroEl.classList.remove('opc');
			return;
		}
		this.props.loginAction({
			UserKey : this.state.UserKey,
			body : JSON.stringify({ "mobile" : this.refs.username.value.trim() ,"sms_code" : val })
		},(date)=>{
			if(date.code==402){
				this.erroEl.querySelectorAll('span')[0].textContent = date.reason;
				this.erroEl.classList.remove('opc');
			}else if(!date){	
				this.setState({'timer':''},()=>{
					clearInterval(this.time);
					el.classList.remove('c');
					el.textContent = '获取验证码';
				});
			}else{
				this.erroEl.querySelectorAll('span')[0].textContent = date;
				this.erroEl.classList.remove('opc');
			}
		});
	}
	render() {
		return (
			<div className="login">
				<div className="logo-box hd">
					<img src={imgsrc2X} />
				</div>
				<div className="login-box">
					<p>
						<i className="icon3 l"></i>
						<i className="r">
							<input type="tel" maxLength="11"  placeholder="请输入手机号" ref="username" onChange={this.usernameChange} /><i onClick={this.clear} className="icon3 close opc"></i>
						</i>
					</p>
					<p className="b">
						<i className="icon3 l"></i>
						<i className="r">
							<input type="tel" maxLength="6"  placeholder="请输入验证码" ref="verification" autoComplete="off"/>
						</i>
						<i className="vfbtn" onClick={this.numberCondeInit}>获取验证码</i>
					</p>
					<div className="subBtn" onClick={this.loginSubmit}>登录</div>
				</div>
				<p className="erro opc"><i className="icon"></i><span></span></p>
				<p className="agreetext"><Link to="/agreement">登录既表示阅读并同意<span>《小牛接招用户协议》</span></Link></p>
			</div>
		);
	}
}

const mapStateToProps = (state ,ownProps) =>{
	return {
		userstate : state.UserState
	}
}
const mapDispatchToProps = (dispath) =>{
	return {
		loginAction : bindActionCreators(Fetchlogin ,dispath)
	}
}

Login = connect(mapStateToProps ,mapDispatchToProps)(Login)
export default Login
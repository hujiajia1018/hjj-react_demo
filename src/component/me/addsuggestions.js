import React, { Component } from 'react'
import { Link ,hashHistory } from 'react-router'
import { connect } from 'react-redux'
import api from 'api/api'
import 'css/merelease'
import { fankui ,uploadImg } from 'api/config'

class AddSuggestions extends Component{
	constructor(props){
		super(props);
		this.state = {
			picture : [],
			content : '',
			suggestion_type : '',
			number : 0,
			picnumber : 0
		}
		this.hassubmit = false;
	}
	creatSuggestions=()=>{
		if(!this.state.content || !this.state.suggestion_type || this.state.content.length > 300){
			return false;
		}
		if(this.hassubmit){
			return false;
		}
		this.hassubmit = true;
		api.FetchPost('/hyb-stu/stu_user_suggestion/save_suggestion',{
			UserKey : this.props.userstate.userKey,
			token : this.token,
			body : JSON.stringify({ 
				"content" : this.state.content, 
				"pictures" : this.state.picture,
				"suggestion_type" : this.state.suggestion_type
			})
		}).then(({res})=>{
			api.tip_msg('感谢反馈！');
			hashHistory.push('/suggestions');
		},()=>{
			this.hassubmit = false;
		});
	}
	change=(event)=>{
		const content = event.target.value.trim();
		content.length > 300 ? this.refs.textareaelm.classList.add('redbor') : this.refs.textareaelm.classList.remove('redbor');
		this.setState({ "content" : event.target.value.trim() ,"number" : content.length });
	}
	addimg=()=>{
		const actiontype = "savetoalbum?param={\"token\":\""+this.props.userstate.token+"\" ,\"upload_type\":\""+2+"\"}";
		api.webview(actiontype ,this.getimg);
	}
	getimg=(obj)=>{
		this.setState({ "picnumber": this.state.picture.length+1 ,"picture" : this.state.picture.concat([uploadImg+obj.result.avatar_url+'?r='+Math.random(1)]) });
	}
	select=(event)=>{
		const elm = api.closest(event.target ,'p');
		document.querySelectorAll('p.onsuggestion').length && document.querySelectorAll('p.onsuggestion')[0].classList.remove('onsuggestion');
		elm.classList.add('onsuggestion');
		this.setState({ "suggestion_type" : elm.getAttribute('data-id') });
	}
	removepic=(event)=>{
		const i = api.closest(event.target ,'li').getAttribute('data-index');
		let arr = [].concat(this.state.picture);
		arr.splice(i,1);
		this.setState({ "picnumber": this.state.picture.length-1 ,"picture" : arr });
	}
	render(){
		return(
			<div className="merelease">
				<div className="hd">
					<span><Link to="/suggestions"><i className="icon3"></i></Link></span>
					<span>意见反馈</span>
					<span onClick={this.creatSuggestions}>提交</span>
				</div>
				<div className="msgtitile">
					请选择反馈问题的类型（必选）
				</div>
				<div className="addtype">
					{
						Object.keys(fankui).map((key)=>{
							return <p onClick={this.select} key={key} data-id={key}><i className="icon3"></i>{fankui[key]}</p>
						})
					}
				</div>
				<div className="content">
					<textarea maxLength="300" ref="textareaelm" placeholder="请输入反馈，我们将不断改进" onChange={this.change}>{this.content}</textarea>
					<p className="contentcss">{this.state.number}/300</p>
					<ul className="suggestimglist">
						{
							this.state.picture.length ? this.state.picture.map((item ,index)=>{
								return <li data-index={index} key={index}><b style={{"backgroundImage":"url("+item+")"}}></b><i onClick={this.removepic}>x</i></li>
							}) : ''
						}
						{
							this.state.picnumber < 5 ? <li className="add" onClick={this.addimg}><span>+<em>添加照片</em></span></li> : ''
						}
					</ul>
					<div className="clearbox"></div>
					<p>{this.state.picnumber}/5</p>
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
AddSuggestions = connect(mapStateToProps)(AddSuggestions)
export default AddSuggestions

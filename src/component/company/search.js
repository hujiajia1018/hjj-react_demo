import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { GetSearchResultsCompany } from 'action/searchcompanyAction'
import api from 'api/api'
import { city } from 'api/config'
import 'css/search'
import Hotcity from 'component/hotcity'

class Search extends Component{
	constructor(props){
		super(props);
		this.state = {
			showcity : '',
			history : [],
			isopencityselect : false,
			locationCity : '110100'
		}
	}
	componentDidMount(){
		let history = api.getLocalStorage('searchhistory');
		history = history ? history.split(',') : [];
		this.setState({ "history" : [].concat(history) });
		window.scrollTo(0 ,0);
	}
	submit =(event)=>{
		event.preventDefault();
		const val = event.target.tagName.toLowerCase()=='form' ? this.refs.searchval.value.trim() : event.target.textContent,
				history = api.updataStorage('searchhistory' ,val);

		document.activeElement.blur();
		this.setState({ "history" : history });
		api.setLocalStorage('searchhistory', history.join(','));
		this.searchto(val);
	}
	searchto =(val)=>{
		this.props.searchCompany({
			token : this.props.userstate.token,
			body : JSON.stringify({
				city : this.state.locationCity,
				ent_name : val,
				page : {
					size : 10,
					page : 1
				}
			})
		});
	}
	reset =()=>{
		this.refs.searchval.value = '';
	}
	showhistory =()=>{
		if(this.state.history){
			return this.state.history.map((val,key)=>{
				return <span key={key} onClick={this.submit}>{val}</span>
			})
		}else{
			return '';
		}
	}
	resethistory =()=>{
		api.setLocalStorage('searchhistory' ,'');
		this.setState({ "history" : [] });
	}
	openselectcity =(cityid)=>{
		typeof cityid == 'string' ? this.setState({ "isopencityselect" : !this.state.isopencityselect ,"locationCity" : cityid }) : this.setState({ "isopencityselect" : !this.state.isopencityselect });
	}
	sethistoryheight =()=>{
		if(this.refs.historybox.classList.contains('hisoryheight')){
			this.refs.historybox.classList.remove('hisoryheight');
		}else{
			this.refs.historybox.classList.add('hisoryheight');
		}
	}
	render(){
		let history = this.showhistory();
		return (
			<div className="search">
				<div className="hd">
					<div>
						<em onClick={this.openselectcity}><b>{city[this.state.locationCity]}</b><i className="icon"></i></em>
						<form onSubmit={this.submit} action="javascript:return false;">
							<input autoComplete="off" maxLength="30" ref="searchval" name="search" type="search" placeholder="搜索喜欢的公司" />
							<i className="icon" onClick={this.reset}></i>
						</form>
					</div>
					<span><Link to="/company">取消</Link></span>
				</div>
				<div className="box">
					<h1>热门搜索</h1>
						<div className="flexbox">
							<span onClick={this.submit}>百度</span>
							<span onClick={this.submit}>腾讯</span>
							<span onClick={this.submit}>阿里</span>
							<span onClick={this.submit}>青牛</span>
							<span onClick={this.submit}>京东</span>
							<span onClick={this.submit}>互联网</span>
						</div>
						{this.state.history.length ? <h2 className="his">历史搜索</h2> : ''}
						{
							this.state.history.length ? <div className="historybox" ref="historybox">
								<div className="historyboxcont" >
									{history}
									{this.state.history.length >2 ? <div className="mark"></div> : ''}
								</div>
								<b onClick={this.sethistoryheight}><i className="icon3 a"></i></b>
								<b onClick={this.resethistory}><i className="icon3 b"></i></b>
							</div> : '' 
						}
				</div>
				<ReactCSSTransitionGroup transitionName="selcityAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.isopencityselect ? <Hotcity handleclose={this.openselectcity} /> : ''}
				</ReactCSSTransitionGroup>
			</div>
		)
	}
}
const mapDispatchToProps = (dispath) =>{
	return {
		searchCompany : bindActionCreators(GetSearchResultsCompany ,dispath)
	}
}
const mapStateToProps = (state ,ownProps) =>{
	return {
		userstate : state.UserState
	}
}
Search = connect(mapStateToProps ,mapDispatchToProps)(Search)
export default Search
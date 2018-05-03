import React, { Component } from 'react'
import { Link ,hashHistory } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
		let history = api.getLocalStorage('searchposition');
		history = history ? history.split(',') : [];
		this.setState({ "history" : [].concat(history) });
	}
	submit =(event)=>{
		event.preventDefault();
		const val = event.target.tagName.toLowerCase()=='form' ? this.refs.searchval.value.trim() : event.target.textContent,
				history = api.updataStorage('searchposition' ,val);

		document.activeElement.blur();
		this.setState({ "history" : history });
		api.setLocalStorage('searchposition', history.join(','));
		this.searchto(val);
	}
	searchto =(val)=>{
		hashHistory.push({pathname : '/positionsearchresult' ,state : { "keyword" : val ,"cityid" : this.state.locationCity }});
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
		api.setLocalStorage('searchposition' ,'');
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
							<input maxLength="30" autoComplete="off" ref="searchval" name="search" type="search" placeholder="搜索喜欢的职位" />
							<i className="icon" onClick={this.reset}></i>
						</form>
					</div>
					<span><Link to="/position">取消</Link></span>
				</div>
				<div className="box">
					<h1>热门搜索</h1>
						<div className="flexbox">
							<span onClick={this.submit}>产品经理</span>
							<span onClick={this.submit}>人工智能</span>
							<span onClick={this.submit}>大数据</span>
							<span onClick={this.submit}>Java</span>
							<span onClick={this.submit}>前端工程师</span>
							<span onClick={this.submit}>UI设计师</span>
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

const mapStateToProps = (state ,ownProps) =>{
	return {
		userstate : state.UserState
	}
}
Search = connect(mapStateToProps)(Search)
export default Search
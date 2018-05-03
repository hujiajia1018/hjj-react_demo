import React, { Component } from 'react'
import { Link ,hashHistory } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FetchGetMyJob } from 'action/aboutmyjobAction'
import { FetchPositionList ,clearPositionList } from 'action/searchpositionAction'
import api from 'api/api'
import Hotcity from 'component/hotcity'
import Requirement from './requirementSearch'
import { city ,zhiwei ,xueli ,mianshi ,showday } from 'api/config'
import Tip from 'component/pagemsg/tip'
import Tipshowend from 'component/pagemsg/tipshowend'
import companylogo from 'images/companylogo.png'
import 'css/searchresult'
import 'css/position'

class SearchResult extends Component{
	constructor(props){
		super(props);
		this.state = {
			isopencityselect : false,
			locationCity : this.props.location.state.cityid,
			value : this.props.location.state.keyword
		}
		this.page = this.props.positionlist.page;
		this.data = {
			guimo : this.props.positionlist.company_size_types,
			hangye : this.props.positionlist.industries,
			rongzi : this.props.positionlist.period_types,
			xueli : this.props.positionlist.edu_level,
			moneyway : this.props.positionlist.salary_sort,
			timeway : this.props.positionlist.time_sort
		};
		
		this.searchval = this.props.location.state.keyword;
		this.userscrolltop = this.props.location.state ? this.props.location.state.userscrolltop ? this.props.location.state.userscrolltop : 0 : 0;
	}
	componentDidMount(){
		this.props.getusermyjob({
			token : this.props.userstate.token
		});
		!this.props.positionlist.list.length && this.startSearch();
		window.scrollTo(0 ,this.userscrolltop);
	}
	componentDidUpdate =()=>{
		document.addEventListener('scroll',this.scroll,false);
	}
	componentWillUnmount=()=>{
		document.removeEventListener('scroll',this.scroll);
	}
	handleChange=(event)=>{
		this.setState({ value : this.refs.searchval.value.trim() });
	}
	scroll=(event)=>{
		let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
		const el = document.querySelectorAll('ul.list li:last-child')[0];

		this.props.router.replace({
			pathname : '/positionsearchresult' ,
			state : { "userscrolltop" : scrolltop ,"keyword" : this.searchval ,"cityid" : this.state.locationCity }
		});
		if(!el){
			return;
		}
		if(this.props.positionlist.maxpage <= this.page){
			return;
		}
		if(this.props.positionlist.status!='pending'){
			if(scrolltop + window.innerHeight + 10 >= Math.ceil(document.body.scrollHeight)){
				++this.page;
				this.startSearch();
			}
		}
	}
	openselectcity =(cityid)=>{
		typeof cityid == 'string' 
			? this.setState({ "isopencityselect" : !this.state.isopencityselect ,"locationCity" : cityid },()=>{
				this.searchto();
			})
			: this.setState({ "isopencityselect" : !this.state.isopencityselect });
	}
	searchto =(event)=>{
		event && event.preventDefault();
		this.page = 1;
		this.searchval = this.state.value;
		this.props.clearpositionlist();
		api.updataStorage('searchposition' ,this.searchval);
		this.startSearch();
	}
	setString=(name ,spanname)=>{
		const start = name.indexOf(spanname) ,end = start + spanname.length;
		let a = name.substring(0 ,start), b = name.substring(end);
		return a+'<span>'+spanname+'</span>'+b;
	}
	reset =()=>{
		this.setState({ value : '' });
		this.searchval = '';
	}
	getsearch=(obj)=>{
		this.data = obj;
		this.props.clearpositionlist();
		this.page = 1;
		this.startSearch();
	}
	startSearch=()=>{
		let obj = {};
		
		if(api.isNumber(this.data.moneyway)){
			obj = {
				page : {
					size : 10,
					page : this.page
				},
				position_name : this.state.value,
				city : this.state.locationCity,
				company_size_types : this.data.guimo,
				industries : this.data.hangye,
				period_types : this.data.rongzi,
				edu_level : this.data.xueli,
				salary_sort : this.data.moneyway
			}
		}else if(api.isNumber(this.data.timeway)){
			obj = {
				page : {
					size : 10,
					page : this.page
				},
				position_name : this.state.value,
				city : this.state.locationCity,
				company_size_types : this.data.guimo,
				industries : this.data.hangye,
				period_types : this.data.rongzi,
				edu_level : this.data.xueli,
				time_sort : this.data.timeway
			}
		}else{
			obj = {
				page : {
					size : 10,
					page : this.page
				},
				position_name : this.state.value,
				city : this.state.locationCity,
				company_size_types : this.data.guimo,
				industries : this.data.hangye,
				period_types : this.data.rongzi,
				edu_level : this.data.xueli
			}
		}

		this.refs.searchval.blur();
		this.props.getpositionlist({
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify(obj)
		});
		this.props.router.replace({
			pathname : '/positionsearchresult' ,
			state : { "keyword" : this.searchval ,"cityid" : this.state.locationCity }
		});
	}
	goback = ()=>{
		this.props.clearpositionlist();
		hashHistory.push({pathname : '/position'});
	}
	render(){
		let style = this.page > 1 && this.props.positionlist.status=='pending' ? {"paddingBottom" : '3px'} : {"paddingBottom" : 0}
		return(
			<div className="searchresult" id="searchresult">
				<div className="hd">
					<span onClick={this.goback}>返回</span>
					<div>
						<em onClick={this.openselectcity}><b>{city[this.state.locationCity]}</b><i className="icon"></i></em>
						<form onSubmit={this.searchto} action="javascript:return false;">
							<input maxLength="30" autoComplete="off" onChange={this.handleChange} ref="searchval" name="search" value={this.state.value} type="search" placeholder="搜索喜欢的职位" />
							<i className="icon" onClick={this.reset}></i>
						</form>
					</div>
				</div>
				<Requirement 
					searchhandle={this.getsearch}
					cityid={this.state.locationCity}
					moneyway={this.props.positionlist.salary_sort}
					timeway={this.props.positionlist.time_sort}
					xueli={this.props.positionlist.edu_level}
					rongzi={this.props.positionlist.period_types}
					guimo={this.props.positionlist.company_size_types}
					hangye={this.props.positionlist.industries}
				/>
				<ReactCSSTransitionGroup transitionName="selcityAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.isopencityselect ? <Hotcity handleclose={this.openselectcity} /> : ''}
				</ReactCSSTransitionGroup>
				<ul className="list" style={style}>
					{ this.page==1 && this.props.positionlist.status=='pending' ? <Tip text="" type="loading" /> : '' }
					{ this.page==1 && this.props.positionlist.status=='error' ? <Tip text="出错误了" type="tiperro" /> : '' }
					{ this.page==1 && this.props.positionlist.status=='nodata' ? <Tip text="抱歉，暂时没有相关内容" type="nodata" /> : '' }
					{
						this.props.positionlist.list.length ? this.props.positionlist.list.map((item ,key)=>{
							return <li key={key}>
										<Link to={{ pathname : '/positiondetail' ,state : { "id" : item.id } }}>
											<label>
												<img src={item.logo ? item.logo : companylogo} />
											</label>
											<div className="positionmsg">
												<p><span className="title" dangerouslySetInnerHTML={{__html : item.position_name }} /><b className="red">{api.getsalary(item.salary_min ,item.salary_max)}</b></p>
												<p><span>{item.full_name}</span><b>{api.showdaytext(item.update_time)}</b></p>
												<p><span><i className="icon3 locat"></i>{city[this.state.locationCity]}</span><em><i className="icon3 xueli"></i>{xueli[item.edu_level]}</em></p>
												{item.status ? <p className={api.msstatus(item.status) ? "icon5 jieduan jieduan2" : "icon5 jieduan"}>{mianshi[item.status]}</p> : ''}
											</div>
										</Link>
									</li>
						}) : ''
					}
					{ this.page > 1 && this.props.positionlist.status=='pending' ? <Tipshowend text="加载中请稍等"/> : '' }
				</ul>
			</div>
		)
	}
}
const mapDispatchToProps = (dispath) =>{
	return {
		getusermyjob : bindActionCreators(FetchGetMyJob ,dispath),
		getpositionlist : bindActionCreators(FetchPositionList ,dispath),
		clearpositionlist : bindActionCreators(clearPositionList ,dispath)
	}
}
const mapStateToProps = (state ,ownProps) =>{
	return {
		userstate : state.UserState,
		aboutmyjob : state.AboutMyJob,
		positionlist : state.SearchPositionList
	}
}
SearchResult = connect(mapStateToProps ,mapDispatchToProps)(SearchResult)
export default SearchResult
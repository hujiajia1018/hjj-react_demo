import React, { Component } from 'react'
import { Link ,hashHistory } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { GetSearchResultsCompany ,UpdateSearchResultsCompany ,ClearSearchResultsCompany } from 'action/searchcompanyAction'
import { FetchGetMyJob } from 'action/aboutmyjobAction'
import api from 'api/api'
import Hotcity from 'component/hotcity'
import 'css/searchresult'
import { city ,zhiwei ,guimo ,hangye } from 'api/config'
import Tip from 'component/pagemsg/tip'
import companylogo from 'images/companylogo.png'
import Tipshowend from 'component/pagemsg/tipshowend'

class SearchResult extends Component{
	constructor(props){
		super(props);
		this.state = {
			isopencityselect : false,
			locationCity : this.props.searchresult.cityid,
			value : this.props.searchresult.keywords
		}
		this.searchval = this.props.searchresult.keywords;
		this.page = this.props.searchresult.page;

		this.userscrolltop = this.props.location.state ? this.props.location.state.userscrolltop ? this.props.location.state.userscrolltop : 0 : 0;
	}
	componentDidMount(){
		this.props.getusermyjob({
			token : this.props.userstate.token
		});
		document.addEventListener('scroll',this.scroll,false);
		window.scrollTo(0 ,this.userscrolltop);
	}
	componentWillUnmount=()=>{
		document.removeEventListener('scroll',this.scroll);
	}
	scroll=(event)=>{
		let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
		const el = document.querySelectorAll('div.companyList > div:last-child')[0];
		this.props.router.replace({
			pathname : '/searchresult' ,
			state : { "userscrolltop" : scrolltop ,"keyword" : this.state.value ,"cityid" : this.state.locationCity }
		});
		if(!el){
			return;
		}
		if(this.props.searchresult.maxpage <= this.page){
			return;
		}
		if(this.page==1 && this.props.searchresult.status!='pending' || this.props.searchresult.pagestatus!='pending'){
			if(scrolltop + window.innerHeight + 10 >= Math.ceil(document.body.scrollHeight)){
				++this.page;
				this.searchto();
			}
		}
	}
	handleChange=(event)=>{
		this.setState({ value : this.refs.searchval.value.trim() });
	}
	openselectcity =(cityid)=>{
		typeof cityid == 'string' 
			? this.setState({ "isopencityselect" : !this.state.isopencityselect ,"locationCity" : cityid },()=>{
				this.searchto();
			})
			: this.setState({ "isopencityselect" : !this.state.isopencityselect });
	}
	submitto=(event)=>{
		event && event.preventDefault();
		this.props.clearCompany();
		this.searchto();
		window.scrollTo(0 ,0);
	}
	searchto =(event)=>{
		this.searchval  = this.state.value;
		api.updataStorage('searchhistory' ,this.searchval);
		this.refs.searchval.blur();
		
		if(this.props.searchresult.keywords!=this.searchval || this.props.searchresult.cityid!=this.state.locationCity){
			this.page = 1;
			this.props.searchCompany({
				token : this.props.userstate.token,
				body : JSON.stringify({
					city : this.state.locationCity,
					ent_name : this.state.value,
					page : {
						size : 10,
						page : this.page
					}
				})
			});
		}else{
			this.props.updateSearch({
				token : this.props.userstate.token,
				body : JSON.stringify({
					city : this.state.locationCity,
					ent_name : this.state.value,
					page : {
						size : 10,
						page : this.page
					}
				})
			});
		}
		this.props.router.replace({
			pathname : '/searchresult' ,
			state : { "keyword" : this.state.value ,"cityid" : this.state.locationCity }
		});
	}
	reset =()=>{
		this.setState({ value : '' }); 
	}
	getpositionname =(list)=>{
		let posName = [];
		list.map((val ,index)=>{
			if(this.props.aboutmyjob.job==val){
				posName.push(zhiwei[val.substring(0,3)].children[val.substring(0,6)].children[val].name);
			}
		})
		if(!posName.length){
			posName.push(zhiwei[list[0].substring(0,3)].children[list[0].substring(0,6)].children[list[0]].name);
		}
		return posName.join(',');
	}
	fuli=(list)=>{
		let name = [];
		if(list && list.length){
			list.map((item,index)=>{
				if(index < 3){
					name.push(`<span>${item}</span>`);
				}
			});
			return name.join(' ');
		}else{
			return '';
		}
	}
	showcompanylist =()=>{
		if(this.props.searchresult.status=='pending'){
			return <Tip text="" type="loading" />;
		}else if(this.props.searchresult.status=='nodata'){
			return <Tip text="抱歉，暂时没有相关内容" type="nodata" />;
		}else if(this.props.searchresult.status=='succsee'){
			return this.props.searchresult.companylist.map((item  ,index)=>{
				return <div className="box" key={index} data-company={item.ent_id}>
							<div>
								<b><img src={item.logo ? item.logo : companylogo}/></b>
							</div>
							<div>
								<Link to={{ "pathname" : '/companydetail' ,state : { "id" : item.ent_id ,"cityid" : this.state.locationCity } }}>                
									<p className="name" dangerouslySetInnerHTML={{__html: item.full_name }}></p> 
									<p className="location"><i className="icon3"></i>{city[this.state.locationCity]}<i className="icon3 number"></i>{item.company_size_type ? guimo[item.company_size_type] : '--'}</p>
									<p className="fuli" dangerouslySetInnerHTML={{__html: this.fuli(item.labels) }}></p>
								</Link>
								<div className={item.status==1 ? 'bofang online' : 'bofang'}>
									{ item.status==1 ? <Link to={{ "pathname" : '/companydetail' ,state : { "id" : item.ent_id ,"cityid" : this.state.locationCity} }}><i className="icon3"></i><p>宣讲直播…</p></Link> : '' }
									{ item.status==2 ? <Link to={{ "pathname" : '/companydetail' ,state : { "id" : item.ent_id ,"cityid" : this.state.locationCity} }}><i className="icon3"></i><p>宣讲回放…</p></Link> : '' }
								</div>
								<div className="commsg">
									{hangye[item.industry_type]}　|　<span>{item.position_count}</span>个热门职位
								</div>
							</div>
						</div>
			})
		}else if(this.props.searchresult.status=='error'){
			return <Tip text="出错误了" type="tiperro" />;
		}
	}
	goback = ()=>{
		hashHistory.push({pathname : '/company'});
	}
	render(){
		const list = this.showcompanylist();
		return(
			<div className="searchresult">
				<div className="hd">
					<span onClick={this.goback}>返回</span>
					<div>
						<em onClick={this.openselectcity}><b>{city[this.state.locationCity]}</b><i className="icon"></i></em>
						<form onSubmit={this.submitto} action="javascript:return false;">
							<input autoComplete="off" maxLength="30" onChange={this.handleChange} ref="searchval" name="search" value={this.state.value} type="search" placeholder="搜索喜欢的公司" />
							<i className="icon" onClick={this.reset}></i>
						</form>
					</div>
				</div>
				<div className="companyList">
					{list}
					{
						this.props.searchresult.pagestatus=='pending' ? <Tipshowend text="加载中请稍等"/> : ''
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
		searchCompany : bindActionCreators(GetSearchResultsCompany ,dispath),
		updateSearch : bindActionCreators(UpdateSearchResultsCompany ,dispath),
		getusermyjob : bindActionCreators(FetchGetMyJob ,dispath),
		clearCompany : bindActionCreators(ClearSearchResultsCompany ,dispath)
	}
}
const mapStateToProps = (state ,ownProps) =>{
	return {
		userstate : state.UserState,
		searchresult : state.SearchCompany,
		aboutmyjob : state.AboutMyJob,
	}
}
SearchResult = connect(mapStateToProps ,mapDispatchToProps)(SearchResult)
export default SearchResult
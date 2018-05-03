import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FetchGetMyJob ,SetMyJob } from 'action/aboutmyjobAction'
import { FetchPositionList ,clearPositionList } from 'action/positionlistAction'
import Selectcity from 'component/company/selectcity'
import Requirement from './requirement'
import api from 'api/api'
import Tip from 'component/pagemsg/tip'
import Tipshowend from 'component/pagemsg/tipshowend'
import { city ,zhiwei ,xueli ,mianshi } from 'api/config'
import companylogo from 'images/companylogo.png'
import loadingimg2 from 'images/loading2.gif'
import 'css/position'

class Position extends Component{
	constructor(props){
		super(props);
		this.state = {
			selcity : false,
			database : this.props.positionlist.database,
			cityid : this.props.positionlist.city,
			translateY : 0
		}
		this.touchY = 0;
		this.data = {
			guimo : this.props.positionlist.company_size_types,
			hangye : this.props.positionlist.industries,
			rongzi : this.props.positionlist.period_types,
			xueli : this.props.positionlist.edu_level,
			moneyway : this.props.positionlist.salary_sort,
			timeway : this.props.positionlist.time_sort
		};
	
		this.istouchmove = false;
		this.updatamsgshow = false;
		this.translateY = 0;
		this.page = this.props.positionlist.page;
		this.componentStatus = true;

		if(this.props.location.state){
			if(this.props.location.state.userscrolltop){
				this.userscrolltop = this.props.location.state.userscrolltop;
			}
		}else if(api.getLocalStorage("positionUserscrolltop")){
			this.userscrolltop = api.getLocalStorage("positionUserscrolltop");
		}else{
			this.userscrolltop = 0;
		}
	}
	componentDidMount(){
		this.props.getusermyjob({
			token : this.props.userstate.token
		});

		if(this.props.positionlist.status!='nodata' && !this.props.positionlist.list.length){
			this.getDatabase();
		}else{
			window.scrollTo(0 ,this.userscrolltop);
		}
	}
	componentDidUpdate =()=>{
		document.addEventListener('scroll',this.scroll,false);
	}
	componentWillUnmount=()=>{
		this.componentStatus = false;
		api.setLocalStorage("positionUserscrolltop" ,this.userscrolltop);
		document.removeEventListener('scroll',this.scroll);
	}
	getDatabase =()=>{
		api.FetchGet('/hyb-stu/stu_position/all_type',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token
		}).then((res)=>{
			if(this.componentStatus){
				let val = res.data.citys.length && !res.data.citys.includes('110100') ? res.data.citys[0] : '110100';
				this.setState({ "database" : Object.assign({}, res.data) ,"cityid" : val },()=>{ this.startSearch(); });				
			}
		},()=>{
			api.tip_msg('错误');
		});
	}
	setSelcity =({id ,text})=>{
		id ? this.setState({ "cityid" : id ,"selcity" : !this.state.selcity },()=>{
			this.props.clearpositionList();
			this.data = {
				guimo : [],
				hangye : [],
				rongzi : [],
				xueli : [],
				moneyway : '',
				timeway : 0
			};
			this.startSearch('changecity');
		}) : this.setState({ "selcity" : !this.state.selcity });
	}
	getjobname=(id)=>{
		return id ? zhiwei[id.substring(0,3)].children[id.substring(0,6)].children[id].name : '';
	}
	handleBind = (event)=>{
		if(event.type=='touchstart'){
			this.touchStart(event);
		}else if(event.type=='touchmove'){
			this.touchMove(event);
		}
	}
	touchStart = (event)=>{
		this.touchY = event.targetTouches[0].pageY;
	}
	touchMove = (event)=>{
		let dir = event.targetTouches[0].pageY - this.touchY ,translateY = 0 ,direction = dir > 0 ? 1 : -1;// 鼠往上  -1  鼠标往下  1
		const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		const end = ()=>{
			if(this.state.translateY>20){
				this.setState({ "translateY" : 0 });
				this.page = 1;
				this.props.clearpositionList();
				this.startSearch();
				setTimeout(()=>{
					this.refs.updatamsg.innerHTML = '下拉即可刷新';
				},320);
			}
			this.istouchmove = false;
			this.updatamsgshow = false;
			this.setState({ "translateY" : 0  });
			window.removeEventListener('touchend' ,end);
		}
		if(!this.state.cityid){
			return false;
		}
		if(direction>0 && scrollY<=0){
			translateY = Math.min(dir, 35) / 2 + Math.max(0, dir - 35);
			if(translateY>10){
				this.updatamsgshow = true;
			}
			if(translateY>23){
				this.refs.updatamsg.innerHTML = '释放即可刷新';
			}
			if(!this.istouchmove){
				window.addEventListener('touchend' ,end ,false);
			}
			this.setState({ "translateY" : api.damping(translateY) });
			this.istouchmove = true;
		}
	}
	getsearch=(obj)=>{
		this.data = obj;
		this.props.clearpositionList();
		this.page = 1;
		this.startSearch();
	}
	startSearch=(reson)=>{
		let obj = {};

		if(this.componentStatus && reson=='changecity'){
			this.props.clearpositionList();
			this.page = 1;
		}

		if(api.isNumber(this.data.moneyway)){
			obj = {
					page : {
						size : 10,
						page : this.page
					},
					position_name : '',
					city : this.state.cityid,
					company_size_types : this.data.guimo ,
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
					position_name : '',
					city : this.state.cityid,
					company_size_types : this.data.guimo ,
					industries : this.data.hangye,
					period_types : this.data.rongzi,
					edu_level : this.data.xueli,
					time_sort : this.data.timeway
				}
		}

		this.componentStatus && this.props.getpositionlist({
			token : this.props.userstate.token,
			body : JSON.stringify(obj),
			database : this.state.database
		});
	}
	scroll=(event)=>{
		let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
		const el = document.querySelectorAll('ul.list li:last-child')[0];
		
		this.userscrolltop = scrolltop;
		this.props.router.replace({
			pathname : '/position' ,
			state : { "userscrolltop" : scrolltop }
		});

		if(!el){
			return false;
		}

		if(this.props.positionlist.maxpage <= this.page){
			return false;
		}
		if(this.props.positionlist.status!='pending'){
			if(scrolltop + window.innerHeight + 10 >= Math.ceil(document.body.scrollHeight)){
				++this.page;
				this.startSearch();
			}
		}
	}
	setconent =()=>{
		let style = { transform : `translateY(${this.state.translateY}px)` },
		style1 = this.updatamsgshow ? { visibility : "visible" ,transform : `translateY(${this.state.translateY/6}px)` } : { transform : `translateY(${this.state.translateY/6}px)` };
		
		return <div className="position">
				<div className="hdfixed">
					<div className="hd">
						{ this.state.cityid ? <span onClick={this.setSelcity}><em>{city[this.state.cityid]}</em><i className="icon3 cityicon"></i></span> : <span></span> }
						<span>职位</span>
						<span><Link to="/positionsearch"><i className="icon3 search"></i></Link></span>
					</div>
				</div>
				<Requirement 
					xueli={this.state.database.edu_level} 
					rongzi={this.state.database.period_types} 
					tuandui={this.state.database.company_size_types} 
					hangye={this.state.database.industries} 
					searchhandle={this.getsearch}
					cityid={this.state.cityid}
					selecteddata = {this.data}
				/>
				<div className="updatamsg" style={style1}><img src={loadingimg2} /><b ref="updatamsg" >下拉即可刷新</b></div>
				<ul className="list" style={style} onTouchStart={this.handleBind} onTouchMove={this.handleBind}>
					{ this.page==1 && this.props.positionlist.status=='pending' ? <Tip text="" type="loading" /> : '' }
					{ this.page==1 && this.props.positionlist.status=='error' ? <Tip text="出错误了" type="tiperro" /> : '' }
					{ this.page==1 && this.props.positionlist.status=='nodata' ? <Tip text="抱歉，暂时没有相关内容" type="nodata" /> : '' }
					{
						this.props.positionlist.status!='error' && this.props.positionlist.list.length ? this.props.positionlist.list.map((item ,key)=>{
							return <li key={key} data-id={item.id}>
										<Link to={{ pathname : '/positiondetail' ,state : { "id" : item.id } }}>
											<label>
												<img src={item.logo ? item.logo : companylogo} />
											</label>
											<div className="positionmsg">
												<p><span className="title">{item.position_name}</span><b className="red">{api.getsalary(item.salary_min ,item.salary_max)}</b></p>
												<p><span>{item.full_name}</span><b>{api.showdaytext(item.update_time)}</b></p>
												<p><span><i className="icon3 locat"></i>{city[this.state.cityid]}</span><em><i className="icon3 xueli"></i>{xueli[item.edu_level]}</em></p>
												{item.status ? <p className={api.msstatus(item.status) ? "icon5 jieduan jieduan2" : "icon5 jieduan"}>{mianshi[item.status]}</p> : ''}
											</div>
										</Link>
									</li>
						}) : ''
					}
					{ this.page > 1 && this.props.positionlist.status=='pending' ? <Tipshowend text="加载中请稍等"/> : '' }
				</ul>
				<ReactCSSTransitionGroup transitionName="selcityAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.selcity ? <Selectcity citydata={this.state.database.citys} selectcityid={this.setSelcity} cityid={this.state.cityid}/> : ''}
				</ReactCSSTransitionGroup>
			</div>
	}
	render(){
		return (
			<div>{this.setconent()}</div>
		)
	}
}
const mapStateToProps = (state ,ownProps) =>{
	return {
		userstate : state.UserState,
		userjob : state.AboutMyJob,
		positionlist : state.Position
	}
}
const mapDispatchToProps = (dispath) =>{
	return {
		getusermyjob : bindActionCreators(FetchGetMyJob ,dispath),
		setmyjob : bindActionCreators(SetMyJob ,dispath),
		getpositionlist : bindActionCreators(FetchPositionList ,dispath),
		clearpositionList : bindActionCreators(clearPositionList ,dispath)
	}
}
Position = connect(mapStateToProps ,mapDispatchToProps)(Position)
export default Position
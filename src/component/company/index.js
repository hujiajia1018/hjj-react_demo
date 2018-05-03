import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FetchCompanyList ,clearCompanyList } from 'action/companylistAction'
import { FetchGetMyJob } from 'action/aboutmyjobAction'
import Property from './property'
import Selectcity from './selectcity'
import Tip from 'component/pagemsg/tip'
import Swiper from 'plugins/swiper/swiper'
import api from 'api/api'
import 'css/company'
import show from 'images/show2.jpg'
import companylogo from 'images/companylogo.png'
import { city ,zhiwei ,hangye ,guimo } from 'api/config'
import Tipshowend from 'component/pagemsg/tipshowend'
import loadingimg2 from 'images/loading2.gif'

class Company extends Component{
	constructor(props){
		super(props);
		this.propertyType = '';
		this.database = this.props.companylist.citydatabase;
		this.showPropertyarray = [];
		this.touchY = 0;
		this.translateY = 0;
		this.istouchmove = false;
		this.updatamsgshow = false;
		this.state = {
			property : false,
			propertyDate : [],
			selcity : false,
			cityid : this.props.companylist.cityid,
			cityname : '',
			company_size : this.props.companylist.company_size,
			industry_belong : this.props.companylist.industry_belong,
			period : this.props.companylist.period,
			translateY : 0
		}
		this.imgarry = [show];
		this.imgarryhref = [];
		this.componentStatus = true;
		this.page = this.props.companylist.page;

		if(this.props.location.state){
			if(this.props.location.state.userscrolltop){
				this.userscrolltop = this.props.location.state.userscrolltop;
			}
		}else if(api.getLocalStorage("companyUserscrolltop")){
			this.userscrolltop = api.getLocalStorage("companyUserscrolltop");
		}else{
			this.userscrolltop = 0;
		}
	}
	componentDidMount(){
		if(this.props.companylist.status!='nodata' && !this.props.companylist.companyList.length){
			this.getDatabase();
		}else{
			document.addEventListener('scroll' ,this.scroll ,false);
			window.scrollTo(0 ,this.userscrolltop);
		}
		
		this.props.getusermyjob({
			token : this.props.userstate.token
		});
	}
	componentWillUnmount=()=>{
		this.componentStatus = false;
		api.setLocalStorage("companyUserscrolltop" ,this.userscrolltop);
		document.removeEventListener('scroll',this.scroll);
	}
	scroll=(event)=>{
		let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
		const el = document.querySelectorAll('div.companyList > div:last-child')[0];
		
		this.userscrolltop = scrolltop;
		this.props.router.replace({
			pathname : '/company' ,
			state : { "userscrolltop" : scrolltop }
		});

		if(!el){
			return;
		}
		if(this.props.companylist.maxpage <= this.page){
			return;
		}
		if(this.page==1 && this.props.companylist.status!='pending' || this.props.companylist.pagestatus!='pending'){
			if(scrolltop + window.innerHeight + 10 >= Math.ceil(document.body.scrollHeight)){
				++this.page;
				this.getCompanyList();
			}
		}
	}
	setSelcity =({id ,text})=>{ 
		if(id){
			this.setState({ "cityid" : id ,"cityname" : text ,"selcity" : !this.state.selcity } ,()=>{
				this.props.clearcompanyList();
				this.page = 1;
				this.setState({ "company_size" : [] ,"industry_belong" : [] ,"period" : [] } ,()=>{
					this.getCompanyList();
				});
			});
		}else{
			this.setState({ "selcity" : !this.state.selcity });
		}
	}
	getDatabase =()=>{
		api.FetchGet('/hyb-stu/stu_ent/all_types',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token
		}).then((res)=>{
			if(this.componentStatus){
				this.database = res.data;
				let a = ['110100','北京'] ,isbeijing = false;
				if(res.data.citys.length){
					res.data.citys.map((val)=>{
						if(val=='110100'){
							isbeijing = true;
						}
					})
					if(!isbeijing){
						a = [res.data.citys[0] ,city[res.data.citys[0]]];
					}
				}
				this.setState({ "cityid" : a[0] ,"cityname" : a[1] },()=>{
					this.getCompanyList();
				});
				document.addEventListener('scroll',this.scroll,false);
			}
		},()=>{
			api.tip_msg('错误');
		});
	}
	setProperty =(event)=>{
		const elm = api.getTarget(event.target ,'p') ,typename = elm.getAttribute('data-name');
		
		if(this.propertyType!=typename){
			this.propertyType = typename;
			document.querySelectorAll('div.query p.on').length && document.querySelectorAll('div.query p.on')[0].classList.remove('on');
			elm.classList.add('on');
			if(this.propertyType=='h'){
				this.showPropertyarray = this.state.industry_belong;
				this.setState({ "property" : true ,"propertyDate" : this.database.industries });
			}else if(this.propertyType=='g'){
				this.showPropertyarray = this.state.company_size;
				this.setState({ "property" : true ,"propertyDate" : this.database.company_size_types });
			}else if(this.propertyType=='r'){
				this.showPropertyarray = this.state.period;
				this.setState({ "property" : true ,"propertyDate" : this.database.period_types });
			}
			this.page = 1;
		}else if(this.propertyType==typename){
			this.propertyType = '';
			elm.classList.remove('on');
			this.setState({ "property" : false });
		}
	}
	getPropertyDate =(array)=>{
		this.props.clearcompanyList();
		if(this.propertyType=='h'){
			this.setState({ "property" : false ,"industry_belong" : [].concat(array) },()=>{
				this.getCompanyList();
			});
		}else if(this.propertyType=='g'){
			this.setState({ "property" : false ,"company_size" : [].concat(array) },()=>{
				this.getCompanyList();
			});
		}else if(this.propertyType=='r'){
			this.setState({ "property" : false ,"period" : [].concat(array) },()=>{
				this.getCompanyList();
			});
		}
		document.querySelectorAll('div.query p.on').length && document.querySelectorAll('div.query p.on')[0].classList.remove('on');
		this.propertyType = '';
	}
	getCompanyList = ()=>{
		this.props.getCompanyAction({
			token : this.props.userstate.token,
			body : JSON.stringify({
					"city" : this.state.cityid,     
					"company_size" : this.state.company_size,    
					"industry_belong" : this.state.industry_belong,  
					"period" : this.state.period,
					"citydatabase" : this.database,
					"page" : {
						size : 10,
						page : this.page
					}
				})
		});
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
	showcompanylist =()=>{
		if(this.props.companylist.status=='pending'){
			return <Tip text="" type="loading" />;
		}else if(this.props.companylist.status=='nodata'){
			return <Tip text="抱歉，暂时没有相关内容" type="nodata" />;
		}else if(this.props.companylist.status=='succsee' || this.props.companylist.pagestatus=='succsee'){
			return this.props.companylist.companyList.map((item ,index)=>{
				return <div className="box" key={index} data-company={item.id}>
							<div>
								<Link to={{ "pathname" : '/companydetail' ,state : { "id" : item.ent_id ,"cityid" : this.state.cityid} }}>
									<b><img src={item.logo ? item.logo : companylogo}/></b>
								</Link>
							</div>
							<div>
								<Link to={{ "pathname" : '/companydetail' ,state : { "id" : item.ent_id ,"cityid" : this.state.cityid} }}>
									<p className="name">{item.full_name}</p>
									<p className="location"><i className="icon3"></i>{city[this.state.cityid]}<i className="icon3 number"></i>{item.company_size_type ? guimo[item.company_size_type] : '--'}</p>
									<div className="fuli" dangerouslySetInnerHTML={{__html: this.fuli(item.labels) }}></div>
								</Link>
								<div className={item.status==1 ? 'bofang online' : 'bofang'}>
									{
										item.status==1 
										? <Link to={{ "pathname" : '/companydetail' ,state : { "tabopen" : 1 ,"id" : item.ent_id ,"cityid" : this.state.cityid} }}><i className="icon3"></i><p>宣讲直播…</p></Link>
										: item.status==2 
										? 
										<Link to={{ "pathname" : '/companydetail' ,state : { "id" : item.ent_id ,"cityid" : this.state.cityid} }}><i className="icon3"></i><p>宣讲回放…</p></Link> 
										: <Link to={{ "pathname" : '/companydetail' ,state : { "id" : item.ent_id ,"cityid" : this.state.cityid} }}></Link>
									}
								</div>
								<div className="commsg">
									{hangye[item.industry_type]}　|　<span>{item.position_count}</span>个热门职位
								</div>
							</div>
						</div>
			})
		}else if(this.props.companylist.status=='error'){
			return <Tip text="出错误了" type="tiperro" />;
		}
	}
	handleBind = (event)=>{
		event.stopPropagation();
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
				this.page = 1;
				this.props.clearcompanyList();
				this.getCompanyList();
				setTimeout(()=>{
					this.refs.updatamsg.innerHTML = '下拉即可刷新';
				},320);
			}
			this.istouchmove = false;
			this.updatamsgshow = false;
			this.setState({ "translateY" : 0 });
			window.removeEventListener('touchend' ,end);
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
	closeproperty=(event)=>{
		if(event.target.classList.contains('hdfixed')){
			document.querySelectorAll('div.query p.on')[0].classList.remove('on');
			this.propertyType = '';
			this.setState({ "property" : false });
		}
	}
	render(){
		let list = this.showcompanylist() ,style = { transform : `translate3d(0 ,${this.state.translateY}px ,0)` };
		let style1 = this.updatamsgshow ? { visibility : "visible" ,transform : `translate3d(0 ,${this.state.translateY/6}px) ,0` } : { transform : `translate3d(0 ,${this.state.translateY/6}px ,0)` };
		
		return(
			<div className="botnavpadding" ref="botnavpadding">
				<div className="company" onClick={this.closeproperty}>
					<div className={this.state.property ? 'hdfixed active' : 'hdfixed'}>
						<div className="hd">
							{
								this.state.cityid ? <span onClick={this.setSelcity}><em>{city[this.state.cityid]}</em><i className="icon3 cityicon"></i></span> : <span></span>
							}
							<span>公司</span>
							<span><Link to="/search"><i className="icon3"></i></Link></span>
						</div>
						<div className="query">
							<p onClick={this.setProperty} data-name="h">行业<i className="icon"></i></p>
							<p onClick={this.setProperty} data-name="g">规模<i className="icon"></i></p>
							<p onClick={this.setProperty} data-name="r">融资<i className="icon"></i></p>
						</div>
						<ReactCSSTransitionGroup transitionName="companyAnimate" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
							{this.state.property ? <Property showarray={this.showPropertyarray} data={this.state.propertyDate} handlePropertyDate={this.getPropertyDate} ptype={this.propertyType}/> : ''}
						</ReactCSSTransitionGroup>
					</div>
					<div className="po">
						<div className="updatamsg" style={style1}><img src={loadingimg2} /><b ref="updatamsg" >下拉即可刷新</b></div>
						<div className="updatatouch" style={style} onTouchStart={this.handleBind} onTouchMove={this.handleBind}>
							<div className="banner">
								{
									this.imgarry.length > 1 ? <Swiper imgarry={this.imgarry} imgarryhref={this.imgarryhref}/> : <Link to="/activepage1"><img src={this.imgarry[0]} /></Link>
								}
							</div>
							<div className="companyList">
								{list}
								{
									this.props.companylist.pagestatus=='pending' ? <Tipshowend text="加载中请稍等"/> : ''
								}
							</div>
						</div>
					</div>
				</div>
				<ReactCSSTransitionGroup transitionName="selcityAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.selcity ? <Selectcity citydata={this.database.citys} selectcityid={this.setSelcity} cityid={this.state.cityid}/> : ''}
				</ReactCSSTransitionGroup>
			</div>
		)
	}
}

const mapStateToProps = (state ,ownProps) =>{
	return {
		userstate : state.UserState,
		aboutmyjob : state.AboutMyJob,
		companylist : state.Company
	}
}
const mapDispatchToProps = (dispath) =>{
	return {
		getCompanyAction : bindActionCreators(FetchCompanyList ,dispath),
		clearcompanyList : bindActionCreators(clearCompanyList ,dispath),
		getusermyjob : bindActionCreators(FetchGetMyJob ,dispath)
	}
}
Company = connect(mapStateToProps ,mapDispatchToProps)(Company)
export default Company

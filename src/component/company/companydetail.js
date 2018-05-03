import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Link ,hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { GetCompanyDetail ,StuPosition ,Talk ,SetUserFollow } from 'action/companydetailAction'
import api from 'api/api'
import { guimo ,rongzi ,hangye ,zhuanye ,xingshi ,xueli ,yingyongbao } from 'api/config'
import { city } from 'api/config'
import Property from './property'
import 'css/companydetail'
import show from 'images/companydetail.png'
import companylogo from 'images/companylogo.png'
import Tip from 'component/pagemsg/tip'
import Share from 'component/share'

class CompanyDetail extends Component{
	constructor(props){
		super(props);
		this.top = null;
		this.state = {
			tabopen : this.props.location.state.tabopen ? this.props.location.state.tabopen : 0,
			city_list : [],
			showarray : '',
			positiontype : 0,
			isopenshare : false,
			issubtext : true
		}
		this.alltext = '';
		this.sharobject = {};
	}
	componentDidMount=()=>{
		document.addEventListener('scroll',this.scroll,false);

		this.props.getcompanydetail({
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token
		} ,this.props.location.state.id);
		
		this.props.gettalk({
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token
		} ,this.props.location.state.id);

		api.FetchGet(`/hyb-stu/stu_ent/ent_position_city/${this.props.location.state.id}`).then((date)=>{
			this.setState({ "city_list" : date.data.city_list })
		});

		this.positionAction();
	}
	componentDidUpdate =()=>{
		document.addEventListener('scroll',this.scroll,false);
	}
	componentWillUnmount=()=>{
		document.removeEventListener('scroll',this.scroll);
	}
	positionAction =()=>{
		this.props.getposition({
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({
					"ent_id" : this.props.location.state.id,     
					"city" : this.state.showarray,
					"type" : this.state.positiontype
				})
		});
	}
	scroll =()=>{
		if(this.refs.tab){
			let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
			const {top} = api.getOffset(this.refs.tab),
					{w ,h} = api.getelwh(this.refs.tab),
					fixelm = this.refs.tab.querySelectorAll('.property')[0];

			if(this.top==null){
				this.top = Math.ceil(top);
			}
			if(this.top <= scrolltop+64){ 
				if(!this.refs.tab.classList.contains('fixedtop')){
					this.refs.tab.style.height = `${h}px`;
					fixelm && fixelm.classList.add('fixedtop');
				}
			}else{
				this.top = null;
				fixelm && fixelm.classList.remove('fixedtop');
				this.refs.tab.style.height = 'auto';
			}
		}
	}
	tabchange =(event)=>{
		this.setState({ "tabopen" : event.target.getAttribute('data-index') });
	}
	setfollow =()=>{
		this.props.setuserfollow({
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({
					"ent_id" : this.props.location.state.id ,
					"status" : this.props.userfollow.follow ? 0 : 1
				})
		});
	}
	weshare =()=>{
		this.sharobject = {
			"share_title" : `【小牛接招】${this.props.info.entInfo.full_name}正在招聘 快来下载小牛接招应聘吧`,
			"share_desc" : `${hangye[this.props.info.entInfo.industry_type]}`,
			"share_icon" : this.props.info.entDetail.logo,
			"share_jump_url" : yingyongbao.company
		}
		this.setState({ "isopenshare" : !this.state.isopenshare });
	}
	setpositionList =()=>{
		window.scrollTo(0 ,1);
		return this.props.position.positionList.map((item)=>{
				return <li key={item.id} data-id={item.id}>
							<Link to={{ "pathname" : "/positiondetail" ,state : { "id" : item.id } }}>
							<p className="spec">
								<span className="posname">{item.position_name}</span>
								<span className="red">{api.getsalary(item.salary_min ,item.salary_max)}</span>
							</p> 
							<p><span><i className="icon3"></i>{api.getzhuanyename(item.dept_level)}</span><span>{xueli[item.edu_level]}</span></p>
							<p>
								{item.recruitment_number ? <span>拟招 : {item.recruitment_number}人</span> : ''}
								{item.candidate_num ? <span style={{"display":"none"}} className="renshu">应聘人数 : {item.candidate_num}</span> : ''}
							</p>
							</Link>
							<div className="botbg"></div>
					</li>
		})
	}
	selectcity =(typeid ,cityid)=>{ 
		this.setState({ "showarray" : cityid ? cityid : '' ,"positiontype" : typeid },()=>{
			this.positionAction();
		})
	}
	settext=()=>{
		this.setState({ "issubtext" : !this.state.issubtext });
	}
	goback=()=>{
		hashHistory.goBack();
	}
	openNavOnnLive=(event)=>{
		const id = api.closest(event.target ,'div.talklist').getAttribute('data-id');
		const actiontype = "looklivejump?param={\"token\":\""+this.props.userstate.token+"\" ,\"meeting_id\":\""+id+"\" }";
		api.webview(actiontype);
	}
	setcontent=()=>{
		return <div className="companydetail">
				<div className="banner">
					<div className="hd">
						<span onClick={this.goback}><i className="icon3 back"></i></span>
						<span></span>
						<span>
							<i onTouchEnd={this.setfollow} className={this.props.userfollow.follow ? 'icon3 like' : 'icon3 like liked'}></i>
							<i className="icon3 sharebtn" onTouchEnd={this.weshare}></i>
						</span>
					</div>
					<img src={show} />
				</div>
				<div className="info">
					<div className="comlogo">
						<img src={this.props.info.entDetail.logo ? this.props.info.entDetail.logo : companylogo} />
					</div>
					<div className="detail">
						<h1>{this.props.info.entInfo.full_name}</h1>
						<p>
							<b>
								<em>{hangye[this.props.info.entInfo.industry_type]}</em>
								{this.props.info.entInfo.period_type ? <em>{rongzi[this.props.info.entInfo.period_type]}</em> : ''}
								{this.props.info.entInfo.company_size_type ? <em>{guimo[this.props.info.entInfo.company_size_type]}</em> : ''}
							</b>
						</p>
						<p className="bgshow">
							<b>{this.props.info.entInfo.address ? <em>{this.props.info.entInfo.address}</em> : '--'}</b>
							<b>{this.props.info.entDetail.web_site ? <a className="linkdirs" target="_blank" href="javascript:void(0);">{this.props.info.entDetail.web_site}</a> : '未完善公司主页'}</b>
						</p>
					</div>
					<ul className="tablist">
						{this.state.tabopen==0 ? <li data-index="0" className="on" onTouchEnd={this.tabchange}>校招职位</li> : <li data-index="0" onTouchEnd={this.tabchange}>校招职位</li> }
						{this.state.tabopen==1 ? <li data-index="1" className="on" onTouchEnd={this.tabchange}>宣讲信息</li> : <li data-index="1" onTouchEnd={this.tabchange}>宣讲信息</li> }
						{this.state.tabopen==2 ? <li data-index="2" className="on" onTouchEnd={this.tabchange}>公司介绍</li> : <li data-index="2" onTouchEnd={this.tabchange}>公司介绍</li> }
					</ul>
				</div>
				<div className="box" >
					<div className="tab" ref="tab">
						{this.state.tabopen==0 ? <Property positiontype={this.state.positiontype} showarray={this.state.showarray} ptype="c" data={this.state.city_list} handlePropertyDate={this.selectcity}/> : ''}
					</div>
					<div className="ulbd" ref="ulbd">
						<div className={this.state.tabopen==0 ? 'a show' : 'a'}>
							<ul>
								{ this.props.position.positionstatus=='pending' 
									? <Tip text="" type="loading" />
									: this.props.position.positionstatus=='error' 
									? <Tip text="出错误了" type="tiperro" /> :
									this.props.position.positionstatus=='succsee' && !this.props.position.positionList.length ? <Tip text="抱歉，暂时没有相关内容" type="nodata" /> 
									: this.setpositionList()
								}
							</ul>
						</div>
						<div className={this.state.tabopen==1 ? 'b show' : 'b'}>
							{
								this.props.talk.talkList.length ? this.props.talk.talkList.map((item ,key)=>{
									return <div key={key} data-id={item.id} className="talklist" onClick={this.openNavOnnLive}>
												<p className="name">{item.theme}</p>
												<p><i className="icon3 sj"></i>{item.start_time}</p>
												<p><i className="icon3 dd"></i>{item.address}</p>
												<p><span><i className="icon3 xs"></i>{xingshi[item.type]}</span></p>
												{item.live_status==0 ? '' : item.live_status==1 ? <em className="green"><i className="icon3"></i>直播中</em> : <em><i className="icon3"></i>已结束</em> }
												<div className="botbg"></div>
											</div>
								}) : <div className="companymsgdetail"><div className="msdetail nomsg"><Tip text="抱歉，暂时没有相关内容" type="nodata" /></div></div>
							}
						</div>
						<div className={this.state.tabopen==2 ? 'c show' : 'c'}>
							<div className="companymsgdetail">
								<div className={!this.props.info.entDetail.company_desc && !this.props.info.entPhotoList.length ? "msdetail nomsg" : "msdetail"}>
									{!this.props.info.entDetail.company_desc && !this.props.info.entPhotoList.length ? <Tip text="抱歉，暂时没有相关内容" type="nodata" /> : ''}
									<p dangerouslySetInnerHTML={{__html: this.state.issubtext ? this.props.info.entDetail.substring : this.props.info.entDetail.company_desc }}/>
									{this.props.info.entDetail.company_desc && this.props.info.entDetail.company_desc.length > 150 
										? this.state.issubtext ? <span className="infoall" onClick={this.settext}></span> : '' : ''
									}
								</div>
								{
									this.props.info.entDetail.company_desc && this.props.info.entDetail.company_desc.length > 150
									? <div className="btn" onClick={this.settext}><i className={this.state.issubtext ? 'icon3' : 'icon3 on'}></i></div>
									: ''
								}
							</div>
							{
								this.props.info.entPhotoList.length ?
								<div className="companyimg">
									<div className="title">公司环境</div>
									<p>
										{
											this.props.info.entPhotoList.map((item ,index)=>{
												return <img key={index} src={item} />
											})
										}
									</p>
								</div>
								: ''
							}
						</div>
					</div>
				</div>
				<ReactCSSTransitionGroup transitionName="shareAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
					{this.state.isopenshare ? <Share id={this.props.location.state.id} closeShare={this.weshare} shareKind="0" shareContent={this.sharobject} /> : ''}
				</ReactCSSTransitionGroup>
			</div>
	}
	render(){
		return(
			<div className="companydetailbor">
				{this.props.talk.talkstatus=="succsee" && this.props.info.status=="succsee"
					? this.setcontent()
					: this.props.talk.talkstatus=="error" || this.props.info.status=="error" 
					? <div className="erroshow">
						<div className="hdcomdetail">
							<em onClick={this.goback}><i className="icon3"></i></em> 
							<span>公司详情</span>
							<span></span>
						</div>
						<Tip text="出错误了" type="tiperro" />
					</div>
					: <Tip text="" type="loading" />
				}
			</div>
		)
	}
}
const mapStateToProps = (state ,ownProps) =>{
	return {
		userstate : state.UserState,
		info : state.CompanyInfo,
		position : state.CompanyPosition,
		talk : state.CompanyTalk,
		userfollow : state.UserFollow
	}
}
const mapDispatchToProps = (dispath) =>{
	return {
		getcompanydetail : bindActionCreators(GetCompanyDetail ,dispath),
		getposition : bindActionCreators(StuPosition ,dispath),
		gettalk : bindActionCreators(Talk ,dispath),
		setuserfollow : bindActionCreators(SetUserFollow ,dispath)
	}
}
CompanyDetail = connect(mapStateToProps ,mapDispatchToProps)(CompanyDetail)
export default CompanyDetail
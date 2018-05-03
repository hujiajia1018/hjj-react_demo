import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import api from 'api/api'
import Tip from 'component/pagemsg/tip'
import Tipshowend from 'component/pagemsg/tipshowend'
import 'css/delivery'
import { city ,zhiwei ,xueli ,mianshi } from 'api/config'
import companylogo from 'images/companylogo.png'

class Interviewtest extends Component{
	constructor(props){
		super(props);
		this.state = {
			liststatus : '',
			list : []
		}
		this.page = 1;
		this.total = 0;
		this.servertime = '';

		this.selected = api.getLocalStorage('interviewtest') || 5;
		this.ajax = {
			"5" : '/hyb-stu/stu_interview/offer/list',
			"6" : '/hyb-stu/stu_interview/wait/list',
			"7" : '/hyb-stu/stu_interview/attend/list',
			"8" : '/hyb-stu/stu_interview/reject/list'
		}
		this.ischange = false;
		this.loading = false;
		this.componentStatus = true;
	}
	componentDidMount=()=>{
		this.getdata();
	}
	componentDidUpdate =()=>{
		document.addEventListener('scroll',this.scroll,false);
	}
	componentWillUnmount=()=>{
		this.componentStatus = false;
		document.removeEventListener('scroll',this.scroll);
	}
	getdata=()=>{
		this.loading = true;
		this.setState({ "liststatus" : "pending" });
		api.FetchPost(this.ajax[this.selected],{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({ "page" : this.page ,"size" : 10 })
		}).then(({res})=>{
			this.total = res.data.total;
			this.servertime = res.data.server_time;
			if(this.componentStatus && res.data.ent_positions.length){
				setTimeout(()=>{
					if(this.ischange){
						this.setState({ "liststatus" : "success" ,"list" : res.data.ent_positions });
						this.ischange = false;
					}else{
						this.page==1 ? this.setState({ "liststatus" : "success" ,"list" : res.data.ent_positions }) : this.setState({ "liststatus" : "success" ,"list" : this.state.list.concat(res.data.ent_positions) });
					}
				},400);
			}else if(this.componentStatus && this.page==1){
				this.setState({ "liststatus" : "nodata" });
			}
			this.loading = false;
		},(res)=>{
			this.componentStatus && this.setState({ "liststatus" : "erro" });
		});
	}
	scroll=(event)=>{
		let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
		const el = document.querySelectorAll('ul.poslist li:last-child')[0];
		if(!el || this.total<=this.page){
			return false;
		}
		
		if(this.state.liststatus!='pending'){
			if(scrolltop + window.innerHeight + 10 >= Math.ceil(document.body.scrollHeight)){
				++this.page;
				this.getdata();
			}
		}
	}
	change=(event)=>{
		if(this.loading){
			return false;
		}
		if(!event.target.classList.contains('on')){
			document.querySelector('.nav li.on').classList.remove('on');
			event.target.classList.add('on');
			this.ischange = true;
			this.page = 1;
			this.selected = event.target.getAttribute('data-num');
			api.setLocalStorage('interviewtest' ,this.selected);
			this.getdata();
		}
	}
	passtime=(time ,time2)=>{
		return new Date(time) < new Date(time2) ? true : false;
	}
	appmianshi=(event)=>{
		const actiontype = "jumpwaitingroom?param={\"token\":\""+this.token+"\" ,\"plan_company\":\""+event.target.getAttribute('data-company')+"\" ,\"plan_name\":\""+event.target.getAttribute('data-positionname')+"\" ,\"plan_start_time\":\""+event.target.getAttribute('data-starttime')+"\" ,\"plan_id\":\""+event.target.getAttribute('data-plantid')+"\" }";
		api.webview(actiontype);
	}
	showlist=()=>{
		if(this.selected==5){ /*面试邀请*/
			return this.state.list.map((item ,key)=>{
				return <li key={key} data-id={item.id}>
							<Link to={{ "pathname" : "/mianshioffer" ,state : { "id" : item.id ,'show' : 1 }}}>
								<label><img src={item.logo ? item.logo : companylogo}/></label>
								<div className="positionmsg">
									<p><span className="title">{item.position_name}</span>{item.status ? <em className="jieduan">{mianshi[item.status]}</em> : ''}<b className="red">{api.getsalary(item.salary_min ,item.salary_max)}</b></p>
									<p><span>{item.full_name}</span><b>{api.showdaytext(item.update_time)}</b></p>
									<p><span><i className="icon3 locat"></i>{api.showmorecity('已选' ,item.submit_city)}</span><em><i className="icon3 xueli"></i>{xueli[item.edu_level]}</em></p>
								</div>
								<i className="icon3 gouzi"></i>
								<div className="timetixing">
									<i className="icon3"></i>请在 {api.settime(item.expire_time)} 前处理面试邀请
								</div>
							</Link>
						</li>
			})
		}
		if(this.selected==6){ /*待面试*/
			return this.state.list.map((item ,key)=>{
				return <li key={key} data-id={item.id}>
							<Link to={{ "pathname" : "/kaoshimode" ,state : { "submit_status" : item.give_up ? 18 : '',"selected" : this.selected ,"id" : item.id }}}>
								<label><img src={item.logo ? item.logo : companylogo}/></label>
								<div className="positionmsg">
									<p><span className="title">{item.position_name}</span>{item.status ? <em className="jieduan">{mianshi[item.status]}</em> : ''}<b className="red">{api.getsalary(item.salary_min ,item.salary_max)}</b></p>
									<p><span>{item.full_name}</span><b>{api.showdaytext(item.update_time)}</b></p>
									<p><span><i className="icon3 locat"></i>{api.showmorecity('已选' ,item.submit_city)}</span><em><i className="icon3 xueli"></i>{xueli[item.edu_level]}</em></p>
								</div>
							</Link>
							<i className="icon3 gouzi"></i>
							<div className="timetixing">
								{
									item.give_up ? <Link to={{ "pathname" : "/kaoshimode" ,state : { "submit_status" : item.give_up ? 18 : '',"selected" : this.selected ,"id" : item.id }}}><div><i className="icon3 chazi"></i>该场面试已弃考</div></Link>
									: <div onClick={this.appmianshi} data-company={item.full_name} data-positionname={item.position_name} data-plantid={item.plan_id} data-starttime={item.start_time}><i className="icon3"></i>面试开始时间 {api.settime(item.start_time)}</div>
								}
							</div>
						</li>
			})
		}
		if(this.selected==7){ /*已面试*/
			return this.state.list.map((item ,key)=>{
				return <li key={key} data-id={item.id}>
							<Link to={{ "pathname" : "/kaoshimode" ,state : { "selected" : this.selected ,"id" : item.id }}}>
								<label><img src={item.logo ? item.logo : companylogo}/></label>
								<div className="positionmsg">
									<p><span className="title">{item.position_name}</span>{item.status ? <em className="jieduan">{mianshi[item.status]}</em> : ''}<b className="red">{api.getsalary(item.salary_min ,item.salary_max)}</b></p>
									<p><span>{item.full_name}</span><b>{api.showdaytext(item.update_time)}</b></p>
									<p><span><i className="icon3 locat"></i>{api.showmorecity('已选' ,item.submit_city)}</span><em><i className="icon3 xueli"></i>{xueli[item.edu_level]}</em></p>
								</div>
								<i className="icon3 gouzi"></i>
								<div className="timetixing">
									<i className="icon3"></i> 面试已完成
								</div>
							</Link>
						</li>
			})
		}
		if(this.selected==8){ /*已拒绝*/
			return this.state.list.map((item ,key)=>{
				return <li key={key} data-id={item.id}>
							<Link to={{ "pathname" : "/kaoshimode" ,state : { "submit_status" : item.submit_status ,"selected" : this.selected ,"id" : item.id }}}>
								<label><img src={item.logo ? item.logo : companylogo}/></label>
								<div className="positionmsg">
									<p><span className="title">{item.position_name}</span>{item.status ? <em className="jieduan">{mianshi[item.status]}</em> : ''}<b className="red">{api.getsalary(item.salary_min ,item.salary_max)}</b></p>
									<p><span>{item.full_name}</span><b>{api.showdaytext(item.update_time)}</b></p>
									<p><span><i className="icon3 locat"></i>{api.showmorecity('已选' ,item.submit_city)}</span><em><i className="icon3 xueli"></i>{xueli[item.edu_level]}</em></p>
								</div>
								<i className="icon3 gouzi"></i>
								<div className="timetixing">
									{ 
										item.submit_status==11
										? <div><i className="icon3 chazi"></i>该场面试拒绝</div>
										: item.submit_status==15
										? <div><i className="icon3 genggai"></i>已申请更改面试时间，等待HR处理</div> : ''
									}
								</div>
							</Link>
						</li>
			})
		}
	}
	render(){
		return(
			<div className="delivery">
				<div className="hd">
					<span><Link to="/me"><i className="icon3"></i></Link></span>
					<span>面试</span>
					<span></span>
				</div>
				<div className="bd nowritentest">
					<ul className="nav">
						<li data-num="5" className={this.selected==5 ? "on" : ''} onClick={this.change}>面试邀请</li>
						<li data-num="6" className={this.selected==6 ? "on" : ''} onClick={this.change}>待面试</li>
						<li data-num="7" className={this.selected==7 ? "on" : ''} onClick={this.change}>已面试</li>
						<li data-num="8" className={this.selected==8 ? "on" : ''} onClick={this.change}>已处理</li>
					</ul>
					<ul className="poslist">
						{ this.page == 1 && this.state.liststatus=='pending' ? <Tip text="" type="loading" />
						: this.state.liststatus=='success' ? this.showlist() : this.state.liststatus=='erro'  
							? <Tip text="出错误了" type="tiperro" /> : this.state.liststatus=='nodata' ? <Tip text="抱歉，暂时没有相关内容" type="nodata" /> : ''
						}
						{ this.page > 1 && this.state.liststatus=='pending' ? <Tipshowend text="加载中请稍等"/> : '' }
					</ul>
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
Interviewtest = connect(mapStateToProps)(Interviewtest)
export default Interviewtest
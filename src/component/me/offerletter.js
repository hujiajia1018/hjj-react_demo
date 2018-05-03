import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import api from 'api/api'
import Tip from 'component/pagemsg/tip'
import Tipshowend from 'component/pagemsg/tipshowend'
import 'css/delivery'
import { city ,zhiwei ,xueli ,mianshi } from 'api/config'
import companylogo from 'images/companylogo.png'

class OfferLetter extends Component{
	constructor(props){
		super(props);
		this.state = {
			liststatus : 'pending',
			list : []
		}
		this.page = 1;
		this.total = 0;

		this.selected = api.getLocalStorage('offerletter') || 9;
		this.ajax = { 
			"9" : '/hyb-stu/stu_offer/offer/list',
			"10" : '/hyb-stu/stu_offer/attend/list',
			"11" : '/hyb-stu/stu_offer/reject/list'
		}
		this.ischange = false;
		this.loading = false;
	}
	componentDidMount=()=>{
		this.getdata();
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
			if(res.data.ent_position.length){
				setTimeout(()=>{
					if(this.ischange){
						this.setState({ "liststatus" : "success" ,"list" : res.data.ent_position });
						this.ischange = false;
					}else{
						this.page==1 ? this.setState({ "liststatus" : "success" ,"list" : res.data.ent_position }) : this.setState({ "liststatus" : "success" ,"list" : this.state.list.concat(res.data.ent_position) });
					}
				},500);
			}else if(this.page==1){
				this.setState({ "liststatus" : "nodata" });
			}
			this.loading = false;
		},(res)=>{
			this.setState({ "liststatus" : "erro" });
		});
	}
	componentDidUpdate =()=>{
		document.addEventListener('scroll',this.scroll,false);
	}
	componentWillUnmount=()=>{
		document.removeEventListener('scroll',this.scroll);
	}
	scroll=(event)=>{
		let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
		const el = document.querySelectorAll('ul.poslist li:last-child')[0];
		if(!el || this.total<=this.page){
			return;
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
			api.setLocalStorage('offerletter' ,this.selected);
			this.getdata();
		}
	}
	showlist=()=>{
		if(this.selected==9){ /*录用邀请*/
			return this.state.list.map((item ,key)=>{
				return <li key={key} data-id={item.id}>
							<Link to={{ "pathname" : "/luyongoffer" ,state : { "selected" : this.selected ,"id" : item.id ,'show' : 1}}}>
								<label><img src={item.logo ? item.logo : companylogo}/></label>
								<div className="positionmsg">
									<p><span className="title">{item.position_name}</span>{item.status ? <em className="jieduan">{mianshi[item.status]}</em> : ''}<b className="red">{api.getsalary(item.salary_min ,item.salary_max)}</b></p>
									<p><span>{item.full_name}</span><b>{api.showdaytext(item.update_time)}</b></p>
									<p><span><i className="icon3 locat"></i>{city[item.city]}</span><em><i className="icon3 xueli"></i>{xueli[item.edu_level]}</em></p>
								</div>
								<i className="icon3 gouzi"></i>
								<div className="timetixing">
									<i className="icon3"></i>录用邀请，欢迎您加入我们
								</div>
							</Link>
						</li>
			})
		}
		if(this.selected==10){ /*接受录用*/
			return this.state.list.map((item ,key)=>{
				return <li key={key} data-id={item.id}>
							<Link to={{ "pathname" : "/kaoshimode" ,state : { "selected" : this.selected ,"id" : item.id }}}>
								<label><img src={item.logo ? item.logo : companylogo}/></label>
								<div className="positionmsg">
									<p><span className="title">{item.position_name}</span>{item.status ? <em className="jieduan">{mianshi[item.status]}</em> : ''}<b className="red">{api.getsalary(item.salary_min ,item.salary_max)}</b></p>
									<p><span>{item.full_name}</span><b>{api.showdaytext(item.update_time)}</b></p>
									<p><span><i className="icon3 locat"></i>{city[item.city]}</span><em><i className="icon3 xueli"></i>{xueli[item.edu_level]}</em></p>
								</div>
								<i className="icon3 gouzi"></i>
								<div className="timetixing">
									<i className="icon3"></i>入职时间 {api.settime(item.hire_time)}
								</div>
							</Link>
						</li>
			})
		}
		if(this.selected==11){ /*拒绝录用*/
			return this.state.list.map((item ,key)=>{
				return <li key={key} data-id={item.id}>
							<Link to={{ "pathname" : "/kaoshimode" ,state : { "selected" : this.selected ,"id" : item.id }}}>
								<label><img src={item.logo ? item.logo : companylogo}/></label>
								<div className="positionmsg">
									<p><span className="title">{item.position_name}</span>{item.status ? <em className="jieduan">{mianshi[item.status]}</em> : ''}<b className="red">{api.getsalary(item.salary_min ,item.salary_max)}</b></p>
									<p><span>{item.full_name}</span><b>{api.showdaytext(item.update_time)}</b></p>
									<p><span><i className="icon3 locat"></i>{city[item.city]}</span><em><i className="icon3 xueli"></i>{xueli[item.edu_level]}</em></p>
								</div>
								<i className="icon3 gouzi"></i>
								<div className="timetixing">
									<i className="icon3 chazi"></i>入职时间 {api.settime(item.hire_time)}
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
					<span>录用</span>
					<span></span>
				</div>
				<div className="bd nowritentest">
					<ul className="nav snav">
						<li data-num="9" className={this.selected==9 ? "on" : ''} onClick={this.change}>录用邀请</li>
						<li data-num="10" className={this.selected==10 ? "on" : ''} onClick={this.change}>接受录用</li>
						<li data-num="11" className={this.selected==11 ? "on" : ''} onClick={this.change}>拒绝录用</li>
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
OfferLetter = connect(mapStateToProps)(OfferLetter)
export default OfferLetter
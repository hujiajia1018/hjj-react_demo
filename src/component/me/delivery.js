import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import api from 'api/api'
import { bindActionCreators } from 'redux'
import { GetDeliveryList ,ClearDeliveryList } from 'action/deliveryAction'
import Tip from 'component/pagemsg/tip'
import Tipshowend from 'component/pagemsg/tipshowend'
import 'css/delivery'
import { city ,zhiwei ,xueli ,mianshi } from 'api/config'
import companylogo from 'images/companylogo.png'
import loadingimg2 from 'images/loading2.gif'

class Delivery extends Component{
	constructor(props){
		super(props);
		this.state = {
			translateY : 0
		}

		this.istouchmove = false;
		this.updatamsgshow = false;
		this.translateY = 0;
		this.page = this.props.deliverylist.page;
		this.userscrolltop = this.props.location.state ? this.props.location.state.userscrolltop ? this.props.location.state.userscrolltop : 0 : 0;
	}
	componentDidMount=()=>{
		if(this.props.deliverylist.status!='nodata' && !this.props.deliverylist.list.length){
			this.getdata();
		}
		document.addEventListener('scroll',this.scroll,false);
		window.scrollTo(0 ,this.userscrolltop);
	}
	getdata=()=>{
		this.props.getdeliverylist({
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({ "page" : this.page ,"size" : 10 })
		});
	}
	componentWillUnmount=()=>{
		document.removeEventListener('scroll',this.scroll);
	}
	scroll=(event)=>{
		let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
		const el = document.querySelectorAll('ul.poslist li:last-child')[0];
		
		this.props.router.replace({
			pathname : '/delivery' ,
			state : { "userscrolltop" : scrolltop }
		});
		if(!el){
			return;
		}
		
		if(this.props.deliverylist.maxpage <= this.page){
			return false;
		}

		if(this.props.deliverylist.status!='pending'){
			if(scrolltop + window.innerHeight + 10 >= Math.ceil(document.body.scrollHeight)){
				++this.page;
				this.getdata();
			}
		}
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
				this.props.cleardeliverylist();
				this.page = 1;
				this.getdata();
				setTimeout(()=>{
					this.refs.updatamsg.innerHTML = '下拉即可刷新';
				},320);
			}
			this.istouchmove = false;
			this.updatamsgshow = false;
			this.setState({ "translateY" : 0  });
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
	render(){
		let style = { transform : `translateY(${this.state.translateY}px)` },
		style1 = this.updatamsgshow ? { visibility : "visible" ,transform : `translateY(${this.state.translateY/6}px)` } : { transform : `translateY(${this.state.translateY/6}px)` };
		
		return(
			<div className="delivery">
				<div className="hd">
					<span><Link to="/me"><i className="icon3"></i></Link></span>
					<span>已投递</span>
					<span></span>
				</div>
				<div className="bd">
					<div className="updatamsg" style={style1}><img src={loadingimg2} /><b ref="updatamsg" >下拉即可刷新</b></div>
					<ul className="poslist deliverylist" style={style}  onTouchStart={this.handleBind} onTouchMove={this.handleBind}>
						{ this.page == 1 && this.props.deliverylist.status=='pending' ? <Tip text="" type="loading" /> 
						: (this.props.deliverylist.status=='success' || this.page>1 && this.props.deliverylist.status=='pending') ? this.props.deliverylist.list.map((item ,key)=>{
								return <li key={item.id} data-id={item.id}>
											<Link to={{ "pathname" : "/kaoshimode" ,state : { "id" : item.id ,"selected" : 4 }}}>
												<label className={item.type!=0 ? 'stop' : ''}>
													<img src={item.logo ? item.logo : companylogo}/>
													<span>停止<br/>招聘</span>
												</label>
												<div className="positionmsg">
													<p><span className="title">{item.position_name}</span>{item.status ? <em className="jieduan">{mianshi[item.status]}</em> : ''}<b className="red">{api.getsalary(item.salary_min ,item.salary_max)}</b></p>
													<p><span>{item.full_name}</span><b>{api.showdaytext(item.update_time)}</b></p>
													<p><span><i className="icon3 locat"></i>{api.showmorecity('已选' ,item.submit_city)}</span><em><i className="icon3 xueli"></i>{xueli[item.edu_level]}</em></p>
												</div>
												<i className="icon3 gouzi"></i>
												<div className="timetixing">
													<i className="icon3"></i>投递时间 {api.settime(item.submit_date)}
												</div>
											</Link>
										</li>
							}) : this.page == 1 && this.props.deliverylist.status=='nodata' ? <Tip text="抱歉，暂时没有相关内容" type="nodata" /> : this.props.deliverylist.status=='erro' ? <Tip text="出错误了" type="tiperro" /> : ''
						}
						{ this.page > 1 && this.props.deliverylist.status=='pending' ? <Tipshowend text="加载中请稍等"/> : '' }
					</ul>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state ,ownProps) =>{
	return {
		userstate : state.UserState,
		deliverylist : state.DeliveryList
	}
}
const mapDispatchToProps = (dispath) =>{
	return {
		getdeliverylist : bindActionCreators(GetDeliveryList ,dispath),
		cleardeliverylist : bindActionCreators(ClearDeliveryList ,dispath)
	}
}
Delivery = connect(mapStateToProps ,mapDispatchToProps)(Delivery)
export default Delivery
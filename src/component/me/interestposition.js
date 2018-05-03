import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import api from 'api/api'
import Tip from 'component/pagemsg/tip'
import 'css/interest'
import { city ,xueli ,mianshi } from 'api/config'
import companylogo from 'images/companylogo.png'

class InterestPosition extends Component{
	constructor(props){
		super(props);
		this.state = {
			list : {},
			status : 'pending'
		}
		this.page = 1;
		this.maxpage = '';
	}
	componentDidMount(){
		this.getdata();
	}
	componentDidUpdate =()=>{
		document.addEventListener('scroll',this.scroll,false);
	}
	componentWillUnmount=()=>{
		document.removeEventListener('scroll',this.scroll);
	}
	getdata=()=>{
		if(this.maxpage){
			if(this.maxpage < this.page){
				return;
			}
		}
		api.FetchPost('/hyb-stu/stu_position/position_follow/list' ,{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({ "size" : 10 ,"page" : this.page })
		}).then(({res})=>{
			this.maxpage = res.data.total;
			if(!api.isEmptyObject(res.data.position_list)){
				if(api.isEmptyObject(this.state.list)){
					this.setState({ "list" : res.data.position_list ,"status" : 'success' });
				}else{
					let list = Object.assign({}, this.state.list);
					let newlist = {};
					Object.keys(list).map((key)=>{
						Object.keys(res.data.position_list).map((key2)=>{
							if(!list[key2]){
								if(newlist[key2]){
									newlist[key2] = [];
								}
								newlist[key2] = res.data.position_list[key2];
							}else{
								if(!newlist[key]){
									newlist[key] = [];
								}
								if(res.data.position_list[key]!=void 0){
									newlist[key] = list[key].concat(res.data.position_list[key]);
								}else{
									newlist[key] = list[key];
								}
							}
						});
					});
					this.setState({ "list" : Object.assign(newlist, list) ,"status" : 'success' });
				}
			}else{
				this.setState({ "status" : 'nodata' });
			}
		},()=>{
			this.setState({ "status" : 'error' });
		});
	}
	scroll=(event)=>{
		let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
		const el = document.querySelectorAll('.bd') ,bdel = el[el.length-1];

		if(!bdel){
			return;
		}
		
		if(this.state.status!='pending'){
			if(scrolltop + window.innerHeight + 10 >= Math.ceil(document.body.scrollHeight)){
				++this.page;
				this.getdata();
			}
		}
	}
	render(){
		return(
			<div className="interest">
				<div className="hd">
					<span><Link to="/me"><i className="icon3"></i></Link></span>
					<span>收藏的职位</span>
					<span></span>
				</div>
				<div className="mar">
				{
					this.state.status=='pending' ? <Tip text="" type="loading" /> : 
					this.state.status=='nodata' ? <Tip text="抱歉，暂时没有相关内容" type="nodata" /> :
					this.state.status=='success' ? Object.keys(this.state.list).sort().reverse().map((key ,index)=>{
						return <div className="bd" key={index}>
									<h1>{key}</h1>
									<ul className="poslist">
										{
											this.state.list[key].map((item ,i)=>{
												return <li key={i} data-id={item.id }>
															<Link to={{ "pathname" : "/positiondetail" ,state : { "id" : item.id }}}>
																<label className={item.type!=0 ? 'stop' : ''}>
																	<img src={item.logo ? item.logo : companylogo}/>
																	<span>停止<br/>招聘</span>
																</label>
																<div className="positionmsg">
																	<p><span className="title">{item.position_name}</span>{item.status ? <em className="jieduan">{mianshi[item.status]}</em> : ''}<b className="red">{api.getsalary(item.salary_min ,item.salary_max)}</b></p>
																	<p><span>{item.full_name}</span><b>{api.showdaytext(item.update_time)}</b></p>
																	<p><span><i className="icon3 locat"></i>{api.showmorecity('' ,item.city)}</span><em><i className="icon3 xueli"></i>{xueli[item.edu_level]}</em></p>
																</div>
															</Link>
														</li>
											})
										}
									</ul>
								</div>
					})
					: <Tip text="出错误了" type="tiperro" />
				}
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
InterestPosition = connect(mapStateToProps)(InterestPosition)
export default InterestPosition

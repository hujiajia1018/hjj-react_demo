import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import api from 'api/api'
import Tip from 'component/pagemsg/tip'
import 'css/interest'
import { city ,zhiwei ,hangye ,guimo } from 'api/config'
import companylogo from 'images/companylogo.png'

class FollowCompany extends Component{
	constructor(props){
		super(props);
		this.state = {
			list : [],
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
		api.FetchPost('/hyb-stu/stu_ent/ent_follow/list ' ,{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({ "size" : 10 ,"page" : this.page })
		}).then(({res})=>{
			this.maxpage = res.data.total;
			if(!api.isEmptyObject(res.data.ent_list)){
				if(api.isEmptyObject(this.state.list)){
					this.setState({ "list" : res.data.ent_list ,"status" : 'success' });
				}else{
					let list = Object.assign({}, this.state.list);
					let newlist = {};
					Object.keys(list).map((key)=>{
						Object.keys(res.data.ent_list).map((key2)=>{
							if(!list[key2]){
								if(newlist[key2]){
									newlist[key2] = [];
								}
								newlist[key2] = res.data.ent_list[key2];
							}else{
								if(!newlist[key]){
									newlist[key] = [];
								}
								if(res.data.ent_list[key]!=void 0){
									newlist[key] = list[key].concat(res.data.ent_list[key]);
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
	getpositionname =(list)=>{
		let posName = [];
		if(!list){
			return '';
		}
		list.map((val ,index)=>{ 
			posName.push(api.getzhiweiname(val));
		})
		return posName[0];
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
	render(){
		return(
			<div className="interest">
				<div className="hd">
					<span><Link to="/me"><i className="icon3"></i></Link></span>
					<span>关注的公司</span>
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
												return <li key={i}>
															<div className="box2" key={index} data-company={item.id}>
																<div>
																	<Link to={{ "pathname" : '/companydetail' ,state : { "id" : item.ent_id ,"cityid" : item.city} }}>
																		<b><img src={item.logo ? item.logo : companylogo}/></b>
																	</Link>
																</div>
																<div>
																	<Link to={{ "pathname" : '/companydetail' ,state : { "id" : item.ent_id ,"cityid" : item.city} }}>
																		<p className="name">{item.full_name}</p>
																		<p className="location"><i className="icon3"></i>{city[item.city]}<i className="icon3 number"></i>{item.company_size_type ? guimo[item.company_size_type] : '--'}</p>
																		<p className="fuli" dangerouslySetInnerHTML={{__html: this.fuli(item.labels) }}></p>
																	</Link>
																	<div className={item.status==1 ? 'bofang online' : 'bofang'}>
																		{ item.status==1 ? <Link to={{ "pathname" : '/companydetail' ,state : { "tabopen" : 1 ,"id" : item.ent_id ,"cityid" : item.city} }}><i className="icon3"></i><p>宣讲直播…</p></Link> : '' }
																		{ item.status==2 ? <Link to={{ "pathname" : '/companydetail' ,state : { "id" : item.ent_id ,"cityid" : item.city} }}><i className="icon3"></i><p>宣讲回放…</p></Link> : '' }
																	</div>
																	<div className="commsg">
																		{hangye[item.industry_type]}　|　<span>{item.position_count}</span>个热门职位
																	</div>
																</div>
															</div>
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
FollowCompany = connect(mapStateToProps)(FollowCompany)
export default FollowCompany

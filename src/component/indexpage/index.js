import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import api from 'api/api'
import Tip from 'component/pagemsg/tip'
import Tipshowend from 'component/pagemsg/tipshowend'
import css from 'css/indexpage'
import companylogo from 'images/companylogo.png'
import jijiangkaibo from 'images/jijiangkaibo.png'
import zhibo from 'images/zhibo.jpg'
import chongbo from 'images/chongbo.jpg'
import loadingimg2 from 'images/loading2.gif'

class IndexPage extends Component{
	constructor(props){
		super(props);
		this.state = {
			list : [],
			liststatus : 'pending',
			chuangzuolist : {},
			translateY : 0
		}
		this.page = 1;
		this.total = '';
		this.token = this.props.userstate.token || window.localStorage.getItem('token');
		this.datatype = 2;
		this.create_time = '';
		this.remain = true;

		this.touchY = 0;
		this.translateY = 0;
		this.istouchmove = false;
		this.updatamsgshow = false;
		this.componentStatus = true;
	}
	componentDidMount(){
		/*获取app 所需要信息*/
		let token = api.getLocalStorage('token'), mobile = api.getLocalStorage('mobile');
		api.FetchGet('/hyb-stu/stu_my/base',{
			token : token
		}).then((resapp)=>{
			let nickname = resapp.data.mobile ? resapp.data.mobile : '游客'+api.setmd5(token).substring(5 ,10),
				bbs_icon = resapp.data.bbs_icon ? resapp.data.bbs_icon : '',
				stu_id = resapp.data.im_id ? resapp.data.im_id.split('#')[0] : '';

			nickname = nickname.substring(0,3)+'xxxx'+nickname.substring(7);
			api.webview("getlogindata?param={\"stu_name\":\""+resapp.data.nick_name+"\" ,\"stu_id\":\""+stu_id+"\" ,\"interview_im_sig\":\""+resapp.data.interview_im_sig+"\" ,\"interview_im_id\":\""+resapp.data.interview_im_id+"\" ,\"token\":\""+token+"\" ,\"login_id\":\""+mobile+"\" ,\"nick_name\":\""+nickname+"\" ,\"im_sign\":\""+resapp.data.im_sig+"\" ,\"user_icon_url\":\""+bbs_icon+"\" ,\"txy_sign\":\""+resapp.data.file_sig+"\" ,\"im_identifier\":\""+resapp.data.im_id+"\"}");
		});
		this.getlist();
		window.scrollTo(0,0);
	}
	componentWillUnmount(){
		this.componentStatus = false;
		document.removeEventListener('scroll',this.scroll);
	}
	appzhibocallback=()=>{
		this.page = 1;
		this.getlist();
	}
	getlist=()=>{
		this.page==1 ? this.setState({ "liststatus" : "pending" ,"list" : [] }) : this.setState({ "liststatus" : "pending" });
		setTimeout(()=>{
			if(this.datatype==1){ /*创作*/
				api.FetchPost('/hyb-stu/stu_user_hot_point/find_main_article',{
					UserKey : this.props.userstate.userKey,
					token : this.token,
					body : JSON.stringify({ page_size : this.page ,create_time : this.create_time})
				}).then(({res})=>{
					if(this.page>1 && api.isEmptyObject(res.data.article_map)){
						return false;
					}
					this.remain = res.data.remain;
					if(!api.isEmptyObject(res.data.article_map)){
						if(api.isEmptyObject(this.state.chuangzuolist)){
							this.setState({ "chuangzuolist" : res.data.article_map ,"liststatus" : 'success' },()=>{
								document.addEventListener('scroll',this.scroll,false);
							});
						}else{
							let list = Object.assign({}, this.state.chuangzuolist);
							let newlist = {};
							Object.keys(list).map((key)=>{
								Object.keys(res.data.article_map).map((key2)=>{
									if(!list[key2]){
										if(newlist[key2]){
											newlist[key2] = [];
										}
										newlist[key2] = res.data.article_map[key2];
									}else{
										if(!newlist[key]){
											newlist[key] = [];
										}
										if(res.data.article_map[key]!=void 0){
											newlist[key] = list[key].concat(res.data.article_map[key]);
										}else{
											newlist[key] = list[key];
										}
									}
								});
							});
							this.setState({ "chuangzuolist" : Object.assign(newlist, list) ,"liststatus" : 'success' },()=>{
								document.addEventListener('scroll',this.scroll,false);
							});
						}
						let last = Object.keys(res.data.article_map)[Object.keys(res.data.article_map).length-1];
						last = res.data.article_map[last];
						last = last[last.length-1];
						this.create_time = last.create_time;
					}else{
						this.setState({ "liststatus" : 'nodata' });
					}
				});
			}else if(this.datatype==2){ /*直播*/
				api.FetchPost('/hyb-stu/stu_talk/list',{
					UserKey : this.props.userstate.userKey,
					token : this.token,
					body : JSON.stringify({ page : this.page ,size : 10 })
				}).then(({res})=>{
					this.total = res.data.total;
					if(this.page==1){
						if(res.data.list.length){
							this.componentStatus && this.setState({ "list" : res.data.list ,"liststatus" : "success" },()=>{
								document.addEventListener('scroll',this.scroll,false);
							});
						}else{
							this.componentStatus && this.setState({ "list" : [] ,"liststatus" : "nodata" });
						}
					}else{
						this.componentStatus && this.setState({ "list" : this.state.list.concat(res.data.list) ,"liststatus" : "success" },()=>{
							document.addEventListener('scroll',this.scroll,false);
						});
					}
				});
			}
		},400);
	}
	scroll=(event)=>{
		let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
		let el = '';
		if(this.datatype==2){
			el = document.querySelectorAll('ul.livelist li:last-child')[0];
		}
		if(this.datatype==1){
			el = document.querySelectorAll('.box2:last-child')[0];
		}

		if(!el){
			return;
		}

		if(this.datatype==2 && this.page>=this.total){ /*直播*/
			return;
		}

		if(this.datatype==1 && !this.remain){ /*创作*/
			return;
		}

		if(this.state.liststatus!='pending'){
			if(scrolltop + window.innerHeight + 10 >= Math.ceil(document.body.scrollHeight)){
				++this.page;
				this.getlist();
			}
		}
	}
	openNavOnnLive=(event)=>{
		const id = api.closest(event.target ,'li').getAttribute('data-id');
		const actiontype = "looklivejump?param={\"token\":\""+this.token+"\" ,\"meeting_id\":\""+id+"\" }";
		api.webview(actiontype);
	}
	changetype=(event)=>{ 
		if(!event.target.classList.contains('on')){
			this.datatype = event.target.getAttribute('data-type');
			let li = api.closest(event.target ,'ul').querySelectorAll('li');
			for(let item of li){
				item.classList.remove('on');
			}
			event.target.classList.add('on');
			this.page = 1;
			this.create_time = '';
			this.getlist();
		}
	}
	actionzan=(event)=>{
		const el = api.closest(event.target ,'span') ,el_i = el.querySelectorAll('i')[0] ,div = api.closest(event.target ,'div.box');
		let praise_type = 0;
		
		if(el_i.classList.contains('on')){
			praise_type = 1;
		}
		api.FetchPost('/hyb-stu/stu_user_hot_point/praise_count_inc',{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({
				praise_type : praise_type,
				hot_point_id : el.getAttribute('data-id'),
				hot_point_user_id : el.getAttribute('data-userid')
			})
		}).then(({res})=>{
			if(praise_type==1){
				el.querySelectorAll('em')[0].textContent = --el.querySelectorAll('em')[0].textContent;
				el_i.classList.remove('on');
			}else{
				el.querySelectorAll('em')[0].textContent = ++el.querySelectorAll('em')[0].textContent;
				el_i.classList.add('on');
			}
		})
	}
	chuangzuo=()=>{
		return <div className="indexdynamic">
			{ this.page==1 && this.state.liststatus=='pending' ? <Tip text="" type="loading" /> 
			: this.page==1 && this.state.liststatus=='nodata' ? <Tip text="抱歉，暂时没有相关内容" type="nodata" />
			: this.page==1 && this.state.liststatus=='error' ? <Tip text="出错误了" type="tiperro" />
			: Object.keys(this.state.chuangzuolist).sort().reverse().map((key ,index)=>{
				return <div key={key} className="dynamic">
					<h1>{key}</h1>
					{
						this.state.chuangzuolist[key].map((item ,index)=>{
							return <div className="box2" key={index} data-key={key} data-id={item.hot_point_id}>
										<div className="boxhd2">
											<img src={item.icon ? item.icon : usericonimg} />
											<p>
												<Link to={{ "pathname" : "/creationsocial" ,state : { "pointid" : item.hot_point_id } }} >
													<span>{item.name}</span>
													<span>{item.collection_time}</span>
												</Link>
											</p>
										</div>
										<div className="boxbd2">
											<ul className="imglist">
												<li className="long">
													{
														item.cover_picture ? <Link to={{ "pathname" : "/creationdetail" ,state : { "hotpointid" : item.hot_point_id ,"name" : item.name ,"icon" : item.icon ,"userid" : item.user_id } }}><img src={item.cover_picture} /></Link> : ''
													}
													<Link to={{ "pathname" : "/creationdetail" ,state : { "hotpointid" : item.hot_point_id ,"name" : item.name ,"icon" : item.icon ,"userid" : item.user_id } }}>
														<p>
															<em>{item.summary.length > 30 ? api.substring(item.summary ,30 ,'...') : item.summary}</em>
															{item.summary.length > 30 ? <span>【长文】</span> : ''}
														</p>
													</Link>
												</li>
											</ul>
										</div>
										<div className="ft2">
											<span><i className="icon b"></i>{item.comment_count}</span>
											<span onClick={this.actionzan} data-status={item.praise_status} data-id={item.hot_point_id} data-userid={item.user_id}><i className={item.praise_status==1 ? "icon a on" : "icon a"}></i><em>{item.praise_count}</em></span>
										</div>
									</div>
						})
					}
				</div>
			})
		}
		{ this.page > 1 && this.state.liststatus=='pending' ? <Tipshowend text="加载中请稍等"/> : '' }
		</div>
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
		let dir = event.targetTouches[0].pageY - this.touchY ,translateY = 0 ,direction = dir > 0 ? 1 : -1;
		const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		
		const end = ()=>{
			if(this.state.translateY>20){
				this.appzhibocallback();
				setTimeout(()=>{
					this.refs.updatamsg.innerHTML = '下拉即可刷新';
				},320);
			}
			this.setState({ "translateY" : 0 });
			this.istouchmove = false;
			this.updatamsgshow = false;
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
	zhibo=()=>{
		let style = { transform : `translateY(${this.state.translateY}px)` },
		style1 = this.updatamsgshow ? { visibility : "visible" ,transform : `translateY(${this.state.translateY/6}px)` } : { transform : `translateY(${this.state.translateY/6}px)` };

		return <div className="box" onTouchStart={this.handleBind} onTouchMove={this.handleBind}>
			<div className="updatamsg" style={style1}><img src={loadingimg2} /><b ref="updatamsg" >下拉即可刷新</b></div>
			<ul className="livelist" style={style}>
				{ this.page==1 && this.state.liststatus=='pending' ? <Tip text="" type="loading" /> : '' }
				{ this.page==1 && this.state.liststatus=='error' ? <Tip text="出错误了" type="tiperro" /> : '' }
				{ this.page==1 && this.state.liststatus=='nodata' ? <Tip text="抱歉，暂时没有相关内容" type="nodata" /> : '' }
				{
					this.state.list.map((item ,index)=>{
						return item.type==0 ? '' : <li data-channel={item.channel_id} data-id={item.id} key={index} onClick={this.openNavOnnLive}>
							<p className="title">
								<label><img src={item.logo ? item.logo : companylogo} /></label>
								<span><em>{item.full_name}</em><em><i className="icon3"></i>开播时间：{item.start_time}</em></span>
							</p>
							<p className="bo">
								{
									item.live_status==0
									? <label><img src={jijiangkaibo} /><em>即将开播</em></label>
									: item.live_status==1 ? <label><img src={item.preview_url ? item.preview_url : zhibo} /><em><i className="onlive"></i>直播中</em></label>
									: item.live_status==2 ? <label><img src={item.preview_url ? item.preview_url : chongbo} /><em>观看重播</em></label> 
									: ''
								}
								<b className="detail"><i className="icon3"></i>{item.theme}</b>
							</p>
						</li>
					})
				} 
			</ul>
			{ this.page > 1 && this.state.liststatus=='pending' ? <Tipshowend text="加载中请稍等"/> : '' }
		</div>
	}
	/*<li onClick={this.changetype} data-type="0">热点</li>   <i className="icon jia"></i>*/
	/* <li onClick={this.changetype} data-type="1" className="on">创作</li> */
	render(){
		return(
			<div className="indexPage">
				<div className="hd">
					<ul>
						<li onClick={this.changetype} data-type="2">直播</li>
					</ul>
				</div>
				{
					this.datatype==1 ? this.chuangzuo() : this.zhibo()
				}
			</div>
		)
	}
}
const mapStateToProps = (state ,ownProps) =>{
	return {
		userstate : state.UserState
	}
}
IndexPage = connect(mapStateToProps)(IndexPage)
export default IndexPage
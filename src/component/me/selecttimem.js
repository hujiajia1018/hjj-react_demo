import React, { Component } from 'react'
import { Link ,hashHistory } from 'react-router'
import { connect } from 'react-redux'
import api from 'api/api'
import 'css/selectbmtime'
import TipSelect from 'component/pagemsg/tipselect'

class SelectTimeM extends Component{
	constructor(props){
		super(props);
		this.state = {
			isopen : false,
			moreday : false,
			toplist : {},
			otherlist : {},
			showday : '',
			batchid : ''
		};
		this.batchstatus = '';
		this.ispasstime = new Date(this.props.location.state.expiredate.replace(/-/g,"/")) < new Date() ? true : false;
		this.tipmsg = ['抱歉，您来晚了，已无剩余场次<br/>请联系HR申请其他时间','申请面试','取消'];
	}
	componentDidMount=()=>{
		api.FetchPost(`/hyb-stu/stu_interview/interview/date`,{
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token,
			body : JSON.stringify({ "ent_id" : this.props.location.state.entid ,"plan_id" : this.props.location.state.planid })
		}).then(({res})=>{
			let day = api.mergeobj(res.data.by_day);
			this.setState({
				"moreday" : Object.keys(day).length > 8 ? true : false,
				"toplist" : api.substringObj(day ,0 ,7),
				"otherlist" : api.substringObj(day ,7),
				"showday" : Object.keys(day)[0]
			});
		});
	}
	goback=()=>{
		hashHistory.goBack();
	}
	formattime=(day)=>{
		let time = day.replace(/-/g,'\/');
		return `${new Date(time).getHours()} : ${new Date(time).getMinutes()>10 ? new Date(time).getMinutes() : '0'+new Date(time).getMinutes()}`;
    }
    setToptime=(event)=>{
    	const li = api.closest(event.target ,'li') ,ul = api.closest(event.target ,'ul');
		if(li.classList.contains('on')){
			return false;
		}

		ul.querySelectorAll('li').forEach((elm)=>{
			elm.classList.remove('on');
		});
		li.classList.add('on');
    	this.setState({ "batchid" : '' ,"showday" : li.getAttribute('data-topid') });
    }
    setBotime=(event)=>{
    	const li = api.closest(event.target ,'li') ,ul = api.closest(event.target ,'ul');
		if(li.classList.contains('have')){
			return false;
		}

		document.querySelectorAll('ul.toptimeul li').forEach((elm)=>{
			elm.classList.remove('on');
		});
		ul.querySelectorAll('li').forEach((elm)=>{
			elm.classList.remove('have');
		});

		li.classList.add('have');
    	this.setState({ "batchid" : '' ,"showday" : li.getAttribute('data-topid') });
    }
    setbatchid=(event)=>{
    	const li = api.closest(event.target ,'li') ,ul = api.closest(event.target ,'ul');;
    	if(li.classList.contains('yiman')){
    		return false;
    	}

    	if(li.classList.contains('yixuan')){
    		li.classList.remove('yixuan');
    		this.setState({ "batchid" : '' });
    		this.batchstatus = '';
    	}else{
    		ul.querySelectorAll('li').forEach((elm)=>{
				elm.classList.remove('yixuan');
			});
			li.classList.add('yixuan');
			this.setState({ "batchid" : li.getAttribute('data-batchid') });
			this.batchstatus = li.getAttribute('data-batchstatus');
    	}
    }
    confir=(event)=>{
    	let obj = {
    		"confirm" : 1,
    		"plan_id" : this.props.location.state.planid,
    		"position_id" : this.props.location.state.positionid,
    		"ent_id" : this.props.location.state.entid,
    		"batch_id" : ''
    	} ,
    	batchidarray = this.state.batchid.split(',') ,
    	batchidstatusarray = this.batchstatus.split(','),
    	i = api.getLocalStorage('toudinumber') || 0;

    	if(api.getLocalStorage('toudistatus')=='toudistatussuccess'){
    		hashHistory.goBack();
    		return false;
    	}

    	if(i<batchidarray.length){
	    	if(new Date(this.props.location.state.expiredate) < new Date()){
	    		obj.confirm = 2;
	    	}

			if(!!batchidstatusarray[i]){
				obj.batch_id = batchidarray[i];
				api.setLocalStorage('toudinumber' ,i*1+1);

	    		api.FetchPost(`/hyb-stu/stu_notify/interview/confirm`,{
					UserKey : this.props.userstate.userKey,
					token : this.props.userstate.token,
					body : JSON.stringify(obj)
				}).then(({res})=>{
					api.setLocalStorage('toudistatus' ,'toudistatussuccess');
					obj.confirm==2 ? api.tip_msg('已过期' ,'fixedmode') : api.tip_msg('预约成功' ,'fixedmode');
					
					setTimeout(()=>{
						api.setLocalStorage('toudistatus' ,'');
						api.setLocalStorage('toudinumber' ,'');
						hashHistory.goBack();
					},1500);
				},(res)=>{
					if(res.code==412){
						this.confir();
					}else{
						api.tip_msg(res.data.message ,'fixedmode');
					}
				});
			}else{
				api.tip_msg('抱歉 您来晚了 已无剩余场次' ,'fixedmode');
			}
		}
    }
    openother=()=>{
    	this.setState({ "isopen" : !this.state.isopen });
    }
    gousertime=()=>{
    	hashHistory.push({pathname : '/usertime' ,state : { "type" : 1 ,"positionid" : this.props.location.state.positionid ,"planid" : this.props.location.state.planid } });
    }
    fnback=(a)=>{
    	if(a==1){
    		this.goback();
    	}else{
    		this.gousertime();
    	}
    }
	render(){
		return(
			<div className="selectbmtime">
				<div className="hd">
					<span onClick={this.goback}><i className="icon3"></i></span> 
					<span>面试选时间</span>
					<span></span>
				</div>
				<div className="topbor">
					<ul className={this.state.moreday ? 'toptimeul showother' : 'toptimeul'}>
						{
							Object.keys(this.state.toplist).map((item ,key)=>{
								return <li onClick={this.setToptime} key={key} data-topid={item} className={key==0 ? 'on' : ''}><span>{item.split('/')[0]}月</span><span>{item.split('/')[1]}</span><span>{this.state.toplist[item].full ? '无场次' : '可预约'}</span></li>
							})
						}
					</ul>
					{
						this.state.moreday ? <div className="all" onClick={this.openother}><p><i className="icon3"></i>全部</p></div> : ''
					}
				</div>
				<div className="msg">
					<h1>考试须知</h1>
					<span>
						1.笔/面试需要使用电脑客户端“小牛笔面试系统”（支持Windows7及以上版本）<br/>
						2.电脑浏览器打开下载地址：www.hongyunbang.net<br/>
						3.面试需要使用个人真实头像<br/>
						4.请保障网络环境畅通，面试需要开启电脑摄像头<br/>
						5.{api.settime(this.props.location.state.expiredate)}后无法更改面试时间
					</span>
					<div>
						<p><i className="icon6"></i>可选场次</p>
						<p><i className="icon6 yiman"></i>已满场次</p>
						<p><i className="icon6 yixuan"></i>已选场次</p>
					</div>
				</div>
				<div className="content">
					<div className="title">{this.state.showday.split('/')[0]}月{this.state.showday.split('/')[1]}日 可预约</div>
					<ul>
						{
							this.state.showday && this.state.toplist[this.state.showday].batch_list.map((item ,key)=>{
								return <li onClick={this.setbatchid} data-batchstatus={this.state.toplist[this.state.showday].full.toString()} className={this.state.toplist[this.state.showday].full.toString().split(',').includes('true') ? 'yiman' : ''} key={item.id} data-batchid={item.id}>
											<i className="icon6"></i>
											<p>{this.formattime(item.start_date)}</p>
										</li>
							})
						}
					</ul>
					{
						this.state.batchid ? <p className="sub" onClick={this.confir}>确定</p> : <p className="sub no">确定</p>
					}
					<p className="nofind" onClick={this.gousertime}>找不到合适我的时间？</p>
				</div>
				<ul className={this.state.isopen ? 'topothertime show' : 'topothertime'}>
					{
						Object.keys(this.state.otherlist).map((item ,key)=>{
									return <li onClick={this.setBotime} key={key} data-topid={item} className={key==0 ? 'on' : ''}>
											<span>{item.split('/')[0]}月</span><span>{item.split('/')[1]}</span>
											<span>{this.state.toplist[item].full ? '无场次' : '可预约'}</span>
										</li>
						})
					}
				</ul>
				{
					this.ispasstime ? <TipSelect text={this.tipmsg} handleclose={this.fnback}/> : ''
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
SelectTimeM = connect(mapStateToProps)(SelectTimeM)
export default SelectTimeM
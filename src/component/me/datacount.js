import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import api from 'api/api'
import Tip from 'component/pagemsg/tip'
import Ratelist from './ratelist'
import 'css/datacount'
import { city ,zhiwei ,xueli ,mianshi ,sex ,hangye } from 'api/config'
import Immutable from 'immutable'
import icon10 from 'images/icon10.png'
import icon34 from 'images/icon34.png'
import icon35 from 'images/icon35.png'
import icon36 from 'images/icon36.png'
import icon23 from 'images/icon23.png'

import icon40 from 'images/icon40.png'
import icon46 from 'images/icon46.png'
import icon47 from 'images/icon47.png'

class DataCount extends Component{
	constructor(props){
		super(props);
		this.state = {
			translateX : 0
		}
		this.page = 0;
		this.isanimate = false;
		this.windowWidth = document.documentElement.clientWidth;
		this.receiveprops = false;
	}
	componentWillReceiveProps=(object ,nextProps)=>{
		this.receiveprops = true;
	}
	shouldComponentUpdate=(nextProps, nextState)=>{
		if(this.receiveprops){
			this.receiveprops = false;
			this.page = 0;
			return !Immutable.is(Immutable.Map(nextProps.default_page) ,Immutable.Map(this.props.default_page));
		}else{
			this.receiveprops = false;
			return true;
		}
	}
	handleBind = (event)=>{
		if(event.type=='touchstart'){
			this.touchStart(event);
		}else if(event.type=='touchmove'){
			event.preventDefault();
			this.touchMove(event);
		}else if(event.type=='touchend'){
			this.touchEnd(event);
		}
	}
	touchStart = (event)=>{
		this.touchX = event.targetTouches[0].pageX;
	}
	touchMove = (event)=>{ 
		let dir = event.targetTouches[0].pageX - this.touchX ,direction = dir > 0 ? 1 : -1;
		if(this.isanimate || Math.abs(dir)<30){
			return false;
		}
		direction<0 ? ++this.page : --this.page;
		if(this.page>=3){
			this.page = 3;
		}
		if(this.page<=0){
			this.page = 0;
		}
		this.setState({ "translateX" : this.page*this.windowWidth });
		this.isanimate = true;
	}
	touchEnd = (event)=>{
		setTimeout(()=>{
			this.isanimate = false;
		},360);
	}
	gethangye=(a)=>{
		let hy = a.split('/') ,b = [] ,c = [];
		hy.map((item)=>{
			if(item==''){
				b.push('不限');
			}else{
				const name = item.split(',');
				if(name.length){
					name.map((i)=>{
						c.push(hangye[i]);
					})
				}
			}
		});
		return b.concat(c).join('、');
	}
	getzhiwe=(a)=>{
		let zw = a.split('/') ,b = [];
		zw.map((item)=>{
			b.push(api.getzhiweiname(item));
		})
		return b.join('/');
	}
	show=(style)=>{
		/*<p><span>性别：</span><em>{sex[this.props.submitted_position.sex_type]}</em><span></span><em>{sex[this.props.default_page.sex_type]}</em></p>*/
		if(this.props.showtype=='yitoudi'){ //已投递
			return <div className="bor" style={style}>
				{/*
				<h2>条件匹配</h2>
				<p><em className="marleft">职位信息</em><em>您的信息</em></p>
				<p><span>行业：</span><em>{hangye[this.props.submitted_position.industry_type]}</em><span></span><em>{this.gethangye(this.props.default_page.user_industry)}</em></p>
				<p><span>职位：</span><em>{api.getzhiweiname(this.props.submitted_position.position_type_id)}</em><span>{this.getzhiwe(this.props.default_page.position_type_id)}</span><em></em></p>
				<p><span>薪资：</span><em>{api.getsalary(this.props.submitted_position.salary_min ,this.props.submitted_position.salary_max)}</em><span></span><em>{this.props.default_page.expect_salary}</em></p>
				<p><span>学历：</span><em>{xueli[this.props.submitted_position.edu_level]}</em><span></span><em>{xueli[this.props.default_page.edu_level]}</em></p>
				<p><span>专业：</span><em>{api.getzhuanyename(this.props.submitted_position.dept_level)}</em><span></span><em>{api.getzhuanyename(this.props.default_page.dept_level)}</em></p>
				*/}
				<div className="linshi">
					<img src={icon40} />
					<span>已完成投递，耐心等待HR的通知~</span>
				</div>
			</div>
		}
		if(this.props.showtype=='yimianshi'){ //已面试
			return <div className="bor" style={style}>
				{/*<h2>面试说明</h2>
				<div className="yibishi">
					<div className="a">
						<span>{this.props.default_page.average_score}</span>
						<span>第{this.props.default_page.ranking}名</span>
					</div>
					<div className="b">{this.props.default_page.user_name}，你好！</div>
					<div className="c">感谢您参与 {this.props.default_page.full_name} {this.props.default_page.position_name}在线面试，通过评定：最终成绩为{this.props.default_page.average_score}分，满分40分，第{this.props.default_page.ranking}名，该成绩真实有效。
					望继续努力，求职一切顺利！</div>
				</div>*/}
				<div className="linshi two">
					<img src={icon46} />
					<h4>已完成面试</h4>
				</div>
			</div>
		}
		if(this.props.showtype=='daibishi'){ //待笔试
			return <div className="bor" style={style}>
				{
					this.jujuetype()
				}
			</div>
		}
		if(this.props.showtype=='daimianshi'){ //待面试
			return <div className="bor" style={style}>
			{
				this.jujuetype()
			}
			</div>
		}
		if(this.props.showtype=='yibishi'){ //已笔试
			return <div className="bor" style={style}>
				{/*<h2>笔试成绩</h2>
				<div className="yibishi">
					<div className="a">
						<span>{this.props.default_page.average_score}</span>
						<span>第{this.props.default_page.ranking}名</span>
					</div>
					<div className="b">{this.props.default_page.user_name}，你好！</div>
					<div className="c">感谢您参与我公司{this.props.default_page.position_name}在线考试，通过评定：最终成绩为{this.props.default_page.average_score}分，第{this.props.default_page.ranking}名，该成绩真实有效。
					望继续努力，求职一切顺利！</div>
				</div>*/}
				<div className="linshi two">
					<img src={icon46} />
					<h4>已完成笔试</h4>
				</div>
			</div>
		}
		if(this.props.showtype=='jieshouluyong'){//接受录用
			return <div className="datanum">
				<div className="bor" id="jieshouluyong_yongdao" style={{ "width" : this.windowWidth +'px' }}>
						<div className="yibishi">
							<Link to={{ "pathname" : "/luyongoffer" ,state : { "id" : this.props.positionid ,'show' : 1 ,"notifystatus" : 1 ,"planid" : this.props.specialplanid }}}>
								<img src={icon23} />
								<h3 className="jieshouluyong_yongdao">查看邀请</h3>
							</Link>
						</div>
					</div>
				</div>
		}
	}
	showdatacount=()=>{
		/*<p className="xlf"><span>职位要求</span><em>{sex[this.props.submitted_position.sex_type]}</em></p>*/
		let style2 = {
			width : this.windowWidth * 4 +'px',
			transform : this.page > 0 ? `translate3d(-${this.state.translateX}px, 0, 0)` : `translate3d(0, 0, 0)`
		}
		let style = {
			width : this.windowWidth +'px'
		}
		return <div >
				<div className="datanumbg">
				<div className="datanum" 
						style={style2}
						onTouchStart={this.handleBind}
						onTouchMove={this.handleBind} 
						onTouchEnd={this.handleBind}
					>
					{ this.show(style) }
					<div className="bor" style={style}>
						<h2>
							{this.props.showtype=='yitoudi' ? '已投递' : this.props.position_stu_statistics.plan_type ? '面试候选' : '笔试候选'}
							{this.props.position_stu_statistics.submitted_total}人
						</h2>
						<p><em>学历分布</em></p>
						<p className="xlf"><span>博士</span><em>{this.props.position_stu_statistics.edu_doctor}人</em></p>
						<p className="xlf"><span>硕士</span><em>{this.props.position_stu_statistics.edu_master}人</em></p>
						<p className="xlf"><span>本科</span><em>{this.props.position_stu_statistics.edu_bachelor}人</em></p>
						<p className="xlf"><span>专科</span><em>{this.props.position_stu_statistics.edu_college}人</em></p>
						<p className="xlf"><span>职位要求</span><em>{xueli[this.props.submitted_position.edu_level]}</em></p>
					</div>
					<div className="bor" style={style}>
						<h2>
							{this.props.showtype=='yitoudi' ? '已投递' : this.props.position_stu_statistics.plan_type ? '面试候选' : '笔试候选'}
							{this.props.position_stu_statistics.submitted_total}人
						</h2>
						<p><em>专业分布</em></p>
						<p className="xlf"><span>符合要求</span><em>{this.props.position_stu_statistics.dept_related}人</em></p>
						<p className="xlf"><span>不符合要求</span><em>{this.props.position_stu_statistics.dept_others}人</em></p>
						<p className="xlf"><span>职位要求</span><em>{api.getzhuanyename(this.props.submitted_position.dept_level)}</em></p>
					</div>
					<div className="bor" style={style}>
						<h2>
							{this.props.showtype=='yitoudi' ? '已投递' : this.props.position_stu_statistics.plan_type ? '面试候选' : '笔试候选'}
							{this.props.position_stu_statistics.submitted_total}人
						</h2>
						<p><em>性别</em></p>
						<p className="xlf"><span>男</span><em>{this.props.position_stu_statistics.male}人</em></p>
						<p className="xlf"><span>女</span><em>{this.props.position_stu_statistics.female}人</em></p>
					</div>
				</div>
				</div>
				<ul className="pageshow">
					<li className={this.page==0 ? "on" : ''}></li>
					<li className={this.page==1 ? "on" : ''}></li>
					<li className={this.page==2 ? "on" : ''}></li>
					<li className={this.page==3 ? "on" : ''}></li>
				</ul>
			</div>
	}
	jujuetype=()=>{ 
		if(this.props.submit_status==11){ /*面试拒绝*/
			return <div className="linshi two">
					<img src={icon46} />
					<h4>已处理面试</h4>
					<span>若您已申请更改面试时间，请耐心等待HR确认<br />若未申请，由于您超时未处理此邀请，已判为拒绝</span>
				</div>
		}

		if(this.props.submit_status==15){ /*申请更改面试时间*/
			return <div className="linshi two">
					<img src={icon46} />
					<h4>已处理面试</h4>
					<span>若您已申请更改面试时间，请耐心等待HR确认<br />若未申请，由于您超时未处理此邀请，已判为拒绝</span>
				</div>
		}

		if(this.props.submit_status==7){/*笔试拒绝*/
			return <div className="linshi two">
					<img src={icon46} />
					<h4>已处理笔试</h4>
					<span>若您已申请更改笔试时间，请耐心等待HR确认<br />若未申请，由于您超时未处理此邀请，已判为拒绝</span>
				</div>
		}
		
		if(this.props.submit_status==16){ /*申请更改笔试时间*/
			return <div className="linshi two">
					<img src={icon46} />
					<h4>已处理笔试</h4>
					<span>若您已申请更改笔试时间，请耐心等待HR确认<br />若未申请，由于您超时未处理此邀请，已判为拒绝</span>
				</div>
		}
		if(this.props.showtype=='daimianshi' && this.props.submit_status==18){
			return <div>
				<p className="qikao"><img src={icon47} className="genggaiimg"/></p>
				<p className="qikao">是因为临时有事，不得不弃考么，现在依然可以向HR发起面试申请</p>
				<Link to={{ "pathname" : "/usertime" ,state : { "type" : 1 ,"positionid" : this.props.position_stu_statistics.position_id ,"planid" : this.props.position_stu_statistics.plan_id }}}>
					<span className="totime">更改面试时间</span>
				</Link>
			</div>
		}else if(this.props.showtype=='daimianshi'){
			return <div>
					<h2>面试说明</h2>
					<h3>开考时间: {api.settime(this.props.default_page.start_date)}  开始</h3>
					<div className="bs">
						{/*面试名称：{this.props.default_page.plan_name}*/}
						<p>
							1.笔/面试需要使用电脑客户端“小牛笔面试系统”（支持Windows7及以上版本）<br/>
							2.电脑浏览器打开下载地址： www.hongyunbang.net<br/>
							3.面试过程中建议配带耳机，已获得更好的声音效果<br/>
							4.请保障网络环境畅通，面试需要开启电脑摄像头<br/>
							5.#{api.settime(this.props.default_page.expire_date)}#后无法更改面试时间
						</p>
						<Link to={{ "pathname" : "/selecttimem" ,state : { "expiredate" : this.props.default_page.expire_date ,"positionid" : this.props.positionid ,"entid" : this.props.submitted_position.ent_id ,"planid" : this.props.specialplanid }}}>
							<span className="totime">更改面试时间</span>
						</Link>
					</div>
				</div>
		}

		if(this.props.showtype=='daibishi' && this.props.submit_status==17){
			return <div>
				<p className="qikao"><img src={icon47} className="genggaiimg"/></p>
				<p className="qikao">是因为临时有事，不得不弃考么，现在依然可以向HR发起笔试申请</p>
				<Link to={{ "pathname" : "/usertime" ,state : { "type" : 2 ,"positionid" : this.props.position_stu_statistics.position_id ,"planid" : this.props.position_stu_statistics.plan_id }}}>
					<span className="totime">更改笔试时间</span>
				</Link>
			</div>
		}else if(this.props.showtype=='daibishi'){
			return <div>
					<h2>笔试说明</h2>
					<h3>开考时间: {api.settime(this.props.default_page.expire_date)}  开始</h3>
					<h3>考试时间：{this.props.default_page.time_length}分钟</h3>
					{/*
						<div className="bs">试题名称：{this.props.default_page.plan_name}</div>
						<div className="bs">笔试题目: {this.props.default_page.name}</div>
						<div className="bs">基本素质笔试题目  分值{this.props.default_page.total_score}分</div>
					*/}
					<p>
						1.笔/面试需要使用电脑客户端“小牛笔面试系统”（支持Windows7及以上版本）<br/>
						2.电脑浏览器打开下载地址： www.hongyunbang.net<br/>
						3.笔试过程中建议配带耳机，已获得更好的声音效果<br/>
						4.请保障网络环境畅通，面试需要开启电脑摄像头<br/>
						5.#{api.settime(this.props.default_page.expire_date)}#后无法更改笔试时间
					</p>
						<Link to={{ "pathname" : "/selecttimew" ,state : { "expiredate" : this.props.default_page.expire_date ,"positionid" : this.props.positionid ,"entid" : this.props.submitted_position.ent_id ,"planid" : this.props.specialplanid }}}>
							<span className="totime">更改笔试时间</span>
						</Link>
				</div>
		}
	}
	showjujue=(type)=>{
		return this.props.showtype=='jieshouluyong' ?
			this.show(type) 
			: <div className="datanum">
					<div className="yijujue">
						{
							(this.props.showtype=='mianshiyijujue' || this.props.showtype=='bishiyijujue')
							? this.jujuetype()
							: <Link to={{ "pathname" : "/luyongoffer" ,state : { "id" : this.props.positionid ,"planid" : this.props.specialplanid }}}>
								<p><img src={icon36} /></p>
								{ this.props.showtype!='jieshouluyong' ? <h3>查看邀请</h3> : ''}
							</Link>
						}
					</div>
				</div>
	}
	render(){
		return (
			<div>
				{ 
					(this.props.showtype=='jieshouluyong' || this.props.showtype=='luyongjujue' || this.props.showtype=='bishiyijujue' || this.props.showtype=='mianshiyijujue') 
					? this.showjujue(this.props.showtype) : this.showdatacount()
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
DataCount = connect(mapStateToProps)(DataCount)
export default DataCount
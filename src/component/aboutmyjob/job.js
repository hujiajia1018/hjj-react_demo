import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { zhiwei } from 'api/config'
import api from 'api/api'
import 'css/job'
import DetailJob from './detailjob'

class Job extends Component{
	constructor(props){
		super(props)
		this.state = {
			openDetail : false,
			children : {}
		}
	}
	opendetailjob = (event)=>{
		const el = api.getTarget(event.target ,'li');
		document.querySelectorAll('body')[0].classList.add('noscoll');
		this.setState({ "openDetail" : true ,"children" : zhiwei[el.getAttribute('data-id')].children });
	}
	close = (type ,val)=>{ 
		(type && Array.isArray(val)) ? this.props.handleclose(type ,val) : this.props.handleclose('job');
		this.setState({ "openDetail" : false });
		document.querySelectorAll('body')[0].classList.remove('noscoll');
	}
	closedetail=()=>{
		this.setState({ "openDetail" : false });
		document.querySelectorAll('body')[0].classList.remove('noscoll');
	}
	render(){
		return (
			<div className="job joblistback">
				<div className="hd">
					<span onClick={this.close}><i className="icon3"></i></span>
					<span>期望职位</span>
					<span></span>
				</div>
				<div className="box">
					<ul className="joblist" id="joblistnoscroll">
						{
							Object.keys(zhiwei).map((key)=>{
								return <li onClick={this.opendetailjob} key={key} data-id={zhiwei[key].id} data-parentid={zhiwei[key].parent_id}><span>{zhiwei[key].name}</span><i className="icon"></i></li>
							})
						}
					</ul>
					<ReactCSSTransitionGroup transitionName="detailJobAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
						{this.state.openDetail ? <DetailJob closedetail={this.closedetail} handleclose={this.close} children={this.state.children} onSlected={this.props.onSlected} /> : ''}
					</ReactCSSTransitionGroup>
				</div>
			</div>
		)
	}
}

export default Job
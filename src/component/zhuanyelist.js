import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ZhuanyeDetail from 'component/zhuanyelistdetail'
import { zhuanye } from 'api/config'
import api from 'api/api'
import 'css/zhuanye'

class ZhuanYeList extends Component{
	constructor(props){
		super(props);
		this.state = {
			isopendetail : false,
			data : {},
			selectzy : this.props.selected
		}
		this.sel = this.props.selected.substring(0 ,3);
	}
	back=(id)=>{
		this.props.close(id);
	}
	getid=(event)=>{
		const id = event.target.getAttribute('data-id');
		this.setState({ "isopendetail" : true ,"data" : Object.assign({}, zhuanye[id].children) });
	}
	closeDeatil=(event)=>{
		if(event.target.classList.contains('bg') && this.state.isopendetail){
			this.setState({ "isopendetail" : false });
		}
	}
	onmove=(event)=>{
		if(event.target.classList.contains('bganimate')){
			event.preventDefault();
		}
	}
	render(){
		return(
			<div className="zhuanye">
				<div className="hd">
					<span className="zy" onClick={this.back}><i className="icon3"></i></span>
					<span className="zy">专业类别</span>
					<span className="zy"></span>
				</div>
				<div className="bdzhuanye">
					<div className="titlemsg"><i className="icon3"></i>请选择您的专业所属类别</div>
					<ul className="zhuanyeul1">
						{
							Object.keys(zhuanye).map((key)=>{
								return zhuanye[key].id==111 ? '' : <li className={this.sel==key ? 'on' : ''} onClick={this.getid} key={key} data-id={zhuanye[key].id}>{zhuanye[key].name}<i className="icon"></i></li>
							})
						}
					</ul>
					<div className={this.state.isopendetail ? 'bg bganimate' : 'bg'} onClick={this.closeDeatil} onTouchMove={this.onmove}>
						<ReactCSSTransitionGroup transitionName="zhuanyeAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
							{this.state.isopendetail ? <ZhuanyeDetail close={this.back} data={this.state.data} selected={this.state.selectzy}/> : ''}
						</ReactCSSTransitionGroup>
					</div>
				</div>
			</div>
		)
	}
}
export default ZhuanYeList
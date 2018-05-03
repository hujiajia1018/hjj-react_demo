import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import PickerItem from './pickerItem'
import api from 'api/api'
import './style'

class Picker extends Component{
	constructor(props){
		super(props);
		this.select = {};
		this.state = {
			dateerro : false,
			erromsg : false
		}
		for(let key in this.props.pickerval){
			if(!this.select[key]){
				this.select[key] = '';
			}
			this.select[key] = this.props.pickerval[key].initval;
		}
	}
	componentDidMount=()=>{
		api.lock();
		setTimeout(()=>{
			this.refs.content.classList.add('animated');
		},50);
	}
	componentWillUnmount=()=>{
		api.unlock();
	}
	handelClose = (event)=>{
		const name = event.target.tagName.toLowerCase()!='span' ? event.target.parentNode.getAttribute('name') : event.target.getAttribute('name');
		if(this.state.dateerro && name=='confirm'){
			this.setState({ "erromsg" : true });
			setTimeout(()=>{
				this.setState({ "erromsg" : false });
			},1000);
			return;
		}
		this.props.handle(this.select ,(name=='confirm' ? true : false));
	}
	onSelect = (key ,val)=>{
		this.select[key] = val;
		if(this.props.trytest==1){
			if(this.select.a!='不限' && Number(this.select.a) >= Number(this.select.b)){
				this.setState({ "dateerro" : true ,"erromsg" : true });
				setTimeout(()=>{
					this.setState({ "erromsg" : false });
				},1000);
			}else{
				this.setState({ "dateerro" : false });
			}
		}
	}
	render(){
		return(
			<div className="picker">
				<div className="content" ref="content">
					<div className="hd">
						<span onTouchEnd={this.handelClose} name="cancel"><i className="picker-icon"></i></span>
						<span>{this.props.titletext}</span>
						<span onTouchEnd={this.handelClose} name="confirm"><i className="picker-icon"></i></span>
					</div>
					<div className="bd">
						{
							Object.keys(this.props.pickerval).map((key ,index)=>{
								return <div className="bd-ul" key={index}>
									<div className="wheel">
										<PickerItem params={this.props.pickerval[key].val} pickerIndex={key} handelSelect={this.onSelect}/>
									</div>
								</div>
							})
						}
					</div>
					<ReactCSSTransitionGroup transitionName="pickerMsgAnimate" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
						{this.state.erromsg ? <div className="picker-icon msg">右侧薪资要求大于左侧薪资</div> : ''}
					</ReactCSSTransitionGroup>
				</div>
			</div>
		)
	}
}
export default Picker
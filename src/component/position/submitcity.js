import React, { Component } from 'react'
import api from 'api/api'
import { city } from 'api/config'
import 'css/submitcity'
import icon19 from 'images/icon19.png'

class SubmitCity extends Component{
	constructor(props){
		super(props);
		this.state = {
			cityarray : []
		}
	}
	componentWillUnmount=()=>{
		document.querySelectorAll('body')[0].classList.remove('noscoll');
	}
	componentDidMount = ()=>{
		document.querySelectorAll('body')[0].classList.add('noscoll');
	}
	select=(event)=>{
		let val = [];
		event.stopPropagation();
		if(event.target.classList.contains('submitcity')){
			this.props.closecityselect();
		}else{
			if(event.target.tagName.toLowerCase()=='li' || event.target.tagName.toLowerCase()=='span'){
				const elm = api.closest(event.target ,'li');
				if(elm){
					elm.classList.contains('on') ? elm.classList.remove('on') : elm.classList.add('on');
					for(let item of document.querySelectorAll('.cityheight ul li.on')){
						val.push(item.getAttribute('data-id'));
					}
					this.setState({ cityarray : val });
				}
			}
		}
	}
	close=(event)=>{
		if(event.target.getAttribute('data-type')==1){
			this.state.cityarray.length && this.props.closecityselect(this.state.cityarray.join(','));
		}else{
			this.props.closecityselect();
		}
	}
	render(){
		return(
			<div className="submitcity" onClick={this.select}>
				<div className="content">
					<img src={icon19} />
					<p><em>意向投递城市</em></p>
					<div className="cityheight">
						<ul>
						{
							this.props.citydata.length ? this.props.citydata.map((item ,index)=>{
								return <li onClick={this.select} data-id={item} key={index}><span>{city[item]}</span></li>
							}) : ''
						}
						</ul>
					</div>
					<p>
						<span data-type="0" onClick={this.close}>取消</span>
						<span data-type="1" className={this.state.cityarray.length ? '' : 'no'} onClick={this.close}>确定</span>
					</p>
				</div>
			</div>
		)
	}
}
export default SubmitCity
import React, { Component } from 'react'
import 'css/jobdirection'
import { hangye } from 'api/config'

class JobDirection extends Component{
	constructor(props){
		super(props);
		this.state = {
			onSelect : this.props.directionArray
		}
	}
	close = ()=>{
		let selected = [] ,elm = document.querySelectorAll('.box p.active');
		for(let item of elm){
			selected.push({
				"key" : item.getAttribute('value'),
				"value" : item.textContent
			});
		}
		this.props.handleclose('direction' ,selected);
	}
	cancel = ()=>{
		this.props.handleclose('direction');
	}
	select = (event)=>{
		event.target.classList.contains('active') ? event.target.classList.remove('active') 
		: document.querySelectorAll('.box p.active').length>=3 ? '' : event.target.classList.add('active');
	}
	render(){
		let array = [];
		if(this.state.onSelect.length){
			this.state.onSelect.map((val)=>{
				array.push(val.key);
			})
		}
		return (
			<div className="jobdirection">
				<div className="hd">
					<span onClick={this.cancel}><i className="icon3"></i></span>
					<span>行业方向</span>
					<span onClick={this.close}>保存</span>
				</div>
				<div className="msg">
					<span>选择行业方向</span><span>最多可选3个</span>
				</div>
				<div className="box">
				{
					Object.keys(hangye).map((key)=>{
						return array.includes(key.toString()) ? <p className="active" onClick={this.select} key={key} value={key}>{hangye[key]}</p> : <p onClick={this.select} key={key} value={key}>{hangye[key]}</p>
					})
				}
				</div>
			</div>
		)
	}
}

export default JobDirection;
import React, { Component } from 'react'
import { guimo ,rongzi ,hangye ,city } from 'api/config'
import 'css/property'
import api from 'api/api'

class Property extends Component{
	constructor(props){
		super(props);
	}
	componentWillReceiveProps(){
		this.props.ptype!='c' && this.reset();
	}
	reset = ()=>{
		let elm = document.querySelectorAll('.property ul li');
		for(let item of elm){
			if(item.getAttribute('data-id')!='all'){
				item.classList.remove('on');
			}else{
				item.classList.add('on');
			}
		}
	}
	selected =(event)=>{
		if(this.props.ptype=='c'){
			const tagname = event.target.tagName.toLowerCase();
			let typeid = this.props.positiontype ,cityid = this.props.showarray[0];
			if(tagname=='em'){
				this.refs.property.querySelectorAll('.datatype .on').length && this.refs.property.querySelectorAll('.datatype .on')[0].classList.remove('on');
				event.target.classList.add('on');
				typeid = event.target.getAttribute('data-id');
				cityid = '';
			}else if(tagname=='b'){
				const li = api.closest(event.target ,'li');
				if(li.classList.contains('on')){
					li.classList.remove('on');
					cityid = '';
				}else{
					document.querySelectorAll('.property ul li.on').length && document.querySelectorAll('.property ul li.on')[0].classList.remove('on');
					cityid = li.getAttribute('data-id');
					li.classList.add('on');
				}
			}
			this.props.handlePropertyDate(typeid ,cityid);
		}else{
			const elm = api.closest(event.target ,'li');
			if(elm.getAttribute('data-id')=='all'){
				this.reset();
				elm.classList.add('on');
			}else{
				document.querySelectorAll('.property ul li')[0].classList.remove('on');
				elm.classList.contains('on') ? elm.classList.remove('on') : elm.classList.add('on');
			}
		}
	}
	confirm =()=>{
		let array = [] ,elm = document.querySelectorAll('.property ul li.on');
		for(let item of elm){
			item.getAttribute('data-id')!='all' && array.push(item.getAttribute('data-id'));
		}
		this.props.handlePropertyDate(array);
	}
	render(){
		let data = {}, 
		s = <li className={this.props.showarray.length ? '' : 'on'} onTouchEnd={this.selected} data-id="all"><b>不限</b></li>,
		title = '' ,styclass = '';
		if(this.props.ptype=='g'){
			data = guimo;
			title = '团队规模';
		}
		if(this.props.ptype=='r'){
			data = rongzi;
			title = '融资规模';
		}
		if(this.props.ptype=='h'){
			data = hangye;
			title = '相关行业';
		}
		if(this.props.ptype=='c'){
			data = city;
			s = '';
			styclass = this.props.data.length > 4 ? 'b' : 'a';
		}
		return(
			<div className="property" ref="property">
				<div className="bd">
					{this.props.ptype=='c' ? <label className="datatype"><em data-id="1" onTouchEnd={this.selected} className={this.props.positiontype==1 ? 'on' : ''}>相关职位</em><em data-id="0" onTouchEnd={this.selected} className={this.props.positiontype==0 ? 'on' : ''}>全部职位</em></label> : '' }
					{title ? <p>{title}</p> : ''}
					<ul className={styclass}>
						{s}
						{
							this.props.data.map((key)=>{
								return key==0 ? '' : this.props.showarray.includes(key) ? <li className="on" onTouchEnd={this.selected} key={key} data-id={key}><b>{data[key]}</b></li> 
								: <li onTouchEnd={this.selected} key={key} data-id={key}><b>{data[key]}</b></li>
							})
						}
					</ul>
					{this.props.ptype=='c' ? '' : <label><span onTouchEnd={this.reset}>重置</span><span className="yes" onTouchEnd={this.confirm}>确定</span></label> }
				</div>
			</div>
		)
	}
}
export default Property

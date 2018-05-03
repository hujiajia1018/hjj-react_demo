import React, { Component } from 'react'
import { xueli ,guimo ,rongzi ,hangye } from 'api/config'
import api from 'api/api'
import 'css/requirement'

class Requirement extends Component{
	constructor(props){
		super(props);
		this.state = {
			isopenxl : false,
			isopengs : false,
			moneyway : api.isNumber(this.props.moneyway) ? this.props.moneyway==0 ? 1 :2 : '',
			timeway : api.isNumber(this.props.timeway) ? this.props.timeway==0 ? 1 : 2 : ''
		}
		this.data = {
			xueli : this.props.xueli,
			rongzi : this.props.rongzi,
			guimo : this.props.guimo,
			hangye : this.props.hangye
		}
	}
	searchtime =()=>{
		if(!this.props.cityid){
			return;
		}
		const a = this.state.moneyway!=0 ? this.state.timeway==1 ? 2 : 1 : this.state.timeway==1 ? 2 : 1;
		this.setState({ "timeway" : a ,"moneyway" : 0 });
		this.props.searchhandle(Object.assign({} ,this.data ,{"moneyway" : '' ,"timeway" : a==2 ? 1 : 0 }));
		this.setState({ "isopenxl" : false ,"isopengs" : false });
	}
	searchmoney =()=>{
		if(!this.props.cityid){
			return;
		}
		/* 1向下 2 向上 0 无 */
		const a = this.state.timeway!=0 ? this.state.moneyway==1 ? 2 : 1 : this.state.moneyway==1 ? 2 : 1;
		this.setState({ "moneyway" : a ,"timeway" : 0 });
		this.props.searchhandle(Object.assign({} ,this.data ,{"moneyway" : a==2 ? 1 : 0 ,"timeway" : ''}));
		this.setState({ "isopenxl" : false ,"isopengs" : false });
	}
	open =(event)=>{
		if(!this.props.cityid){
			return;
		}
		const el = api.getTarget(event.target ,'b') ,type = el.getAttribute('name');
		if(type=='xl'){ 
			this.setState({ "isopengs" : false ,"isopenxl" : !this.state.isopenxl });
		}else{
			this.setState({ "isopenxl" : false ,"isopengs" : !this.state.isopengs });
		}
	}
	setpropert=(event)=>{
		const elm = api.closest(event.target ,'li'), id = elm.getAttribute('data-id') ,name = elm.getAttribute('name');
		elm.classList.contains('on') ? elm.classList.remove('on') : elm.classList.add('on');
		
		if(id){
			if(this.data[name].includes(id)){
				this.data[name].findIndex((value, index, arr)=>{
					value==id && this.data[name].splice(index,1);
				});
			}else{
				this.data[name].push(id);
			}
			name!='hangye' && document.querySelectorAll(`.${name} li`)[0].classList.remove('on');
		}else{
			this.data[name] = [];
			document.querySelectorAll(`.${name} li.on`).forEach((el)=>{
				el.classList.remove('on');
			});
			elm.classList.add('on');
		}

		if(name!='hangye' && !api.closest(event.target ,'ul').querySelectorAll('li.on').length){
			this.data[name] = [];
			api.closest(event.target ,'ul').querySelectorAll('li')[0].classList.add('on');
		}
	}
	rest=(event)=>{
		const name = event.target.getAttribute('name');
		if(name=='xueli'){
			this.data[name] = [];
			document.querySelectorAll('#bd1 ul li').forEach((el ,index)=>{
				!index ? el.classList.add('on') : el.classList.remove('on');
			});
		}else{
			this.data.rongzi = [];
			this.data.guimo = [];
			this.data.hangye = [];
			document.querySelectorAll('#bd2 ul').forEach((el)=>{
				el.querySelectorAll('li').forEach((elm,index)=>{
					!index ? elm.classList.add('on') : elm.classList.remove('on');
				})
			});
		}
	}
	sub =()=>{
		/* 1向下 2 向上 0 无 */
		this.props.searchhandle(Object.assign({} ,this.data ,{"moneyway" : this.state.moneyway==0 ? '' : this.state.moneyway>1 ? 1 : 0 ,"timeway" : this.state.timeway==0 ? '' : this.state.timeway>1 ? 1 : 0 }));
		this.setState({ "isopengs" : false ,"isopenxl" : false });
	}
	closereqment=(event)=>{
		if(event.target.classList.contains('bdposition')){
			this.setState({ "isopengs" : false ,"isopenxl" : false });
		}
	}
	render(){
		const a = this.state.isopengs || this.state.isopenxl;
		const style = {
			height : a ? window.innerHeight : 'auto'
		}

		return(
			<div className="requirement" onClick={this.closereqment}>
				<b className={this.state.timeway!=0 ? "requselected" : ""} onClick={this.searchtime}><span>时间<i className={this.state.timeway==1 ? "icon3 b down" : this.state.timeway==2 ? "icon3 b on" : 'icon3 b'}></i></span></b>
				<b className={this.state.moneyway!=0 ? "requselected" : ""} onClick={this.searchmoney}><span>薪资<i className={this.state.moneyway==1 ? "icon3 b down" : this.state.moneyway==2 ? "icon3 b on" : 'icon3 b'}></i></span></b>
				<b className={this.state.isopenxl ? "requselected" : ""} name="xl" onClick={this.open}><span>学历</span></b>
				<b className={this.state.isopengs ? "requselected" : ""} name="gs" onClick={this.open}><span>公司</span></b>
				<div className={a ? "bdposition show" : "bdposition"} style={style}>
					<div id="bd1" className={this.state.isopenxl ? 'bd active' : 'bd'}>
						<em>学历筛选</em>
						<ul className="xueli">
							{
								this.data.xueli.length
								? Object.keys(xueli).map((key)=>{
									return <li key={key} data-id={key} name="xueli" className={this.data.xueli.includes(key) ? "on" : ''} onTouchEnd={this.setpropert}><p>{xueli[key]}</p></li>
									
								})
								: Object.keys(xueli).map((key)=>{
									return <li key={key} data-id={key} name="xueli" className={key=='0' ? "on" : ''} onTouchEnd={this.setpropert}><p>{xueli[key]}</p></li>
								})
							}
						</ul>
						<p><span className="reset" name="xueli" onTouchEnd={this.rest}>重置</span><span className="confirm" onTouchEnd={this.sub}>确定</span></p>
					</div>
					<div id="bd2" className={this.state.isopengs ? 'bd active' : 'bd'}>
						<div className="bigscroll">
							<em>融资规模</em>
							<ul className="rongzi">
								{
									this.data.rongzi.length
									? Object.keys(rongzi).map((key)=>{
										return <li key={key} className={this.data.rongzi.includes(key) ? "on" : ''} data-id={key} name="rongzi" onTouchEnd={this.setpropert}><p>{rongzi[key]}</p></li>
									})
									: Object.keys(rongzi).map((key)=>{
										return <li key={key} data-id={key} className={key=='0' ? "on" : ''} name="rongzi" onTouchEnd={this.setpropert}><p>{rongzi[key]}</p></li>
									})
								}
							</ul>
							<em>团队规模</em>
							<ul className="guimo">
								{	
									this.data.guimo.length
									? Object.keys(guimo).map((key)=>{
										return <li key={key} className={this.data.guimo.includes(key) ? "on" : ''} data-id={key} name="guimo" onTouchEnd={this.setpropert}><p>{guimo[key]}</p></li>
									})
									: Object.keys(guimo).map((key)=>{
										return <li key={key} className={key==0 ? "on" : ''} data-id={key} name="guimo" onTouchEnd={this.setpropert}><p>{guimo[key]}</p></li>
									})
								}
							</ul>
							<em>行业方向</em>
							<ul className="hangye">
								{
									Object.keys(hangye).map((key)=>{
										return <li key={key} className={this.data.hangye.includes(key) ? "on" : ''} data-id={key} name="hangye" onTouchEnd={this.setpropert}><p>{hangye[key]}</p></li>
									})
								}
							</ul>
						</div>
						<p><span className="reset" onTouchEnd={this.rest}>重置</span><span className="confirm" onTouchEnd={this.sub}>确定</span></p>
					</div>
				</div>
			</div>
		)
	}
}
export default Requirement
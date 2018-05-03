import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { GetHotCity } from 'action/hotcityAction'
import api from 'api/api'
import { city } from 'api/config'
import 'css/hotcity'
import Tip from 'component/pagemsg/tip'

class Hotcity extends Component{
	constructor(props){
		super(props);
		this.letterable = [];
		this.touchX = 0;
		this.touchY = 0;
		this.animate = false;
		this.uperletter = ['热门城市','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','>'];
	}
	componentDidMount=()=>{
		document.querySelectorAll('body')[0].classList.add('noscoll');
		this.props.GetHotCityList({
			UserKey : this.props.userstate.userKey,
			token : this.props.userstate.token
		})
	}
	componentWillUnmount=()=>{
		document.querySelectorAll('body')[0].classList.remove('noscoll');
	}
	usercitylist =()=>{
		return this.props.hotlist.status=='succsee' && this.props.hotlist.citylist.map((obj ,key)=>{
				{
					this.letterable.push(obj.prefix);
				}
				return <li key={key} id={obj.prefix}>
					<em>{obj.prefix}</em>
					<p>
					{
						obj.cities.map((val ,index)=>{
							return <span onClick={this.close} key={index} data-city={val}>{city[val]}</span>
						})
					}
					</p>
				</li>
		})
	}
	close =(event)=>{
		this.props.handleclose(event.target.getAttribute('data-city'));
	}
	touchstart =(event)=>{
		this.touchX = event.targetTouches[0].pageX;
		this.touchY = event.targetTouches[0].pageY;
	}
	touchmove =(event)=>{
		let dirX = event.targetTouches[0].pageX - this.touchX,
			dirY = event.targetTouches[0].pageY - this.touchY,
			direction = dirX > 0 ? 1 : -1;

		let sin = dirY / Math.sqrt(dirX * dirX + dirY * dirY);

		if(Math.abs(sin) > Math.sin(Math.PI / 9)) {
			return;
		}

		const end = ()=>{
			this.refs.letterdetail.classList.add('activeanimate');
			this.animate = false;
			window.removeEventListener('touchend' ,end);
		}

		if(direction < 0 && Math.abs(dirX) > 25 && !this.animate){
			this.animate = true;
			window.addEventListener('touchend' ,end ,false);
		}
	}
	onselect =(event)=>{
		if(event.target.textContent!='>'){
			const {top ,left} = api.getOffset(document.getElementById(event.target.textContent))
			window.scrollTo(0 ,top-64);
		}
		this.refs.letterdetail.classList.remove('activeanimate');
	}
	render(){
		const citylistshow = this.usercitylist();
		return(
			<div className="hotcity">
				<div className="hd">
					<span></span>
					<span>选择城市</span>
					<span onClick={this.close}>取消</span>
				</div>
				<div className="detailcity">
					<ul className="hotcitylist">
						{ this.props.hotlist.status=='pending' 
							? <Tip text="" type="loading" /> 
								: this.props.hotlist.status=='succsee'
								? <li id='all'>
									<em>热门城市</em>
									<p>
										<span onClick={this.close} data-city="110100">北京</span>
										<span onClick={this.close} data-city="310100">上海</span>
										<span onClick={this.close} data-city="440100">广州</span>
										<span onClick={this.close} data-city="440300">深圳</span>
									</p>
								</li> : this.props.hotlist.status=='nodata' 
								? <Tip text="抱歉，暂时没有相关内容" type="nodata" /> 
								: <Tip text="出错误了" type="tiperro" />

						}
						{citylistshow}
					</ul>
					<ul className='letter'>
						<li>#</li>
						<li>热</li>
						<li>A</li>
						<li>B</li>
						<li>C</li>
						<li>D</li>
						<li>E</li>
						<li>F</li>
						<li>G</li>
						<li>H</li>
						<li>I</li>
						<li>J</li>
						<li>K</li>
						<li>L</li>
						<li>M</li>
						<li>N</li>
						<li>O</li>
						<li>P</li>
						<li>Q</li>
						<li>R</li>
						<li>S</li>
						<li>T</li>
						<li>U</li>
						<li>V</li>
						<li>W</li>
						<li>X</li>
						<li>Y</li>
						<li>Z</li>
						<li>#</li>
					</ul>
				</div>
				<div className="letterdetail" ref="letterdetail">
					<ul>
						{
							this.uperletter.map((val ,key)=>{
								return (val=='热门城市' || val=='>' || this.letterable.includes(val))
									? <li className="ableli" onTouchEnd={this.onselect} key={key}>{val}</li>
									: <li key={key}>{val}</li>
							})
						}
					</ul>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state ,ownProps) =>{
	return {
		userstate : state.UserState,
		hotlist : state.HotCityList
	}
}
const mapDispatchToProps = (dispath) =>{
	return {
		GetHotCityList : bindActionCreators(GetHotCity ,dispath)
	}
}
Hotcity = connect(mapStateToProps ,mapDispatchToProps)(Hotcity);
export default Hotcity
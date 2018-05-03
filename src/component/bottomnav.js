import React, { Component } from 'react'
import { Link ,hashHistory } from 'react-router'
import api from 'api/api'
import 'css/bottomnav'

class BottomNav extends Component{
	constructor(props){
		super(props);
		this.state = {
			activeurl : ''
		}
	}
	componentDidMount=()=>{
		this.setState({ "activeurl" : document.querySelector('a.active').getAttribute('href').substring(2) });
	}
	effect = (event)=>{
		const p = api.closest(event.target ,'p'), 
			{top ,left} = api.getOffset(p),
			{w ,h} = api.getelwh(p),
			dataelm = api.closest(event.target ,'p'),
			dataurl = dataelm.getAttribute('data-url'),
			activeurl = dataelm.querySelector('a').getAttribute('href').substring(2);

		if(document.getElementById('ripple') || this.state.activeurl==activeurl){
			event.preventDefault();
			return false;
		}

		const ripple = document.createElement('span');
		ripple.classList.add('ripple');
		ripple.id = "ripple";
		p.insertBefore(ripple, p.firstChild);

		let x = event.changedTouches[0].pageX - left - w / 2;
		let y = event.changedTouches[0].pageY - top - h / 2;
		let width = 0,height = 0;

		if(w >= h){
			width = height = w;
		}else{
			width = height = h;
		}

		ripple.style.width = `${width}px`;
		ripple.style.height = `${height}px`;
		ripple.style.top = `${y}px`;
		ripple.style.left = `${x}px`;
		ripple.classList.add('rippleEffect');

		setTimeout(()=>{
			ripple.remove();
		},410);

		this.setState({ "activeurl" : activeurl });
	}
	render(){
		return(
			<div className="bottomnav">
				<p data-url="indexpage" >
					<Link activeClassName="active" to="/indexpage">
						<i className="icon4"></i>
						<b>首页</b>
					</Link>
				</p>
				<p data-url="position">
					<Link activeClassName="active" to="/position">
						<i className="icon4"></i>
						<b>职位</b>
					</Link>
				</p>
				<p data-url="company">
					<Link activeClassName="active" to="/company">
						<i className="icon4"></i>
						<b>公司</b>
					</Link>
				</p>
				<p data-url="me">
					<Link activeClassName="active" to="/me">
						<i className="icon4"></i>
						<b>我的</b>
					</Link>
				</p>
			</div>
		)
	}
}

export default BottomNav
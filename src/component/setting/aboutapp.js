import React, { Component } from 'react'
import { Link } from 'react-router'
import api from 'api/api'
import 'css/appsetting'
import imgsrc2X from 'images/logo@2x.png'

class AboutApp extends Component{
	constructor(props){
		super(props);
	}
	close=()=>{
		this.props.handleclose();
	}
	render(){
		return(
			<div className="appsetting" id="msgsetting">
				<div className="hd">
					<span onClick={this.close}><i className="icon3"></i></span>
					<span>关于我们</span>
					<span></span>
				</div>
				<div className="logoheight">
					<div className="logo-box">
						<p className="logobor">
							<img src={imgsrc2X} />
							<span>V1.0</span>
						</p>
					</div>
				</div>
				<ul className="setlist" id="setlist">
					<li><span>团队成员</span><i className="icon"></i></li>
					<li><span>功能介绍</span><i className="icon"></i></li>
					<li><span>服务协议</span><i className="icon"></i></li>
				</ul>
			</div>
		)
	}
}
export default AboutApp
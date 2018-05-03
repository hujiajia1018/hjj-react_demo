import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import api from 'api/api'
import 'css/merelease'
import usericonimg from 'images/icon6.png'

class MeRelease extends Component{
	constructor(props){
		super(props);
		this.state = {
			translateX : 0
		}
		this.page = 0;
		this.isanimate = false;
		this.windowWidth = document.documentElement.clientWidth;
	}
	render(){
		return (
			<div className="merelease">
				<div className="hd">
					<span><Link to="/me"><i className="icon"></i>返回</Link></span>
					<span>我的发布</span>
					<span></span>
				</div>
				<div className="bd">
					<div className="box">
						<div className="boxhd">
							<img src={usericonimg} />
							<p>
								<span>张三儿</span>
								<span>2017-05-12</span>
							</p>
							<em>
								<i className="icon"></i>产品意见
							</em>
						</div>
						<div className="boxbd">
							<p>啊啊啊啊啊啊！！！今天运气太差了！！！面试被“碰瓷”了</p>
							<ul className="imglist">
								<li><img src={usericonimg} /></li>
								<li><img src={usericonimg} /></li>
								<li><img src={usericonimg} /></li>
								<li><img src={usericonimg} /></li>
							</ul>
						</div>
						<div className="ft">
							<span><i className="icon b"></i>556</span>
							<span><i className="icon a on"></i>9</span>
						</div>
					</div>

					<div className="box">
						<div className="boxhd">
							<img src={usericonimg} />
							<p>
								<span>张三儿</span>
								<span>2017-05-12</span>
							</p>
						</div>
						<div className="boxbd">
							<p>啊啊啊啊啊啊！！！今天运气太差了！！！面试被“碰瓷”了</p>
							<ul className="imglist">
								<li className="long">
									<img src={usericonimg} />
									<p>
										<em>《学会思考，是人类最开始的天赋？》</em>
										人是从思考如何吃开始的，<span>【长文】</span>
									</p>
								</li>
							</ul>
						</div>
						<div className="ft">
							<span><i className="icon b"></i>556</span>
							<span><i className="icon a"></i>9</span>
						</div>
					</div>

				</div>
			</div>
		)
	}
}

const mapStateToProps = (state ,ownProps) =>{
	return {
		userstate : state.UserState
	}
}
MeRelease = connect(mapStateToProps)(MeRelease)
export default MeRelease
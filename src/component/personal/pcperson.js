import React, { Component } from 'react'
import 'css/pcperson'
import icon5 from 'images/icon5.png'
import api from 'api/api'

class PcPerson extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount=()=>{
		api.lock();
	}
	componentWillUnmount=()=>{
		api.unlock();
	}
	back=()=>{
		this.props.back(2);
	}
	render(){
		return(
			<div className="pcperson">
				<div className="hd">
					<span onClick={this.back}><i className="icon3"></i></span>
					<span>创建简历</span>
					<span></span>
				</div>
				<div className="bd">
					<div className="msg">
						<img src={icon5} />
						<p>为了方便您对简历的编写</p>
						<p>建议在电脑浏览器中打开网址</p>
						<span>(www.hongyunbang.com)</span>
					</div>
					<p className="complete">已打开网址，点击开始扫描</p>
				</div>
			</div>
		)
	}
}
export default PcPerson
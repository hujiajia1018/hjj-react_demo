import React, { Component } from 'react'
import api from 'api/api'
import 'css/share'

class Share extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount=()=>{
		api.lock();
	}
	componentWillUnmount=()=>{
		api.unlock();
	}
	share=(event)=>{ 
		const type = api.closest(event.target ,'li').getAttribute('data-id');
		let data = {
			"share_type" : type,
			"share_kind" : this.props.shareKind,
			"share_content" : this.props.shareContent,
			"id" : this.props.id
		};
		api.webview("sharetypechoose?param="+JSON.stringify(data));
	}
	close=(event)=>{
		if(event.target.classList.contains('share')){
			this.props.closeShare();
		}
	}
	render(){
		return (
			<div className="share" onTouchEnd={this.close}>
				<div className="content">
					<p>分享到</p>
					<ul className="shareul">
						<li data-id="1" onClick={this.share}><i className="icon3 weixin"></i><span>微信</span></li>
						<li data-id="2" onClick={this.share}><i className="icon3 weixinp"></i><span>朋友圈</span></li>
						<li data-id="4" onClick={this.share}><i className="icon3 qq"></i><span>QQ</span></li>
						<li data-id="5" onClick={this.share}><i className="icon3 qqk"></i><span>QQ空间</span></li>
						<li data-id="0" onClick={this.share}><i className="icon3 weibo"></i><span>微博</span></li>
					</ul>
				</div>
			</div>
		)
	}
}

export default Share
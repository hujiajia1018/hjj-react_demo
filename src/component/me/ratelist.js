import React, { Component } from 'react'
import "css/ratelist"
import { kaoshi ,ksresult } from 'api/config'
import api from 'api/api'

class Ratelist extends Component{
	constructor(props){
		super(props);
		this.touchX = 0;
		this.translateX = 0;
		this.zjl = this.props.zhongjian.length;

		if(this.zjl){ 
			if(this.props.endtime){
				this.num = 1 + this.zjl + 1;
			}else{
				this.num = 2 + this.zjl;
			}
		}else{
			this.num = 2 + this.zjl;
		}

		this.state = {
			translateX : 0,
			px : this.num * 115
		}
		this.num = 0;
		this.ischao = false;
		this.clientWidth = document.documentElement.clientWidth;
	}
	componentDidMount=()=>{
		if(this.state.px > this.clientWidth){
			this.ischao = true;
		}
	}
	handleBind = (event)=>{
		if(event.type=='touchstart'){
			this.touchStart(event);
		}else if(event.type=='touchmove'){
			event.preventDefault();
			this.touchMove(event);
		}else if(event.type=='touchend'){
			this.touchEnd(event);
		}
	}
	touchStart = (event)=>{
		this.touchX = event.targetTouches[0].pageX;
	}
	touchMove = (event)=>{
		let dir = event.targetTouches[0].pageX - this.touchX ,translateX = this.translateX + dir;
		let chazhi = this.state.px - this.clientWidth;
		if(!this.ischao){ 
			return false;
		}
		if(dir > 0 && this.state.translateX>=0){
			translateX = 0;
		}
		if(dir < 0 && Math.abs(this.state.translateX) >= Math.abs(chazhi)){
			translateX = this.state.translateX;
		}
		this.setState({ "translateX" : translateX });
	}
	touchEnd = (event)=>{
		let dir = event.changedTouches[0].pageX - this.touchX, translateX = this.translateX + dir;
		let chazhi = this.state.px - this.clientWidth;
		if(!this.ischao){ 
			return false;
		}
		if(dir > 0 && this.state.translateX>=0){
			translateX = 0;
		}
		if(dir < 0 && Math.abs(this.state.translateX) >= Math.abs(chazhi)){
			translateX = this.state.translateX;
		}
		this.setState({ "translateX" : translateX },()=>{
			this.translateX = translateX;
		});
	}
	showtime=(time)=>{
		return time.split(' ')[0];
	}
	changePlan_id=(event)=>{
		const el = api.closest(event.target ,'li');
		this.props.changeplanid(el.getAttribute('data-planid') ,el.getAttribute('data-selected'));
	}
	showkaoshiname=(id ,index)=>{
		if(this.props.modeselected==7 || this.props.modeselected==2 || this.props.modeselected==10 || this.props.modeselected==8 || this.props.modeselected==3 || this.props.modeselected==11){
			return `已${kaoshi[id]}`; 
		}else{
			if(this.zjl-1!=index){
				return `已${kaoshi[id]}`;
			}else{
				return `待${kaoshi[id]}`;
			}
		}
	}
	setSelected=(id ,index)=>{ 
		if(this.props.modeselected==4){
			return 6; //待面试
		}
		if(this.props.modeselected==1){
			return 1; //待笔试
		}else if(id==0){
			return 2; //已笔试
		}
		if(this.props.modeselected==6){
			return 6; //待面试
		}else if(id==1){
			return 7; //已面试
		}
	}
	render(){
		let style = {
			width : this.state.px + 'px',
			transform : `translate3d(${this.state.translateX}px, 0, 0)`
		}
		return(
			<div className="ratelistbor"
					onTouchStart={this.handleBind}
					onTouchMove={this.handleBind} 
					onTouchEnd={this.handleBind}
			>
				<ul className="ratelist" style={style}>
					<li onClick={this.changePlan_id} data-selected="4">
						<span className={this.props.modeselected==4 ? 'textcolor' : ''}>已投递</span>
						<p>
							<i className={this.props.modeselected==4 ? "icon3 s0 s0on" : "icon3 s0"}></i>
							<label className={this.props.modeselected==4 ? 'right textcolor' : 'right'}>...</label>
						</p>
						<em className={this.props.modeselected==4 ? 'textcolor' : ''}>{this.showtime(this.props.starttime)}</em>
					</li>
					{
						this.zjl ? this.props.zhongjian.map((item ,key)=>{
							return <li onClick={this.changePlan_id} key={key} data-planid={item.plan_id} data-selected={this.setSelected(item.plan_type ,key)}>
										{
											this.props.modeselected==10 || this.props.modeselected==11 || this.props.modeselected==3 || this.props.modeselected==8
											? 
											<div>
												<span>{this.showkaoshiname(item.plan_type ,key)}</span>
												<p>
													<label className="left">...</label>
													<i className={this.zjl-1==key ? item.plan_type==0 ? "icon3 wbs" : "icon3 wms" : 'icon3 s0'}></i>
													<label className="right">...</label>
												</p>
												<em>{this.showtime(item.create_time)}</em>
											</div>
											: 
											<div>
												<span className={this.zjl-1==key ? 'textcolor' : ''}>{this.showkaoshiname(item.plan_type ,key)}</span>
												<p>
													<label className={this.zjl-1==key ? 'left textcolor' : 'left'}>...</label>
													<i className={this.zjl-1==key ? item.plan_type==0 ? "icon3 wbs wbson" : "icon3 wms wmson" : item.plan_type==0 ? "icon3 wbs" : "icon3 wms "}></i>
													<label className={this.zjl-1==key ? 'right textcolor' : 'right'}>...</label>
												</p>
												<em className={this.zjl-1==key ? 'textcolor' : ''}>{this.showtime(item.create_time)}</em>
											</div>
										}
									</li> 
						}) : ''
					}
					{
						this.props.modeselected==10 ?
						<li onClick={this.changePlan_id} data-selected={this.props.modeselected}><span className="textcolor">{ksresult[this.props.op]}</span><p><label className="left textcolor">...</label><i className='icon3 jiely'></i></p><em className="textcolor">{this.showtime(this.props.endtime)}</em></li>
						: this.props.modeselected==11
						? <li onClick={this.changePlan_id} data-selected={this.props.modeselected}><span className="textcolor">{ksresult[this.props.op]}</span><p><label className="left textcolor">...</label><i className='icon3 july'></i></p><em className="textcolor">{this.showtime(this.props.endtime)}</em></li>
						: this.props.endtime!='' 
						? <li onClick={this.changePlan_id} data-selected={this.props.modeselected}><span className="textcolor">{ksresult[this.props.op]}</span><p><label className="left textcolor">...</label><i className={this.props.modeselected==3 ? 'icon3 jbs' : this.props.modeselected==8 ? 'icon3 jms' : ''}></i><label className="left textcolor"></label></p><em className="textcolor">{this.showtime(this.props.endtime)}</em></li> 
						: <li><span></span><p><label className="left">...</label><i className="icon3 s"></i></p><em></em></li>
					}
				</ul>
			</div>
		)
	}
}
export default Ratelist;
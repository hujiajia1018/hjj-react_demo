import React, { Component } from 'react'

class PickerItem extends Component{
	constructor(props){
		super(props);
		this.translateY = 0;
		this.touchY = 0;
		this.liHeight = 35;
		this.animate = false;
		this.currentIndex = 0;

		this.state = {
			translateY : 0,
			marginTop : 0,
			array : this.props.params || []
		}
		this.fixtop = false;
		if(this.props.params.length<=6){
			this.fixtop = this.props.params.length;
		}
	}
	handleBind = (event)=>{
		event.preventDefault();
		if(this.animate) return;
		if(event.type=='touchstart'){
			this.touchStart(event);
		}else if(event.type=='touchmove'){
			this.touchMove(event);
		}else if(event.type=='touchend' || event.type=='touchcancel'){
			this.touchEnd(event);
		}
	}
	checkupdate = (direction ,translateY)=>{ 
		return direction==1 ? 
				(this.liHeight * this.currentIndex - this.liHeight / 2 > -translateY)
				: (this.liHeight * this.currentIndex + this.liHeight / 2 < -translateY);
	}
	updateArray = (direction)=>{
		let money = [].concat(this.state.array) ,cut;
		if(direction == 1){ 
			--this.currentIndex;
			cut = money.splice(0 ,this.state.array.length - 1);
			cut = money.concat(cut); 
		}else{
			++this.currentIndex;
			cut = money.splice(1);
			cut = cut.concat(money);
		}

		this.setState({ "array" : cut ,"marginTop" : this.currentIndex * this.liHeight});
	}
	touchStart = (event)=>{
		event.preventDefault();
		this.touchY = event.targetTouches[0].pageY;
	}
	touchMove = (event)=>{
		event.preventDefault();
		event.stopPropagation();

		let dir = event.targetTouches[0].pageY - this.touchY ,translateY = this.translateY + dir ,direction = dir > 0 ? 1 : -1;// 鼠往上  -1  鼠标往下  1
		
		if(this.checkupdate(direction ,translateY)){
			this.updateArray(direction);
		}

		this.setState({ "translateY" : translateY });
	}
	touchEnd = (event)=>{
		let dir = event.changedTouches[0].pageY - this.touchY, translateY = this.translateY + dir ,direction = dir > 0 ? 1 : -1;
		this.translateY = translateY;
		this.animate = true;

		setTimeout(()=>{
			this.animate = false;
			this.setState({ "translateY" : -this.currentIndex * this.liHeight });

			if(this.fixtop==2){
				this.props.handelSelect(this.props.pickerIndex ,this.state.array[0]);
			}if(this.fixtop==4){
				this.props.handelSelect(this.props.pickerIndex ,this.state.array[2]);
			}else if(this.fixtop!=2 && this.fixtop!=5){
				this.props.handelSelect(this.props.pickerIndex ,this.state.array[4]);
			}
		},200);
	}
	render(){
		let style = {},style2 = {} ,name = 'ul';

		if(this.fixtop==2){
			style = {
				top : '0px',
				marginTop : `${this.state.marginTop}px`,
				transform : `translate3d(0, ${this.state.translateY}px, 0)`
			}
			style2 = {
				height : (this.state.array.length * this.liHeight)+'px',
				overflow : "hidden"
			}
		}else if(this.fixtop==4){
			name = 'ul four'
			style = {
				top : (-1*(Math.floor((this.fixtop-1)/2)* this.liHeight)/20)+'rem',
				marginTop : `${this.state.marginTop}px`,
				transform : `translate3d(0, ${this.state.translateY}px, 0)`
			}
			style2 = {
				transform : 'translate3d(0, '+ ((-1*(Math.floor(this.fixtop/2)* this.liHeight)/20)/2)+'rem' +', 0)',
				height : (this.state.array.length * this.liHeight)+'px',
				overflow : "hidden"
			}
		}else{
			style = {
				marginTop : `${this.state.marginTop}px`,
				transform : `translate3d(0, ${this.state.translateY}px, 0)`
			}
		}
		return (
			<div style={style2}>
				<ul className={name} style={style}
					onTouchStart={this.handleBind} 
					onTouchMove={this.handleBind} 
					onTouchEnd={this.handleBind}
					onTouchCancel={this.handleBind}
					>
					{
						React.Children.map(this.state.array, function (val,key) {
			          		return <li key={key}>{val}</li>;
			        	})
					}
				</ul>
			</div>
		)
	}
}
export default PickerItem
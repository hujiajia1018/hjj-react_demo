import React, { Component } from 'react'
import 'css/detailjob'
import api from 'api/api'

class DetailJob extends Component{
	constructor(props){
		super(props);
		this.userSelectId = this.props.onSlected ? this.props.onSlected : '';
		this.state = {
			secondSelected : Object.keys(this.props.children)[0],
			secondChildren : this.props.children,
			thirdSelected : '',
			thirdChildren : this.props.children[Object.keys(this.props.children)[0]].children
		}
	}
	componentWillUnmount=()=>{
		document.querySelectorAll('body')[0].classList.remove('noscoll');
	}
	componentDidMount = ()=>{
		document.querySelectorAll('body')[0].classList.add('noscoll');
		setTimeout(()=>{
			this.refs.detailjobAnimate.classList.add('detailjobAnimated');
		},50);
	}
	userSelect =(event)=>{
		let el = document.querySelectorAll('.detaillist2 li.active');
		el.length && el[0].classList.remove('active');
		event.target.classList.add('active');
		this.props.handleclose('job' ,[event.target.getAttribute('data-id')] );
	}
	changeCategory = (event)=>{
		document.querySelectorAll('.detaillist1 li.active')[0].classList.remove('active');
		event.target.classList.add('active');
		this.setState({ "thirdChildren" : this.props.children[ event.target.getAttribute('data-id') ].children });
	}
	onmove=(event)=>{
		if(event.target.classList.contains('detailjobAnimate')){
			event.preventDefault();
		}
	}
	closedetail=(event)=>{
		if(!event.target.parentNode.classList.contains('detaillist1')){
			this.props.closedetail();
		}
	}
	render(){
		return (
			<div className="detailjob" onTouchMove={this.onmove} onClick={this.closedetail}>
				<div className="detailjobAnimate" ref="detailjobAnimate">
					<ul className="detaillist2">
						{
							Object.keys(this.state.thirdChildren).map((key)=>{ 
								return (this.userSelectId.includes(key)) ? <li className="active" onClick={this.userSelect} key={key} data-id={key} data-parentid={this.state.thirdChildren[key].parent_id}>{this.state.thirdChildren[key].name}</li>
									: <li onClick={this.userSelect} key={key} data-id={key} data-parentid={this.state.thirdChildren[key].parent_id}>{this.state.thirdChildren[key].name}</li>;
							})
						}
					</ul>
					<ul className="detaillist1">
						{
							Object.keys(this.state.secondChildren).map((key)=>{ 
								return (this.state.secondSelected == key) ? <li className="active" onClick={this.changeCategory} key={key} data-id={key} data-parentid={this.state.secondChildren[key].parent_id}>{this.state.secondChildren[key].name}</li>
									: <li onClick={this.changeCategory} key={key} data-id={key} data-parentid={this.state.secondChildren[key].parent_id}>{this.state.secondChildren[key].name}</li>;
							})
						}
					</ul>
				</div>
			</div>
		)
	}
}

export default DetailJob
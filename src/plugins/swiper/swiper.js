import React, { Component } from 'react'
import Slider from 'react-slick'
import show from 'images/show.jpg'
import './style'

class Swiper extends Component{
	constructor(props){
		super(props);
	}
	shouldComponentUpdate = (nextProps, nextState)=>{
		return false;
	}
	render (){
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 2000,
			initialSlide : 0
		};
		return(
			<Slider {...settings} ref='slider'>
				{
					this.props.imgarry.map((val ,index)=>{
						return <div key={index}><img src={val} /></div>;
					})
				}
			</Slider >
		)
	}
}

export default Swiper;
let stateInit = {
	status : '',
	citylist : []
}

const HotCityList = (state = stateInit ,action) =>{
	switch(action.type){
		case 'HOTCITY_GET_HOTCITYLIST' :
			return Object.assign({}, state, action);
		default : 
			return state;
	}
}

export default HotCityList;
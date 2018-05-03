let stateInit = {
	status : '',
	list : [],
	maxpage : 0,
	page : 1
}

const DeliveryList = (state = stateInit ,action) =>{
	switch(action.type){
		case 'DELIVERY_GET_DELIVERYLIST' :
			return state = {
				status : action.status,
				list : state.list.concat(action.list),
				maxpage : action.maxpage,
				page : action.page
			}
		case 'DELIVERY_CLEAR_DELIVERYLIST' : 
			return state = {
				status : action.status,
				list : action.list,
				maxpage : action.maxpage,
				page : action.page
			}
		default : 
			return state;
	}
}

export default DeliveryList;
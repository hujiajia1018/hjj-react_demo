let Infostate = {
	status : '',
	entInfo : {},
	entDetail : {},
	entPhotoList : [],
	onlive : ''
}

let positionstate = {
	positionstatus : '',
	positionList : []
}

let talkstate = {
	talkstatus : '',
	talkList : []
}

let followstate = {
	follow : ''
}

export const UserFollow = (state = followstate ,action) =>{
	switch(action.type){
		case 'COMPANY_SET_FOLLOW' :
			return Object.assign({}, state, action);
		default : 
			return state;
	}
}

export const CompanyInfo = (state = Infostate ,action) =>{
	switch(action.type){
		case 'COMPANY_GET_COMPANYDETAIL' :
			return Object.assign({}, state, action);
		default : 
			return state;
	}
}

export const CompanyPosition = (state = positionstate ,action) =>{
	switch(action.type){
		case 'COMPANY_GET_STUDENTPOSITION' :
			return Object.assign({}, state, action);
		default : 
			return state;
	}
}

export const CompanyTalk = (state = talkstate ,action) =>{
	switch(action.type){
		case 'COMPANY_GET_TALK' : 
			return Object.assign({}, state, action);
		default : 
			return state;
	}
}
import React from 'react'
import { Route ,IndexRoute } from 'react-router'
import App from '../App'
import PageNotFound from 'component/404'
import Main from 'component/main'
import Picker from 'plugins/picker/index'
import Login from 'component/login'
import Myjob from 'component/aboutmyjob/myjob'
import Company from 'component/company/index'
import ManageMyJob from 'component/aboutmyjob/manage'
import CompanyDetail from 'component/company/companydetail'
import Search from 'component/company/search' 
import SearchResult from 'component/company/searchresult'
import Position from 'component/position/index'
import PositionSearch from 'component/position/search'
import PositionSearchResult from 'component/position/searchresult'
import PositionDetail from 'component/position/positiondetail'
/*import Resume from 'component/personal/index'*/
import Resume from 'component/me/newindex'
import ResumePreview from 'component/personal/resumepreview'
import IndexPage from 'component/indexpage/index'
import SysMessage from 'component/indexpage/sysmessage'
import NoticeDetail from 'component/indexpage/noticedetail'
import PersonMsg from 'component/personal/personmessage'
import Me from 'component/me/index'
import Delivery from 'component/me/delivery'
import Writtentest from 'component/me/writtentest'
import Interviewtest from 'component/me/interviewtest'
import LuYongOffer from 'component/me/luyongoffer'
import MianShiOffer from 'component/me/mianshioffer'
import Offer from 'component/me/offer'
import KaoShiMode from 'component/me/mode'
import MeRelease from 'component/me/merelease'
import OfferLetter from 'component/me/offerletter'
import OfferDetail from 'component/me/luyongdetail'
import InterestPosition from 'component/me/interestposition'
import FollowCompany from 'component/me/followcompany'
import Suggestions from 'component/me/suggestions'
import AddSuggestions from 'component/me/addsuggestions'
import SelectTimem from 'component/me/selecttimem'
import SelectTimew from 'component/me/selecttimew'
import UserTime from 'component/me/usertime'
import AppSetting from 'component/setting/appsetting'
import MySubscription from 'component/social/mysubscription'
import Agreement from 'component/agreement'

import ActivePage1 from 'component/activepage/active1/index' 
/*
import MeMsg from 'component/me/memessage'
import MyFans from 'component/social/myfans' 
import Dynamic from 'component/social/dynamic'
import DynamicDetail from 'component/social/dynamicdetail'
import Creation from 'component/social/creation'
import CreationSocial from 'component/social/creationsocial'
import CreationDetail from 'component/social/creationdetail'
*/

function requireAuth(nextState, replace, next){
	const token = window.localStorage.getItem('token');
	if(!token && nextState.location.pathname!='/login'){
		replace('/login');
		next();
	}else{
		next();
	}
}

/*
<Route path="/myfans" component={MyFans} onEnter={requireAuth}/>
<Route path="/dynamic" component={Dynamic} onEnter={requireAuth}/>
<Route path="/dynamicdetail" component={DynamicDetail} onEnter={requireAuth}/>
<Route path="/creation" component={Creation} onEnter={requireAuth}/>
<Route path="/creationdetail" component={CreationDetail} onEnter={requireAuth}/>
<Route path="/creationsocial" component={CreationSocial} onEnter={requireAuth}/>
<Route path="/memsg" component={MeMsg} onEnter={requireAuth}/>
*/

export default	<Route path="/" component={App}>
					<IndexRoute component={Login} onEnter={requireAuth}/>
					<Route path="/login" component={Login} onEnter={requireAuth}/>
					<Route path="/agreement" component={Agreement}/>
					<Route path="/myjob" component={Myjob} onEnter={requireAuth}/>
					<Route path="/managemyjob" component={ManageMyJob} onEnter={requireAuth}/>
					<Route path="/main" component={Main} onEnter={requireAuth}>
						<IndexRoute component={Position} onEnter={requireAuth}/>
						<Route path="/company" component={Company} onEnter={requireAuth}/>
						<Route path="/position" component={Position} onEnter={requireAuth}/>
						<Route path="/indexpage" component={IndexPage} onEnter={requireAuth}/>
						<Route path="/me" component={Me} onEnter={requireAuth}/>
					</Route>
					<Route path="/search" component={Search} onEnter={requireAuth}/>
					<Route path="/searchresult" component={SearchResult} onEnter={requireAuth}/>
					<Route path="/positionsearch" component={PositionSearch} onEnter={requireAuth}/>
					<Route path="/positionsearchresult" component={PositionSearchResult} onEnter={requireAuth}/>
					<Route path="/companydetail" component={CompanyDetail} onEnter={requireAuth}/>
					<Route path="/positiondetail" component={PositionDetail} onEnter={requireAuth}/>
					<Route path="/resume" component={Resume} onEnter={requireAuth}/>
					<Route path="/resumepreview" component={ResumePreview} onEnter={requireAuth}/>
					<Route path="/personmsg" component={PersonMsg} onEnter={requireAuth}/>
					<Route path="/delivery" component={Delivery} onEnter={requireAuth}/>
					<Route path="/writtentest" component={Writtentest} onEnter={requireAuth}/>
					<Route path="/interviewtest" component={Interviewtest} onEnter={requireAuth}/>
					<Route path="/offer" component={Offer} onEnter={requireAuth}/>
					<Route path="/offerletter" component={OfferLetter} onEnter={requireAuth}/>
					<Route path="/offerdetail" component={OfferDetail} onEnter={requireAuth}/>
					<Route path="/kaoshimode" component={KaoShiMode} onEnter={requireAuth}/>
					<Route path="/merelease" component={MeRelease} onEnter={requireAuth}/>
					<Route path="/mysubscription" component={MySubscription} onEnter={requireAuth}/>
					<Route path="/luyongoffer" component={LuYongOffer} onEnter={requireAuth}/>
					<Route path="/mianshioffer" component={MianShiOffer} onEnter={requireAuth}/>
					<Route path="/interestposition" component={InterestPosition} onEnter={requireAuth}/>
					<Route path="/followcompany" component={FollowCompany} onEnter={requireAuth}/>
					<Route path="/suggestions" component={Suggestions} onEnter={requireAuth}/>
					<Route path="/addsuggestions" component={AddSuggestions} onEnter={requireAuth}/>
					<Route path="/appsetting" component={AppSetting} onEnter={requireAuth}/>
					<Route path="/sysmessage" component={SysMessage} onEnter={requireAuth}/>
					<Route path="/noticedetail" component={NoticeDetail} onEnter={requireAuth}/>
					<Route path="/selecttimem" component={SelectTimem} onEnter={requireAuth}/>
					<Route path="/selecttimew" component={SelectTimew} onEnter={requireAuth}/>
					<Route path="/usertime" component={UserTime} onEnter={requireAuth}/>
					<Route path="/activepage1" component={ActivePage1} onEnter={requireAuth}/>
					<Route path="*" component={PageNotFound} />
				</Route>
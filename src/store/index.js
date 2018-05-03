import { combineReducers } from 'redux'
import UserState from './loginReducer'
import AboutMyJob from './aboutmyjobReducer'
import Company from './companylistReducer'
import Position from './positionlistReducer'
import HotCityList from './hotcitylistReducer'
import SearchCompany from './searchcompanyReducer'
import SearchPositionList from './searchpositionReducer'
import { CompanyInfo ,CompanyPosition ,CompanyTalk ,UserFollow } from './companydetailReducer'
import EducationList from './educationlistReducer'
import WorkList from './worklistReducer'
import CertificateList from './certificatelistReducer'
import Schoollist from './schoollistReducer'
import ProjectList from './projectlistReducer'
import InternShipList from './internshiplistReducer'
import DeliveryList from './deliverylistReducer'

const appliction = combineReducers({
  UserState,
  AboutMyJob,
  Company,
  Position,
  HotCityList,
  SearchPositionList,
  SearchCompany,
  CompanyInfo,
  CompanyPosition,
  CompanyTalk,
  UserFollow,
  EducationList,
  WorkList,
  CertificateList,
  Schoollist,
  ProjectList,
  InternShipList,
  DeliveryList
})

export default appliction
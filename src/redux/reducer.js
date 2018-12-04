const initialState = {
    loggedIn: false,
    isDeveloper: null,
    userID: '',
    name: '',
    title: '',
    overview: '',
    hourlyRate: '',
    portfolio: '',
    skills: '',
    education: '',
    profilePicture: '',
    devEmail: '',
    savedJobs: [],
};


const UPDATE_LOGGED_IN = 'UPDATE_LOGGED_IN';
const UPDATE_IS_DEVELOPER = 'UPDATE_IS_DEVELOPER';
const UPDATE_USER_ID = 'UPDATE_USER_ID';
const UPDATE_NAME = 'UPDATE_NAME';
const UPDATE_TITLE = 'UPDATE_TITLE';
const UPDATE_OVERVIEW = 'UPDATE_OVERVIEW';
const UPDATE_HOURLY_RATE = 'UPDATE_HOURLY_RATE';
const UPDATE_PORTFOLIO = 'UPDATE_PORTFOLIO';
const UPDATE_SKILLS = 'UPDATE_SKILLS';
const UPDATE_EDUCATION = 'UPDATE_EDUCATION';
const UPDATE_PROFILE_PICTURE = 'UPDATE_PROFILE_PICTURE';
const UPDATE_DEV_EMAIL = 'UPDATE_DEV_EMAIL';
const UPDATE_SAVED_JOBS = 'UPDATE_SAVED_JOBS';
const CLEAR_STATE = 'CLEAR_STATE';
const EXAMPLE = 'EXAMPLE';


export default function reducer(state = initialState, action){
    switch (action.type) {
        case UPDATE_LOGGED_IN:
            return {...state, loggedIn: action.payload}
        case UPDATE_IS_DEVELOPER:
            return {...state, isDeveloper: action.payload}
        case UPDATE_USER_ID:
            return {...state, userID: action.payload}
        case UPDATE_NAME:
            return {...state, name: action.payload}
        case UPDATE_TITLE:
            return {...state, title: action.payload}
        case UPDATE_OVERVIEW:
            return {...state, overview: action.payload}
        case UPDATE_HOURLY_RATE:
            return {...state, hourlyRate: action.payload}
        case UPDATE_PORTFOLIO:
            return {...state, portfolio: action.payload}
        case UPDATE_SKILLS:
            return {...state, skills: action.payload}
        case UPDATE_EDUCATION:
            return {...state, education: action.payload}
        case UPDATE_PROFILE_PICTURE:
            return {...state, profilePicture: action.payload}
        case UPDATE_DEV_EMAIL:
            return {...state, devEmail: action.payload}
        case UPDATE_SAVED_JOBS:
            return {...state, savedJobs: action.payload}
        case CLEAR_STATE:
            return {...state, ...action.payload}


        case EXAMPLE:
            return {...state, example: action.payload}
        

        default:
            return state;
    }
}


export function updateLoggedIn(bool){
    return {
        type: UPDATE_LOGGED_IN,
        payload: bool
    }
}
export function updateIsDeveloper(bool){
    return {
        type: UPDATE_IS_DEVELOPER,
        payload: bool
    }
}
export function updateUserID(id){
    return {
        type: UPDATE_USER_ID,
        payload: id
    }
}
export function updateName(name){
    return {
        type: UPDATE_NAME,
        payload: name
    }
}
export function updateTitle(title){
    return {
        type: UPDATE_TITLE,
        payload: title
    }
}
export function updateOverview(overview){
    return {
        type: UPDATE_OVERVIEW,
        payload: overview
    }
}
export function updateHourlyRate(rate){
    return {
        type: UPDATE_HOURLY_RATE,
        payload: rate
    }
}
export function updatePortfolio(portfolio){
    return {
        type: UPDATE_PORTFOLIO,
        payload: portfolio
    }
}
export function updateSkills(skills){
    return {
        type: UPDATE_SKILLS,
        payload: skills
    }
}
export function updateEducation(edu){
    return {
        type: UPDATE_EDUCATION,
        payload: edu
    }
}
export function updateProfilePicture(pic){
    return {
        type: UPDATE_PROFILE_PICTURE,
        payload: pic
    }
}
export function updateDevEmail(email){
    return {
        type: UPDATE_DEV_EMAIL,
        payload: email
    }
}
export function updateSavedJobs(jobs){
    return {
        type: UPDATE_SAVED_JOBS,
        payload: jobs
    }
}
export function clearState(){
    return {
        type: CLEAR_STATE,
        payload: {
            loggedIn: false,
            isDeveloper: null,
            userID: '',
            name: '',
            title: '',
            overview: '',
            hourlyRate: '',
            portfolio: '',
            skills: '',
            education: '',
            profilePicture: '',
            devEmail: '',
            savedJobs: [],
        }
    }
}
export function updateExample(ex){
    return {
        type: EXAMPLE,
        payload: ex
    }
}

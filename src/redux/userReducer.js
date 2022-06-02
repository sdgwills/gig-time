//getting user information and storing it on redux.
//gigs should also include tasks.

const initialState = {
    user_id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    jobTitle: "",
    street: "",
    city: "",
    zip: "",
    _state: "",
    gigs: [],
    taskTime: 0,
    totalGigTime: 0
}

export const USER_INFO = "USER_INFO"
export const LOGOUT = "LOGOUT"
export const TASK_TIME = "TASK_TIME"
export const LOGIN = 'LOGIN'
export const UPDATE_GIGS='UPDATE_GIGS'
export const UPDATE_GIG_TIME = 'UPDATE_GIG_TIME'
export const REFRESH_TOTALGIGTIME = 'REFRESH_TOTALGIGTIME'

export function userInfo(obj) {
    return {
        type: USER_INFO,
        payload: obj
    }
}

export function refreshTotalGigTime(){
    return {
        type: REFRESH_TOTALGIGTIME
    }
}
export function updateGigTime(val) {
    return {
        type: UPDATE_GIG_TIME,
        payload: val
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}

export function updateTaskTime(time) {
    return {
        type: TASK_TIME,
        payload: time
    }
}

export function updateGigs (gigsArray){
    return {
        type: UPDATE_GIGS, 
        payload: gigsArray
    }
} 


export default function reducer(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case USER_INFO:
            return {
                ...state,
                user_id: payload.user.id,
                firstName: payload.user.first_name,
                lastName: payload.user.last_name,
                email: payload.user.email,
                phoneNumber: payload.user.phone_number,
                jobTitle: payload.user.job_title,
                street: payload.user.street,
                city: payload.user.city,
                zip: payload.user.zip,
                _state: payload.user._state,
                gigs: payload.gigs
            }
        case LOGOUT:
            return initialState
        case TASK_TIME:
            return {
                ...state,
                taskTime: payload + state.taskTime
            }

        case UPDATE_GIGS:
            return {
                ...state, 
                gigs: payload
            }
        case UPDATE_GIG_TIME:
            return {
                ...state,
                totalGigTime: state.totalGigTime + payload
            }

        case REFRESH_TOTALGIGTIME:
            return {
                ...state,
                totalGigTime : 0
            }

        default:
            return state
    }
}
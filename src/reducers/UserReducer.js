import cookies from 'react-cookies'

const initState = {
    "user": cookies.load('user')
}

const userReducer = (state=initState, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return {
                ...state,
                "user": action.payload
            }
        case "USER_LOGOUT":
            return {
                ...state,
                "user": null
            }
        default:
            return state
    }
}

export default userReducer
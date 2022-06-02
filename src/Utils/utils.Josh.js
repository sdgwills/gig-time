import axios from "axios"

module.exports = {
    getClient: (id) => {
        return axios.post("/api/clients", {id}).then(res => {
             return res.data
        })
    },
    userInfo(obj) {
        return {
            type: "USERINFO",
            payload: obj
        }
    },
    updateGigTime(val) {
        return {
            type:"UPDATE_GIG_TIME",
            payload: val
        }
    }
}
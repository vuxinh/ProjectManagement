import { GET_ALL_JOB, GET_JOB_WITH_ID, SHOW_HISTORY, ADD_NEW_JOB, UPDATE_JOB, DELETE_JOB, API_CALLING, HANDLE_GET_ALL_JOB_ERROR, HANDLE_GET_ALL_HISTORY_ERROR } from "./types";
import axios from "axios";

export const getAllJob = (id) => dispatch => {
    dispatch({
        type: API_CALLING
    },
        console.log("GETTING_ALL_JOB")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.get("/api/alljob/" + id)
        .then(response => dispatch({
                type: GET_ALL_JOB,
                payload: response.data
            })
        ).catch(function (error) {
            dispatch({
                type: HANDLE_GET_ALL_JOB_ERROR,
                error: error.response.status,
                jobList: []
            })
        })
}

export const getJobWithId = (id) => dispatch => {
    dispatch({
        type: API_CALLING
    },
        console.log("GETTING_JOB_WITH_ID")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.get("/api/job/" + id)
        .then(res => dispatch({
            type: GET_JOB_WITH_ID,
            payload: res.data
        })
    )
}

export const getAllHistory = (id) => dispatch => {
    dispatch({
        type: API_CALLING
    },
        console.log("GETTING_HISTRORY_WITH_ID")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.get("/api/showhistory/" + id)
        .then(res => dispatch({
            type: SHOW_HISTORY,
            payload: res.data
        })
    ).catch(function (error) {
        dispatch({
            type: HANDLE_GET_ALL_HISTORY_ERROR,
            error: error.response.status,
            historyList: []
        })
    })
}

export const addNewJob = (job_group_id, job_name, start_date, end_date) => dispatch => {
    dispatch({
        type: API_CALLING
    },
        console.log("ADDING_NEW_JOB")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.post('/api/job', {
        job_group_id: job_group_id,
        job_name: job_name,
        start_date: start_date,
        end_date: end_date
    }).then(
        res => dispatch({
            type: ADD_NEW_JOB,
            payload: res.data
        })
    )
}

export const updateJobName = (id, name) => dispatch => {
    dispatch({
        type: API_CALLING
    }, console.log("UPDATING_JOB_NAME"))

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.put('/api/job/' + id, {
        job_name: name
    }).then(res => dispatch({
            type: UPDATE_JOB,
            payload: res.data
        })
    )
}

export const updateJobDescription = (id, description) => dispatch => {
    dispatch({
        type: API_CALLING
    }, console.log("UPDATING_JOB_DESCRIPTION"))

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.put('/api/job/' + id, {
        job_description: description
    }).then(res => dispatch({
            type: UPDATE_JOB,
            payload: res.data
        })
    )
}

export const updateJobStartDate = (id, startDate) => dispatch => {
    dispatch({
        type: API_CALLING
    }, console.log("UPDATING_JOB_START_DATE"))

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.put('/api/job/' + id, {
        start_date: startDate
    }).then(res => dispatch({
            type: UPDATE_JOB,
            payload: res.data
        })
    )
}

export const updateJobEndDate = (id, endDate) => dispatch => {
    dispatch({
        type: API_CALLING
    }, console.log("UPDATING_JOB_END_DATE"))

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.put('/api/job/' + id, {
        end_date: endDate 
    }).then(res => dispatch({
            type: UPDATE_JOB,
            payload: res.data
        })
    )
}

export const deleteJob = (id) => dispatch => {
dispatch({
    type: API_CALLING
}, console.log("DELETING_JOB"));

axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
axios.delete('/api/job/' + id).then(res => dispatch({
        type: DELETE_JOB,
        payload: res.data
    })
)
}


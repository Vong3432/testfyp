import axios from 'axios'
import { GET_JOBS, GET_SELF_JOBS, GET_JOB_CATEGORY, GET_APPLYJOB_REQUEST,APPLY_JOB,ADD_JOB, DELETE_JOB, UPDATE_JOB, JOBS_LOADING, GET_APPLYJOBS, DISPLAY_CURRENT_JOB } from './types'
import { tokenConfig } from './authActions'
import { returnErrors } from './errorActions'

export const getCategory = () => dispatch => {    
    axios
        .get('/api/job/getCategory')
        .then( res => 
            dispatch({
                type: GET_JOB_CATEGORY,
                payload: res.data
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const getJobs = () => dispatch => {
    dispatch(setJobsLoading());
    axios
        .get('/api/job/displayjobs')
        .then( res => 
            dispatch({
                type: GET_JOBS,
                payload: res.data
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const getSelfJobs = (id) => dispatch => {
    dispatch(setJobsLoading());
    axios
        .get(`/api/job/displayjobs/${id}`)
        .then( res => 
            dispatch({
                type: GET_SELF_JOBS,
                payload: res.data
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const displayCurrentJobDetail = (id) => (dispatch, getState) => {    
    axios
        .get(`/api/job/displayCurrentJob/${id}`)
        .then( res => 
            dispatch({
                type: DISPLAY_CURRENT_JOB,
                payload: res.data
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const getApplyJobs = () => dispatch => {    
    axios
        .get('/api/job/displayapplyjobs')
        .then( res => 
            dispatch({
                type: GET_APPLYJOBS,
                payload: res.data
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const getApplyJobRequest = (id) => dispatch => {    
    axios
        .get(`/api/job/displayapplyjobsrequest/${id}`)
        .then( res => 
            dispatch({
                type: GET_APPLYJOB_REQUEST,
                payload: res.data
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const approveRequest = (id, UserID) => (dispatch, getState) => {
    axios
        .put(`/api/job/approveCandidate/${id}/${UserID}`, tokenConfig(getState))        
        .then(dispatch(getApplyJobRequest(id)))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status, "APPROVE_FAIL")))
}

export const disApproveRequest = (id, UserID) => (dispatch, getState) => {
    axios
        .put(`/api/job/disapproveCandidate/${id}/${UserID}`, tokenConfig(getState))        
        .then(dispatch(getApplyJobRequest(id)))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status, "DISAPPROVE_FAIL")))
}

export const addJob = item => (dispatch, getState) => {
    axios
        .post('/api/job', item, tokenConfig(getState))        
        .then(dispatch(getJobs()))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status, "ADD_FAIL")))
}

export const applyJob = item => (dispatch, getState) => {
    axios
        .post('/api/job/applyjob', item, tokenConfig(getState))                
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status, "ADD_FAIL")))
}

export const deleteJob = id => (dispatch, getState) => {
    console.log(id)
    axios.delete(`/api/job/deletejob/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_JOB,
                payload: id
            })
        })        
        .then(dispatch(getJobs()))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status, "DELETE_FAIL")))
}

export const updateJob = (id, currentJob) => (dispatch, getState) => {
    console.log(id)
    axios.put(`/api/job/updatejob/${id}`,currentJob, tokenConfig(getState))
        .then(res => {console.log(res.data)
        })
        .then(dispatch(getJobs()))                        
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status, "UPDATE_FAIL")))
}


export const setJobsLoading = () => {
    return {
        type: JOBS_LOADING
    }
}
import { GET_JOBS, ADD_JOB, DELETE_JOB, UPDATE_JOB, JOBS_LOADING } from '../actions/types'

const initialState = {
    jobs: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_JOBS:
            return {
                ...state,
                jobs: action.payload,
                loading: false
            }
        case DELETE_JOB:
            return {
                ...state,
                jobs: state.jobs.filter(job => job.id !== action.payload)
            }
        case ADD_JOB:
            return {
                ...state,
                jobs: [action.payload, ...state.jobs]
            }
        case UPDATE_JOB:
            return {
                ...state,
                jobs: state.jobs.filter(job => job.id !== action.payload.id).push(action.payload)
            }
        case JOBS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}
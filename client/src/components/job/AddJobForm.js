import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addJob, getCategory } from '../../actions/jobActions'
import { clearErrors } from '../../actions/errorActions'
import axios from 'axios'
import PropTypes from 'prop-types'
import { PayPalButton } from "react-paypal-button-v2";
import { useAlert } from 'react-alert'

const AddJob = (props) => {
    const alert = useAlert()

    AddJob.propTypes = {
        job: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        addJob: PropTypes.func.isRequired
    }

    const dispatch = useDispatch()
    const error = useSelector(state => state.error)

    const user = useSelector(state => state.auth.user)
    const jobs = useSelector(state => state.job.jobs)
    const categories = useSelector(state => state.job.category)
    const [isLoading, setIsLoading] = useState(true)
    const [isPayed, setIsPayed] = useState(false)
    const PRICE_PER_DAY = 1;

    useEffect(() => {

        if (isLoading === true)
            dispatch(getCategory())
        setIsLoading(false)
        console.log(categories)
    }, [])

    // state
    const [job, setJob] = useState({
        title: "",
        description: "",
        category: 0,
        type: {

        },
        location: "",
        requirement: "",
        duration: 0,
        salary: 0
    })
    const [step, setStep] = useState(1)
    const [errMsg, setErrMsg] = useState("")
    const [file, setFile] = useState("")
    const [name, setImgName] = useState("")
    const [img, setImg] = useState(null)

    // side-effect
    useEffect(() => {
        console.log(user)
        if (user.category !== "employer") {
            alert("You can't access to this page.")
            window.location.href = "/"
        }
    }, [job])

    // event handler
    const handleChange = e => {
        const { name, value } = e.target;
        dispatch(clearErrors())

        if (name === "image") {
            setImg(URL.createObjectURL(e.target.files[0]))
            setFile(e.target.files[0])
            setImgName(user.id + "-" + e.target.files[0].name)
            console.log("is image")
        }
        else {
            setJob({
                ...job,
                [name]: value
            })
        }

    }

    const onSubmit = () => {
        // e.preventDefault()
        setErrMsg('')        

        if (file) {
            const data = new FormData()
            data.append('file', file)
            axios.post("/api/job/upload", data, {
                // receive two    parameter endpoint url ,form data
            })
                .then(res => { // then print response status
                    console.log(res.statusText)
                    setFile("")
                    setImg(null)
                    setImgName("")
                })
        }        

        if (job.title && job.description && job.location && job.duration >= 0 && job.requirement && job.type && job.category && job.salary >= 0) {
            const newJob = {
                employer_id: user.id,
                name: user.name,
                title: job.title,
                description: job.description,
                requirement: job.requirement,
                type: job.type,
                category: job.category,
                location: job.location,
                salary: job.salary,
                duration: job.duration,
                image: name || ""
            }


            dispatch(addJob(newJob))


            if (error.id === "ADD_FAIL") {
                alert.error('Please make sure you have fill in all information.')
            }

            else
            {
                alert.success('Added successfully.')
                setTimeout(() => window.location.href = "/", 1500)                
            }                
        }
        else {            
            alert.error('Please fill in valid information.')
        }            
    }

    useEffect(() => {
        if (step > 1) {
            window.scrollTo({
                'behavior': 'smooth',
                'left': 0,
                'top': window.scrollY + 400
            })
        }
    }, [step])

    // css
    const activeTab = {
        backgroundColor: "var(--primary-color)",
        color: "#fff"
    }

    const normalTab = {
        backgroundColor: "transparent",
        color: "var(--dark-color)"
    }

    // components
    const step1 = (
        <div className="addjob-form--part mb-3">
            <div className="d-flex flex-column w-100">
                <h4 className="title">Job Information</h4>
                <div id="divider"></div>

                <div className="d-flex flex-row mt-5 my-3 w-100">
                    <img className="small-icon" src={require('../../images/suitcase.svg')} alt="suitcase" />
                    <div className="d-flex flex-column ml-3 w-100">
                        <label htmlFor="title">Job Title</label>
                        <input name="title" value={job.title} onChange={(e) => handleChange(e)} type="text" id="" placeholder="e.g Programmer ..." />
                    </div>
                </div>

                <div className="d-flex flex-row my-3 w-100">
                    <img className="small-icon" src={require('../../images/funds.svg')} alt="funds" />
                    <div className="d-flex flex-column ml-3 w-100">
                        <label htmlFor="salary">Salary</label>
                        <div className="d-flex flex-row align-items-center w-100">
                            <h6 className="mr-3" style={{ fontSize: ".9rem" }}>RM</h6>
                            <input style={{ width: "100%" }} type="text" id="" onChange={e => handleChange(e)} value={job.salary} name="salary" placeholder="3000" />
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-row my-3 w-100">
                    <img className="small-icon" src={require('../../images/location.svg')} alt="location" />
                    <div className="d-flex flex-column ml-3 w-100">
                        <label htmlFor="location">Location</label>
                        <input style={{ width: "100%" }} type="text" id="" onChange={e => handleChange(e)} value={job.location} name="location" placeholder="Johor Bahru" />
                    </div>
                </div>

                <div className="d-flex flex-row my-3 w-100">
                    <img className="small-icon" src={require('../../images/conversation.svg')} alt="conversation" />
                    <div className="d-flex flex-column ml-3 w-100">
                        <label htmlFor="description" className="mb-0">Job Description</label>
                        {/* <strong className="mb-3" style={{color:"var(--danger)", fontSize:".9rem"}}> *Put {"<next>"} as next line</strong> */}
                        <textarea name="description" onChange={(e) => handleChange(e)} id="" placeholder="Some description ...">{job.description}</textarea>
                    </div>
                </div>

                <div className="d-flex flex-row my-3 w-100">
                    <img className="small-icon" src={require('../../images/testing.svg')} alt="testing" />
                    <div className="d-flex flex-column ml-3 w-100">
                        <label htmlFor="requirement" className="mb-0">Job Requirements</label>
                        {/* <strong className="mb-3" style={{color:"var(--danger)", fontSize:".9rem"}}> *Put {"<next>"} as next line</strong> */}
                        <textarea name="requirement" onChange={(e) => handleChange(e)} id="" placeholder="Some description ...">{job.requirement}</textarea>
                    </div>
                </div>

                <div className="d-flex flex-row my-3 w-100">
                    <img className="small-icon" src={require('../../images/category.svg')} alt="category" />
                    <div className="d-flex flex-column ml-3 w-100">
                        <label htmlFor="description">Job Category</label>
                        <select required onChange={(e) => handleChange(e)} name="category" id="category">
                            <option value="">Select category:</option>
                            {categories ? categories.map((i) => <option key={i.ID} value={i.ID}>{i.Value}</option>) : dispatch(getCategory())}
                        </select>
                    </div>
                </div>

                <img src={img} style={{ maxWidth: "100%", maxHeight: "100%", width: "100%", height: "100%", objectFit: "cover" }} />

                <div className="image-upload ml-1 my-3">
                    <label htmlFor="image">
                        <img style={{ width: "3em", height: "3em" }} src={require('../../images/photo.svg')} />
                    </label>

                    <input id="image" accept="image/*" name="image" type="file" style={{ display: "none" }} onChange={e => handleChange(e)} />
                    <small className="ml-2 paragraph">Feel free to upload an image</small>
                </div>

                {(job.title && job.description && job.location && job.category && job.requirement) && (
                    <button onClick={(e) => { e.preventDefault(); setStep(step + 1) }} className="ml-auto mr-0 primary-bg-button" style={{ borderRadius: "0" }}>Next</button>
                )}

            </div>
        </div>
    )

    const step2 = (
        <div className={step >= 2 ? "addjob-form--part mb-3 transition-show" : "transition-hide addjob-form--part mb-3"}>
            <div className="decision--box-container">

                <label className="mb-3" style={{ gridArea: "title" }}>
                    <h4 className="title">Job Type</h4>
                    <div id="divider"></div>
                </label>

                <div className="decision--box" style={job.type.fullTime === "Full Time" ? activeTab : normalTab} onClick={(e) => setJob((prevJob) => ({ ...prevJob, type: { ...prevJob.type, fullTime: "Full Time" } }))}>
                    <h5>Full-Time</h5>
                </div>
                <div className="decision--box" style={job.type.partTime === "Part Time" ? activeTab : normalTab} onClick={(e) => setJob((prevJob) => ({ ...prevJob, type: { ...prevJob.type, partTime: "Part Time" } }))}>
                    <h5>Part-Time</h5>
                </div>
                <div className="decision--box" style={job.type.contract === "Contract" ? activeTab : normalTab} onClick={(e) => setJob((prevJob) => ({ ...prevJob, type: { ...prevJob.type, contract: "Contract" } }))}>
                    <h5>Contract</h5>
                </div>
                <div className="decision--box" style={job.type.commission === "Commission" ? activeTab : normalTab} onClick={(e) => setJob((prevJob) => ({ ...prevJob, type: { ...prevJob.type, commission: "Commission" } }))}>
                    <h5>Commission</h5>
                </div>
                <div className="decision--box" style={job.type.internship === "Internship" ? activeTab : normalTab} onClick={(e) => setJob((prevJob) => ({ ...prevJob, type: { ...prevJob.type, internship: "Internship" } }))}>
                    <h5>Internship</h5>
                </div>

            </div>
            {(job.type) && (
                <div className="d-flex flex-row">
                    <button onClick={(e) => { e.preventDefault(); setJob((prevJob) => ({ ...prevJob, type: {} })) }} className="ml-auto mr-0 mt-3 no-styling-button" style={{ borderRadius: "0" }}>Reset</button>
                    <button onClick={(e) => { e.preventDefault(); setStep(step + 1) }} className="ml-3 mr-0 mt-3 primary-bg-button" style={{ borderRadius: "0" }}>Next</button>
                </div>
            )}
        </div>
    )

    const step3 = (
        <div className={step >= 3 ? "addjob-form--part mb-3 transition-show" : "transition-hide addjob-form--part mb-3"}>
            <div className="d-flex flex-row align-items-center flex-wrap w-100">
                <h4 className="title mr-1">I want to post this job for:</h4>
                <div className="ml-auto d-flex flex-row align-items-center">
                    <input style={{ maxWidth: "80px" }} className="mr-3" type="number" id="" onChange={e => handleChange(e)} name="duration" placeholder="7" />
                    <h6>Days</h6>
                </div>
            </div>

                {(job.duration) ? (
                    <>
                        <small style={{color:"var(--danger)"}}>USD {PRICE_PER_DAY} Per Day</small>
                        <p>Checkout: USD {job.duration * PRICE_PER_DAY}</p>
                        <PayPalButton
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [{
                                        amount: {
                                            currency_code: "USD",
                                            value: job.duration * PRICE_PER_DAY
                                        }
                                    }],
                                    // application_context: {
                                    //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
                                    // }
                                });
                            }}
                            options={{
                                clientId: "AX8ba9UcodHNg-W76ybWHYam3ocKe4J8ZcMaSq1xYzHF9t5XHn57CqTLnx-L2pq_IvIT_uvF6XiDilUf"
                            }}
                            onApprove={(data, actions) => {
                                // Capture the funds from the transaction
                                return actions.order.capture().then(function (details) {
                                    // Show a success message to your buyer
                                    alert.success("Transaction completed by " + details.payer.name.given_name);
                                    onSubmit()
                                    // OPTIONAL: Call your server to save the transaction
                                    return fetch("/paypal-transaction-complete", {
                                        method: "post",
                                        body: JSON.stringify({
                                            orderID: data.orderID
                                        })
                                    });
                                });
                            }}
                        />
                        {/* {isPayed ? <button onClick={(e) => onSubmit(e)} className="ml-auto mr-0 primary-bg-button" style={{ borderRadius: "0" }}>Post</button> : null} */}
                    </>

                ) : ""}
            
        </div>
    )

    return (
        <>
            <form className="form mx-auto" onSubmit={onSubmit} style={{ marginTop: "6em", maxWidth: "80%", marginBottom: "3em" }}>
                {(step >= 1) && step1}
                {(step >= 2) && step2}
                {(step >= 3) && step3}
                {errMsg ? errMsg : null}
            </form>
        </>
    )
}

export default AddJob;

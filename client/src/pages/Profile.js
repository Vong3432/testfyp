import React from 'react'
import Article from '../components/Article'

const Profile = () => {

    const text = "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus."

    return (
        <>
            <section style={{ backgroundColor: "black" }} className="d-flex flex-column justify-content-center">

                {/* user avatar and name */}
                <div className="text-center mt-auto">
                    <img id="avatar" src={require('../images/person.jpg')} alt="avatar" />
                    <h2 className="profile-username mt-2">John Doe</h2>
                </div>

                {/* social media links */}
                <div className="container mt-auto mb-5 text-right" style={{ minHeight: "initial" }}>
                    <i style={{ fontSize: "24px" }} class='fab text-white mr-3'>&#xf09a;</i>
                    <i style={{ fontSize: "24px" }} class='fab text-white'>&#xf16d;</i>
                </div>

            </section>

            <section className="profile-section">
                <div className="profile-grid">

                    {/* About */}
                    <div className="profile--about-container">
                        <h5 className="header">About Me</h5>
                        <p className="paragraph">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>

                        <h5 className="mt-5 header">CV/Resume</h5>

                    </div>

                    {/* Right bar */}
                    <aside className="profile-grid-right">

                        {/* Contact */}
                        <div className="profile--contact-container">

                            {/* Contact title bar */}
                            <div className="d-flex flex-row row-wrap align-content-center">
                                <h5 className="header">contact and personal info</h5>
                                <i className="material-icons ml-auto" style={{ color: "var(--primary-color)", lineHeight: "29.25px" }}>&#xe88f;</i>
                            </div>

                            {/* Email */}
                            <div className="d-flex flex-row mt-3">
                                <img className="small-icon" src={require('../images/email.svg')} alt="email" />
                                <div className="d-flex flex-column ml-2">
                                    <h6 className="small-header">Email</h6>
                                    <small>johndoe@gmail.com</small>
                                </div>
                            </div>

                            {/* Availability */}
                            <div className="d-flex flex-row mt-4">
                                <img className="small-icon" src={require('../images/availability.svg')} alt="availability" />
                                <div className="d-flex flex-column ml-2">
                                    <h6 className="small-header">Availability</h6>
                                    <small>Full-Time/Part-Time</small>
                                </div>
                            </div>

                            {/* Age */}
                            <div className="d-flex flex-row mt-4">
                                <img className="small-icon" src={require('../images/age.svg')} alt="age" />
                                <div className="d-flex flex-column ml-2">
                                    <h6 className="small-header">Age</h6>
                                    <small>30</small>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="d-flex flex-row mt-4">
                                <img className="small-icon" src={require('../images/location.svg')} alt="location" />
                                <div className="d-flex flex-column ml-2">
                                    <h6 className="small-header">Location</h6>
                                    <small>Los Angeles</small>
                                </div>
                            </div>

                        </div>

                        {/* Skills */}
                        <div className="profile--skills-container">
                            <div className="d-flex flex-row row-wrap align-content-center">
                                <h5 className="header">skills</h5>
                                <i className="material-icons ml-auto" style={{ color: "var(--primary-color)", lineHeight: "29.25px" }}>&#xe88f;</i>
                            </div>
                            <div>
                                <span className="mr-1 badge badge-primary">Primary</span>
                                <span className="badge badge-primary">Primary</span>
                            </div>                            
                        </div>

                        {/* Gallery */}
                        <div className="profile--gallery-container">
                            <h5 className="header">Gallery</h5>
                        </div>                        

                    </aside>

                    {/* Article */}
                    <div className="profile--article-container">                                                
                        <Article text={text} />
                        <Article text={text} />
                        <Article text={text} />
                    </div>

                </div>

            </section>

        </>
    )
}

export default Profile
import React from 'react';

const FootTitle = ({text}) => {
    return <h3 className="font-semibold mb-1 text-black text-base">{text}</h3>
}

const Footer = () => {
    return (
        <div className="flex bg-white mt-auto py-10 text-gray-600 text-sm leading-8 flex-wrap md:flex-nowrap px-10">
          <div className="flex flex-col mb-10 mr-10">
            <FootTitle text="About Us" />
            <p className="mb-4">We are a team of nurses, doctors, technologists and executives dedicated to help nurses find jobs that they love</p>
            <small>All copyrights reserved &copy; 2020 - Health Explore</small>
          </div>
          <div className="flex">
            <div className="flex flex-col flex-shrink-0 mr-10">
                <FootTitle text="Sitemap" />
                <a href="#">Nurses</a>
                <a href="#">Employers</a>
                <a href="#">Social Networking</a>
                <a href="#">Jobs</a>
            </div>
            <div className="ml-10 flex flex-col flex-shrink-0">
                <FootTitle text="Privacy" />
                <a href="#">Terms of use</a>
                <a href="#">Privacy policy</a>
                <a href="#">Cookie policy</a>
            </div>
          </div>
        </div>
    );
};

export default Footer;
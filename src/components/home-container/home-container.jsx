import React from "react";

const HomeContainer =() => {
  return (
    <div className = "main-container">
      <div className = "mission-container">
        <h2>Mission/Overview</h2>
        <p>At Hackney Council we believe in the potential of digital technologies to rapidly improve public sector services.
          By unlocking the capabilities of our platforms and developing open standards and APIs,
          we can create an environment for digital innovation to thrive.
        </p>

        <p> That means more digital services designed around the needs of our professionals and general public users.
           Services that offer simple and speedy access to the information and data that matters,
           whenever and wherever it’s needed.
           Cost effective, creative and sustainable solutions that accelerate the digital transformation of Hackney Council.
        </p>

        <p>
        Through co-creation and collaboration, we can quickly overcome the challenges,
        bringing the benefits of digital innovation to more people across the public sector.
        </p>
      </div>

      <div className="info-wrapper">
        <div className = "info-container">
          <h2>The need of a Developer Hub</h2>
          <p>As an Organization we want to ensure that our  APIs  are modern, easy to access and easy to use.
            We want to provide the following:
          </p>
          <ul>
            <li>Clear documentation</li>
            <li>Accessible test environments</li>
            <li>A simple onboarding process</li>
            <li>Good quality help and support to our users</li>
          </ul>
        <p>Hackney Council’s aim as an organisation is to make integration easier -
          for everyone who wants to connect to our platforms and services.
          Whether you’re already using our APIs, or want to connect for the very first time,
          The developers Hub came as a solution to make that journey easier and faster for all our users.
        </p>
        </div>

        <div className = "info-container">
          <h2>API Specifications</h2>
          <p>The Hackney API Developer Hub will provide information and instructions on:
            <ul>
              <li>What APIs are</li>
              <li>Why might you need an API?</li>
              <li>How to create APIs according to the HackIt API playbook</li>
              <li>What the API platform is</li>
              <li>A list of the available APIs</li>
            </ul>
          </p>

          <h3><b>Why might you need an API? </b></h3>
          <ul>
            <li>Sharing your data - Secure, structured and real-time access to data can be provided by an API</li>
            <li>Data integrity - Providing a single source of data in the same format means more consistency across different systems</li>
            <li>Integrations - APIs can provide links between different back end systems</li>

          </ul>

        </div>

        <div className = "info-container">
          <h2> Our Ways of Working</h2>
          <p> All HackIT developed code should meet the <a href= "https://github.com/LBHackney-IT/Hackney-Development-Standards">12 Hackney Development Standards.</a> <br/><br/>
            These 12 factors (albeit in an adapted or extended form) are used by many development teams around the world
            to ensure that HackIT APIs are consistent,supportable and of high quality.<br/><br/>
          All newly created HackIT APIs will be developed using the guidelines in the <a href="https://playbook.hackney.gov.uk/API-Playbook/">HackIt API playboook.</a> <br/><br/>
            It provides clear guidance on the standards that are being followed when developing new APIs
            and is also used whenever amending old APIs which were created prior to the existence of the Playbook. <br/><br/>
            Both of these guides are constantly evolving over time alongside technological changes.</p>
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;

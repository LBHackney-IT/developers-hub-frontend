import React from 'react';

export const HomePage1 = () => {
  return (
    <div id="mission" className="main-container">
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

        <h2>Vision</h2>
        <div>
        <ul>
          <li> To have a source of truth for all APIs at HackIT </li>
          <li> To prevent duplication between APIs, hence allows all APIs to be consistent and reusable </li>
          <li> To integrate with Swagger to provide swagger definition within our Developer Hub </li>
          <li> To provide detailed information for each of the APIs we have at HackIT </li>
        </ul>
        </div>
    </div>
  );
};

export const HomePage2 = () => {
  return (
    <div id="need-of-dev-hub" className="main-container">
      <h2>The need of a Developer Hub</h2><br/>

    <h3> As a Developer</h3>
        <ul>
          <li>As a developer I would like consistency between the developer hub and swagger so that any changes to the APIs can be reflected straight away. </li>
          <li>As a developer I want a way to easily find APIs so that I can use these APIs effectively as well as stay up to date with any changes that might come up .</li>
          <li>As a developer I need to make sure that access to the APIs  is secure so that only authorised users can make requests to Hackney APIs.</li>
          <li>As a developer I would like to see what APIs are available at HackIT to be used so that I can choose the ones I need for the service development.</li>
          <li>As a developer I would like to build and reuse the Organisations APIs so that development efforts can focus on other requirements </li>
          <li>As a user I can log in with my google account associated with Hackney, so that my identity can easily be verified and my permissions can be managed effectively and efficiently. </li>
        </ul>

      <h3>As a Service User </h3>
        <ul>
          <li> I want the ability to view the details of the results returned in a search so that I can easily look through the different results and make the correct selection.</li>
          <li>I want to be able to register for the application by entering my name, email address, my password and confirming my password so that I can feel secure. </li>
          <li>As a user I can log in into the application by entering my email and chosen password  so that I can feel my account is being secure </li>
          <li>As a user I can reset my password if i have forgotten my password </li>
          <li>As a user I can see my personal information and the APIs used on my profile </li>
          <li>I can edit my details such as the email address so that I can continue using the same account </li>
          <li>As a service user I would like to see the list of APIs available in the catalogue so that I can make an informed decision for the product development.</li>
        </ul>

        <h3>As an Application Support Analyst</h3>
          <ul>
            <li>As an application support analyst, I would like to know what endpoints and functionality an API has, so that I can familiarise myself with the types of support requests I may get.</li>
            <li> I need to understand the queries being used by the Developers Hub  so that I can deal with support requests accordingly and resolve the potential issues in the underlying data.</li>
          </ul>

          <h3>As a Data Analyst</h3>
            <ul>
              <li>I need to connect to the API so that data is easy to interpret and available for further reporting purposes and analysis.</li>
              <li>As a user, I would like to see Data in a format that's structured e.g. csv or JSON, so that I can easily manipulate the data.</li>
              <li>I would like to have data in a format that can be linked into programmes such as Tableau or Qlik sense so that I can create reports and data visualisation</li>
            </ul>

          <h3>As a Solution Architect</h3>
            <ul>
              <li>As a solution architect I would like to view all APIs available at HackIT so that I can ensure that they are consistent with HackIT development standards. </li>
              <li>As a solution architect I would like to view all APIs and endpoints available at HackIT so that I can reuse APIs across many projects. </li>
              <li>As a solution architect, I would like to ensure that the data shown in mock APIs is placeholder data in line with GDPR compliance, so that sensitive data is not compromised. </li>
            </ul>

          <h3> As a QA Analyst</h3>
            <ul>
              <li>As a tester I would like to view use cases so that I can test the required functionality. </li>
              <li>As at tester I would like to view all API Endpoints so that I can complete thorough E2E testing. </li>
              <li>I would like to be able to view all existing APIs and endpoints to ensure the final product of the API I am testing meets the organisation standards. </li>
          </ul>

          <h3>As a Cyber Silver Member</h3>
            <ul>
              <li>As a member of Cyber Silver, I would like to ensure nobody can access live data through the APIs without being registered and logged in, so that cybersecurity is not compromised. </li>
            </ul>

          <h3> As a Product Owner</h3>
            <ul>
              <li>As a product owner, I want to confirm that the data from an API is correct, based on the business area understanding of the wider team and any prior discovery work completed.</li>
            </ul>
    </div>
  );
};

export const HomePage3 = () => {
  return (
    <div id="api-specifications" className="main-container">
      <h2>API Specifications </h2>
      <br/>
        <a href = "https://playbook.hackney.gov.uk/api-specifications/ ">You can find our API Specification Playbook here</a>
        <br/><br/>

    <h3>Why you might need an API?</h3>
        <br/>
      <ul>
        <li>Sharing your data - Secure, structured and real-time access to data can be provided by an API. </li>
        <li>Data integrity - Providing a single source of data in the same format means more consistency across different systems. </li>
        <li>Integrations - APIs can provide links between different back end systems. </li>
      </ul>
    </div>
  );
};

export const HomePage4 = () => {
  return (
    <div id="ways-of-working" className="main-container">
        <h2> Our Ways of Working</h2>

        <p>All HackIT developed code should meet the <a href= "https://github.com/LBHackney-IT/Hackney-Development-Standards">12 Hackney Development Standards.</a>
           Our Team ensures that HackIT APIs are consistent,supportable and of high quality at all times.</p>

         <p>All newly created HackIT APIs will be developed using the guidelines in the HackIt API playbook.
            It provides clear guidance on the standards that are being followed when developing new APIs
            and is also used whenever amending old APIs that were created prior to the existence of the Playbook.
            Both of these guides are constantly evolving over time alongside technological changes.</p>
    </div>
  );
};

export const HomePage5 = () => {
  return (
    <div id="api-authentication" className='main-container'>
      <h2> Api Authentication </h2>

      <p>Authentication involves identifying/verifying who is requesting access to your api whilst authorization is determining the degree of access that is available for the user, i.e. verifying what specific files, applications, data the user can access.</p>
      
      <p>When a consumer makes a request to an API, Each consumer should provide their access token in an Authorization header when making a request. Our custom lambda authorizer will take this token and will validate and decrypt it. The lambda authorizer will retrieve information about the token from the database and compare this data with the API request information.</p>
      <p>A second authentication flow that we have implemented was produced for internal staff members. This solution leverages Google SSO as it enables users to log in to the Google hackney domain and generates a JWT following a successful login, which would be used on internal-facing Hackney services that also include their group information. 
      This solution maps the API name along with the allowed Google groups for it. After the token is successfully validated and the data from it is read (email and Google groups the user belongs to), the Lambda function assumes the LBH_Api_Gateway_Allow_GET IAM role in the account, where the API is deployed. This is so the API ID received as part of the request can be mapped to the actual API name.
      </p>
      <p>We would like to reuse the auth token set by the frontend authentication flow when users are signing in by passing it to a custom Lambda authorizer and using the information stored within the token for authentication purposes. The Lambda authorizer then queries DynamoDB to check if a record for the given API exists. If yes, the Google groups allowed to access the API are retrieved. The authorizer will then check what Google Group the client is in and verify if they’re in one of the allowed groups. Once the user/client has been authenticated, authorization can be handled at the API level to ensure the user/client has access to the requested resource. An AWS IAM policy statement is returned indicating whether the request was authorized or not, and then depending on the result either the requested Lambda resource is called or the client gets an unauthorized response.</p>

    </div>
  )
};

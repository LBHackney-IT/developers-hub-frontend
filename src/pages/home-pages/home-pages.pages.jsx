import React from "react";
import arn from "../../assets/arn.png";
import apiflow from "../../assets/apiflow.png";
import ssogroups from "../../assets/ssogroups.png";
import MyCollapsible from "../../components/accordion/accordion.jsx";
import PinchZoomPan from "react-responsive-pinch-zoom-pan";


export const HomePage1 = () => {
  return (
    <div id="mission" className="main-container">
      <h2>Mission/Overview</h2>
      <p>
        At Hackney Council we believe in the potential of digital technologies
        to rapidly improve public sector services. By unlocking the capabilities
        of our platforms and developing open standards and APIs, we can create
        an environment for digital innovation to thrive.
      </p>

      <p>
        {" "}
        That means more digital services designed around the needs of our
        professionals and general public users. Services that offer simple and
        speedy access to the information and data that matters, whenever and
        wherever it’s needed. Cost effective, creative and sustainable solutions
        that accelerate the digital transformation of Hackney Council.
      </p>

      <p>
        Through co-creation and collaboration, we can quickly overcome the
        challenges, bringing the benefits of digital innovation to more people
        across the public sector.
      </p>

      <h2>Vision</h2>
      <div>
        <ul>
          <li> To have a source of truth for all APIs at HackIT </li>
          <li>
            {" "}
            To prevent duplication between APIs, hence allows all APIs to be
            consistent and reusable{" "}
          </li>
          <li>
            {" "}
            To integrate with Swagger to provide swagger definition within our
            Developer Hub{" "}
          </li>
          <li>
            {" "}
            To provide detailed information for each of the APIs we have at
            HackIT{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};

export const HomePage2 = () => {
  return (
    <div className="main-container" id='user-needs'>
      <h2>The Need of a Developer Hub</h2>
      <MyCollapsible title='As a Developer, I would like to'>
        <ul>
          <li>Have consistency between the Developer hub and swagger hub so that any changes to the APIs can be reflected straight away. </li>
          <li>Easily find APIs so that I can use these APIs effectively as well as stay up to date with any changes that may occur.</li>
          <li>Ensure that access to the APIs is secure so that only authorised users can make requests to Hackney APIs.</li>
          <li>View what APIs are available at HackIT so that I can choose the ones I need for the service development.</li>
          <li>Build and reuse the Platform APIs so that development efforts can focus on other requirements.</li>
          <li>Log in with my google account associated with Hackney so that my identity can easily be verified and my permissions can be managed effectively and efficiently.</li>
        </ul>
      </MyCollapsible>
      <MyCollapsible title='As a Service Designer, I would like to'>
        <ul>
          <li> View the details of the results returned in a search so that I can easily look through the different results and make the correct selection.</li>
          <li>Log in to the application by providing my Hackney email address so that I can feel my account is secure.</li>
          <li>View the list of APIs available in the API catalogue so that I can make an informed decision for product development.</li>
        </ul>
      </MyCollapsible>
      <MyCollapsible title='As an Application Support Analyst, I would like to'>
        <ul>
          <li>Have a service where I can view what endpoints and functionality an API has so that I can familiarise myself with the types of support requests I may get.</li>
          <li>Understand the queries being used by the Developers Hub so that I can deal with support requests accordingly and resolve the potential issues in the underlying data.</li>
        </ul>
      </MyCollapsible>
      <MyCollapsible title='As a Data Analyst, I would like to'>
        <ul>
          <li>Connect to the API so that data is easy to interpret and available for further reporting purposes and analysis.</li>
          <li>View data in a format that's structured e.g. CSV or JSON, so that I can easily manipulate the data.</li>
          <li>Have data in a format that can be linked to programs such as Tableau or Qlik sense so that I can create reports and data visualisation.</li>
        </ul>
      </MyCollapsible>
      <MyCollapsible title='As a Solution Architect, I would like to'>
        <ul>
          <li>Connect to the API so that data is easy to interpret and available for further reporting purposes and analysis.</li>
          <li>View data in a format that's structured e.g. CSV or JSON, so that I can easily manipulate the data.</li>
          <li>Have data in a format that can be linked to programs such as Tableau or Qlik sense so that I can create reports and data visualisation.</li>
        </ul>
      </MyCollapsible>
      <MyCollapsible title='As a Quality Assurance Analyst, I would like to'>
        <ul>
          <li>View use cases so that I can test the required functionality.</li>
          <li>View all API Endpoints so that I can complete thorough End-to-End testing.</li>
          <li>View all existing APIs and endpoints to ensure the final product of the API I am testing meets the organisation standards.</li>
        </ul>
      </MyCollapsible>
      <MyCollapsible title='As a Technical Design Authority member, I would like to'>
        <ul>
          <li>Ensure nobody can access live data through the APIs without being registered and logged in so that cybersecurity is not compromised.</li>
        </ul>
      </MyCollapsible>
      <MyCollapsible title='As a Product Owner, I would like to'>
        <ul>
          <li>Confirm that the data from an API is correct, based on the business area understanding of the wider team and any prior discovery work completed.</li>
        </ul>
      </MyCollapsible>
    </div>
  );
};

export const HomePage3 = () => {
  return (
    <div id="api-specifications" className="main-container">
      <h2>API Specifications </h2>
      <br />
      <a href="https://playbook.hackney.gov.uk/api-specifications/ ">
        You can find our API Specification Playbook here
      </a>
      <br />
      <br />

      <h3>Why you might need an API?</h3>
      <br />
      <ul>
        <li>
          Sharing your data - Secure, structured and real-time access to data
          can be provided by an API.{" "}
        </li>
        <li>
          Data integrity - Providing a single source of data in the same format
          means more consistency across different systems.{" "}
        </li>
        <li>
          Integrations - APIs can provide links between different back end
          systems.{" "}
        </li>
      </ul>
    </div>
  );
};

export const HomePage4 = () => {
  return (
    <div id="ways-of-working" className="main-container">
      <h2> Our Ways of Working</h2>

      <p>
        All HackIT developed code should meet the{" "}
        <a href="https://github.com/LBHackney-IT/Hackney-Development-Standards">
          12 Hackney Development Standards.
        </a>
        Our Team ensures that HackIT APIs are consistent,supportable and of high
        quality at all times.
      </p>

      <p>
        All newly created HackIT APIs will be developed using the guidelines in
        the HackIt API playbook. It provides clear guidance on the standards
        that are being followed when developing new APIs and is also used
        whenever amending old APIs that were created prior to the existence of
        the Playbook. Both of these guides are constantly evolving over time
        alongside technological changes.
      </p>
    </div>
  );
};

export const HomePage5 = () => {

   return (
    <div id="api-authentication" className="main-container">
      <h2> API Authentication </h2>
      <h3> What is API Authentication?</h3>
      <p>
        Authentication involves verifying who is requesting access to your API
      </p>
      <p>
        {" "}
        Authorization involves determining the degree of access that is
        available for the user. i.e. verifying what specific files,
        applications, data the user can access.
      </p>
</div>
);
};

export const HomePage6 = () => {
  return (
    <div id="how-the-authentication-works" className="main-container">
      <h2>How the API Authentication process works </h2>
      <h3>Zoom</h3>
      <PinchZoomPan  maxScale={4} containerRatio={((400 / 600) * 100)}>
        <img src={apiflow} alt="" className="center"
          style={{
        margin: 'auto',
        width: '100%',
        height: 'auto'
      }}
          ></img>
      </PinchZoomPan>

        <p>
          When a consumer makes a request to an API, the consumer provide their
          JWT access token in the authorization header of the request. Our
          custom lambda authorizer will take this token and will validate and
          decrypt it. The lambda authorizer will retrieve information about the
          token from the database and compare this data with the API request
          information which would be used on internal-facing Hackney services
          that also include their group information.
          The lambda authorizor is configured to map the API
          name along with the allowed Google groups for it. After the token is
          successfully validated and the data from it is read (email and Google
          groups the user belongs to), the Lambda function assumes the
          LBH_Api_Gateway_Allow_GET IAM role in the account, where the API is
          deployed. This is so the API ID received as part of the request can be
          mapped to the actual API name.
        </p>

      <p>
        We would like to reuse the auth token set by the frontend authentication
        flow when users are signing in by passing it to a custom Lambda
        authorizer and using the information stored within the token for
        authentication purposes. The Lambda authorizer then queries DynamoDB to
        check if a record for the given API exists. If yes, the Google groups
        allowed to access the API are retrieved. The authorizer will then check
        what Google Group the client is in and verify if they’re in one of the
        allowed groups. Once the user/client has been authenticated,
        authorization can be handled at the API level to ensure the user/client
        has access to the requested resource. An AWS IAM policy statement is
        returned indicating whether the request was authorized or not, and then
        depending on the result either the requested Lambda resource is called
        or the client gets an unauthorized response.
      </p>
      <p>
        Implementing authorization this way requires a bit more development work
        since this authorization layer introduces logic responsible for
        determining which parts/subsets/fields of data from a given data domain
        a user should have access to. For example, we envision that all notes
        recorded by multiple service areas will be saved within the same data
        store and served by the same microservice, but the microservice must
        have a mechanism to filter and return only data that a user should have
        access to
      </p>
      <p>
        {" "}
        For example : If a user is a housing officer, they should not be able to see
        notes generated by social care. However, an advantage of this is that it
        removes the necessity to manage API keys in the infrastructure.
        Furthermore, this business is empowered to manage their own resources
        and determine who has access to them which gives them more flexibility.
      </p>
    </div>

  );
};

export const HomePage7 = () => {
  return (
    <div id="setting-up-api-authenticator" className="main-container">
      <h2> How to set up your API Authenticator </h2>
      <h4> Adding the authenticator to serverless</h4>
      <p>
        To add the Lambda Authorizer to serverless you would need to call it in
        the serverless.yml file
      </p>
      <img src={arn} alt="" className="center"></img>
      <p>
        The API authenticator arn must be included since it links to the
        api-authenticator lambda function which would require anyone calling the
        API to provide a JWT token that would only be accepted if the user is in
        any of the allowed Google Groups. The method type which is ”request”
        and the identity source is the method.request.header.authorization, which
        is where the tokens will be read from.
      </p>
    </div>
  );
};

export const HomePage8 = () => {
  return (
    <div id="how-to-amend-acess-to-an-api" className="main-container">
      <h2> How to amend access to your API</h2>
      <h4>How to Set Up the API Authenticator for your API</h4>
      <p> To allow a certain Google group to access an API: </p>
      <ul>
        <li>
          {" "}
          1. Find the entry for your API and amend the ‘allowedGroups’ property
        </li>
        <li> 2. If an entry doesn’t exist, create one</li>
      </ul>
      <ul>
        <li>
          {" "}
          3. Go to the respective API account, where the API authenticator is
          deployed
        </li>
        <li> 4. Go to DynamoDB</li>
        <li>
          {" "}
          5. Open the ‘APIAuthenticatorData’ table and locate the record you
          wish to amend
        </li>
        <li> 6. Click on the record to edit and switch to ‘Text’ view</li>
      </ul>
      <img src={ssogroups} alt="" className="center"></img>
      <ul>
        <li>
          {" "}
          7. Amend the ‘allowedGroups’ list by adding/removing the name of the
          Google group{" "}
        </li>
      </ul>
      <h2>Example scenario:</h2>
      <ul>
        <li>
          {" "}
          1. User A is logged into the Manage a tenancy service and has opened a
          page to view details about a tenant, which includes a component that
          displays notes regarding the tenant.
        </li>
        <li>
          {" "}
          2.The front end makes a request to ‘GET /api/v1/notes?personId=XXXXX’
          and passes the auth token generated during Google auth step{" "}
        </li>
        <li>
          {" "}
          3. The Lambda authorizer gets called, verifies the token and ensures
          that the user A is in a Google group that has access to the Notes API.
          If yes, it checks the field containing query parameters and includes
          them in the output of the function.
        </li>
        <li>
          {" "}
          4. If access is allowed, the API gets called with the additional query
          parameters appended (e.g. excludeSource=socialCare ){" "}
        </li>
        <li>
          {" "}
          5. The API retrieves all notes for the given tenant, apart from the
          ones with ‘source=SocialCare’ and returns the data{" "}
        </li>
      </ul>
      <p>
        Going forward we have a new standard for authentication to authenticate
        our API.
      </p>
    </div>
  );
};

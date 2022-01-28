import React from "react";
import Error from "../../components/error/error.component";

const NotFoundPage = () => {
  return (
    <main className="lbh-main-wrapper" id="404-page" role="main">
      <div className="lbh-container">
        <Error  
          summary="404: Page not Found" 
          className="secondary"
        />
      </div>
    </main>
  );
};

export default NotFoundPage;

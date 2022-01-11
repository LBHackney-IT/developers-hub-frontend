import { React } from "react";
import Skeleton from 'react-loading-skeleton';

const ApiInformationLink = ({linkText, url}) => {
    if(!linkText && !url){
        return(
            <Skeleton />
        )
    } else if(!url){
        return(
            <p>{linkText} (TBC)</p>
        );
    } else {
        return(
            <a className="lbh-link lbh-link--no-visited-state" href={url}>
                {linkText}
            </a>
        );
    };
    
};

export default ApiInformationLink;
import React from "react";

const ApplicationsTable = ({tableData}) => {

    const table = [];
    tableData.forEach(row => {
        table.push(<div key={row} className="govuk-summary-list__row">
        {row.map((cellContent, index) => {
            if(index === 0){
                return <dd key={index} className="govuk-summary-list__key">{cellContent}</dd>
            } else {
                return <dt key={index} className="govuk-summary-list__actions">{cellContent}</dt>
            }
        })}
        </div>);
    });

    return (

        <dl className="govuk-summary-list lbh-summary-list">
            {table}
        </dl>

    );
};

export default ApplicationsTable;

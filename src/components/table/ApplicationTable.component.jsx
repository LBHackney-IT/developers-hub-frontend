import React from "react";

const ApplicationTable = ({tableData}) => {

    const table = [];
    tableData.forEach(row => {
        table.push(<tr key={row} className="govuk-table__row">
        {row.map((cellContent, index) => {
            if(index === 0){
                return <th key={index} scope="row" className="govuk-table__header">{cellContent}</th>
            } else {
                return <td key={index} className="govuk-table__cell govuk-table__cell--numeric">{cellContent}</td>
            }
        })}
        </tr>);
    });

    return (
    <table className="govuk-table lbh-table">
        <tbody className="govuk-table__body">
            {table}
        </tbody>
    </table>
    );
};

export default ApplicationTable;

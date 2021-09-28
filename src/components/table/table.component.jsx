import React from "react";
import Linkify from "react-linkify";

const Table = ({tableData}) => {

    const table = [];
    tableData.forEach(row => {
        table.push(<tr key={row} className="govuk-table__row">
        {row.map((cellContent, index) => {
            if(index === 0){
                return <th key={index} scope="row" className="govuk-table__header">{cellContent}</th>
            } else {
                return <td key={index} className="govuk-table__cell"><Linkify>{cellContent}</Linkify></td>
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

export default Table;

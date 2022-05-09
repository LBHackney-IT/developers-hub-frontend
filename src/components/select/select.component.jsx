import { React } from "react";
import Skeleton from 'react-loading-skeleton';

const Select = ({ name, label, options, onChange, selectedOption}) => {
    if (options){

        const updateSelection = (selection) => {
            onChange(selection);
        }

        return(
            <div className="govuk-form-group lbh-form-group">
                { label &&
                    <label className="govuk-label lbh-label" htmlFor={name}>
                        {label}
                    </label>
                }
                <select 
                    className="govuk-select lbh-select" 
                    id={name} name={name} 
                    onChange={(e) => updateSelection(e.target.value)}
                >
                    {options.map(option =>
                        <option 
                        key={option} 
                        value={option}
                        selected={option === selectedOption}
                        >
                            {option}
                        </option>
                    )}
                </select>
            </div>
        );
    } else {
        return(<Skeleton />);
    }
}

export default Select;
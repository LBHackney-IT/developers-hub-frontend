const Select = ({name, label, options, onChange, selectedOption}) => {

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
                defaultValue={ options.length > 1 && options.filter(option => option === selectedOption)[0]}
            >
                {options.map( option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
  );
}

export default Select;
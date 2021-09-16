const Select = ({name, label, options, onChange}) => {

    const updateSelection = (selection) => {
        onChange(selection);
    }

    return(
        <div className="govuk-form-group lbh-form-group">
            { label &&
                <label className="govuk-label lbh-label" for={name}>
                    Label text goes here
                </label>
            }
            <select className="govuk-select lbh-select" id={name} name={name} onChange={(e) => updateSelection(e.target.value)}>
                {
                    options.map( option => (
                        <option key={option} value={option}>{option}</option>
                    ))
                }
            </select>
        </div>
  );
}

export default Select;
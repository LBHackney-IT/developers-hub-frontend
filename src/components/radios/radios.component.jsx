import React from "react";

class Radios extends React.Component {
    setValue(event) {
        this.props.onChange(event.target.value);
    }

    render(){
        const radios = [];
        this.props.values.forEach((radioValue, index) => {
            const radio = (
                <div className="govuk-radios__item" key={index}>
                    <input
                        className="govuk-radios__input"
                        id={this.props.formName+"-"+index}
                        name={this.props.formName}
                        type="radio"
                        value={radioValue}
                        defaultChecked={index === 0}
                    />
                    <label className="govuk-label govuk-radios__label" htmlFor={this.props.formName+"-"+index}>
                        {radioValue}
                    </label>
                </div>
            );
            radios.push(radio);
        });

        return(
            <div className="govuk-form-group lbh-form-group">
                <fieldset className="govuk-fieldset">
                    <legend className="govuk-fieldset__legend">{this.props.legend}</legend>
                    <div className="govuk-radios govuk-radios--small govuk-radios--inline lbh-radios" onChange={this.setValue.bind(this)}>
                        {radios}
                    </div>
                </fieldset>
            </div>
        );
    }
}

export default Radios;
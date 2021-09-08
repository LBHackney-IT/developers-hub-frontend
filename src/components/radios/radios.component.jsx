import React from "react";

class Radios extends React.Component {
    setValue(event) {
        var newApiFilter = ""
        if(event.target.value === "All APIs"){
            newApiFilter = "ALL";
        } else if(event.target.value === "Active APIs") {
            newApiFilter = "PUBLISHED";
        } else {
            newApiFilter = "UNPUBLISHED";
        }
        this.props.onChange(newApiFilter);
    }

    render(){
        return(
            <div className="govuk-form-group lbh-form-group">
                <fieldset className="govuk-fieldset">
                    <legend className="govuk-fieldset__legend">{this.props.legend}</legend>
                    <div className="govuk-radios govuk-radios--small govuk-radios--inline lbh-radios" onChange={this.setValue.bind(this)}>
                        <div className="govuk-radios__item">
                            <input
                                className="govuk-radios__input"
                                id={this.props.formName+"-1"}
                                name={this.props.formName}
                                type="radio"
                                value={this.props.values[0]}
                                defaultChecked
                            />
                            <label className="govuk-label govuk-radios__label" htmlFor={this.props.formName+"-1"}>
                                {this.props.values[0]}
                            </label>
                        </div>
                        <div className="govuk-radios__item">
                            <input
                                className="govuk-radios__input"
                                id={this.props.formName+"-2"}
                                name={this.props.formName}
                                type="radio"
                                value={this.props.values[1]}
                            />
                            <label className="govuk-label govuk-radios__label" htmlFor={this.props.formName+"-2"}>
                                {this.props.values[1]}
                            </label>
                        </div>
                        <div className="govuk-radios__item">
                            <input
                                className="govuk-radios__input"
                                id={this.props.formName+"-3"}
                                name={this.props.formName}
                                type="radio"
                                value={this.props.values[2]}
                            />
                            <label className="govuk-label govuk-radios__label" htmlFor={this.props.formName+"-3"}>
                                {this.props.values[2]}
                            </label>
                        </div>
                    </div>
                </fieldset>
            </div>
        );
    }
}

export default Radios;
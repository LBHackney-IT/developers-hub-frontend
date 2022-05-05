import React, { useState } from "react"

import Dialog from "./dialog.component"

const CancelDialog = ({backLink}) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                className="govuk-button govuk-secondary lbh-button lbh-button--secondary"
            >
                Cancel<span className="govuk-visually-hidden"> application</span>
            </button>

            <Dialog
                title="Are you sure?"
                isOpen={open}
                onDismiss={() => setOpen(false)}
            >
                <p className="lbh-body">
                    You are about to revert the changes you have made.<br/>
                </p>
                <div className="lbh-dialog__actions">
                    <a
                        href={backLink}
                        className="govuk-button lbh-button"
                    >
                        Yes, revert
                    </a>

                    <button
                        onClick={() => setOpen(false)}
                        className="lbh-link lbh-link--no-visited-state"
                    >
                        No, cancel
                    </button>
                </div>
            </Dialog>
        </>
    )
}

export default CancelDialog;
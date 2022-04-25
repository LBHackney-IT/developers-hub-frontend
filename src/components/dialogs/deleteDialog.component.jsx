import React, { useState } from "react"
import { useParams } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";
import Error from "../../components/error/error.component";

import Dialog from "./dialog.component"
import Announcement from '../announcement/announcement.component';

const DeleteDialog = ({addAnnouncement, deleteApplication, applicationName}) => {
    const [open, setOpen] = useState(false)
    const { apiId } = useParams();
    const apiUrl = `${process.env.REACT_APP_API_URL || `http://${window.location.hostname}:8000/api/v1`}/${apiId}`

    const onConfirmDelete = () => {
        axios.delete(`${apiUrl}/${applicationName}`,
            { headers: { 'Authorization': Cookies.get('hackneyToken') }
            }).then(() => {
              const announcement = <Announcement title="Deletion successful!">
                  You have successfully removed <b className='lbh-body lbh-!-font-weight-bold'>{applicationName}</b> from this API.
              </Announcement>

              addAnnouncement(announcement);
              deleteApplication(applicationName);
              setOpen(false);
                })
                .catch((error) => {
                  const deleteError = <Error title="Oops! Something went wrong when deleting this application!" summary={error.message} />
                    addAnnouncement(deleteError);
                  });
                };


    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                className="lbh-link lbh-link--no-visited-state delete-link"
            >
                Delete<span className="govuk-visually-hidden"> application</span>
            </button>

            <Dialog
                title="Are you sure?"
                isOpen={open}
                onDismiss={() => setOpen(false)}
            >
                <p className="lbh-body">
                    You are about to permanently remove <b className='lbh-body lbh-!-font-weight-bold'>{applicationName}</b> from this API.<br/>
                </p>
                <div className="lbh-dialog__actions">
                    <button
                        onClick={onConfirmDelete}
                        className="govuk-button lbh-button"
                    >
                        Yes, remove
                    </button>

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

export default DeleteDialog

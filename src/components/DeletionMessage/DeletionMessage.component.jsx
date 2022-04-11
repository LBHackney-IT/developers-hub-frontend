import React from 'react';

export default function DeletionMessage() {
    return (
        <section class="lbh-page-announcement lbh-page-announcement--warning">
            <h3 class="lbh-page-announcement__title">Warning!</h3>
                <div class="lbh-page-announcement__content">
                 You are about to permanently delete Manage My Home. Press ‘Save’ to confirm, otherwise press ‘Cancel’.
                </div>
        </section>
    )
}
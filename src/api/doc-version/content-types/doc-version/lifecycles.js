
// lifecycle functions

const { ProcessRecords } = require("../process_records");

module.exports = {
    async afterUpdate(data) {


        // console.log("received doc version after update data", data);

        data = data?.result;

        await strapi.entityService
            .findOne("api::doc-version.doc-version", data?.id, {
                populate: {
                    parentDocument: {
                        populate: {
                            levelVersions: true
                        }
                    },
                    file: true
                }
            })
            .then(async (result) => {


                if (ProcessRecords.fileProcesses?.some(target => target?.versionId === result?.id && target?.fileId === result?.file?.id && target?.signed === result?.signed && target?.rejectionMessage === result?.rejectionMessage)) {
                    console.log("prevented falling into infinite version after update hook");
                } else {
                    //  console.log("doc version data after update  here", result);

                    /**
                     * 
                     * the document update lifecycle function already handles rejections ans notifs
                     * 
                     */

                    ProcessRecords.appendFProcesses({
                        versionId: result?.id, fileId: result?.file?.id, signed: result?.signed, rejectionMessage: result?.rejectionMessage
                    })

                    await strapi.entityService.update("api::document.document", result?.parentDocument?.id, {
                        data: data?.signed ? { validationLevel: data?.level } : {}
                    }).then(() => {
                        console.log("successfully updated document validation level");
                    }).catch(error => {
                        console.log("an error has occured on version update", error);
                    });

                }
            })
            .catch((error) => {
                console.log(
                    "an error has has occured when getting doc version details data in after update",
                    error
                );
            });

    },

    async afterCreate(event) {
        const { params, result } = event;

        // console.log("after version create data", result);

        if (result?.level === 2) {
            // dumy update for triggering notifications

            await strapi.entityService
                .findOne("api::doc-version.doc-version", result?.id, {
                    populate: {
                        parentDocument: {
                            populate: {
                                levelVersions: true
                            }
                        },
                        file: true
                    }
                })
                .then(async (result) => {

                    await strapi.entityService.update("api::document.document", result?.parentDocument?.id, {
                        data: {}
                    }).then(() => {
                        console.log("performed dummy document upadate for notification");
                    }).catch(error => {
                        console.log("an error has occured on dummy update", error);
                    });
                })

        }
    }
}

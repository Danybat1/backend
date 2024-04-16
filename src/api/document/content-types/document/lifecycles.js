// lifecycle methods definition

const { version } = require("uuid");
const { OnlineUsers } = require("../../../../io/online");
const { IOServer } = require("../../../../io/server");
const {
  ProcessRecords,
} = require("../../../doc-version/content-types/process_records");

const notifTemplate = `

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<html lang="en">

  <head data-id="__react-email-head"></head>

  <body data-id="__react-email-body" style="background-color:#ffffff;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
    <table align="center" width="100%" data-id="__react-email-container" role="presentation" cellSpacing="0" cellPadding="0" border="0" style="max-width:37.5em;background-color:#ffffff;border:1px solid #eee;border-radius:5px;box-shadow:0 5px 10px rgba(20,50,70,.2);margin-top:20px;width:360px;margin:0 auto;padding:68px 1rem 70px">
      <tbody>
        <tr style="width:100%">
          <td><img data-id="react-email-img" alt="Plaid" src="https://easysign.rhinocerosoftware.co/images/logo.png" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" />
            <p data-id="react-email-text" style="font-size:11px;line-height:16px;margin:16px 8px 8px 8px;color:#0a85ea;font-weight:700;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;height:16px;letter-spacing:0;text-transform:uppercase;text-align:center">Nouveau document</p>
            <h1 data-id="react-email-heading" style="color:#000;display:inline-block;font-family:HelveticaNeue-Medium,Helvetica,Arial,sans-serif;font-size:16px;font-weight:300;line-height:20px;margin-bottom:0;margin-top:0;text-align:center">Mme / Mr <b>{{customerName}}</b>, votre collègue <b>{{author}}</b> a demandé votre signature pour le document <b>{{documentName}}</b></h1>
            <table align="center" width="100%" data-id="react-email-section" style="background:#d8f7c6;border-radius:4px;margin:16px auto 14px;vertical-align:middle;width:280px" border="0" cellPadding="0" cellSpacing="0" role="presentation">
              <tbody>
                <tr>
                  <td>
                    <a style="text-decoration:none;" href="https://easysign.rhinocerosoftware.co"><p data-id="react-email-text" style="font-size:24px;line-height:40px;margin:0 auto;color:#478722;display:inline-block;font-family:HelveticaNeue-Bold;font-weight:700;letter-spacing:6px;padding-bottom:8px;padding-top:8px;width:100%;text-align:center">Je signe</p></a>
                  </td>
                </tr>
              </tbody>
            </table>
            <p data-id="react-email-text" style="font-size:12px;line-height:1rem;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center;margin-top:1rem">Votre application de gestion des signatures</p>
            <p data-id="react-email-text" style="font-size:12px;line-height:1rem;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center;margin-top:1rem">Notre site web <a href="https://rhinocerosoftware.co" data-id="react-email-link" target="_blank" style="color:#444;text-decoration:underline">https://www.linzaka.com</a></p>
          </td>
        </tr>
      </tbody>
    </table>
    <p data-id="react-email-text" style="font-size:12px;line-height:23px;margin:0;color:#000;font-weight:800;letter-spacing:0;margin-top:20px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;text-align:center;text-transform:uppercase">© ${new Date()?.getFullYear()} LINZAKA SOLUTION</p>
  </body>

</html>
`;

const rejectionTemplate = `

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<html lang="en">

  <head data-id="__react-email-head"></head>

  <body data-id="__react-email-body" style="background-color:#ffffff;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
    <table align="center" width="100%" data-id="__react-email-container" role="presentation" cellSpacing="0" cellPadding="0" border="0" style="max-width:37.5em;background-color:#ffffff;border:1px solid #eee;border-radius:5px;box-shadow:0 5px 10px rgba(20,50,70,.2);margin-top:20px;width:360px;margin:0 auto;padding:68px 1rem 70px">
      <tbody>
        <tr style="width:100%">
        <td><img data-id="react-email-img" alt="Plaid" src="https://easysign.rhinocerosoftware.co/images/logo.png" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" />
            <p data-id="react-email-text" style="font-size:11px;line-height:16px;margin:16px 8px 8px 8px;color:#0a85ea;font-weight:700;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;height:16px;letter-spacing:0;text-transform:uppercase;text-align:center">Document rejeté</p>
            <h1 data-id="react-email-heading" style="color:#000;display:inline-block;font-family:HelveticaNeue-Medium,Helvetica,Arial,sans-serif;font-size:16px;font-weight:300;line-height:20px;margin-bottom:0;margin-top:0;text-align:center">Mme / Mr <b>{{rejectorName}}</b>, votre collègue <b>{{authorName}}</b> a rejété votre document <b>{{documentName}} </b>pour motif <b>{{rejectionMessage}}</b>.</h1>
            <table align="center" width="100%" data-id="react-email-section" style="background:#d8f7c6;border-radius:4px;margin:16px auto 14px;vertical-align:middle;width:280px" border="0" cellPadding="0" cellSpacing="0" role="presentation">
              <tbody>
                <tr>
                  <td>
                    <a style="text-decoration:none;" href="https://easysign.rhinocerosoftware.co"><p data-id="react-email-text" style="font-size:24px;line-height:40px;margin:0 auto;color:#478722;display:inline-block;font-family:HelveticaNeue-Bold;font-weight:700;letter-spacing:6px;padding-bottom:8px;padding-top:8px;width:100%;text-align:center">Document réjéte</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p data-id="react-email-text" style="font-size:12px;line-height:1rem;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center;margin-top:1rem">Votre application de gestion des signatures</p>
            <p data-id="react-email-text" style="font-size:12px;line-height:1rem;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center;margin-top:1rem">Notre site web <a href="https://rhinocerosoftware.co" data-id="react-email-link" target="_blank" style="color:#444;text-decoration:underline">https://rhinocerosoftware.co</a></p>
            
          </td>
        </tr>
      </tbody>
    </table>
    <p data-id="react-email-text" style="font-size:12px;line-height:23px;margin:0;color:#000;font-weight:800;letter-spacing:0;margin-top:20px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;text-align:center;text-transform:uppercase">© ${new Date()?.getFullYear()} Rhinoceros Software SAS</p>
  </body>

</html>
`;

const confirmTemplate = `

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<html lang="en">

  <head data-id="__react-email-head"></head>

  <body data-id="__react-email-body" style="background-color:#ffffff;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
    <table align="center" width="100%" data-id="__react-email-container" role="presentation" cellSpacing="0" cellPadding="0" border="0" style="max-width:37.5em;background-color:#ffffff;border:1px solid #eee;border-radius:5px;box-shadow:0 5px 10px rgba(20,50,70,.2);margin-top:20px;width:360px;margin:0 auto;padding:68px 1rem 70px">
      <tbody>
        <tr style="width:100%">
        <td><img data-id="react-email-img" alt="Plaid" src="https://easysign.rhinocerosoftware.co/images/logo.png" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" />
            <p data-id="react-email-text" style="font-size:11px;line-height:16px;margin:16px 8px 8px 8px;color:#0a85ea;font-weight:700;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;height:16px;letter-spacing:0;text-transform:uppercase;text-align:center">Signatures complétées</p>
            <h1 data-id="react-email-heading" style="color:#000;display:inline-block;font-family:HelveticaNeue-Medium,Helvetica,Arial,sans-serif;font-size:16px;font-weight:300;line-height:20px;margin-bottom:0;margin-top:0;text-align:center">Mme / Mr <b>{{customerName}}</b>, votre document <b>{{documentName}}</b> vient d'obtenir toutes les signatures demandées</h1>
            <table align="center" width="100%" data-id="react-email-section" style="background:#d8f7c6;border-radius:4px;margin:16px auto 14px;vertical-align:middle;width:280px" border="0" cellPadding="0" cellSpacing="0" role="presentation">
              <tbody>
                <tr>
                  <td>
                   <a href="https://api.easysign.rhinocerosoftware.co{{filePath}}"><p data-id="react-email-text" style="font-size:24px;line-height:40px;margin:0 auto;color:#478722;display:inline-block;font-family:HelveticaNeue-Bold;font-weight:700;letter-spacing:6px;padding-bottom:8px;padding-top:8px;width:100%;text-align:center">Télécharger le document</p></a>
                  </td>
                </tr>
              </tbody>
            </table>
            <p data-id="react-email-text" style="font-size:12px;line-height:1rem;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center;margin-top:1rem">Votre application de gestion des signatures</p>
            <p data-id="react-email-text" style="font-size:12px;line-height:1rem;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center;margin-top:1rem">Notre site web <a href="https://rhinocerosoftware.co" data-id="react-email-link" target="_blank" style="color:#444;text-decoration:underline">https://rhinocerosoftware.co</a></p>
          </td>
        </tr>
      </tbody>
    </table>
    <p data-id="react-email-text" style="font-size:12px;line-height:23px;margin:0;color:#000;font-weight:800;letter-spacing:0;margin-top:20px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;text-align:center;text-transform:uppercase">© ${new Date()?.getFullYear()} Rhinoceros Software SAS</p>
  </body>

</html>
`;

module.exports = {
  async afterCreate(event) {
    const { params, result } = event;

    console.log("created document object", result);

    let nextSigner = {};

    let author = {};
    let recipients = [];

    let annexesCompleted = true;

    let isAnnex = false;

    await strapi.entityService
      .findOne("api::document.document", result?.id, {
        populate: {
          levelVersions: {
            populate: {
              author: {
                department: true,
              },
            },
            filters: {
              acceptNotifications: {
                $eq: true,
              },
            },
          },
          annexOf: {},
        },
      })
      .then((result) => {
        // console.log("document data in create  here", result);

        if (result?.annexOf) {
          isAnnex = true;
        } else {
          author = result?.levelVersions?.find((_target) => {
            return _target?.level === 1;
          })?.author;

          nextSigner = result?.levelVersions?.find((_target) => {
            return _target?.level === 2;
          })?.author;

          annexesCompleted = result?.annexesCompleted;
        }
      })
      .catch((error) => {
        console.log(
          "an error has has occured when getting document details data",
          error
        );
      });

    // console.log("next signer and author data in after create document", nextSigner, author);

    if (!isAnnex && annexesCompleted) {
      strapi.plugins["email"].services?.email
        .send({
          to: nextSigner?.email,
          subject: "VOTRE SIGNATURE EST DEMANDEE",
          text: `Madame, Monsieur,  \n ${nextSigner?.username}, nous venons vous informer que votre collègue Mme/Mr ${author?.username} a demandé votre signature pour le document ${result?.title} \n Cordialement\n Linzaka Tool`,
          html: notifTemplate
            ?.replaceAll("{{customerName}}", nextSigner?.username)
            ?.replaceAll("{{author}}", author?.username)
            ?.replaceAll("{{documentName}}", result?.title),
        })
        .then((results) => {
          console.log("sent email successfully", results?.response);

          return;
        })
        .catch((error) => {
          console.log(
            "an error has occured when trying to get send email",
            error
          );

          return;
        });
    }
  },

  async afterUpdate(event) {
    const { params, result } = event;

    const currentDocId = params?.where?.id;

    let nextSigner = {};

    let author = {};
    let signatories = [];
    let rejectorMan = {};

    let rejectionMessage = "";
    let isAnnex = false;

    let versions = [];

    let docData = {};

    await strapi.entityService
      .findOne("api::document.document", result?.id, {
        populate: {
          levelVersions: {
            populate: ["author", "file"],
            filters: {
              acceptNotifications: {
                $eq: true,
              },
            },
          },
          annexOf: {},
        },
      })
      .then((result) => {
        // console.log("document data in after update  here", result);

        if (result?.annexOf) {
          isAnnex = true;
        } else {
          docData = result;

          versions = result?.levelVersions;

          author = result?.levelVersions?.find((_target) => {
            return _target?.level === 1;
          })?.author;

          signatories = result?.levelVersions
            ?.filter((_target) => {
              return _target?.signed === true;
            })
            ?.map((target) => target?.author);

          nextSigner = result?.levelVersions?.find((_target) => {
            return _target?.level === result?.validationLevel + 1;
          })?.author;

          rejectorMan = result?.levelVersions?.find((_target) => {
            if (_target?.rejectionMessage?.length > 0) {
              rejectionMessage = _target?.rejectionMessage;

              return true;
            }

            return false;
          })?.author;
        }
      })
      .catch((error) => {
        console.log(
          "an error has has occured when getting document details data",
          error
        );
      });

    if (!isAnnex && docData?.annexesCompleted === true) {
      console.log("document relations data gotten", {
        //   author,
        //   nextSigner,
        signatories,
        rejectorMan,
      });

      if (
        false &&
        ProcessRecords.docUpdates?.some(
          (target) =>
            target?.id === docData?.id &&
            docData?.levelVersions?.every(
              (_target, id) =>
                _target?.signed === target?.versions[id]?.signed &&
                _target?.rejectionMessage ===
                  target?.versions[id]?.rejectionMessage
            )
        )
      ) {
        console.log(
          "prevented duplicate notifications loop",
          ProcessRecords.docUpdates
        );
      } else {
        ProcessRecords.appendDocUpdates({
          id: docData?.id,
          versions: docData?.levelVersions?.map((target) => {
            return {
              rejectionMessage: target?.rejectionMessage,
              signed: target?.signed,
            };
          }),
        });

        if (rejectorMan) {
          await Promise.allSettled(
            signatories?.map((target) => {
              IOServer?.io
                .to(OnlineUsers.getOne(target?.id?.toString())?.socket)
                ?.emit("DOC_REJECTION", {
                  documentName: result?.title,
                  rejectorName: rejectorMan?.username,
                  rejectionMessage: rejectionMessage,
                  department: author?.department?.name,
                });

              return strapi.plugins["email"].services?.email
                .send({
                  to: target?.email,
                  subject: "DOCUMENT REJETE",
                  text: `Madame, Monsieur,  \n ${target?.username}, nous venons vous informer que votre document ${result?.title} vient d'être rejété par votre collègue Mr/Mme ${rejectorMan?.username} \n Cordialement\n Linzaka Tool`,
                  html: rejectionTemplate
                    ?.replaceAll("{{rejectorName}}", rejectorMan?.username)
                    ?.replaceAll("{{authorName}}", author?.username)
                    ?.replaceAll("{{documentName}}", result?.title)
                    ?.replaceAll("{{rejectionMessage}}", rejectionMessage),
                })
                .then((results) => {
                  console.log("sent email successfully", results?.response);

                  return;
                })
                .catch((error) => {
                  console.log(
                    "an error has occured when trying to get send email",
                    error
                  );

                  return;
                });
            })
          )
            .then((status) => {
              console.log(
                "broadcasted email notifications to previous signatories",
                status
              );
            })
            .catch((error) => {
              console.log(
                "an error has occured when sending notifications",
                error
              );
            });
        } else {
          if (
            versions?.every((_target) => _target?.signed) &&
            versions?.length > 1
          ) {
            const downloadFilePath = versions?.find((target) => {
              return target?.level === result?.validationLevel;
            })?.file?.url;

            IOServer?.io
              .to(OnlineUsers.getOne(author?.id)?.socket)
              ?.emit("DOC_COMPLETION", {
                documentName: result?.title,
                department: author?.department?.name,
              });

            console.log(
              "will send all notifications event",
              OnlineUsers.getAll()
            );

            strapi.plugins["email"].services?.email
              .send({
                to: author?.email,
                subject: "SIGNATURES COMPLETES",
                text: `Madame, Monsieur,  \n ${author?.username}, nous venons vous informer que votre document ${result?.title} a obtenu toutes les validations demandées. \n Cordialement\n Linzaka Tool`,
                html: confirmTemplate
                  ?.replaceAll("{{customerName}}", author?.username)
                  ?.replaceAll("{{documentName}}", result?.title)
                  ?.replaceAll("{{filePath}}", downloadFilePath),
              })
              .then((results) => {
                console.log("sent email successfully", results?.response);

                return;
              })
              .catch((error) => {
                console.log(
                  "an error has occured when trying to get send email",
                  error
                );

                return;
              });
          } else if (nextSigner) {
            IOServer?.io
              .to(OnlineUsers.getOne(nextSigner?.id)?.socket)
              ?.emit("DOC_SIGNATURE", {
                documentName: result?.title,
                authorName: author?.username,
                department: author?.department?.name,
              });

            strapi.plugins["email"].services?.email
              .send({
                to: nextSigner?.email,
                subject: "VOTRE SIGNATURE EST DEMANDEE",
                text: `Madame, Monsieur,  \n ${nextSigner?.username}, nous venons vous informer que votre collègue Mme/Mr ${author?.username} a demandé votre signature pour le document ${result?.title} \n Cordialement\n Linzaka Tool`,
                html: notifTemplate
                  ?.replaceAll("{{customerName}}", nextSigner?.username)
                  ?.replaceAll("{{author}}", author?.username)
                  ?.replaceAll("{{documentName}}", result?.title),
              })
              .then((results) => {
                console.log("sent email successfully", results?.response);

                return;
              })
              .catch((error) => {
                console.log(
                  "an error has occured when trying to get send email",
                  error
                );

                return;
              });
          } else {
            console.log("didn't find any match for after update notifs");
          }
        }
      }
    } else {
      console.log(
        "no notification will be triggered since document is annex or document's annexes are not completed yet"
      );
    }
  },
};

"use strict";

const path = require("path");
const fs = require("fs").promises;

const libre = require("libreoffice-convert");
libre.convertAsync = require("util").promisify(libre.convert);

// controller defintion
module.exports = {
  async index(ctx, next) {
    let processed = false;

    console.log("recived file parameters for conversion", ctx?.request?.body);

    const wordFilePath = path.join(
      process.cwd(),
      "public",
      ctx?.request?.body?.data?.filePath
    );

    const outputFile = wordFilePath
      ?.replace(".docx", ".pdf")
      ?.replace(".doc", ".pdf");

    console.log("received data for file convert", { outputFile, wordFilePath });

    // libre office logic

    const docxBuf = await fs.readFile(wordFilePath);

    const targetExt = ".pdf";

    // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
    let pdfBuf = await libre.convertAsync(docxBuf, targetExt, undefined);

    // Here in done you have pdf file which you can save or transfer in another stream
    await fs
      .writeFile(outputFile, pdfBuf)
      .then((data) => {
        console.log("converted successfully the provided doc file to pdf");

        processed = true;
      })
      .catch((error) => {
        console.log("an error has occured on converting file to pdf", error);
      });

    console.log("will respond with data", { processed });

    if (processed) {
      ctx.status = 200;

      ctx.body = {
        code: 200,
        pdfFilePath: outputFile
          ?.split(process.cwd())[1]
          ?.replace("/public", ""),
      };
    } else {
      ctx.status = 400;

      ctx.body = {
        code: 400,
        message: "an error should have been happened",
      };
    }
  },
};

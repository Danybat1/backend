"use strict";

const path = require("path");
const fs = require("fs").promises;
const blockingFs = require("fs");

const archiver = require("archiver");

// controller defintion
module.exports = {
  async index(ctx, next) {
    let processed = false;

    const fileName =
      Date.now()?.toString() +
      ctx?.request?.body?.data?.preferredName?.toString() +
      ".zip";
    const filesToCompress = ctx?.request?.body?.data?.filesToCompress;

    console.log("received data for file compression", {
      filesToCompress,
      fileName,
    });

    const outputPath = path.join(process.cwd(), "public", fileName);

    console.log("computed output path", { outputPath });

    // create a file to stream archive data to.
    const output = blockingFs.createWriteStream(outputPath);

    const archive = archiver("zip", {
      zlib: { level: 0 }, // Sets the compression level.
    });

    let zipChunks = [];

    const compress = new Promise((resolve, reject) => {
      // listen for all archive data to be written
      // 'close' event is fired only when a file descriptor is involved
      output.on("close", function () {
        console.log("listened end event of commpress end");

        const zipReadStream = blockingFs.createReadStream(outputPath);

        new Promise((resolve, reject) => {
          zipReadStream.on("data", (chunk) => {
            // console.log("received compressed data chunk", chunk);

            zipChunks.push(chunk);
          });

          zipReadStream.on("end", () => {
            resolve();
          });

          zipReadStream.on("error", (error) => {
            console.log("an error has occured when reding zip file", error);

            reject({ message: error });
          });
        })
          .then(() => {
            resolve({ processed: true });
          })
          .catch((error) => {
            reject(error?.message?.toString());
          });
      });

      // This event is fired when the data source is drained no matter what was the data source.
      // It is not part of this library but rather from the NodeJS Stream API.
      // @see: https://nodejs.org/api/stream.html#stream_event_end
      output.on("end", function () {
        // data transferred

        console.log("listened end event of commpress end");
      });

      // good practice to catch warnings (ie stat failures and other non-blocking errors)
      archive.on("warning", function (err) {
        if (err.code === "ENOENT") {
          // log warning

          console.log("listened a warning event into archive", err);
        } else {
          // throw error
          ctx.status = 400;

          ctx.body = {
            code: 400,
            errorMessage: "an error should have been happened",
          };
        }
      });

      // good practice to catch this error explicitly
      archive.on("error", function (err) {
        reject({ message: err });
      });
    });

    archive.pipe(output);

    filesToCompress?.forEach((filePath) => {
      const _path = path.join(process.cwd(), "public", filePath);

      console.log("full path", _path);

      archive?.file(_path, {
        name: filePath?.split("/")?.slice(-1)[0],
      });
    });

    await archive.finalize().catch((error) => {
      console.log("an error has occured when finalizing archive", error);
    });

    await compress
      .then((status) => {
        if (status?.processed) {
          ctx.status = 200;

          console.log("successfully compressed files", status);

          // unlink the created zip file
          fs.unlink(outputPath)
            .then(() => {
              console.log("successfully removed the created zip file");
            })
            .catch((error) => {
              console.log("an error has occured when unlink zip");
            });

          // data transferred
          ctx.status = 200;

          ctx.body = Buffer.concat(zipChunks);
        } else {
          ctx.status = 400;

          ctx.body = {
            code: 400,
            errorMessage: "an error should have been happened",
          };
        }
      })
      .catch((error) => {
        console.log(
          "an error has occured when compressing files",
          error?.message
        );

        ctx.status = 400;

        ctx.body = {
          code: 400,
          errorMessage: "an error should have been happened",
        };
      });
  },
};

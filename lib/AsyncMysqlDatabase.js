require("dotenv").config();
const mysql2 = require("mysql2");

const fs = require("fs");

class AsyncMysqlDatabase {
  constructor(config) {
    this.connection = mysql2.createConnection(config);
  }
  connect() {
    return new Promise((resolve, reject) => {
      this.connection.connect(err => {
        if (err) {
          reject(err);
        }
        resolve(this.connection.threadId);
      });
    });
  }
  async seedFrom(filePath) {
    const commands = await this.loadSeedCommandsFrom(filePath);

    for (let i = 0; i < commands.length; ++i) {
      try {
        await this.query(commands[i]);
      } catch (e) {
        console.error("error running seed command: " + JSON.stringify(e));
      }
    }
  }

  loadSeedCommandsFrom(filePath) {
    return new Promise((resolve, reject) => {
      // I use the stream interface to avoid loading the entire file into
      // memory at once which could be quite bad on arbitrarily large files
      const readStream = fs.createReadStream(filePath, "utf8");
      const sqlCommandQueue = [];
      const finalPartialLine = "";

      readStream
        .on("data", chunk => {
          chunk = finalPartialLine + chunk;
          const lines = chunk.split("\n");
          // TODO fix this to give me data chunks that are split arbitrarily.
          // For now, I'll pretend it is safe to assume that chunks DO NOT
          // split lines
          let newCommand = "";
          for (let i = 0; i < lines.length; ++i) {
            const line = lines[i];
            if (line.startsWith("##")) {
              continue;
            }
            newCommand += line;

            if (newCommand.endsWith(";")) {
              sqlCommandQueue.push(newCommand);
              newCommand = "";
            }
          }
        })
        .on("end", () => {
          if (finalPartialLine) {
            sqlCommandQueue.push(finalPartialLine);
          }

          resolve(sqlCommandQueue);
        })
        .on("error", error => {
          reject(error);
        });
    });
  }
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }
}

module.exports = AsyncMysqlDatabase;

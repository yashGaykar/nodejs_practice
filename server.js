const http = require("http");
const app = require("./app");

const { allDefinitions } = require("./api/jobs/definitions/index");
const agenda =require("./api/jobs/index")


const port = process.env.PORT || 3000;

const server = http.createServer(app);

// defice the jobs
allDefinitions(agenda);

server.listen(port, () => {
	console.log(`The server is started at port ${port}`);
});

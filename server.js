const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const bodyParser = require("body-parser");
const incidentRouter = require("./routers/routes/incident");
const attachmentRouter = require("./routers/routes/attachment");
const impactedIssuesRouter = require("./routers/routes/impactedIssue");
const incidentImpactedIssueRouter = require("./routers/routes/incidentImpactedIssue");
const commentRouter = require("./routers/routes/comment");
const userRouter = require("./routers/routes/users");
const activityLogRouter = require("./routers/routes/activityLog");
const responderRouter = require("./routers/routes/responder");
const updatesRouter = require("./routers/routes/updates");
const replayRouter = require("./routers/routes/replay");

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb" }));
app.use(cors({ origin: "*" }));
app.use("/incident", incidentRouter);
app.use("/attachment", attachmentRouter);
app.use("/impactedIssues", impactedIssuesRouter);
app.use("/incidentImpactedIssue", incidentImpactedIssueRouter);
app.use("/comment", commentRouter);
app.use("/user", userRouter);
app.use("/activityLog", activityLogRouter);
app.use("/responder", responderRouter);
app.use("/updates", updatesRouter);
app.use("/replay", replayRouter);
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server run on http://localhost:${port}`);
  // await sequelize.sync({ force: true });
});

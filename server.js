const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const incidentRouter = require("./routers/routes/incident");
const attachmentRouter = require("./routers/routes/attachment");
const impactedIssuesRouter = require("./routers/routes/impactedIssue");
const incidentImpactedIssueRouter = require("./routers/routes/incidentImpactedIssue");
const responderRouter = require("./routers/routes/responder");
const commentRouter = require("./routers/routes/comment");
const userRouter = require("./routers/routes/users");

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/incident", incidentRouter);
app.use("/attachment", attachmentRouter);
app.use("/impactedIssues", impactedIssuesRouter);
app.use("/incidentImpactedIssue", incidentImpactedIssueRouter);
app.use("/responder", responderRouter);
app.use("/comment", commentRouter);
app.use("/user", userRouter);
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server run on http://localhost:${port}`);
  // await sequelize.sync({ force: true });
});

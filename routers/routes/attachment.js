const fs = require("fs");
const path = require("path");
const attachmentRouter = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dist = path.join(__dirname, "../../../frontend/assets/uploads/");
    if (!fs.existsSync(dist)) {
      fs.mkdirSync(dist);
    }
    return cb(null, dist);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${path.parse(file.originalname).name}-${Date.now()}${path.extname(
        file.originalname
      )}`
    );
  },
});
const upload = multer({ storage });
const {
  createAttachment,
  getAttachments,
  getAttachmentsByIncidentId,
} = require("../controllers/attachment");
attachmentRouter.post("/uploads", upload.any(), createAttachment);
attachmentRouter.get("/", getAttachments);
attachmentRouter.get("/:incidentId", getAttachmentsByIncidentId);
module.exports = attachmentRouter;

const { Attachment } = require("../../models");

const createAttachment = async (req, res) => {
  // console.log("odai", req.body);
  const incidentId = req.body.id;
  let imgs = req.body.files;

  const images = await imgs.map((img) => {
    return { incidentId, attachment: img };
  });

  await Attachment.bulkCreate(images);
  res.json("OK");

  // try {
  // attachmentRouter.post("/uploads", upload.any(), createAttachment);
  //   const incidentId = req.body.incidentId;
  //   const attachments = req.files;

  //   const records = attachments.map((attachment) => {
  //     return { incidentId, attachment: attachment.filename };
  //   });
  //   const result = await Attachment.bulkCreate(records);
  //   res.json(result);
  // } catch (err) {
  //   console.log(err);
  // }
};
const getAttachments = async (req, res) => {
  console.log(";;;");
  try {
    const attachments = await Attachment.findAll();
    console.log(attachments, "attachmentsattachments");
    res.json(attachments);
  } catch (err) {
    console.log(err);
  }
};
const getAttachmentsByIncidentId = async (req, res) => {
  const id = req.params.incidentId;
  try {
    const attachments = await Attachment.findAll({ where: { incidentId: id } });
    res.status(200).json(attachments);
  } catch (err) {
    console.log(err);
  }
};
const updateAttachmentById = async (req, res) => {
  const id = req.params;
  let imgs = req.body.files;
  console.log(req.body.files, "jjjjjjjjjjjjjjjj");
  const images = await imgs.map((img) => {
    return { incidentId, attachment: img };
  });

  await Attachment.update(images, { where: { id } });
  res.json("OK");
};

module.exports = {
  createAttachment,
  getAttachments,
  getAttachmentsByIncidentId,
  updateAttachmentById,
};

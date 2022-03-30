const { Attachment } = require("../../models/index");

const createAttachment = async (req, res) => {
  try {
    const incidentId = req.body.incidentId;
    const attachments = req.files;

    const records = attachments.map((attachment) => {
      return { incidentId, attachment: attachment.filename };
    });
    console.log(records, "recordsrecordsrecords");
    const result = await Attachment.bulkCreate(records);
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};
const getAttachments = async (req, res) => {
  try {
    const attachments = await Attachment.findAll();
    console.log(attachments, "attachmentsattachmentsattachments");
    res.status(200).json(attachments);
  } catch (err) {
    console.log(err);
  }
};
const getAttachmentsByIncidentId = async (req, res) => {
  const id = req.params.incidentId;
  try {
    const attachments = await Attachment.findAll({ where: { incidentId: id } });
    console.log(attachments, "joinataaaaaaaaaaaaaa");
    res.status(200).json(attachments);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createAttachment,
  getAttachments,
  getAttachmentsByIncidentId,
};

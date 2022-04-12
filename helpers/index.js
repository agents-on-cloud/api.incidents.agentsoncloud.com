const createActivityLog = (incident, options, incidentId, ActivityLog) => {
  const { dataValues, _previousDataValues, _changed } = incident;
  const changed = [..._changed];
  const newValue = {};
  const oldValue = {};
  changed.forEach((field) => {
    newValue[field] = dataValues[field];
    oldValue[field] = _previousDataValues[field];
  });

  ActivityLog.create({
    incidentId: dataValues.id,
    oldValue,
    newValue,
  });
};

module.exports = {
  createActivityLog,
};

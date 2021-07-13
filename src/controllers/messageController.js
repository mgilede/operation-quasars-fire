const { getLocation, getMessage, retrieveAllParts, storeMessagePart, deleteMessageParts } = require('../services');

const decodeSignal = async (req, res) => {
  try {
    const { satellites } = req.body;
    const { position, message } = await formatRequests(satellites);
    res.json({ position, message });
  } catch (err) {
    res.status(401).json(err);
  }
};

const retrieveCompleteMessage = async (req, res) => {
  try {
    satellites = await retrieveAllParts();
    const { position, message } = await formatRequests(satellites);
    res.json({ position, message });
  } catch (err) {
    res.status(404).json('There are no message');
  }
};

const savePartMessage = async (req, res) => {
  try {
    await storeMessagePart({ name: req.params.satellite, distance: req.body.distance, message: req.body.message });
    res.status(200).json('Message part stored succesfully');
  } catch (err) {
    res.status(409).json('Message part was not stored');
  }
};

const resetMessage = async (req, res) => {
  try {
    await deleteMessageParts();
    res.status(200).json('Message has been deleted');
  } catch (err) {
    res.status(500).json('Message parts could not be removed');
  }
};

const formatRequests = async (satellites) => {
  try {
    let distances = [];
    let messages = [];
    for (satellite of satellites) {
      distances.push({ [satellite.name]: satellite.distance });
      messages.push(satellite.message);
    }
    const position = await getLocation(distances);
    const message = await getMessage(messages);
    return { position, message };
  } catch (err) {
    throw err;
  }
};

module.exports = { decodeSignal, retrieveCompleteMessage, savePartMessage, resetMessage };
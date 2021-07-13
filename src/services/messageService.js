const mongoose = require('mongoose');
const Message = require('../models');

const SATTELITES = {
  kenobi: [-500, -200],
  skywalker: [100, -100],
  sato: [500, 100]
};

const getLocation = async (distances) => {
  const [ kenobiX, kenobiY ] = SATTELITES.kenobi;
  const [ skywalkerX, skywalkerY ] = SATTELITES.skywalker;
  const [ satoX, satoY ] = SATTELITES.sato;
  const [{ kenobi: kenobiR }, { skywalker: skywalkerR }, { sato: satoR }] = distances;

  const distanceA = 2 * skywalkerX - 2 * kenobiX
  const distanceB = 2 * skywalkerY - 2 * kenobiY
  const distanceC = kenobiR ** 2 - skywalkerR ** 2 - kenobiX ** 2 + skywalkerX ** 2 - kenobiY ** 2 + skywalkerY ** 2
  const distanceD = 2 * satoX - 2 * skywalkerX
  const distanceE = 2 * satoY - 2 * skywalkerY
  const distanceF = skywalkerR ** 2 - satoR ** 2 - skywalkerX ** 2 + satoX ** 2 - skywalkerY ** 2 + satoY ** 2
  const posX = (distanceC * distanceE - distanceF * distanceB) / (distanceE * distanceA - distanceB * distanceD)
  const posY = (distanceC * distanceD - distanceA * distanceF) / (distanceB * distanceD - distanceA * distanceE)
  return { X: posX, Y: posY };
};

const getMessage = async (messages) => {
  const [kenobi, skywalker, sato] = messages;
  if (kenobi.length !== skywalker.length || kenobi.length !== sato.length || skywalker.length !== sato.length) {
    throw { 'message': 'This message can\'t be decoded' };
  }

  let messageDecoded = '';
  for (let i = 0; i < kenobi.length && i < skywalker.length && i < sato.length; i++) {
    messageDecoded += kenobi[i] ? `${kenobi[i]} ` : (skywalker[i] ? `${skywalker[i]} ` : (sato[i] ? `${sato[i]} ` : (function(){throw { 'message': 'This message is missing a part.' }}())));
  }
  
  return messageDecoded.trim();
};

const retrieveAllParts = async () => {
  return await Message.find({ });
};

const storeMessagePart = async (sattelite) => {
  await Message.findOneAndUpdate({ name: sattelite.name }, { distance: sattelite.distance, message: sattelite.message }, { upsert: true });
};

const deleteMessageParts = async () => {
  await Message.deleteMany({ });
};

module.exports = { getLocation, getMessage, retrieveAllParts, storeMessagePart, deleteMessageParts };
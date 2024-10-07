const { google } = require('googleapis');
const moment = require('moment-timezone');
const rooms = require('../rooms.json');
const key = require('../rooms-client.json'); // Ensure you have the right path to your credentials

const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/calendar'],
  null
);

const calendar = google.calendar({
  version: 'v3',
  auth: jwtClient
});

const getRoom = (slug) => slug in rooms ? rooms[slug] : null;

const getEvents = async (slug) => {
  const room = getRoom(slug);
  if (!room) throw new Error('Room does not exist');

  const timeMin = moment().startOf('day').toISOString();
  const timeMax = moment().add(7, 'days').endOf('day').toISOString();

  const response = await calendar.events.list({
    calendarId: room.id,
    timeMin,
    timeMax,
    singleEvents: true,
  });

  return response.data.items;
};

module.exports = {
  getEvents,
};

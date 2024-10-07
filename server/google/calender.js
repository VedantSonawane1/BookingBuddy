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

// Function to get room details based on slug
const getRoom = (slug) => (slug in rooms ? rooms[slug] : null);

// Function to get events for a specific room
const getEvents = async (slug) => {
  try {
    const room = getRoom(slug);
    if (!room) throw new Error('Room does not exist');

    // Set the time range for fetching events
    const timeMin = moment().startOf('day').toISOString();
    const timeMax = moment().add(7, 'days').endOf('day').toISOString();

    // Fetch events from Google Calendar API
    const response = await calendar.events.list({
      calendarId: room.id,
      timeMin,
      timeMax,
      singleEvents: true,
    });

    // Check if events were retrieved successfully
    if (!response.data.items) {
      throw new Error('No events found for this room.');
    }

    return response.data.items; // Return the list of events

  } catch (error) {
    // Handle specific API errors
    if (error.response) {
      console.error(`API Error: ${error.response.status} - ${error.response.data.error.message}`);
      throw new Error(`Failed to fetch events: ${error.response.data.error.message}`);
    } else {
      // Handle other errors (e.g., network issues, missing calendar ID)
      console.error(`Error: ${error.message}`);
      throw new Error(`An error occurred: ${error.message}`);
    }
  }
};

module.exports = {
  getEvents,
};

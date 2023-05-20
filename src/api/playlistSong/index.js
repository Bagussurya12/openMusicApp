const PlaylistSongHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "PlaylistSongs",
  version: "1.0.0",
  register: async (server, { service, playlistService, validator }) => {
    const playlistSongsHandler = new PlaylistSongHandler(service, playlistService, validator);
    server.route(routes(playlistSongsHandler));
  },
};

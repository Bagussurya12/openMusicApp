const CollaborationsHandler = require("../collaborations/handler");
const routes = require("./routes");

module.exports = {
  name: "collaborations",
  version: "1.0.0",

  register: async (server, { CollaborationsService, playlistsService, validator }) => {
    const collaborationHandler = new CollaborationsHandler(CollaborationsService, playlistsService, validator);

    server.route(routes(collaborationHandler));
  },
};

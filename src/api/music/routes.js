const { addAlbumHandler, getAlbumByIdHandler, editAlbumByIdHandler, deleteAlbumByIdHandler } = require("./albumHandler");
const { addSongsHandler, getAllSongsHandler, getSongByIdHandler, editSongByIdHandler, deleteSongByIdHandler } = require("./songsHandler");

const routes = [
  // Album Handler
  {
    method: "POST",
    path: "/albums",
    handler: addAlbumHandler,
  },
  {
    method: "GET",
    path: "/albums/{id}",
    handler: getAlbumByIdHandler,
  },
  {
    method: "PUT",
    path: "/albums/{id}",
    handler: editAlbumByIdHandler,
  },
  {
    method: "DELETE",
    path: "/albums/{id}",
    handler: deleteAlbumByIdHandler,
  },

  //   Song Handler
  {
    method: "POST",
    path: "/songs",
    handler: addSongsHandler,
  },
  {
    method: "GET",
    path: "/songs",
    handler: getAllSongsHandler,
  },
  {
    method: "GET",
    path: "/songs/{id}",
    handler: getSongByIdHandler,
  },
  {
    method: "PUT",
    path: "/songs/{id}",
    handler: editSongByIdHandler,
  },
  {
    method: "DELETE",
    path: "/songs/{id}",
    handler: deleteSongByIdHandler,
  },
];

module.exports = routes;

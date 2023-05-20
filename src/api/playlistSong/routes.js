const routes = (handler) => [
  {
    method: "POST",
    path: "/playlists/{id}/songs",
    handler: handler.postPlaylistSongHandler,
    options: {
      auth: "openMusicApp_jwt",
    },
  },
  {
    method: "GET",
    path: "/playlists/{id}/songs",
    handler: handler.getPlaylistSongByIdHandler,
    options: {
      auth: "openMusicApp_jwt",
    },
  },
  {
    method: "DELETE",
    path: "/playlists/{id}/songs",
    handler: handler.deletePlaylistSongHandler,
    options: {
      auth: "openMusicApp_jwt",
    },
  },
];

module.exports = routes;

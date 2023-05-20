const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const { mapDBPlaylistSongs } = require("../../utils/playlistSongs");

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylistSong(playlistId, songId) {
    const checkSong = {
      text: "SELECT title FROM songs WHERE id = $1",
      values: [songId],
    };
    const SongResult = await this._pool.query(checkSong);

    if (!SongResult.rows.length) {
      throw new NotFoundError("Lagu tidak ditemukan");
    }

    const id = `playlistSong-${nanoid(16)}`;
    const query = {
      text: "INSERT INTO playlist_songs VALUES($1, $2, $3) RETURNING id",
      values: [id, playlistId, songId],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError("Gagal menambahkan lagu ke playlist");
    }
    return result.rows[0].id;
  }

  async getPlaylistSongById(playlistId) {
    const query = {
      text: `SELECT playlists.*, users.username, songs.id as song_id, songs.title as song_title, songs.performer FROM playlists
      LEFT JOIN playlist_songs ON playlist_songs.playlist_id = playlists.id
      LEFT JOIN songs ON songs.id = playlist_songs.song_id
      LEFT JOIN users ON users.id = playlists.owner
      WHERE playlists.id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Lagu tidak ditemukan");
    }
    const songs = result.rows.map((row) => ({
      id: row.song_id,
      title: row.song_title,
      performer: row.performer,
    }));
    const playlistResult = {
      id: result.rows[0].id,
      name: result.rows[0].name,
      username: result.rows[0].username,
      songs,
    };
    return playlistResult;
  }

  async deleteSongsFromPlaylist(songId, playlistId) {
    const query = {
      text: "DELETE FROM playlist_songs WHERE song_id = $1 AND playlist_id = $2 RETURNING id",
      values: [songId, playlistId],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Lagu dalam playlist gagal dihapus, Id tidak ditemukan");
    }
  }
  async verifyCollaborator(songId, playlistId) {
    const query = {
      text: "SELECT * FROM playlistsongs WHERE song_id = $1 AND playlist_id = $2",
      values: [songId, playlistId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError("Failed to verified song");
    }
  }
}

module.exports = PlaylistSongsService;

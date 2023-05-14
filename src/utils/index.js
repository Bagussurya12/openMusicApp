const mapDBToModelAlbum = ({ id, name, year }) => ({
  id,
  name,
  year,
});

const mapSong = ({ id, title, year, genre, performer, duration, albumId }) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId,
});

module.exports = { mapDBToModelAlbum, mapSong };

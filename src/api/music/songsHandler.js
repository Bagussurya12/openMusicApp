const { nanoid } = require("nanoid");
const songs = require("./songs");

const addSongsHandler = (request, h) => {
  const { title, year, genre, performer, duration, albumId } = request.payload;

  const id = nanoid(16);
  const newSong = {
    title,
    year,
    genre,
    performer,
    duration,
    albumId,
  };
  songs.push(newSong);

  const isSucces = songs.filter((song) => song.id === id).length > 0;

  if (isSucces) {
    const response = h.response({
      status: "succes",
      message: "Lagu berhasil ditambahkan",
      data: {
        songId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Lagu Gagal Ditambahkan",
  });
  response.code(500);
  return response;
};

const getAllSongsHandler = () => ({
  status: "success",
  data: {
    songs,
  },
});

const getSongByIdHandler = (request, h) => {
  const { id } = request.params;

  const song = songs.filter((n) => n.id === id)[0];

  if (song !== undefined) {
    return {
      status: "success",
      data: {
        song,
      },
    };
  }
  const response = h.response({
    status: "fail",
    message: "catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editSongByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, year, genre, performer, duration, albumId } = request.payload;

  const index = songs.findIndex((song) => song.id === id);

  if (index !== -1) {
    songs[index] = {
      ...songs[index],
      title,
      year,
      genre,
      performer,
      duration,
      albumId,
    };
    const response = h.response({
      status: "success",
      message: "Lagu Berhasil Diperbarui",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui Lagu, ID Tidak ditemukan",
  });
  response.code(404);
  return response;
};
const deleteSongByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = songs.findIndex((song) => song.id === id);

  if (index !== -1) {
    songs.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Lagu berhasil ditambahkan",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Lagu Gagal dihapus, ID tidak ditemukan",
  });
  response.code(404);
  return response;
};
module.exports = { addSongsHandler, getAllSongsHandler, getSongByIdHandler, editSongByIdHandler, deleteSongByIdHandler };

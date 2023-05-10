const { nanoid } = require("nanoid");
const albums = require("./Albums");

// ALBUM HANDLER
const addAlbumHandler = (request, h) => {
  const { name, year } = request.payload;

  const id = `album-${nanoid(16)}`;

  const newAlbum = {
    id,
    name,
    year,
  };
  albums.push(newAlbum);

  const isSucces = albums.filter((album) => album.id === id).length > 0;

  if (isSucces) {
    const response = h.response({
      status: "success",
      message: "Album berhasil di tambahkan",
      data: {
        albumId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Album Gagal Ditambahkan",
  });
  response.code(500);
  return response;
};
const getAlbumByIdHandler = (request, h) => {
  const { id } = request.params;

  const album = albums.filter((n) => n.id === id)[0];

  if (album !== undefined) {
    return {
      status: "success",
      data: {
        album,
      },
    };
  }
  const response = h.response({
    status: "fail",
    message: "Album tidak ditemukan",
  });
  response.code(404);
  return response;
};
const editAlbumByIdHandler = (request, h) => {
  const { id } = request.params;

  const { name, year } = request.payload;

  const index = albums.findIndex((album) => album.id === id);

  if (index !== -1) {
    albums[index] = {
      ...albums[index],
      name,
      year,
    };
    const response = h.response({
      status: "success",
      message: "Album berhasil DiPerbarui",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Gagal Memperbarui Album, Id album Tidak ditemukan ",
  });
  response.code(404);
  return response;
};
const deleteAlbumByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = albums.findIndex((album) => album.id === id);
  if (index !== -1) {
    albums.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Album Berhasil dihapus",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Album Gagal dihapus, ID Tidak ditemukan",
  });
  response.code(404);
  return response;
};
module.exports = { addAlbumHandler, getAlbumByIdHandler, editAlbumByIdHandler, deleteAlbumByIdHandler };

const { nanoid } = require("nanoid");

class AlbumsService {
  constructor() {
    this._albums = [];
  }

  addAlbum({ name, year }) {
    const id = `album-${nanoid(10)}`;

    const newAlbum = {
      name,
      year,
    };
    this._albums.push(newAlbum);

    // pengecekan newAlbum masuk ke dalam this._albums

    const isSuccess = this._albums.filter((album) => album.id === id).length > 0;

    if (!isSuccess) {
      throw new Error("Album gagal ditambahkan");
    }
    return id;
  }
  getAlbumById(id) {
    const album = this._albums.filter((album) => album.id)[0];

    if (!album) {
      throw new Error("Album Tidak ditemukan");
    }
    return album;
  }
  editAlbumById(id, { name, year }) {
    const index = this._albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new Error("Gagal memperbarui album, ID Album tidak ditemukan");
    }
    this._albums[index] = {
      ...this._albums[index],
      name,
      year,
    };
  }

  deleteAlbumById(id) {
    const index = this._albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new Error("Album Gagal dihapus, Id tidak ditemukan");
    }

    this._albums.splice(index, 1);
  }
}

module.exports = AlbumsService;

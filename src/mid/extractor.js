import multer from "multer";

function generateStorege(path) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path);
    },

    filename: function (req, file, cb) {
      const nombreParaGuardarElArchivo =
        Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        "-" +
        file.originalname;
      cb(null, nombreParaGuardarElArchivo);
    },
  });

  return storage;
}

export function extractorMulter(path, adj) {
  const storage = generateStorege(path);
  const extractor = multer({ storage: storage });
  const extractPictures = extractor.fields(adj);

  return extractPictures;
}

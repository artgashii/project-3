const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, callback) => {
    const filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  },
});

const upload = multer({ storage: storage });

module.exports = upload.single("image");

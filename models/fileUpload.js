// const multer = require("multer");
// const uuid = require("uuid");

// const MIME_TYPE_MAP = {
//     "image/png": "png",
//     "image/jpeg": "jpeg",
//     "image/jpg": "jpg",
// };

// const fileUpload = multer({
//     limits: 500000,
//     storage: multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, "uploads/images");
//         },
//     }),
//     fileFilter: (req, file, cb) => {
//         const isValid = !!MIME_TYPE_MAP{file.mimetype};
//         let error = isValid ? nulle : new Error("Invalid mime type!");
//         cb(error, isValid);
//     },

// });
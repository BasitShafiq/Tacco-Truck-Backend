import multer from "multer";
import fs from "fs";

export const uploadImagesToFolder = (folderName) => {
    const storage = multer.diskStorage({
        destination: (_req, file, cb) => {
            const destinationFolder = `uploads/${folderName}`;
            if (!fs.existsSync(destinationFolder)) {
                fs.mkdirSync(destinationFolder, { recursive: true });
            }
            if (file.destination === `uploads/${folderName}`) {
                cb(null, file.destination);
            } else {
                cb(null, `uploads/${folderName}`);
            }
        },
        filename: (_req, file, cb) => {
            cb(null, `${Date.now()}.jpeg`);
        },

    });

    return multer({ storage });
};

const multer = require('multer');
const sharp = require("sharp");
const storage = multer.memoryStorage();
const upload = multer({ storage });

export async function compressImg (req, res, next) {
    const { buffer, filename } = req.file;
    const ref = `${filename}.webp`;
    try {
        await sharp(buffer)
            .webp({ quality: 20 })
            .toFile("./images/" + ref);
            req.file.filename = filename;
            next();
    }
    catch (error) {
        res.status(401).json({ error });
    } 
}



export default compressImg;

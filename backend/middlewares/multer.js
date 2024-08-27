import multer from "multer";

    const upload =multer({
    storege:multer.memoryStorage(),
 });
 export default upload;


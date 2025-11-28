import { memoryStorage } from 'multer';

export const multerConfig = {
    storage: memoryStorage(), 
    limits: { fileSize: 20 * 1024 * 1024 }, // limite de 5MB por arquivo
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only images are allowed.'), false);
        }
    },
};

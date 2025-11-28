import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const multerConfig = {
    storage: diskStorage({
        destination: './uploads/pets',
        filename: (req, file, cb) => {
            const fileExtName = extname(file.originalname).toLowerCase();
            const randomName = uuidv4();
            const fileName = `${randomName}${fileExtName}`;
            cb(null, fileName);
        },
    }),
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Formato de arquivo não suportado. Use apenas JPEG, PNG ou GIF.'), false);
        }
    },
};
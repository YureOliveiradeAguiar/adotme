import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const multerConfig = {
    storage: diskStorage({
        destination: './uploads/pets',
        filename: (req, file, cb) => {
            const fileExtName = extname(file.originalname);
            const fileName = `${uuidv4()}${fileExtName}`;
            cb(null, fileName);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            cb(null, true);
        } else {
            cb(new Error('Formato de arquivo não suportado'), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
};
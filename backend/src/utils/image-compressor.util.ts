import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

export class ImageCompressor {
    static async compressImage(
        inputPath: string,
        outputPath: string,
        quality: number = 70,
        maxWidth: number = 800,
    ): Promise<string> {
        try {
            await sharp(inputPath)
                .resize(maxWidth, null, {
                    withoutEnlargement: true,
                    fit: 'inside',
                })
                .jpeg({ quality })
                .png({ quality })
                .toFile(outputPath);

            // Remove o arquivo original após compressão
            fs.unlinkSync(inputPath);

            return outputPath;
        } catch (error) {
            throw new Error(`Erro ao comprimir imagem: ${error.message}`);
        }
    }

    static async compressImageBuffer(
        buffer: Buffer,
        quality: number = 70,
        maxWidth: number = 800,
    ): Promise<Buffer> {
        return sharp(buffer)
            .resize(maxWidth, null, {
                withoutEnlargement: true,
                fit: 'inside',
            })
            .jpeg({ quality })
            .png({ quality })
            .toBuffer();
    }
}
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
            // Verifica se o arquivo original existe
            if (!fs.existsSync(inputPath)) {
                throw new Error('Arquivo original não encontrado');
            }

            // Obtém metadados da imagem para determinar o formato
            const metadata = await sharp(inputPath).metadata();
            const format = metadata.format;

            let sharpInstance = sharp(inputPath).resize(maxWidth, null, {
                withoutEnlargement: true,
                fit: 'inside',
            });

            // Aplica compressão baseada no formato
            if (format === 'png') {
                sharpInstance = sharpInstance.png({
                    quality: Math.min(quality + 20, 100), // PNG usa qualidade diferente
                    compressionLevel: 9
                });
            } else {
                // Padrão para JPEG e outros formatos
                sharpInstance = sharpInstance.jpeg({
                    quality: quality,
                    mozjpeg: true // Melhor compressão
                });
            }

            await sharpInstance.toFile(outputPath);

            // Remove o arquivo original apenas se a compressão foi bem-sucedida
            if (fs.existsSync(outputPath)) {
                fs.unlinkSync(inputPath);
            }

            return outputPath;
        } catch (error) {
            // Se houver erro, mantém o arquivo original
            console.error('Erro ao comprimir imagem:', error);
            return inputPath;
        }
    }

    static async compressImageBuffer(
        buffer: Buffer,
        quality: number = 70,
        maxWidth: number = 800,
    ): Promise<Buffer> {
        const metadata = await sharp(buffer).metadata();
        const format = metadata.format;

        let sharpInstance = sharp(buffer).resize(maxWidth, null, {
            withoutEnlargement: true,
            fit: 'inside',
        });

        if (format === 'png') {
            sharpInstance = sharpInstance.png({
                quality: Math.min(quality + 20, 100),
                compressionLevel: 9
            });
        } else {
            sharpInstance = sharpInstance.jpeg({
                quality: quality,
                mozjpeg: true
            });
        }

        return sharpInstance.toBuffer();
    }
}
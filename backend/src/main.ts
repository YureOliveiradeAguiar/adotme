import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
	const uploadsDir = path.join(process.cwd(), 'uploads', 'pets');
	if (!fs.existsSync(uploadsDir)) {
		fs.mkdirSync(uploadsDir, { recursive: true });
		console.log('Pasta de uploads criada:', uploadsDir);
	}

	const app = await NestFactory.create(AppModule, { cors: true });
	await app.listen(process.env.PORT ?? 3000);
	console.log('Servidor rodando na porta', process.env.PORT ?? 3000);
}
bootstrap();
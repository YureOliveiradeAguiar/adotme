	import { NestFactory } from '@nestjs/core';
	import { AppModule } from './app.module';
	import { ValidationPipe } from '@nestjs/common';
	import * as fs from 'fs';
	import * as path from 'path';

	async function bootstrap() {

		const app = await NestFactory.create(AppModule, { cors: true });

		// HABILITAR VALIDAÇÃO GLOBAL COM TRANSFORMAÇÃO
		app.useGlobalPipes(new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		}));

		await app.listen(process.env.PORT ?? 3000);
		console.log('Servidor rodando na porta', process.env.PORT ?? 3000);
	}
	bootstrap();
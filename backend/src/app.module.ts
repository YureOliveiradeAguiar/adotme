import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { PetsModule } from './pets/pets.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }), // <- Habilita uso do process.env
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'uploads'),
			serveRoot: '/uploads',
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT || '5432'),
			username: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME,
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true, // desative em produção
			ssl: {
				rejectUnauthorized: false, // permite SSL sem checagem de certificado
			},
		})

		,
		PetsModule,
	],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PetsModule } from './pets/pets.module';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'uploads'),
			serveRoot: '/uploads',
		}),
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: 'database.sqlite',
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true,
		}),
		PetsModule
	],
})
export class AppModule { }
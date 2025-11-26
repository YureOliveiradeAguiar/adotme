import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsModule } from './pets/pets.module';

@Module({
	imports: [
		// Global configs for TypeORM
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: 'database.sqlite',
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true,
		}),
		PetsModule
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
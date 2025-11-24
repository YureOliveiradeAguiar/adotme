import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnimalsModule } from './animals/animals.module';


@Module({
	imports: [
		// Configuração global do TypeORM
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: ':memory:',
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true,
			
			//type: 'postgres',              // banco de dados
			//host: 'localhost',             // host
			//port: 5432,                    // porta padrão do PostgreSQL
			//username: 'seu_usuario',       // seu usuário do banco
			//password: 'sua_senha',         // sua senha do banco
			//database: 'seu_banco',         // nome do banco
			//entities: [__dirname + '/**/*.entity{.ts,.js}'], // todas as entidades
			//synchronize: true, // cria-atualiza tabelas automaticamente (só dev) TIRAR EM PRODUÇÃO!
		}),
		//========================Módulos de recurso aqui===========================
		AnimalsModule,
	],
	controllers: [],  // geralmente vazio no módulo raiz
	providers: [],    // geralmente vazio no módulo raiz
})
export class AppModule { }
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const { POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DATABASE } = process.env

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: parseInt(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  // "dist/entities/*{.ts,.js}"
  entities: [__dirname + '/../entities/*.entity.{js,ts}'],
  synchronize: process.env?.NODE_ENV !== 'prod' ? true : false,
};

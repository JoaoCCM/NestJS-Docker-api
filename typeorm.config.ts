import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'nestjs_docker',
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  synchronize: process.env?.NODE_ENV !== 'prod' ? true : false,
  logging: false
};

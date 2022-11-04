import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'nestjs-typeorm',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

const configRequired = [
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DATABASE'
];

class ConfigService {
    constructor(private env: { [k: string]: string | undefined }) { }

    private getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];

        if (!value && throwOnMissing) {
            if (configRequired.indexOf(key) !== -1) {
                throw new Error(`config error - missing env.${key}`);
            }
        }
        return value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach(k => this.getValue(k, true));
        return this;
    }


    public getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.getValue('POSTGRES_HOST'),
            port: parseInt(this.getValue('POSTGRES_PORT')),
            username: this.getValue('POSTGRES_USER'),
            password: this.getValue('POSTGRES_PASSWORD'),
            database: this.getValue('POSTGRES_DATABASE'),
            entities: ['dist/entities/*{.ts,.js}'],
            synchronize: false,

            migrationsTableName: 'custom_migration_table',
            migrations: ['dist/migration/*.js'],
            cli: {
                migrationsDir: 'migration',
            },

        };
    }

}

const configService = new ConfigService(process.env)
    .ensureValues(configRequired);

export { configService };
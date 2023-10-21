import { createPool } from 'mysql2/promise'

export const pool = createPool({
    host: 'cafi-server-db.mysql.database.azure.com',
    user: 'cafi_admin',
    password: 'Desaca123',
    port: 3306,
    database: 'cafi_schema'
});
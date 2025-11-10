import postgres from 'postgres';

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
const sql = postgres(process.env.POSTGRES_URL!);

export {sql} ;

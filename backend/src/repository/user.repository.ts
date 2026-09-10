import { getPool } from "../db/pool.js";

export type CurrentUserRowInfo={
    id: string;
    auth_userId: string;
     email: string;
     created_at: Date;
}

export async function ensureUser(input:{
    auth_userId: string;
     email: string;
}):Promise<CurrentUserRowInfo> {
    // <CurrentUserRowInfo>
    const result= await getPool().query(
         `
         INSERT INTO users (auth_user_id,email)
         VALUES ($1,$2)
         ON CONFLICT (auth_user_id)
         DO UPDATE SET email= COALESCE(EXCLUDED.EMAIL,users.email)
         RETURNING *
         `,
         [input.auth_userId,input.email]
    )
    console.log("result object",result)
    return result.rows[0];
}
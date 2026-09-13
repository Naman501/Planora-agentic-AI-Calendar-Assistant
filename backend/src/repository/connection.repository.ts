import { getPool } from "../db/pool.js";

export type ConnectionStaus = "connected" | "disconnected" | "pending";

export type CurrentConnectionRow = {
  user_id: string;
  provider: "calendar";
  status: ConnectionStaus;
};

export async function getCalendarConnectionRow(userId: string) {
  const result = await getPool().query<CurrentConnectionRow>(
    `
        SELECT user_id,provider,status
        FROM connections
        WHERE user_id= $1 and provider= 'calendar'
        
        `,
    [userId],
  );

  return result.rows[0] ?? null;
}

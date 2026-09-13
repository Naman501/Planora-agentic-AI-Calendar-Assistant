import { Router } from "express";
import { requireSession } from "../middleware/requireSession.js";
import { getCalendarConnection } from "../service/connection.service.js";

export const connection_router = Router();

connection_router.use(requireSession);

connection_router.get("/", async (req, res) => {
  try {
    const connection = await getCalendarConnection(req.auth?.userId ?? "");
    res.json({ success: true, connection });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Couldnt load connections.", success: false, error });
  }
});

connection_router.post("/connect", async (req, res) => {
  try {
    const refreshToken =
      typeof req.body?.refreshToken === "string" ? req.body.refreshToken : "";
    if (!refreshToken) {
      res
        .status(400)
        .json({ error: "Refresh Token required.", success: false });
    }

    const redirectUrl =
      typeof req.body?.redirectUrl === "string"
        ? req.body.redirectUrl
        : `${process.env.APP_URL ?? "http://localhost:3000"}/dashboard`;

    if (!redirectUrl) {
      res
        .status(400)
        .json({ error: "Redirect Dashboard end-point error.", success: false });
    }

    const result= await createCalendarConnectUrl({
      userId:req.auth?.userId,
      refreshToken,
      redirectUrl
    })

    res.status(201).json({success:true,result})

  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Couldnt start connection.", success: false, error });
  }
});

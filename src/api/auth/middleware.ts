import jwt from "jsonwebtoken";
import { Elysia } from "elysia";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const authMiddleware = new Elysia().derive(({ request, set }) => {
  const cookie = request.headers.get("cookie");
  const token = cookie
    ?.split(";")
    ?.find((c) => c.trim().startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    set.status = 401;
    throw new Error("توکن یافت نشد");
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return { user: payload };
  } catch (e) {
    set.status = 401;
    throw new Error("توکن نامعتبر است");
  }
});

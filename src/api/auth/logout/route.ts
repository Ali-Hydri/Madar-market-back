import { status } from "elysia";

const logout = async (ctx: any) => {
  ctx.set.headers["Set-Cookie"] = "token=; Max-Age=0; Path=/;";

  return {
    status: true,
    message: "خروج موفقیت‌آمیز بود",
  };
};

export default logout;

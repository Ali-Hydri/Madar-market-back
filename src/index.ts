import { Elysia } from "elysia";
import { PrismaClient } from "./generated/prisma";
import usersInfo from "./api/user";
import { cors } from "@elysiajs/cors";
import getUserById from "./api/user/getUserById";
import sendOtp from "./api/auth/login/route";
import verifyOtp from "./api/auth/verify-otp/route";
// import getProfile from "./api/user/route";
import { authMiddleware } from "./api/auth/middleware";
import categoryRoutes from "./api/category/route";
import productRoutes from "./api/product/route";
import cartRoutes from "./api/cart/route";

export const prisma = new PrismaClient();

export const app = new Elysia().use(cors()).use(usersInfo);

getUserById(app);

app.get("/", () => "سلام از Elysia 🚀");

app.post("/login", (c) => sendOtp(c));
app.post("/verify-otp", (c) => verifyOtp(c));

app.listen(3005, () => {
  console.log("✅ سرور در حال اجراست روی http://localhost:3005");
});

categoryRoutes(app);
productRoutes(app);
cartRoutes(app);
//   return `سلام صفحه ی غذا`;
// });

// app.get("/posts", async () => {
//   return await prisma.post.findMany();
// });

// app.post(
//   "/posts",
//   async ({
//     body,
//   }: {
//     body: { title: string; content: string; authorId: number };
//   }) => {
//     return await prisma.post.create({
//       data: {
//         title: body.title,
//         content: body.content,
//         authorId: body.authorId,
//       },
//     });
//   }
// );

// app.get("/comments", async () => {
//   return await prisma.comment.findMany();
// });

// app.post(
//   "/comments",
//   async ({ body }: { body: { text: string; author: string } }) => {
//     return await prisma.comment.create({
//       data: {
//         text: body.text,
//         author: body.author,
//       },
//     });
//   }
// );

// app.get("/products", async () => {
//   return await prisma.product.findMany();
// });

// app.post(
//   "/products",
//   async ({
//     body,
//   }: {
//     body: { name: string; description: string; price: number };
//   }) => {
//     return await prisma.product.create({
//       data: {
//         name: body.name,
//         description: body.description,
//         price: body.price,
//       },
//     });
//   }
// );

import { prisma } from "../..";
import jwt from "jsonwebtoken";

const updateUsers = async (ctx: any) => {
  try {
    let body = ctx.body;
    console.log(body);
    let token = ctx.headers.authorization;

    //remove Bearer from token
    token = token.replace("Bearer ", "");

    const JWT_SECRET = process.env.JWT_SECRET || "";

    const userData: any = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.update({
      where: { id: userData.userId },
      data: {
        name: body.name,
        email: body.email,
        lastname: body.lastname,
      },
    });
    console.log(user);

    return user;
  } catch (error) {
    console.log(error);

    return error;
  }
};

export default updateUsers;

// const updateUsers = async ({ body }: { body: any }) => {
//   try {
//     const { token, name, email, lastname, phone } = body;

//     if (!token) {
//       return new Response(JSON.stringify({ error: "توکن وجود ندارد" }), { status: 400 });
//     }

//     const user = await prisma.user.update({
//       where: { token }, // ← به‌جای id
//       data: {
//         name,
//         email,
//         lastname,
//         phone,
//       },
//     });

//     return new Response(JSON.stringify(user), { status: 200 });
//   } catch (error) {
//     console.error("خطا در آپدیت کاربر:", error);
//     return new Response(JSON.stringify({ error: "خطا در سرور", details: error }), { status: 500 });
//   }
// };

// export default updateUsers;

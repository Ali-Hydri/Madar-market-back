import { prisma } from "../..";

const ubsertUsers = async (ctx: any) => {
  try {
    let body = ctx.body;

    const user = await prisma.user.upsert({
      where: {
        phone: body.phone,
      },
      update: {
        name: body.name,
        email: body.email,
        lastname: body.lastname,
      },
      create: {
        name: body.name,
        email: body.email,
        lastname: body.lastname,
        phone: body.phone,
      },
    });

    return user;
  } catch (error) {
    console.error("❌ Error in postUsers:", error);
    return {
      error: "خطا در ذخیره یا بروزرسانی کاربر",
      detail: error,
    };
  }
};

export default ubsertUsers;

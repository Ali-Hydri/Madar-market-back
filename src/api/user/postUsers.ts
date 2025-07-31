import { prisma } from "../..";

const postUsers = async (ctx: any) => {
  try {
    let body = ctx.body;
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        lastname: body.lastname,
        phone: body.phone
      },
    });
    return user;
  } catch (error) {
    return error;
  }
};

export default postUsers;

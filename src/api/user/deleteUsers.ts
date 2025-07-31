import { prisma } from "../..";

const deleteUsers = async (ctx: any) => {
  try {
    let body = ctx.body;
    const user = await prisma.user.delete({
      where: { id: body.id },
    });
    return user;
  } catch (error) {
    return error;
  }
};

export default deleteUsers;

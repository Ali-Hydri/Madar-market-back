import { prisma } from "../..";

const getUserById = (app: any) => {
  app.get("/users/:id", async ({ params }: { params: { id: string } }) => {
    const id = Number(params.id);
    if (isNaN(id)) {
      return { success: false, error: "شناسه نامعتبر است" };
    }
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return { success: false, error: "کاربر پیدا نشد" };
    }
    return { success: true, data: user };
  });
};

export default getUserById;
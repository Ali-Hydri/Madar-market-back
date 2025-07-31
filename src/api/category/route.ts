import { Elysia } from "elysia";
import { prisma } from "../../index";

const categoryRoutes = (app: Elysia) => {
  // افزودن دسته‌بندی جدید
  app.post("/api/category", async ({ body }) => {
    const { name, parentId } = body;
    return await prisma.category.create({
      data: { name, parentId },
    });
  });

  // دریافت همه دسته‌بندی‌ها (درختی)
  app.get("/api/category", async () => {
    const categories = await prisma.category.findMany({
      include: {
        children: true,
        products: true,
      }
    });
    return categories;
  });

  // ویرایش دسته‌بندی
  app.get("/api/category/:id", async ({ params, body }) => {
    const { id } = params;
    return await prisma.category.findUnique({
      where: { id: Number(id) },
      include:{
        products:true
      }
    });
  });

  // حذف دسته‌بندی
  app.delete("/api/category/:id", async ({ params }) => {
    const { id } = params;
    return await prisma.category.delete({
      where: { id: Number(id) },
    });
  });

  return app;
};

export default categoryRoutes;

import { Elysia } from "elysia";
import { prisma } from "../../index";

const productRoutes = (app: Elysia) => {
  // افزودن محصول جدید
  app.post("/api/product", async ({ body }) => {
    const { name, description, price, imageUrl, categoryId } = body;
    return await prisma.product.create({
      data: { name, description, price, imageUrl, categoryId },
    });
  });

  // دریافت محصولات (با فیلتر دسته‌بندی)
  app.get("/api/product", async ({ query }) => {
    const { categoryId } = query;
    return await prisma.product.findMany({
      where: categoryId ? { categoryId: Number(categoryId) } : {},
      include: { category: true },
    });
  });

  // ویرایش محصول
  app.put("/api/product/:id", async ({ params, body }) => {
    const { id } = params;
    const { name, description, price, imageUrl, categoryId } = body;
    return await prisma.product.update({
      where: { id: Number(id) },
      data: { name, description, price, imageUrl, categoryId },
    });
  });

  // حذف محصول
  app.delete("/api/product/:id", async ({ params }) => {
    const { id } = params;
    return await prisma.product.delete({
      where: { id: Number(id) },
    });
  });

  return app;
};

export default productRoutes;

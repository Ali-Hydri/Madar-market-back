import { Elysia } from "elysia";
import { prisma } from "../../index";
import { authMiddleware } from "../auth/middleware";

const cartRoutes = (app: Elysia) => {
  // مشاهده سبد خرید کاربر
  app.get("/api/cart", authMiddleware, async ({ user }) => {
    const userId = user.userId;
    let cart = await prisma.cart.findFirst({
      where: { userId },
      include: { items: { include: { product: true } } },
    });
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: { items: { include: { product: true } } },
      });
    }
    return cart;
  });

  // افزودن محصول به سبد خرید
  app.post("/api/cart/add", authMiddleware, async ({ user, body }) => {
    const userId = user.userId;
    const { productId, quantity } = body;
    let cart = await prisma.cart.findFirst({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }
    let item = await prisma.cartItem.findFirst({ where: { cartId: cart.id, productId } });
    if (item) {
      item = await prisma.cartItem.update({
        where: { id: item.id },
        data: { quantity: item.quantity + (quantity || 1) },
      });
    } else {
      item = await prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity: quantity || 1 },
      });
    }
    return item;
  });

  // حذف محصول از سبد خرید
  app.post("/api/cart/remove", authMiddleware, async ({ user, body }) => {
    const userId = user.userId;
    const { productId } = body;
    const cart = await prisma.cart.findFirst({ where: { userId } });
    if (!cart) return { error: "Cart not found" };
    const item = await prisma.cartItem.findFirst({ where: { cartId: cart.id, productId } });
    if (!item) return { error: "Item not found in cart" };
    await prisma.cartItem.delete({ where: { id: item.id } });
    return { success: true };
  });

  return app;
};

export default cartRoutes;

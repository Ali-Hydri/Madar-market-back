import { status } from "elysia";
import { prisma } from "../../..";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// حافظه موقتی برای نگهداری OTPها (فقط برای تست – ریستارت سرور = پاک میشه)
const memoryOtpStore: Record<string, string> = {};

export const setOtpInMemory = (phone: string, code: string) => {
  memoryOtpStore[phone] = code;
};

const verifyOtp = async (ctx: any) => {
  try {
    const { phone, code } = ctx.body;

    if (!/^09\d{9}$/.test(phone) || !/^\d{4}$/.test(code)) {
      return status(400, { message: "اطلاعات نامعتبر" });
    }

    const record = await prisma.oTP.findFirst({
      where: { phone, code },
      orderBy: { createdAt: "desc" },
    });
    if (!record) {
      return status(400, { message: "کد نادرست است" });
    }

    if (new Date() > record.expiresAt) {
      return status(400, { message: "کد منقضی شده" });
    }

    //حذف رکورد otp
    await prisma.oTP.delete({
      where: { id: record.id },
    });

    const user = await prisma.user.upsert({
      where: { phone },
      update: {},
      create: { phone },
    });

    const token = jwt.sign(
      {
        phone,
        userId: user?.id ?? null,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    return {
      status: true,
      message: "ورود موفق!",
      token,
      user: {
        name: user.name,
        lastname: user.lastname,
        phone: user.phone,
      },
      isRegistered: !!(user.name && user.lastname), // ✅ کاربر ثبت‌نام کرده یا نه
    };
  } catch (e) {
    console.error(e);
    return status(500, { message: "خطای سرور" });
  }
};

// //ذخیره در کوکی
// const cookie = serialize('token', token, {
//   httpOnly: true,
//   path: '/',
//   maxAge: 60 * 60 * 24 * 7, // 7 روز
//   sameSite: 'lax',
//   secure: process.env.NODE_ENV === 'production',
// });

// ctx.set.headers["Set-Cookie"] = cookie;

export default verifyOtp;

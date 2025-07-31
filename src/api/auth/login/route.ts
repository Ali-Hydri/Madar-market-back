import { prisma } from "../../../index";
import { status } from "elysia";
import { setOtpInMemory } from "../verify-otp/route";

const sendOtp = async (ctx: any) => {
  try {
    const { phone } = ctx.body;

    // ۱. اعتبارسنجی شماره موبایل
    if (!/^09\d{9}$/.test(phone)) {
      return status(400, { message: "شماره موبایل نامعتبر است" });
    }

    // const user = await prisma.user.findUnique({
    //   where: { phone },
    // });

    // if (!user) {
    //   return {
    //     status: false,
    //     message: "کاربری با این شماره یافت نشد",
    //   };
    // }

    // ۲. تولید کد OTP
    const generateOTP = () =>
      Math.floor(1000 + Math.random() * 9000).toString();
    const code = generateOTP();
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // اعتبار ۲ دقیقه

    await prisma.oTP.create({
      data: {
        phone,
        code,
        expiresAt,
      },
    });

    // ۵. چاپ برای تست (در نسخه واقعی: ارسال پیامک)
    console.log("OTP برای", phone, "کد:", code);
    setOtpInMemory(phone, code); // ذخیره در حافظه برای مقایسه در verify

    // ۶. پاسخ موفق
    return {
      status: true,
      message: "کد ارسال شد",
      code,
    };
  } catch (e) {
    // خطای کلی سمت سرور
    return status(500, { message: "Internal Server Error" });
  }
};

export default sendOtp;

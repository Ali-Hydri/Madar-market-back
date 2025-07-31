import { prisma } from "../..";



const getUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users
  } catch (error) {
    return error;
  }
};

export default getUsers;

import prisma from "./db";

const findConversation = async (memberOneId: string, memberTwoId: string) => {
  return await prisma.conversation.findFirst({
    where: {
      AND: [{ memberOneId: memberOneId }, { memberTwoId: memberTwoId }],
    },
    include: {
      memberOne: {
        include: {
          profile: true,
        },
      },
      memberTwo:{
        include:{
            profile: true,
        }
      }
    },
  });
};

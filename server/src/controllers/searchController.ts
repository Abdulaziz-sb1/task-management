import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const search = async (req: Request, res: Response): Promise<void> => {
  const { query } = req.query;
  try {
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          // condition if title contains searched text
          // searching title and description
          { name: { contains: query as string } },
          { description: { contains: query as string } },
        ],
      },
    });
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { title: { contains: query as string } },
          { description: { contains: query as string } },
        ],
      },
    });


    const users = await prisma.user.findMany({
      where: {
        // checking username
        OR: [{ username: { contains: query as string } }],
      },
    });
    res.json({ tasks, projects, users });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: `Error performing search: ${err.message}` });
  }
};

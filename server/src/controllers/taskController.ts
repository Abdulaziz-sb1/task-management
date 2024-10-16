import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// retrieve all tasks
export const getTasks = async (
    req: Request,
    res: Response
):Promise<void> => {
    const { projectId } = req.query // query because it's a GET request  
    try{
        const tasks = await prisma.task.findMany({
            where: {
                projectId: Number(projectId),
            },
            include: {
                author: true,
                assignee: true,
                comments: true,
                attachments: true,
            }
        })
        res.json(tasks)
    } catch (err: any){
        res.status(500).json({ message: `Error retrieving tasks ${err.message}`})
    }
}

// create single task
export const createTask = async (
    req: Request,
    res: Response
):Promise<void> => {
    const { 
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId
     } = req.body;
    try{

        const newTask = await prisma.task.create({
            data:{
                title,
                description,
                status,
                priority,
                tags,
                startDate,
                dueDate,
                points,
                projectId,
                authorUserId,
                assignedUserId
            }
        })
        res.status(201).json(newTask)
    } catch (err: any){
        res.status(500).json({ message: `Error creating task: ${err.message}`})
    }
}

// update tasks
export const updateTask = async (
    req: Request,
    res: Response
):Promise<void> => {
    const { taskId } = req.params
    const { status } = req.body

    try{
        const updatedTask = await prisma.task.update({
            where: {
                id: Number(taskId),
            },
            data:{
                status: status
            }
        })
        res.json(updateTask)
    } catch (err: any){
        res.status(500).json({ message: `Error updating task ${err.message}`})
    }
}

export const getUserTasks = async (
    req: Request,
    res: Response
):Promise<void> => {
    const { userId } = req.params // get params
    try{
        const tasks = await prisma.task.findMany({
            where: {
                OR: [
                    {authorUserId: Number(userId)},
                    {assignedUserId: Number(userId)},
                ]
            },
            include: {
                author: true,
                assignee: true,
            }
        })
        res.json(tasks)
    } catch (err: any){
        res.status(500).json({ message: `Error retrieving users tasks ${err.message}`})
    }
}
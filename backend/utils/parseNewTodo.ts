import {Response, Request} from 'express';
import {Todo} from '../database/todos';
import {object, string, boolean} from 'yup';
import {getAccessTokenDataFromRequest} from './getAccessTokenDataFromRequest';
import {randomUUID} from 'crypto';

export const parseNewTodo = (todo: Record<string, unknown>, req: Request, res: Response): Todo => {
  try {
    const {data} = getAccessTokenDataFromRequest(req, res);
    const newTodo = {
      id: todo['id'] ?? randomUUID(),
      userId: data.userId,
      completed: todo['completed'] ?? false,
      title: todo['title'] as string,
      description: todo['description'] as string | null,
      createdAt: new Date().toISOString(),
    };

    return todoSchema.validateSync(newTodo);
  } catch (error) {
    throw res.status(400).json({error});
  }
};

const todoSchema = object({
  id: string().required(),
  title: string().required(),
  description: string().optional(),
  createdAt: string().required(),
  completed: boolean().required(),
  userId: string().required(),
});

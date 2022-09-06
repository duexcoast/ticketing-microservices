import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { currentUser, requireAuth, validateRequests } from '@duexcoast/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('A title is required'),
    body('price')
      // gt is greater than
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequests,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = new Ticket({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await ticket.save();

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };

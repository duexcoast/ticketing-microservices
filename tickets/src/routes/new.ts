import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { currentUser, requireAuth, validateRequests } from '@duexcoast/common';

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

  (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

export { router as createTicketRouter };

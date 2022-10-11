import express, { Request, Response } from 'express';
import { param } from 'express-validator';
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequests,
} from '@duexcoast/common';
import { Order } from '../models/order';

const router = express.Router();

router.get(
  '/api/orders/:orderId',
  param('orderId').isHexadecimal(),
  validateRequests,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate('ticket');

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(order);
  }
);

export { router as showOrderRouter };

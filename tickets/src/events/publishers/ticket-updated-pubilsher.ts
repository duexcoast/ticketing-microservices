import { Publisher, Subjects, TicketUpdatedEvent } from '@duexcoast/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}

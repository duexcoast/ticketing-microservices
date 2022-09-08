import { Publisher, Subjects, TicketCreatedEvent } from '@duexcoast/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}

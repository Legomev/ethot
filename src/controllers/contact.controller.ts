// Uncomment these imports to begin using these cool features!
import {service} from '@loopback/core';
import {get, response, ResponseObject} from '@loopback/rest';
import {SendgridService} from '../services/sendgrid.service';

const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
        },
      },
    },
  },
};

export class ContactController {
  constructor(
    @service(SendgridService) protected emailService: SendgridService
  ) {}

  @get('/contact')
  @response(200, PING_RESPONSE)
  ping(): object {
    // Reply with a greeting, the current time, the url, and request headers
    this.emailService.send();
    return {
      greeting: 'Email sended',
      date: new Date()
    };
  }

}

import {service} from '@loopback/core';
import {getModelSchemaRef, post, requestBody, response} from '@loopback/rest';
import {Contactinfo} from '../models';
import {SendgridService} from '../services/sendgrid.service';


export class ContactmeController {
  constructor(
    @service(SendgridService)
    public sendgridService: SendgridService,
  ) {}

  @post('/contactme')
  @response(200, {
    description: 'Contactinfo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Contactinfo)}},
  })
  async create(

    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contactinfo, {
            title: 'NewContactinfo'
          }),
        },
      },
    })
    contactinfo: Omit<Contactinfo, 'id'>,
  ): Promise<object> {
    this.sendgridService.send(contactinfo);
    return {
      message: 'Email sended',
      date: new Date()
    };
  }

}

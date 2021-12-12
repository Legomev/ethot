import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Client} from "@sendgrid/client";
import sgMail = require("@sendgrid/mail");

const msg = {
  to: 'valeriagomezsanchez@gmail.com', // Change to your recipient
  from: 'silvanalitman@gmail.com', // Change to your verified sender
  subject: 'Ethot contact form',
  text: 'This is our first email',
  html: '<strong>Please check the next URL</strong>',
}


@injectable({scope: BindingScope.TRANSIENT})
export class SendgridService {
  constructor(/* Add @inject to inject parameters */) {
    sgMail.setClient(new Client());
    sgMail.setApiKey("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");
  }

  /*
   * Add service methods here
   */
  send() {
    sgMail
      .send(msg)
      .then((response) => {
        console.log(response[0].statusCode)
        console.log(response[0].headers)
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

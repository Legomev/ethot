import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Client} from "@sendgrid/client";
import {Contactinfo} from '../models';
import sgMail = require("@sendgrid/mail");




@injectable({scope: BindingScope.TRANSIENT})
export class SendgridService {
  constructor(/* Add @inject to inject parameters */) {
    sgMail.setClient(new Client());
    sgMail.setApiKey("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");
  }

  /*
   * Add service methods here
   */
  public send(contactInfo: Contactinfo): Contactinfo {

    let msg =
    {
      to: 'valeriagomezsanchez@gmail.com', // Change to your recipient
      from: 'silvanalitman@gmail.com', // Change to your verified sender
      subject: 'The user identified with email ' + contactInfo.email,
      text: 'User waiting for an answer',
      html: contactInfo.fullname + ' send the following text: <br /> ' + contactInfo.comment + '<br /> Please, do not forget to answer to this customer.'
    };


    sgMail
      .send(msg)
      .then((response) => {
        console.log(response[0].statusCode)
        console.log(response[0].headers)
      })
      .catch((error) => {
        console.error(error)
      });

    return contactInfo;
  }
}

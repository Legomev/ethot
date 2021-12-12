import {BindingScope, injectable} from '@loopback/core';
const jwt = require('jsonwebtoken');
@injectable({scope: BindingScope.TRANSIENT})
export class SessionService {
  secretkey = "SuperS3cr3t";
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  public async generateToken(): Promise<string> {
    const payload = {
      check: true
    }
    const token = jwt.sign(payload, this.secretkey, {
      expiresIn: 1440
    })
    return token;
  }

  public validate(token: string) {
    var decoded = jwt.verify(token, this.secretkey);
    console.log(decoded);
    return true;
  }
}

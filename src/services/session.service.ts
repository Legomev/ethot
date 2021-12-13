import {BindingScope, injectable} from '@loopback/core';
const jwt = require('jsonwebtoken');
@injectable({scope: BindingScope.TRANSIENT})
export class SessionService {
  secretkey = "SuperS3cr3t";
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  public async generateToken(username: string): Promise<string> {

    let myrole = 'usuario';
    if (username == 'valeriagomezsanchez@gmail.com') {
      myrole = 'admin'
    }
    const payload = {
      role: myrole
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

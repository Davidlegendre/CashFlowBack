import { Injectable } from '@nestjs/common';

import { Config } from '../../../config/config';

const nodemailer = require('nodemailer')

@Injectable()
export class EmailFactoryService {

  //Cashflow.api@center2023
  //cashflowapicenter@gmail.com
  //nafthhtbmzyypcns
   
      async SendEmail(mensaje: string, email: string)
      {
        const transporte = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: Config().emailOwner.email,
            pass: Config().emailOwner.password
          }
        });
            transporte.sendMail({
                from: Config().emailOwner.email,
                to: email,
                subject: 'CashFlow Messages',
                text: mensaje
              }, (err,info) => {
                if(err)
                    {
                      console.error(err)                    
                    }
                else
                    {
                      console.log("enviado con exito " + info.response)

                    }
              })
      }

}

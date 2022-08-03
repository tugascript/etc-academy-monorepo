import { Controller, Get, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Controller()
export class AppController {
  @Get()
  public getInitialRoute(@Res() res: FastifyReply) {
    res.status(200).send('Server running');
  }

  @Get('/favicon.ico')
  public getFavicon(@Res() res: FastifyReply) {
    res.sendFile('/favicon.ico');
  }
}

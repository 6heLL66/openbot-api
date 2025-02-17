import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Database } from './types/supabase';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('load-collections')
  async loadCollections(
    @Body()
    body: {
      collections: Database['public']['Tables']['collections']['Insert'][];
    },
  ) {
    return this.appService.loadCollections(body.collections);
  }
}

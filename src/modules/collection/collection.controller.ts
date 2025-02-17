import { Controller, Get, Param, Query } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { Database } from '../../types/supabase';

@Controller('collections')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get()
  async getList(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<Database['public']['Tables']['collections']['Row'][]> {
    return this.collectionService.getList(limit, offset);
  }

  @Get(':name')
  async getByName(
    @Param('name') name: string,
  ): Promise<Database['public']['Tables']['collections']['Row']> {
    return await this.collectionService.getByName(name);
  }
}

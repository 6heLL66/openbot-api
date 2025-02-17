import { Injectable, NotFoundException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../../types/supabase';

@Injectable()
export class CollectionService {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
    );
  }

  async getList(
    limit: number,
    offset: number,
  ): Promise<Database['public']['Tables']['collections']['Row'][]> {
    const { data, error } = await this.supabase
      .from('collections')
      .select('*')
      .range(offset, offset + limit);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async findByName(
    name: string,
  ): Promise<Database['public']['Tables']['collections']['Row'] | null> {
    const { data, error } = await this.supabase
      .from('collections')
      .select('*')
      .eq('name', name)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async getByName(
    name: string,
  ): Promise<Database['public']['Tables']['collections']['Row']> {
    const collection = await this.findByName(name);

    if (collection == null) {
      throw new NotFoundException();
    }

    return collection;
  }
}

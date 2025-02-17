import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Chain, OpenSeaSDK } from 'opensea-js';

@Injectable()
export class AppService {
  private openseaSDK: OpenSeaSDK;
  private supabase: SupabaseClient;

  constructor() {
    const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io');

    const openseaSDK = new OpenSeaSDK(provider, {
      chain: Chain.Mainnet,
      apiKey: process.env.OPENSEA_API_KEY!,
    });

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
    );

    this.openseaSDK = openseaSDK;
    this.supabase = supabase;
  }
  getHello(): string {
    return 'Hello World!';
  }

  async getNftCollections() {
    const list = await this.openseaSDK.api.getCollections();

    return list;
  }
}

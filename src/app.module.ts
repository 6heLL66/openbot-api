import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CollectionController } from './modules/collection/collection.controller';
import { CollectionService } from './modules/collection/collection.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
    }),
  ],
  controllers: [AppController, CollectionController],
  providers: [AppService, CollectionService],
})
export class AppModule {}

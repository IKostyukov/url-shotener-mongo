import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './url/url.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UrlModule,
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017',
      /*{
      dbName: 'studentdb',
    }*/
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
// import { UpdateUrlDto } from './dto/update-url.dto';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  create(@Body() body: Partial<CreateUrlDto>) {
    return this.urlService.create(body.originalUrl);
  }

  @Get()
  findAll() {
    return this.urlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') encodedUrl: string) {
    console.log({ encodedUrl }, '<----');

    return this.urlService.findOne(encodedUrl);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urlService.delete(id);
  }
}

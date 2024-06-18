import { Injectable } from '@nestjs/common';
// import { CreateUrlDto } from './dto/create-url.dto';
// import { UpdateUrlDto } from './dto/update-url.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Url, UrlDocument } from './entities/url.entity';
import { Model } from 'mongoose';

@Injectable()
export class UrlService {
  constructor(
    @InjectModel(Url.name) private readonly model: Model<UrlDocument>,
  ) {}

  async create(originalUrl: string) {
    // const encodedInNumbersUrl = originalUrl
    //   .split('')
    //   .map((char) => char.charCodeAt(0))
    //   .join('');

    // const encodedUrl = toBase64(encodedInNumbersUrl);
    console.log(toBase64(originalUrl));
    const shortenedUrl = await this.model.findOne({ originalUrl }).exec();

    if (!shortenedUrl) {
      const newUrl = await new this.model({
        originalUrl,
        // encodedUrl,
        createdAt: new Date(),
      }).save();

      console.log(newUrl);

      return newUrl._id;
    } else {
      return shortenedUrl._id;
    }
  }

  async findAll(): Promise<Url[]> {
    return await this.model.find().exec();
  }

  async findOne(encodedUrl: string) {
    console.log(`This action returns a #${encodedUrl} url`);
    const res = await this.model.findOne({ encodedUrl }).exec();
    console.log({ res });

    return res.originalUrl;
  }

  async delete(encodedUrl: string): Promise<Url> {
    return await this.model.findByIdAndDelete(encodedUrl).exec();
  }
}

function toBase64(encodedInNumbersUrl: string): string {
  const bufferedUrl = Buffer.from(encodedInNumbersUrl);
  const hashStr_1: string = bufferedUrl.toString('base64');
  console.log(hashStr_1);

  let hashStr = '';
  const str: string =
    '012345689abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let deci = +encodedInNumbersUrl;
  while (deci > 0) {
    const b = deci % 62;
    const a = str[b] ? str[b] : '';
    hashStr = hashStr + a;
    deci = deci / 62;
    console.log('b', b, 'a', a, 'deci', deci);
  }

  return hashStr;
}

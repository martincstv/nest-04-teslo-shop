import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, fileNamer } from './helpers';
import { Response } from 'express';
import { ok } from 'assert';
import { ConfigService } from '@nestjs/config';




@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,

    private readonly configService: ConfigService

  ) { }


  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string

  ) {

    const path = this.filesService.getStaticProductImage(imageName);
    res.sendFile(path);

  }


  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    // limits: {fileSize:1000},
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer,
    })
  }))
  uploadProductImage(
    @UploadedFile() file: Express.Multer.File,
  ) {

    if (!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }

    const secureUrl = `${this.configService.get('HOST_API')}/files/product/${file.filename}`;

    return {
      secureUrl
    };
  }

}

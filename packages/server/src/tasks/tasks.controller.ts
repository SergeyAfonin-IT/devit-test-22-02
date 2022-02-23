import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../s3/s3.service';

@Controller('tasks')
export class TasksController {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: MongoRepository<Task>,
    private s3Service: S3Service,
  ) {}

  @Get()
  async get() {
    return await this.tasksRepository.find();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() file, @Body() body) {
    const name = body.name || '';
    const image = await this.s3Service.uploadFile(file);

    const tasks = this.tasksRepository.save(new Task({ name, image }));
    return tasks;
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    const { ok, value } = await this.tasksRepository.findOneAndDelete({
      _id: new ObjectId(id),
    });

    return { ok, value, id };
  }
}

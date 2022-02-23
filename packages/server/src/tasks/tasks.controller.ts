import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Controller('tasks')
export class TasksController {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: MongoRepository<Task>,
  ) {}

  @Get()
  async get() {
    return await this.tasksRepository.find();
  }

  @Post()
  create(@Body() body) {
    const tasks = this.tasksRepository.save(new Task(body));
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

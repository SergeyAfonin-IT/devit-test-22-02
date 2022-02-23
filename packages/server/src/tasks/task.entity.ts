import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('task')
export class Task {
  @ObjectIdColumn() id: ObjectID;
  @Column() name: string;
  @Column() image: string;

  constructor(task?: Partial<Task>) {
    Object.assign(this, task);
  }
}

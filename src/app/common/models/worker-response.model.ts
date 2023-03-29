import { Type } from 'class-transformer';

export class DataObject {
  id: string;
  int: number;
  float: number;
  color: string;
  @Type(() => ChildObject)
  child: ChildObject;
}

export class ChildObject {
  id: string;
  color: string;
}
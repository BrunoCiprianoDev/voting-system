import { IPosition } from "../models/position";

export interface IPositionRepository {
  create(position: IPosition): Promise<void>;
  update(position: IPosition): Promise<void>;
  findById(id: string): Promise<IPosition | null>;
  findAll(data: { contains: string, page: number, size: number }): Promise<IPosition[]>;
  delete(id: string): Promise<void>;
}
import { IPosition } from '../../../../domain/position/models/position';
import { IPositionRepository } from '../../../../domain/position/repository/positionRepository';
import BaseRepositoryPrisma from './baseRepositoryPrisma';

export class PositionRepositoryPrisma extends BaseRepositoryPrisma implements IPositionRepository {
  constructor() {
    super();
  }

  public async create({ id, name, description, election }: IPosition): Promise<void> {
    try {
      await this.dbClientInstance.position.create({
        data: {
          id,
          name,
          description,
          electionId: election.id,
        },
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  public async update({ id, name, description }: IPosition): Promise<void> {
    try {
      await this.dbClientInstance.position.update({
        where: { id },
        data: { name, description },
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  public async findById(id: string): Promise<IPosition | null> {
    try {
      return await this.dbClientInstance.position.findUnique({
        where: { id },
        include: { election: true },
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  public async findAll({
    page,
    size,
    contains,
  }: {
    page: number;
    size: number;
    contains: string;
  }): Promise<IPosition[]> {
    try {
      return await this.dbClientInstance.position.findMany({
        where: {
          name: {
            contains,
          },
        },
        skip: (page - 1) * size,
        take: +size,
        select: {
          id: true,
          name: true,
          description: true,
          election: true,
        },
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.dbClientInstance.position.delete({
        where: { id },
      });
    } catch (error) {
      this.handleError(error);
    }
  }
}

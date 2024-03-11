import { ICreateUserService } from '../services/createUserService';
import { IUserCreateData, Role } from '../models/user';
import { IHttpContext } from '../../util/adapters/httpContext';
import { ErrorHandlerControllers } from '../../util/errors/handlerError';

export interface ICreateStandardController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class CreateStandardController extends ErrorHandlerControllers implements ICreateStandardController {
  constructor(private createUserService: ICreateUserService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const body = httpContext.getRequest().body as IUserCreateData;
      const userCreateData = {
        email: body.email ?? '',
        password: body.password ?? '',
        confirmPassword: body.password ?? '',
        role: Role.Standard,
      };
      const result = await this.createUserService.execute(userCreateData);
      httpContext.send({ statusCode: 201, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}

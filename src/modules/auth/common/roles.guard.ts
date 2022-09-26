import { ROLES_KEY } from '@modules/auth/common/roles.decorator';
import { UserRoleEnum } from '@modules/auth/common/user.role.enum';
import { JwtUserDataDto } from '@modules/auth/dto/response-dto/jwt.user.data.dto';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { user }: { user: JwtUserDataDto } = context
      .switchToHttp()
      .getRequest();
    const roles: string[] = user?.userRoles?.map((userRole) => userRole.role);
    const isAuthorized: boolean = requiredRoles.some((role) =>
      roles.includes(role),
    );

    return isAuthorized;
  }
}


import { applyDecorators, UseGuards } from '@nestjs/common';
import { ValidRoles } from '../interfaces';
import { RolePortected } from './role-portected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';

export function Auth(...roles: ValidRoles[]) {
    return applyDecorators(
        RolePortected(...roles),
        UseGuards(AuthGuard(), UserRoleGuard),
    );
}

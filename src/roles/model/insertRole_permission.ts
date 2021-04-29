import { ApiProperty } from '@nestjs/swagger';
export class addPermissionToRolle {
    @ApiProperty({ required: true, type: Number })
  readonly idrole: number;
  @ApiProperty({ required: true, type: Number })
  readonly idpermssion: number;
}

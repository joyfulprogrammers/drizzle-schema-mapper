import { Entity, PrimaryColumn } from "typeorm";

/**
 * composite key인 경우
 */
@Entity()
export class UserFollow {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  followId: number;
}

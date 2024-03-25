import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, type: "varchar" })
  name: string;

  @Column({ nullable: true, type: "text" })
  description?: string;

  @Column({ nullable: false, name: "property_name", type: "varchar" })
  propertyName: string;

  @Column({ nullable: false, name: "follow_count" })
  followCount: number;
}

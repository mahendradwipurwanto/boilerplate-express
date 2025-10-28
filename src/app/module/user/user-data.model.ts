import {
    BeforeInsert,
    Column,
    Entity,
    JoinColumn,
    OneToOne, PrimaryColumn,
} from "typeorm";
import {EntityUser} from "./user.model";

import { v4 as uuidv4 } from "uuid";

@Entity("user_data")
export class EntityUserData {
    @PrimaryColumn({ type: "varchar", length: 36 })
    id: string;

    @BeforeInsert()
    generateId() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }

    // ✅ actual FK column
    @Column({type: "uuid", unique: true})
    org_id: string;

    // ✅ owning side with JoinColumn linking org_id → users.id
    @OneToOne(() => EntityUser, (org) => org.user_data, {
        onDelete: "CASCADE",
    })
    @JoinColumn({name: "org_id", referencedColumnName: "id"})
    user: EntityUser;

    @Column({type: "varchar", length: 50, nullable: true})
    email: string;

    @Column({type: "varchar", length: 50, nullable: true})
    name: string;

    @Column({type: "text", nullable: true})
    profile: string;

    @Column({type: "varchar", length: 100, nullable: true})
    phone: string;
}
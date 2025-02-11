import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as request from 'supertest';
import { Product } from "src/products/entities";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    email: string;

    @Column('text', {
        select: false,
    })
    password: string;

    @Column('text')
    fullName: string;

    @Column('bool', {
        default: true,
    })
    isActive: boolean;

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    // usuario crea productos
    @OneToMany(
        () => Product,
        (product) => product.user,
    )
    product: Product;



    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }

}

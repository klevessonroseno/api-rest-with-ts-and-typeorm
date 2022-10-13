import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {

    @PrimaryColumn({ 
        name: 'id',
        generated: 'uuid',
        unique: true,
    })
    readonly id: string;

    @Column({
        name: 'name',
        type: 'varchar',
        length: '100',
        nullable: false,  
    })
    name: string;

    @Column({
        name: 'email',
        type: 'varchar',
        length: '100',
        unique: true,
        nullable: false,
    })
    email: string;

    @Column({
        name: 'password',
        type: 'varchar',
        length: '100',
        nullable: false,
    })
    password: string
}

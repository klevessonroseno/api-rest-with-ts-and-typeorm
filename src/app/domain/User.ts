import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    private readonly id: number;

    @Column()
    private name: string;

    @Column()
    private email: string;

    @Column()
    private office: string;

    constructor(name: string, email: string, office: string) {
        this.name = name;
        this.email = email;
        this.office = office;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getOffice(): string {
        return this.office;
    }

    public setOffice(office: string): void {
        this.office = office;
    }
}

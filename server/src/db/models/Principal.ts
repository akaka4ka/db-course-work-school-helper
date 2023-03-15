class Principal {
    readonly id: string;
    readonly name: string;
    readonly surname: string;
    readonly birthdayDate: Date;

    constructor(
        id: string,
        name: string,
        surname: string,
        birthdayDate: Date
    ) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.birthdayDate = birthdayDate;
    }
}

export default Principal;

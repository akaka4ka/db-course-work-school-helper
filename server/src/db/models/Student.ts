class Student {
    readonly id: string;
    readonly name: string;
    readonly surname: string;
    readonly birthdayDate: Date;
    readonly grade: {
        id: string;
        number: number;
        letter: string;
    };

    constructor(
        id: string,
        name: string,
        surname: string,
        birthdayDate: Date,
        gradeId: string,
        gradeNumber: number,
        gradeLetter: string
    ) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.birthdayDate = birthdayDate;
        this.grade = {
            id: gradeId,
            number: gradeNumber,
            letter: gradeLetter,
        };
    }
}

export default Student;

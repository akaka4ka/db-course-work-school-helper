export class UserStore {
    static personId: string | null = null;
    static firstName: string | null = null;
    static secondName: string | null = null;
    static birthdayDate: Date | null = null;
    static grade: {
        id: string;
        number: number;
        letter: string;
    } | null = null;

    static setUserInfo(
        personId: string,
        firstName: string,
        secondName: string,
        birthdayDate: string,
        grade: {
            id: string;
            number: number;
            letter: string;
        }
    ) {
        this.personId = personId;
        this.firstName = firstName;
        this.secondName = secondName;
        this.birthdayDate = new Date(birthdayDate);
        this.grade = JSON.parse(JSON.stringify(grade));
    }

    static dropUser() {
        this.personId = null;
        this.firstName = null;
        this.secondName = null;
        this.birthdayDate = null;
        this.grade = null;
    }
}

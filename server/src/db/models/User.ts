class User {
    readonly id: string;
    readonly username: string;
    readonly hashedPassword: string;
    readonly roleId: string;
    readonly personId: string;

    constructor(id: string, username: string, hashPassword: string, roleId: string, personId: string) {
        this.id = id;
        this.username = username;
        this.hashedPassword = hashPassword;
        this.roleId = roleId;
        this.personId = personId;
    }
}

export default User;

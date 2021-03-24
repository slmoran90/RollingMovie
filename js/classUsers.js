export class Users{
    constructor(name, email, password){
        this._name = name;
        this._email = email;
        this._password = password;
        this._admin = false;
    }
}
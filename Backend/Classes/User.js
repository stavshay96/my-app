//userID
//fullName
//Email
//password

class User {
    constructor(
        userID,
        fullName,
        email,
        password
    ) {
        this.userID = userID;
        this.fullName = fullName;
        this.password = password;
        this.email = email;
    }

    //Getters

    get UserID() {
        return this.userID;
    }
    get FullName() {
        return this.fullName;
    }
    get Password() {
        return this.password;
    }
    get Email() {
        return this.email;
    }

    //Setters
    changeUserID(newUserID) {
        this.userID = newUserID;
    }
    changeFullName(newFullName) {
        this.fullName = newFullName;
    }
    changePassword(newPassword) {
        this.password = newPassword;
    }
    changeEmail(newEmail) {
        if (this.emailIsValid(newEmail)) {
            this.email = newEmail;
            return true;
        }
        return false;
    }
}

module.exports = User;
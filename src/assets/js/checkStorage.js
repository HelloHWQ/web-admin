import crypto from "./secret.js";

export default {
    isLogin() {
        var name = localStorage.getItem('name');
        var pwd = localStorage.getItem('pwd');
        if ((name != '' && name != null) && (pwd != '' && pwd != null)) {
            return crypto.Decrypt(name);
        } else {
            return '';
        }
    },
    getUserInfo() {
        var user = localStorage.getItem('curuser') || '';
        if(user) {
            user = JSON.parse(user);
        }
        return user;
    }
}
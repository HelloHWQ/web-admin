export default {
    isLogin() {
        var name = localStorage.getItem('name');
        var pwd = localStorage.getItem('pwd');
        if ((name != '' && name != null) && (pwd != '' && pwd != null)) {
            return true;
        } else {
            return false;
        }
    }
}
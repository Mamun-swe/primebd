
export const checkIfLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
        const role = token.split('.')[0]
        if (role === 'user' || 'admin') {
            return ({ role: role })
        }
        return false
    }
    return false;
};
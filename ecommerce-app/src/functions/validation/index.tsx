import { User } from "@/types/User";


export const comparePasswords = (user: User) => {
    if (user.password === user.repeat) {
        return true
    }
    return false
}

export const validateEmail = (user: User) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return !emailRegex.test(user.email) ? "Invalid email address" : null;
};

export const validatePasswordLength = (password: string) => {
    return password.length < 6 || password.length > 40
        ? "Password must be between 6 and 40 characters."
        : null;
};

export const validatePasswordSymbols = (password: string) => {
    const symbolRegex = /[@#$%^&+=-_'.!]/;
    return !symbolRegex.test(password)
        ? "Password must include at least 1 special symbol."
        : null;
};

export const validatePassword = (password: string) => {
    const lengthError = validatePasswordLength(password);

    if (lengthError) {
        return lengthError;
    }

    const symbolError = validatePasswordSymbols(password);
    if (symbolError) {
        return symbolError;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{1,}$/;
    return !passwordRegex.test(password)
        ? "Password must include 1 uppercase letter and 1 number."
        : null;
};

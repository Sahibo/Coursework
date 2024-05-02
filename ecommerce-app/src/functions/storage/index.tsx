export const setToken = async (userToken: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            localStorage.setItem('userToken', userToken);
            resolve(userToken);
        } catch (error) {
            reject(error);
        }
    });
};

export const getToken = async (): Promise<string | null> => {
    return new Promise((resolve, reject) => {
        try {
            const token = localStorage.getItem('userToken');
            resolve(token);
        } catch (error) {
            reject(error);
        }
    });
};

export const removeToken = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            localStorage.removeItem('userToken');
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};
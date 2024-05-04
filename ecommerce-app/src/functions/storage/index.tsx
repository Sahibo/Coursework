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


export const setUserId = async (userId: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            localStorage.setItem('userId', userId);
            resolve(userId);
        } catch (error) {
            reject(error);
        }
    });
};

export const getUserId = async (): Promise<string | null> => {
    return new Promise((resolve, reject) => {
        try {
            const userId = localStorage.getItem('userId');
            resolve(userId);
        } catch (error) {
            reject(error);
        }
    });
};

export const removeUserId = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            localStorage.removeItem('userId');
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

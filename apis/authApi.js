import axiosInstance from '../config/axiosInstance'

const handleLogin = async (payload) => {
    try {

        const { data } = await axiosInstance.post("/auth/login", payload);

        return { message: data.message, accessToken: data.accessToken, refreshToken: data.refreshToken }
    } catch (error) {
        console.log("Error while Logging", error);
        throw error?.response?.data?.message || "Failed to login";
    }
}

const handleRegister = async (payload) => {
    try {

        const { data } = await axiosInstance.post("/auth/register", payload);

        return { message: data.message }
    } catch (error) {
        console.log("Error while Logging", error);
        throw error.response.data.message;
    }
}

const handleLogout = async () => {
    try {

        const { data } = await axiosInstance.post("/auth/logout");

        return { message: data.message }
    } catch (error) {
        console.log("Error while Logging", error);
        throw error.response.data.message;
    }
}

const handleRefreshAccessToken = async () => {
    try {

        const refreshToken = localStorage.getItem("refreshToken");

        const { data } = await axiosInstance.post("/auth/refresh-token", { refreshToken });

        return { message: data.message, accessToken: data.accessToken }
    } catch (error) {
        console.log("Error while Logging", error);
        throw error.response.data.message;
    }
}

export { handleLogin, handleRegister, handleLogout, handleRefreshAccessToken }
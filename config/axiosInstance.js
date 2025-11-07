import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_URL, // replace with your API URL
    timeout: 10000, // optional: 10 seconds
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.log("Request interceptor error:", error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config;
        const res = error.response;
        if (res && res.status == 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {

                const refreshToken = localStorage.getItem("refreshToken");

                if (!refreshToken) {
                    return;
                }

                const { data } = await axiosInstance.post("/auth/refresh-token", { refreshToken });

                localStorage.setItem("accessToken", data.accessToken)

                // Update token for the retried request
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

                // Retry the original request
                return axiosInstance(originalRequest);
            } catch (error) {
                console.log("Error while refreshing the token on intercepter", error);
                return Promise.reject(error);
            }

        } else {
            console.log("Network or unknown error:", res.data.message);
            return Promise.reject(error);
        }

    }
)

export default axiosInstance;

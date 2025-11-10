import axiosInstance from '../config/axiosInstance'

const token = localStorage.getItem("accessToken");

const handleReportFetch = async ({ queryKey }) => {
    try {

        const [, sort, page] = queryKey;
        const params = new URLSearchParams();

        if (sort) params.append("sort", sort);
        if (page && page !== 1) params.append("page", page);

        const queryString = params.toString();
        const URL = queryString ? `/report?${queryString}` : `/report`;

        const { data } = await axiosInstance.get(URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return { reports: data.reports, pagination: data.pagination };
    } catch (error) {
        console.log("Error while fetching report", error);
        throw { status: error.response?.data?.status, message: error.response?.data?.message || "Failed to fetch reports" };
    }
};

const handleDeleteReport = async (id) => {
    try {

        const { data } = await axiosInstance.delete(`/report/delete-report/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return { message: data.message }
    } catch (error) {
        console.log("Error while Deleting report", error);
        throw { status: error.response?.data?.status, message: error.response?.data?.message || "Failed to fetch reports" };
    }
}

const handleAddReport = async (payload) => {
    try {

        const formData = new FormData();

        // Append all keys dynamically
        for (const key in payload) {
            formData.append(key, payload[key]);
        }


        const { data } = await axiosInstance.post("/report/upload-report", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
            timeout: 0
        });

        return { message: data.message, summary: data.summary, error: data.error, is_summarized: data.is_summarized, report_description: data.report_description, report_title: data.report_title }
    } catch (error) {
        console.log("Error while Updating  report", error);
        throw { status: error.response?.data?.status, message: error.response?.data?.message || "Failed to fetch reports" };
    }
}

const handleReportUpdate = async ({ payload, id }) => {
    try {
        const formData = new FormData();

        // Append all keys dynamically
        for (const key in payload) {
            formData.append(key, payload[key]);
        }

        const { data } = await axiosInstance.put(`/report/update-report/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
            timeout: 0
        });

        return { message: data.message, summary: data?.summary, error: data?.error, is_summarized: data?.is_summarized, report_description: data?.report_description, report_title: data?.report_title }
    } catch (error) {
        console.log("Error while Adding  report", error);
        throw { status: error.response?.data?.status, message: error.response?.data?.message || "Failed to fetch reports" };
    }
}

export { handleReportFetch, handleDeleteReport, handleAddReport, handleReportUpdate }
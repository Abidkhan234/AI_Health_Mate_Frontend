import * as Yup from 'yup'

const LoginSchema = Yup.object({
    identifier: Yup.string().required("Email or username required"),
    password: Yup.string().required("Password is required")
})

const registerSchema = Yup.object({
    userName: Yup.string()
        .required("User name is required")
        .min(3, "Minimum 3 characters")
        .max(20, "Maximum 20 characters"),
    email: Yup.string()
        .required("Email is required")
        .matches(/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/, "Invalid email format"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Minimum 8 characters")
        .max(20, "Maximum 20 characters")
        .matches(/[A-Z]/, "Must include at least one uppercase letter")
        .matches(/[a-z]/, "Must include at least one lowercase letter")
        .matches(/[0-9]/, "Must include at least one digit")
        .matches(/[@$!%*?&]/, "Must include at least one symbol (@, $, !, %, *, ?, &)"),
})

const addReportSchema = Yup.object({
    report_title: Yup.string().required("Report title is required").min(2, "Minimum 2 character").max(50, "Maximum 50 character"),
    report_description: Yup.string().min(20, "Minimum 20 character").max(200, "Maximum 200 character"),
    report_type: Yup.string().required("Report type is required").oneOf(["lab_report", "discharge_summary", "diagnostic_report"], "Invalid report type"),
    file: Yup.mixed()
})

export { LoginSchema, registerSchema, addReportSchema }
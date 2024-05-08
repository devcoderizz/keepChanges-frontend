import * as yup from 'yup'

export const registerSchema = yup.object({
    name: yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Name is required'),

    email: yup.string()
    .email('Invalid email address')
    .required('Email is required'),

    number: yup.string()
    .matches(/^[1-9][0-9]{9}$/, 'Invalid mobile number')
    .required('Mobile number is required'),

    password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/, 'Password must contain at least one number, and one special character')
    .required('Password is required'),

    otp: yup.string()
    .matches(/^\d{6}$/, 'OTP must be exactly 6 digits')
   
}) 
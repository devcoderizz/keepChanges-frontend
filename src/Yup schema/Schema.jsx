import * as yup from 'yup'

export const registerSchema = yup.object({
    name: yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Name is required'),

    email: yup.string()
    .email('Invalid email address')
    .required('Email is required'),

    phone: yup.string()
    .matches(
        /^(?:[6-9]\d{9}|\d{2}[1-9]\d{9})$/,
        'Invalid mobile number'
      )
      .required('Mobile number is required').matches(
        /^(?:[6-9]\d{9}|91[1-9]\d{9})$/,
        'Invalid mobile number'
      ),
    
    password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/, 'Password must contain atleast one alphabet, one special character and one number')
    .required('Password is required'),

    // otp: yup.string()
    // .matches(/^\d{6}$/, 'OTP must be exactly 6 digits')
   
}) 
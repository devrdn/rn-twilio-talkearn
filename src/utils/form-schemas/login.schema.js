import * as yup from 'yup';

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('* Enter valid email')
    .required('* This field is required'),
  password: yup.string().required('* This field is required'),
});

export default LoginSchema;

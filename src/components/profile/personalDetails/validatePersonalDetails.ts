import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().min(5, 'Email should be min 5 symbols').max(50, 'This email is too long'),
  firstName: Yup.string()
    .min(1, 'Name should be min 1 characters')
    .max(50, 'This name is too long')
    .matches(/^([A-Z][a-z]*)$/g, 'Name can only contain latin letters, start from capital letter'),
  lastName: Yup.string()
    .min(1, 'Surname should be min 2 characters')
    .max(50, 'This surname is too long')
    .matches(/^([A-Z][a-z]*)$/g, 'Surname can only contain latin letters,  start from capital letter'),
  dateOfBirth: Yup.date()
    .min(new Date('1900-01-01'), 'Date must be after 1900')
    .max(new Date(new Date().getFullYear() - 13, 11, 31), 'User should be at least 13 years'),
});

export default validationSchema;

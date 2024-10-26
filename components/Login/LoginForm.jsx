import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
});

const LoginForm = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        fetch('http://localhost:5000/api/authenticate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
          .then(async (response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            if (data.token) {
              localStorage.setItem('userToken', data.token);
              localStorage.setItem('userName', data.userName);
              localStorage.setItem('userRole', data.userRole);
              console.log(data);

              // Trigger a re-render by updating the state
              window.dispatchEvent(new Event('storage'));

              navigate('/');  // Ensure this is the correct route
            } else {
              setErrors({ password: 'Invalid email or password' });
            }
          })
          .catch(error => {
            setErrors({ password: 'Server error: ' + error.message });
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <h1 className="text-2xl font-bold text-blue-500 mb-6 text-center">1001 GIP</h1>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
            <Field
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              className="w-full mt-1 p-2  border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <Field
              type="password"
              name="password"
              placeholder="Digite sua senha"
              className="w-full mt-1 p-2  border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Entrar
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
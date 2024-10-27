import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo/Logo';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
  role: Yup.string().required('Selecione o tipo de login'),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', role: 'gestor' }}
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
        <Form className="mb-0 w-full">
          <Logo />
          <h1 className="text-2xl font-semibold text-gray-700 mt-6 mb-6 text-center">Bem-vindo(a)!</h1>
          <div className="mb-4 flex align-baseline items-baseline">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Você está acessando como:</label>
            <Field as="select" name="role" className="w-fit mt-1 p-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
              <option value="gestor">Gestor</option>
              <option value="funcionario">Funcionário</option>
              <option value="agente">Agente</option>
            </Field>
            <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
            <Field
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <Field
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Digite sua senha"
              className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
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
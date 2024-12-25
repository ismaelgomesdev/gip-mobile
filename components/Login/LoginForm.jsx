import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import styles from './login-form.module.scss';
import CustomRadioGroup from '../FormItems/CustomRadioGroup';
import PasswordToggleButton from '../FormItems/PasswordToggleButton';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
  role: Yup.string().required('Selecione o tipo de login'),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
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
          <h1 className="text-2xl font-semibold text-gray-700 mt-6 mb-6 text-center">Bem-vindo(a)!</h1>
          <CustomRadioGroup
            name="role"
            label="Você está acessando como:"
            options={[
              { label: 'Colaborador', value: 'gestor' },
              { label: 'Cidadão', value: 'funcionario' }
            ]}
          />
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail ou CPF</label>
            <Field
              type="email"
              name="email"
              placeholder="Digite seu e-mail ou CPF"
              className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="mb-5 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <div className="relative w-full">
              <Field
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                placeholder="Digite sua senha"
                className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <PasswordToggleButton
                isPasswordVisible={passwordVisible}
                onToggle={togglePasswordVisibility}
              />
            </div>
            <div className="min-h-[20px]">
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>
          </div>
          <div className="mb-5">
            <a href="#" className="text-blue-500 hover:underline text-sm">Preciso de ajuda para acessar</a>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Entrar
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
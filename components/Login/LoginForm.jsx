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
    onSubmit={(values, { setSubmitting }) => {
      // Simulação de autenticação
      setTimeout(() => {
        localStorage.setItem('userToken', 'token_simulado');
        localStorage.setItem('userName', 'João Silva');
        localStorage.setItem('userRole', 'Administrador');
        setSubmitting(false);
        navigate('/');  // Redireciona para a Home após login bem-sucedido
      }, 400);
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">E-mail</label>
          <Field
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            className="w-full mt-1 p-2 border rounded"
          />
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium">Senha</label>
          <Field
            type="password"
            name="password"
            placeholder="Digite sua senha"
            className="w-full mt-1 p-2 border rounded"
          />
          <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
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
)
};

export default LoginForm;

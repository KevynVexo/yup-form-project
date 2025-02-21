import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Definindo o esquema de validação com Yup
const schema = yup.object({
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(8, 'Senha deve ter no mínimo 8 caracteres'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas devem coincidir')
    .required('Confirmação de senha obrigatória')
}).required();

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    // Aqui você pode chamar sua API para resetar a senha
    console.log('Dados do formulário:', data);
  };

  return (
    <div>
      <h2>Resetar Senha</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nova Senha:</label>
          <input type="password" {...register('password')} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label>Confirme a Senha:</label>
          <input type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;

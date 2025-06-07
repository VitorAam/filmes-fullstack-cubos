import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import {
  useToast,
  Flex,
  Text
} from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { FormContainer } from '../components/Form/FormContainer';
import { PrimaryButton } from '../components/Buttons/PrimaryButton';
import { FormField } from '../components/Form/FormField';
import { CustomInput } from '../components/CustomInput';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const schema = z.object({
  name: z.string().min(2, 'Este nome é inválido'),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'Senha deve ter ao menos 6 caracteres')
});

type RegisterFormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });

  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: 'Erro',
        description: 'As senhas não coincidem.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await registerUser(data.name, data.email, data.password);
      login(response.token);

      toast({
        title: 'Cadastro realizado!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/filmes');
    } catch (error) {
      let message = 'Tente novamente.';

      if (isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message;
      }

      toast({
        title: 'Erro ao cadastrar.',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} >
      <FormField label={'Nome'} error={!!errors.name} errorMessage={errors.name?.message ?? ''} >
        <CustomInput id="name" type="text" {...register('name')} placeholder='Digite seu nome' />
      </FormField>

      <FormField label={'Nome/E-mail'} error={!!errors.email} errorMessage={errors.email?.message ?? ''} >
        <CustomInput id="email" type="email" {...register('email')} placeholder='Digite e-mail' />
      </FormField>

      <FormField label={'Senha'} error={!!errors.password} errorMessage={errors.password?.message ?? ''} >
        <CustomInput id="password" type="password" {...register('password')} placeholder='Digite sua senha' />
      </FormField>

      <FormField label={'Confirmação de senha'} error={!!errors.confirmPassword} errorMessage={errors.confirmPassword?.message ?? ''} >
        <CustomInput id="confirmPassword" type="password" {...register('confirmPassword')} placeholder='Digite sua senha novamente' />
      </FormField>

      <Flex justifyContent={'flex-end'} alignItems={'center'} >
        <PrimaryButton
          type="submit"
          width="full"
          isLoading={isSubmitting}
          w={'110px'}
          h={'44px'}
        >
          <Text>Cadastrar</Text>
        </PrimaryButton>
      </Flex>
    </FormContainer>
  );
}
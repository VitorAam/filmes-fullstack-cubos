import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/api';
import {
  useToast,
  Text,
  Flex
} from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { FormContainer } from '../components/Form/FormContainer';
import { PrimaryButton } from '../components/Buttons/PrimaryButton';
import { CustomLink } from '../components/Buttons/CustomLink';
import { CustomInput } from '../components/CustomInput';
import { FormField } from '../components/Form/FormField';
import { useContext } from 'react';

const schema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof schema>;

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data.email, data.password);
      login(response.token);
      navigate('/filmes');
    } catch (error) {
      let message = 'Tente novamente.';

      if (isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message;
      }

      toast({
        title: 'Erro ao fazer login.',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} >
      <FormField label={'Nome/E-mail'} error={!!errors.email} errorMessage={errors.email?.message ?? ''} >
        <CustomInput id="email" type="email" {...register('email')} placeholder='Digite seu nome/E-mail' />
      </FormField>

      <FormField label={'Senha'} error={!!errors.password} errorMessage={errors.password?.message ?? ''} >
        <CustomInput id="password" type="password" {...register('password')} placeholder='Digite sua senha' />
      </FormField>

      <Flex justifyContent={'space-between'} alignItems={'center'} >
        <CustomLink>
          Esqueci minha senha
        </CustomLink>
        <PrimaryButton
          type="submit"
          width="full"
          isLoading={isSubmitting}
          w={'83px'}
          h={'44px'}
        >
          <Text>Entrar</Text>
        </PrimaryButton>
      </Flex>
    </FormContainer>
  );
}
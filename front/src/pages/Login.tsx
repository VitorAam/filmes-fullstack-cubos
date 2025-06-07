import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  useToast
} from '@chakra-ui/react';
import { Layout } from '../components/Layout';
import { isAxiosError } from 'axios';

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
  const { login } = useAuth();

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
    <Layout>
      <Heading size="lg">Login</Heading>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">E-mail</FormLabel>
          <Input id="email" type="email" {...register('email')} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Senha</FormLabel>
          <Input id="password" type="password" {...register('password')} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          width="full"
          mt={6}
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </form>
    </Layout>
  );
}
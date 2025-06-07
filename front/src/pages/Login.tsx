import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  Text,
  Flex
} from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FormContainer } from '../components/Form/FormContainer';
import { PrimaryButton } from '../components/Buttons/PrimaryButton';
import { CustomLink } from '../components/Buttons/CustomLink';

const schema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof schema>;

export default function LoginPage() {
  const { toggleTheme } = useContext(ThemeContext)
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
      <FormContainer onSubmit={handleSubmit(onSubmit)} >
        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email" color={'mauve.12'}>Nome/E-mail</FormLabel>
          <Input id="email" type="email" {...register('email')} placeholder='Digite seu nome/E-mail' />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.password}>
          <FormLabel htmlFor="email" color={'mauve.12'}>Senha</FormLabel>
          <Input id="password" type="password" {...register('password')} placeholder='Digite sua senha' />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Flex justifyContent={'space-between'} alignItems={'center'} >
          <CustomLink>
            Esqueci minha senha
          </CustomLink>
          <PrimaryButton
            type="submit"
            width="full"
            isLoading={isSubmitting}
            onClick={() => toggleTheme()}
            w={'83px'}
            h={'44px'}
          >
            <Text>Entrar</Text>
          </PrimaryButton>
        </Flex>
      </FormContainer>
  );
}
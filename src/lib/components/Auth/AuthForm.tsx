import {
  Group,
  Divider,
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title
} from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UserAuthCheck } from './UserAuthCheck';
import { signIn } from 'next-auth/react';
import { Loader } from '@mantine/core';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FacebookButton, GoogleButton } from '../Buttons/AuthButtons';
import Link from 'next/link';

interface LoginFormProps {
  title: string;
  buttonTitle: string;
  isForSignUp: boolean;
}

let baseSchema = {
  username: z
    .string()
    .min(1, { message: 'Username cannot be empty' })
    .max(50, { message: 'Username should be under 50 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password should be at least 8 characters' })
    .max(64, { message: 'Password should be under 64 characters' })
};

const loginFormSchema = z.object(baseSchema);
const signupFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name cannot be empty' })
    .max(50, { message: 'Name should be less than 50 characters' }),
  ...baseSchema
});

type SignUpFormData = z.infer<typeof signupFormSchema>;
type LoginFormData = z.infer<typeof loginFormSchema>;

type FormData = SignUpFormData | LoginFormData;

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80)'
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: '100vh',
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%'
    }
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`
  },

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}));

export function AuthForm({ title, buttonTitle, isForSignUp }: LoginFormProps) {
  const { classes } = useStyles();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<SignUpFormData>({
    resolver: zodResolver(isForSignUp ? signupFormSchema : loginFormSchema)
  });

  const onSubmit = async (data: FormData) => {
    setError('');
    setMessage('');
    setisLoading(false);
    if (!isForSignUp) {
      setisLoading(true);
      const res = await signIn('credentials', {
        username: data.username,
        password: data.password,
        type: 'login',
        redirect: false
      });

      if (res && res.ok) {
        setMessage('Signed In Successfully, Redirecting...');
        setisLoading(false);
        router.push('/');
      } else {
        setError('Invalid Credentials');
        setisLoading(false);
      }
    } else {
      setisLoading(true);
      const res = await signIn('credentials', {
        name: data.username,
        username: data.username,
        password: data.password,
        type: 'signup',
        redirect: false
      });

      if (res && res.ok) {
        setMessage('Account Created, Redirecting...');
        setisLoading(false);
        router.push('/');
      } else {
        setError('Invalid Credentials');
        setisLoading(false);
      }
    }
  };

  let nameInput;
  let loginExistense;

  if (isForSignUp) {
    nameInput = (
      <>
        <TextInput {...register('name')} label="Name" placeholder="Name" size="md" />
        {errors.name?.message && <span className="text-red-700">ⓘ {errors.name?.message}</span>}
      </>
    );
    loginExistense = (
      <UserAuthCheck message="Already have an account?" action="Log in" link="/login" />
    );
  } else {
    loginExistense = (
      <UserAuthCheck message={"Don't have an account?"} action="Sign up" link="/signup" />
    );
  }

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
          <Link href="/">
            <span className="font-logo text-6xl">Zavy</span>
          </Link>
        </Title>

        <Group grow mb="md" mt="md">
          <GoogleButton onClick={() => signIn('google')} radius="xl">
            Google
          </GoogleButton>
          <FacebookButton onClick={() => signIn('facebook')} radius="xl">
            Facebook
          </FacebookButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={handleSubmit(onSubmit)}>
          {nameInput}
          <TextInput
            {...register('username')}
            label="Username"
            placeholder="Username"
            mt="md"
            size="md"
          />
          {errors.username?.message && (
            <span className="text-red-700">ⓘ {errors.username?.message}</span>
          )}
          <PasswordInput
            {...register('password')}
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
          />
          {errors.password?.message && (
            <span className="text-red-700">ⓘ {errors.password?.message}</span>
          )}
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button type="submit" className="bg-black hover:bg-slate-800" fullWidth mt="xl" size="md">
            {isLoading ? <Loader color="white" variant="dots" /> : buttonTitle}
          </Button>
        </form>
        {loginExistense}
      </Paper>
    </div>
  );
}

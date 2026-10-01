import AuthLayout from '@/shared/ui/AuthLayout';
import { LoginForm } from '@/features/auth';

const LoginPage = () => (
  <AuthLayout>
    <LoginForm />
  </AuthLayout>
);

export default LoginPage;
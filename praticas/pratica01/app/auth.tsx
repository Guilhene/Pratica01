import AuthScreen from '@/screens/AuthScreen';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../store/auth-context';
import { useRouter } from 'expo-router';

export default function AuthPageRoute() {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (authCtx.userName) {
      router.replace('/(tabs)');
    }
  }, [authCtx.userName]);

  return <AuthScreen />;
}

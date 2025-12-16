import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import LoadingSpinner from '../components/LoadingSpinner';
import { theme } from '../styles/theme';
import { globalStyles } from '../styles/globalStyles';
import { platformStyles } from '../utils/platform';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Täytä kaikki kentät');
      return;
    }

    setError('');
    setLoading(true);

    const result = await login(username.trim(), password);

    setLoading(false);

    if (result.success) {
      router.replace('/(tabs)/home');
    } else {
      setError(result.error || 'Kirjautuminen epäonnistui');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.title}>To-Do Sovellus</Text>
          <Text style={styles.subtitle}>Kirjaudu sisään jatkaaksesi</Text>

          <View style={styles.form}>
            <CustomInput
              label="Käyttäjänimi"
              value={username}
              onChangeText={setUsername}
              placeholder="Syötä käyttäjänimi"
              autoCapitalize="none"
              error={error && !username.trim() ? error : ''}
            />

            <CustomInput
              label="Salasana"
              value={password}
              onChangeText={setPassword}
              placeholder="Syötä salasana"
              secureTextEntry
              error={error && !password.trim() ? error : ''}
            />

            {error && username.trim() && password.trim() && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            <CustomButton
              title="Kirjaudu sisään"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={styles.loginButton}
            />

            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                Testikäyttäjä: testuser / test123
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    padding: theme.spacing.xl,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xxl,
    fontWeight: '500',
  },
  form: {
    marginTop: theme.spacing.lg,
  },
  loginButton: {
    marginTop: theme.spacing.md,
  },
  errorText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
  infoContainer: {
    marginTop: theme.spacing.xl,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primaryLight + '15',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.primaryLight + '30',
  },
  infoText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
});


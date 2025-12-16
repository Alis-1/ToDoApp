import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import CustomButton from '../../components/CustomButton';
import { theme } from '../../styles/theme';
import { globalStyles } from '../../styles/globalStyles';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Kirjaudu ulos',
      'Haluatko varmasti kirjautua ulos?',
      [
        {
          text: 'Peruuta',
          style: 'cancel',
        },
        {
          text: 'Kirjaudu ulos',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(user?.name || user?.username || 'U').charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>

        <Text style={styles.name}>{user?.name || user?.username || 'Käyttäjä'}</Text>
        <Text style={styles.username}>@{user?.username || 'käyttäjä'}</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="person" size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Käyttäjätunnus</Text>
              <Text style={styles.infoValue}>{user?.username || '-'}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.actionsSection}>
        <CustomButton
          title="Kirjaudu ulos"
          onPress={handleLogout}
          variant="danger"
          style={styles.logoutButton}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>To-Do App v1.0.0</Text>
        <Text style={styles.footerText}>React Native & Expo</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  content: {
    padding: theme.spacing.lg,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  avatarContainer: {
    marginBottom: theme.spacing.lg,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.lg,
    borderWidth: 4,
    borderColor: theme.colors.background,
  },
  avatarText: {
    fontSize: 42,
    fontWeight: '800',
    color: theme.colors.background,
    letterSpacing: -1,
  },
  name: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: '800',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    letterSpacing: -0.5,
  },
  username: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    fontWeight: '600',
    marginTop: theme.spacing.xs,
  },
  infoSection: {
    marginBottom: theme.spacing.xl,
  },
  infoCard: {
    backgroundColor: theme.colors.surfaceElevated,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    marginBottom: theme.spacing.md,
    ...theme.shadows.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  infoValue: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.text,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  actionsSection: {
    marginBottom: theme.spacing.lg,
  },
  logoutButton: {
    marginTop: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
  },
  footer: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  footerText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textDisabled,
    marginBottom: theme.spacing.xs,
    fontWeight: '500',
  },
});


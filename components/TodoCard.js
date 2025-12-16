import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { theme } from '../styles/theme';
import { globalStyles } from '../styles/globalStyles';

const TodoCard = ({ todo }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={[styles.card, globalStyles.card]}>
        <View style={styles.header}>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusBadge,
                todo.completed
                  ? styles.statusCompleted
                  : styles.statusPending,
              ]}
            >
              <Text style={styles.statusText}>
                {todo.completed ? 'Valmis' : 'Kesken'}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.title}>{todo.text || todo.title}</Text>

        {todo.description && (
          <Text style={styles.description}>{todo.description}</Text>
        )}

        {todo.image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: todo.image }} style={styles.image} />
          </View>
        )}

        {todo.createdAt && (
          <Text style={styles.date}>
            Luotu: {new Date(todo.createdAt).toLocaleDateString('fi-FI')}
          </Text>
        )}

        {todo.updatedAt && todo.updatedAt !== todo.createdAt && (
          <Text style={styles.date}>
            Päivitetty: {new Date(todo.updatedAt).toLocaleDateString('fi-FI')}
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  card: {
    margin: theme.spacing.md,
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.lg,
  },
  header: {
    marginBottom: theme.spacing.md,
  },
  statusContainer: {
    alignItems: 'flex-start',
  },
  statusBadge: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.round,
  },
  statusCompleted: {
    backgroundColor: theme.colors.success,
  },
  statusPending: {
    backgroundColor: theme.colors.warning,
  },
  statusText: {
    color: theme.colors.background,
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: '800',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    letterSpacing: -0.5,
    lineHeight: 32,
  },
  description: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    lineHeight: 24,
    marginBottom: theme.spacing.lg,
  },
  imageContainer: {
    marginVertical: theme.spacing.md,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: theme.borderRadius.md,
    resizeMode: 'cover',
  },
  date: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textDisabled,
    marginTop: theme.spacing.sm,
  },
});

export default TodoCard;


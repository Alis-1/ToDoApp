import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { globalStyles } from '../styles/globalStyles';

const TodoItem = ({ todo, onToggle, onDelete, onPress }) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        globalStyles.card,
        isTablet && styles.containerTablet,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <TouchableOpacity
        style={styles.content}
        onPress={() => onToggle(todo.id)}
        activeOpacity={0.7}
      >
        <View style={[
          styles.checkbox,
          todo.completed && styles.checkboxCompleted
        ]}>
          {todo.completed && (
            <Ionicons name="checkmark" size={18} color={theme.colors.background} />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              todo.completed && styles.titleCompleted,
            ]}
            numberOfLines={2}
          >
            {todo.text || todo.title}
          </Text>
          {todo.description && (
            <Text
              style={[
                styles.description,
                todo.completed && styles.descriptionCompleted,
              ]}
              numberOfLines={2}
            >
              {todo.description}
            </Text>
          )}
          {todo.image && (
            <Image source={{ uri: todo.image }} style={styles.thumbnail} />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(todo.id)}
        activeOpacity={0.8}
      >
        <Ionicons name="trash-outline" size={18} color={theme.colors.background} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 2.5,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceElevated,
  },
  checkboxCompleted: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: theme.colors.textDisabled,
  },
  description: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  descriptionCompleted: {
    color: theme.colors.textDisabled,
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginLeft: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 48,
    minHeight: 48,
    ...theme.shadows.sm,
  },
  containerTablet: {
    maxWidth: '48%',
  },
});

export default TodoItem;


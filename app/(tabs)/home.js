import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTodos } from '../../context/TodoContext';
import { useAuth } from '../../context/AuthContext';
import TodoItem from '../../components/TodoItem';
import LoadingSpinner from '../../components/LoadingSpinner';
import { theme } from '../../styles/theme';
import { globalStyles } from '../../styles/globalStyles';

export default function HomeScreen() {
  const { todos, loading, loadTodos, toggleTodo, deleteTodo } = useTodos();
  const { user } = useAuth();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  useEffect(() => {
    loadTodos();
  }, []);

  const handleTodoPress = (todo) => {
    router.push(`/todo/${todo.id}`);
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
  };

  const handleToggle = async (id) => {
    await toggleTodo(id);
  };

  if (loading && todos.length === 0) {
    return (
      <View style={globalStyles.container}>
        <LoadingSpinner />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, isTablet && styles.headerTablet]}>
        <Text style={[styles.greeting, isTablet && styles.greetingTablet]}>
          Hei {user?.name || user?.username || 'Käyttäjä'}!
        </Text>
        <Text style={[styles.subtitle, isTablet && styles.subtitleTablet]}>
          {todos.length} {todos.length === 1 ? 'tehtävä' : 'tehtävää'}
        </Text>
      </View>

      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onPress={() => handleTodoPress(item)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[
          styles.listContent,
          isTablet && styles.listContentTablet,
        ]}
        numColumns={isTablet ? 2 : 1}
        columnWrapperStyle={isTablet ? styles.columnWrapper : null}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="checkmark-circle-outline" size={80} color={theme.colors.textDisabled} />
            </View>
            <Text style={[styles.emptyTitle, isTablet && styles.emptyTitleTablet]}>
              Ei tehtäviä vielä
            </Text>
            <Text style={[styles.emptyText, isTablet && styles.emptyTextTablet]}>
              Lisää ensimmäinen tehtävä{'\n'}välilehdestä "Lisää"!
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadTodos} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  header: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xl + 20,
    paddingBottom: theme.spacing.lg,
    ...theme.shadows.lg,
  },
  greeting: {
    fontSize: theme.fontSize.xxl,
    fontWeight: '800',
    color: theme.colors.background,
    marginBottom: theme.spacing.xs,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.background,
    opacity: 0.95,
    fontWeight: '500',
  },
  listContent: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xxl,
    minHeight: 400,
  },
  emptyIconContainer: {
    marginBottom: theme.spacing.lg,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  emptyText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
  // Responsive styles
  headerTablet: {
    paddingHorizontal: theme.spacing.xxl,
  },
  greetingTablet: {
    fontSize: theme.fontSize.xxxl,
  },
  subtitleTablet: {
    fontSize: theme.fontSize.lg,
  },
  listContentTablet: {
    paddingHorizontal: theme.spacing.lg,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  emptyTitleTablet: {
    fontSize: theme.fontSize.xxl,
  },
  emptyTextTablet: {
    fontSize: theme.fontSize.lg,
  },
});


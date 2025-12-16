import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTodos } from '../../context/TodoContext';
import TodoCard from '../../components/TodoCard';
import CustomButton from '../../components/CustomButton';
import LoadingSpinner from '../../components/LoadingSpinner';
import { theme } from '../../styles/theme';
import { globalStyles } from '../../styles/globalStyles';

export default function TodoDetailScreen() {
  const { id } = useLocalSearchParams();
  const { todos, toggleTodo, deleteTodo } = useTodos();
  const router = useRouter();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const foundTodo = todos.find((t) => t.id.toString() === id.toString());
    if (foundTodo) {
      setTodo(foundTodo);
    } else {
      Alert.alert('Virhe', 'Tehtävää ei löytynyt', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    }
  }, [id, todos]);

  const handleToggle = async () => {
    if (todo) {
      const result = await toggleTodo(todo.id);
      if (result.success && result.data) {
        // Käytä palvelimelta saatu data joka sisältää kaikki kentät
        setTodo(result.data);
      }
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Poista tehtävä',
      'Haluatko varmasti poistaa tämän tehtävän?',
      [
        {
          text: 'Peruuta',
          style: 'cancel',
        },
        {
          text: 'Poista',
          style: 'destructive',
          onPress: async () => {
            const result = await deleteTodo(todo.id);
            if (result.success) {
              router.back();
            }
          },
        },
      ]
    );
  };

  if (!todo) {
    return (
      <View style={globalStyles.container}>
        <LoadingSpinner />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TodoCard todo={todo} />
      <View style={styles.actions}>
        <CustomButton
          title={todo.completed ? 'Merkitse tekemättömäksi' : 'Merkitse tehdyksi'}
          onPress={handleToggle}
          variant={todo.completed ? 'outline' : 'primary'}
          style={styles.actionButton}
        />
        <CustomButton
          title="Poista tehtävä"
          onPress={handleDelete}
          variant="danger"
          style={styles.actionButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  actions: {
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  actionButton: {
    marginBottom: theme.spacing.sm,
  },
});


import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTodos } from '../../context/TodoContext';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomImagePicker from '../../components/ImagePicker';
import { theme } from '../../styles/theme';
import { globalStyles } from '../../styles/globalStyles';

export default function AddTodoScreen() {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { createTodo } = useTodos();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const handleImageSelected = (selectedImage) => {
    setImage(selectedImage);
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      Alert.alert('Virhe', 'Syötä tehtävän nimi');
      return;
    }

    setLoading(true);

    const todoData = {
      text: text.trim(),
      description: description.trim() || null,
      completed: false,
      image: image || null,
    };

    const result = await createTodo(todoData);

    setLoading(false);

    if (result.success) {
      Alert.alert('Onnistui', 'Tehtävä luotu onnistuneesti', [
        {
          text: 'OK',
          onPress: () => {
            setText('');
            setDescription('');
            setImage(null);
            router.push('/(tabs)/home');
          },
        },
      ]);
    } else {
      Alert.alert('Virhe', result.error || 'Tehtävän luominen epäonnistui');
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
        <View style={[styles.content, isTablet && styles.contentTablet]}>
          <Text style={[styles.title, isTablet && styles.titleTablet]}>
            Lisää uusi tehtävä
          </Text>

          <CustomInput
            label="Tehtävän nimi *"
            value={text}
            onChangeText={setText}
            placeholder="Syötä tehtävän nimi"
            autoFocus
          />

          <CustomInput
            label="Kuvaus"
            value={description}
            onChangeText={setDescription}
            placeholder="Syötä kuvaus (valinnainen)"
            multiline
            numberOfLines={4}
          />

          <Text style={styles.sectionTitle}>Kuva (valinnainen)</Text>
          <CustomImagePicker
            onImageSelected={handleImageSelected}
            initialImage={image}
          />

          <CustomButton
            title="Luo tehtävä"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading || !text.trim()}
            style={styles.submitButton}
          />
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
    padding: theme.spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: '800',
    color: theme.colors.text,
    marginBottom: theme.spacing.xl,
    letterSpacing: -0.5,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    letterSpacing: 0.3,
  },
  submitButton: {
    marginTop: theme.spacing.xl,
  },
  contentTablet: {
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  titleTablet: {
    fontSize: theme.fontSize.xxxl,
  },
});


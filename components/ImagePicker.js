import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { theme } from '../styles/theme';

const CustomImagePicker = ({ onImageSelected, initialImage = null }) => {
  const [image, setImage] = useState(initialImage);

  const requestPermissions = async (needsCamera) => {
    // Webissä oikeudet käsitellään automaattisesti selaimen kautta
    if (Platform.OS === 'web') {
      return true;
    }
    
    if (needsCamera) {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus !== 'granted') {
        Alert.alert(
          'Kameran oikeudet vaaditaan',
          'Sovellus tarvitsee luvan käyttää kameraa kuvien ottamiseen. Voit myöntää oikeudet laitteen asetuksista.',
          [{ text: 'OK' }]
        );
        return false;
      }
    }
    
    const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (libraryStatus !== 'granted') {
      Alert.alert(
        'Gallerian oikeudet vaaditaan',
        'Sovellus tarvitsee luvan käyttää galleriaa kuvien valitsemiseen. Voit myöntää oikeudet laitteen asetuksista.',
        [{ text: 'OK' }]
      );
      return false;
    }
    
    return true;
  };

  const pickImage = async () => {
    // Webissä käytetään suoraan file inputia, ei Alert-dialogia
    if (Platform.OS === 'web') {
      const hasPermission = await requestPermissions(false);
      if (hasPermission) {
        await pickFromLibrary();
      }
      return;
    }
    
    Alert.alert(
      'Lisää kuva tehtävään',
      'Valitse mistä haluat lisätä kuvan:',
      [
        {
          text: 'Ota kuva',
          onPress: async () => {
            const hasPermission = await requestPermissions(true);
            if (hasPermission) {
              await takePicture();
            }
          },
        },
        {
          text: 'Valitse galleriasta',
          onPress: async () => {
            const hasPermission = await requestPermissions(false);
            if (hasPermission) {
              await pickFromLibrary();
            }
          },
        },
        {
          text: 'Peruuta',
          style: 'cancel',
        },
      ]
    );
  };

  const takePicture = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const selectedImage = result.assets[0].uri;
        setImage(selectedImage);
        if (onImageSelected) {
          onImageSelected(selectedImage);
        }
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Virhe', 'Kuvan ottaminen epäonnistui');
    }
  };

  const pickFromLibrary = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const selectedImage = result.assets[0].uri;
        setImage(selectedImage);
        if (onImageSelected) {
          onImageSelected(selectedImage);
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Virhe', 'Kuvan valinta epäonnistui');
    }
  };

  const removeImage = () => {
    setImage(null);
    if (onImageSelected) {
      onImageSelected(null);
    }
  };

  return (
    <View style={styles.container}>
      {image ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.changeButton} onPress={pickImage}>
              <Text style={styles.buttonText}>Vaihda kuva</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
              <Text style={styles.buttonText}>Poista</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.pickerButton} onPress={pickImage}>
          <Text style={styles.pickerButtonText}>Lisää kuva</Text>
          <Text style={styles.pickerButtonSubtext}>
            {Platform.OS === 'web' ? 'Valitse kuva tiedostosta' : 'Ota kuva tai valitse galleriasta'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.md,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  changeButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.sm,
  },
  removeButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.sm,
  },
  buttonText: {
    color: theme.colors.background,
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
  },
  pickerButton: {
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
    backgroundColor: theme.colors.surfaceElevated,
    ...theme.shadows.sm,
  },
  pickerButtonIcon: {
    fontSize: 32,
    marginBottom: theme.spacing.xs,
  },
  pickerButtonText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  pickerButtonSubtext: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
    textAlign: 'center',
  },
});

export default CustomImagePicker;


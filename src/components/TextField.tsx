import React from 'react';
import {View, TextInput, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface TextFieldProps {
  value: string;
  onChangeText?: (text: string) => void;
  label?: string;
  placeholder?: string;
  onCopy?: () => void;
  readOnly?: boolean;
  icon?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  value,
  onChangeText,
  label,
  placeholder,
  onCopy,
  readOnly = false,
  icon,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#6b7280"
            editable={!readOnly}
          />
          {(icon || onCopy) && (
            <TouchableOpacity onPress={onCopy} disabled={!onCopy}>
              <Icon
                name={icon || 'content-copy'}
                size={20}
                color={onCopy ? '#7c3aed' : '#6b7280'}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 8,
  },
  container: {
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2d35',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    paddingVertical: 12,
  },
});

export default TextField; 
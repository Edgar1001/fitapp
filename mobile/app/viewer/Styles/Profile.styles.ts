// Profile.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fdf2f8',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#db2777',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#fff0f6',
    borderRadius: 16,
    padding: 20,
    paddingTop: 10,
    marginTop: -20,
    borderWidth: 2,
    borderColor: '#f472b6',
    shadowColor: '#ec4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ec4899',
    backgroundColor: '#fbcfe8',
    alignSelf: 'center',
    marginBottom: 10,
  },
  photoButton: {
    backgroundColor: '#ec4899',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#fce7f3',
    borderColor: '#f472b6',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 12,
    color: '#4c1d95',
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#f472b6',
    borderRadius: 10,
    backgroundColor: '#fce7f3',
    marginBottom: 12,
  },
  picker: {
    height: 55,
    color: '#4c1d95',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#db2777',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#831843',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  checkboxText: {
    fontSize: 14,
    color: '#111827',
  }
});

export default styles;

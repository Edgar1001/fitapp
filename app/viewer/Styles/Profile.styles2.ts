import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#0f172a', // dark navy
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#93c5fd', // light blue
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#1e293b', // slate-800
    borderRadius: 16,
    padding: 20,
    paddingTop: 10,
    marginTop: -20,
    borderWidth: 2,
    borderColor: '#3b82f6', // blue-500
    shadowColor: '#1e3a8a', // blue-800
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#60a5fa', // blue-400
    backgroundColor: '#1e40af', // blue-900
    alignSelf: 'center',
    marginBottom: 10,
  },
  photoButton: {
    backgroundColor: '#3b82f6', // blue-500
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#1e3a8a',
    borderColor: '#60a5fa',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 12,
    color: '#dbeafe',
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#60a5fa',
    borderRadius: 10,
    backgroundColor: '#1e3a8a',
    marginBottom: 12,
  },
  picker: {
    height: 55,
    color: '#bfdbfe',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#2563eb', // blue-600
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
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
    color: '#93c5fd', // light blue
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: '#94a3b8', // slate-400
    borderRadius: 8,
  },
  checkboxText: {
    fontSize: 14,
    color: '#dbeafe',
  },
});

export default styles;

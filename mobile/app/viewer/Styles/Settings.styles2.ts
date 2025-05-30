import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black', // light blue
  },
  optionButton: {
    backgroundColor: '#1e3a8a', // blue-800
    padding: 12,
    marginBottom: 20,
    width: '60%',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#3b82f6', // blue-500
  },
  optionText: {
    fontSize: 16,
    color: '#dbeafe', // blue-100
    fontWeight: 'bold',
  },
  dropdown: {
    marginBottom: 20,
    backgroundColor: '#1e293b', // slate-800
    borderRadius: 8,
    padding: 10,
    width: '60%',
    alignItems: 'center',
    borderColor: '#3b82f6',
    borderWidth: 1,
  },
  dropdownOption: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0f2fe',
  },
  contactContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    
  },
  scrollContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  epicMessage: {
    fontSize: 13,
    fontFamily: 'Lord of the Rings',
    color: 'black',
    textAlign: 'center',
    padding: 20,
    flexWrap: 'wrap',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#2563eb', // blue-600
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;

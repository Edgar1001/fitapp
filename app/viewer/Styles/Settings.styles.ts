// Settings.styles.ts
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
    color: '#831843',
  },
  optionButton: {
    backgroundColor: '#831843',
    padding: 12,
    marginBottom: 20,
    width: '50%',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 4,
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  dropdown: {
    marginBottom: 20,
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 10,
    width: '50%',
    alignItems: 'center',
    borderColor: '#831843',
    borderWidth: 1,
  },
  dropdownOption: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#831843',
    borderRadius: 8,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f7f5eb',
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
    color: '#831843',
    textAlign: 'center',
    padding: 20,
    flexWrap: 'wrap',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#831843',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default styles;

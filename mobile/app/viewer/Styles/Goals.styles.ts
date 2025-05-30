// Goals.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    backgroundColor: '#fce7f3',
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#fce7f3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerRow: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 4,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#831843',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f3e8ff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 16,
  },
  suggestionBox: {
    backgroundColor: '#ede9fe',
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  suggestionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#6b21a8',
    marginBottom: 4,
  },
  suggestionText: {
    fontSize: 15,
    color: '#4b5563',
    marginBottom: 6,
  },
});

export default styles;

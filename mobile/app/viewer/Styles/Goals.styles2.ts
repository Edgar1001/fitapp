// Goals.styles2.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    backgroundColor: '#1e293b', // slate-800
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#1e293b', // slate-800
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
    color: '#60a5fa', // blue-400
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1e40af', // blue-800
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  errorText: {
    color: '#f87171', // red-400
    fontSize: 16,
  },
  suggestionBox: {
    backgroundColor: '#3b82f6', // blue-500
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  suggestionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#e0f2fe', // light blue text
    marginBottom: 4,
  },
  suggestionText: {
    fontSize: 15,
    color: '#f1f5f9', // slate-100
    marginBottom: 6,
  },
});

export default styles;

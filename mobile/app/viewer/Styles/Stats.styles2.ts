// Stats.styles2.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1e293b', // slate-800
    paddingBottom: 40,
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
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#60a5fa', // blue-400
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1e40af', // blue-800
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  cardText: {
    fontSize: 16,
    color: '#f1f5f9', // slate-100
    marginBottom: 10,
  },
  chartContainer: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
});

export default styles;

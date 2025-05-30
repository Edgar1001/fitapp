// Stats.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fce7f3',
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
    color: '#831843',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#e0f2fe',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  chartContainer: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
});

export default styles;

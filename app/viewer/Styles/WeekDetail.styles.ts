import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 32,
    backgroundColor: '#fdf2f8', // Soft pink background
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#be185d', // Deep pink
  },
  progressBarBg: {
    height: 10,
    backgroundColor: '#ffffff', // White uncompleted bar
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 6,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#ec4899', // Pink fill color (completed portion)
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9ca3af', // Light gray for percentage
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fdf2f8',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#fbcfe8',
  },
  dayLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#be185d', // Pink percentage color moved here
    marginBottom: 4,
  },
});

export default styles;



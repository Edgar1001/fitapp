import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scroll: {
    paddingBottom: 32,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#f1f5f9',
  },
  progressBarBg: {
    height: 12,
    backgroundColor: '#334155', 
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressBarFill: {
    height: 12,
    borderRadius: 6,
    backgroundColor: '#60a5fa',
  },
  progressText: {
    marginTop: 4,
    color: '#94a3b8', 
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#1e293b',
    backgroundColor: '#0f172a',
  },
  dayLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#38bdf8', 
    marginBottom: 4,
  },
});



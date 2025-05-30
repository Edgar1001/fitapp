// Home.styles.ts
import { StyleSheet } from 'react-native';

export const mainGradientColors = ['#fdf2f8', '#fbcfe8', '#e9d5ff'] as const;


export const getGradientColors = (progress: number): [string, string, ...string[]] => {
  if (progress === 0) return ['#fef2f2', '#fde8e8', '#fcdcdc', '#f8c8dc'];
  if (progress <= 39) return ['#fff7ed', '#ffe5b4', '#ffd6a5', '#ffb86f'];
  if (progress <= 60) return ['#fefce8', '#fef9c3', '#fde68a', '#fcd34d'];
  if (progress <= 90) return ['#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1'];
  return ['#fff9db', '#ffe57f', '#ffd700', '#ffc107'];
};

export const getActivityBackground = (status: 'done' | 'ignored' | 'forgotten') => {
  if (status === 'done') return '#d1fae5';
  if (status === 'ignored') return '#fee2e2';
  return '#fdf2f8';
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  scroll: {
    padding: 16,
    paddingBottom: 32,
  },
  welcomeContainer: {
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#db2777',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: '#fbcfe8',
  },
  welcomeMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#831843',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff0f6',
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#f472b6',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  progressBarBg: {
    height: 10,
    backgroundColor: '#fdeffb',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#ec4899',
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6b7280',
    marginBottom: 14,
  },
  activityItem: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#f472b6',
  },
  activityTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  ignoreBtn: {
    backgroundColor: '#fce7f3',
    borderColor: '#f472b6',
  },
  doneBtn: {
    backgroundColor: '#d1fae5',
    borderColor: '#22c55e',
  },
  dateSelectorContainer: {
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    gap: 10,
  },
  dateButton: {
    backgroundColor: '#ffffff',
    borderColor: '#ec4899',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 10,
  },
  selectedDateButton: {
    backgroundColor: '#ec4899',
  },
  dateButtonText: {
    fontWeight: 'bold',
    color: '#ec4899',
  },
  selectedDateButtonText: {
    color: '#ffffff',
  },
  avatarContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statusDot: {
    position: 'absolute',
    bottom: 6,
    right: 8,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#22c55e',
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
  },
  statusText: {
    fontSize: 12,
    color: '#16a34a',
    fontWeight: 'bold',
    marginTop: 4,
  },
  welcomeButtons: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 12,
  },
  welcomeButton: {
    backgroundColor: '#fbcfe8',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ec4899',
  },
  welcomeButtonText: {
    fontWeight: 'bold',
    color: '#831843',
  },
  previewOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    zIndex: 999,
  },
  previewBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewWrapper: {
    width: '90%',
    aspectRatio: 3 / 4,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '85%',
    height: '100%',
    borderRadius: 30,
  },
  completedChip: {
    backgroundColor: '#FF69B4',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 8,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedChipText: {
    color: '#fff',
    fontWeight: '700',
    marginRight: 6,
  },
  completedChipCheck: {
    color: 'limegreen',
    fontSize: 16,
  },

});

export default styles;


import { StyleSheet } from 'react-native';

// Main background gradient (dark masculine theme)
export const mainGradientColors = ['#0f172a', '#1e293b', '#1e3a8a'] as const;

// Dynamic header gradient based on progress (soft, elegant tones)
export const getGradientColors = (progress: number): [string, string, ...string[]] => {
  if (progress === 0) {
    // Soft neutral slate gradient for zero progress
    return ['#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b'] as const;
  }

  if (progress <= 39) {
    // Very soft red gradient for light warning tone
    return ['#fee2e2', '#fecaca', '#fca5a5', '#f87171'] as const;
  }

  if (progress <= 60) {
    // Gentle green gradient for encouraging moderate progress
    return ['#dcfce7', '#bbf7d0', '#86efac', '#4ade80'] as const;
  }

  if (progress <= 90) {
    // Subtle blue-cool gradient for near completion
    return ['#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8'] as const;
  }

  // Soft celebratory gold with better contrast for white text
return ['#facc15', '#eab308', '#ca8a04', '#a16207'] as const;

};



// Background color for activity cards based on status
export const getActivityBackground = (status: string): string => {
  switch (status) {
    case 'done':
      return '#d1fae5'; // green-100
    case 'ignored':
      return '#fee2e2'; // red-100
    default:
      return '#f0f9ff'; // light blue background
  }
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
    shadowColor: '#1e3a8a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    backgroundColor: '#1e40af',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#ffffff',
    backgroundColor: '#3b82f6',
  },
  welcomeMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#e0f2fe',
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: '#1e3a8a',
  },
  progressBarBg: {
    height: 10,
    backgroundColor: '#dbeafe',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2563eb',
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 14,
  },
  activityItem: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#3b82f6',
    backgroundColor: '#f0f9ff',
  },
  activityTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: '#0f172a',
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
    backgroundColor: '#e0f2fe',
    borderColor: '#60a5fa',
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
    borderColor: '#3b82f6',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 10,
  },
  selectedDateButton: {
    backgroundColor: '#3b82f6',
  },
  dateButtonText: {
    fontWeight: 'bold',
    color: '#3b82f6',
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
    borderColor: '#ffffff',
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
    backgroundColor: '#bfdbfe',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  welcomeButtonText: {
    fontWeight: 'bold',
    color: '#1e3a8a',
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
    backgroundColor: '#1e3a8a', // deep navy blue
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 8,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedChipText: {
    color: '#e0f2fe', // soft blue-gray for readability
    fontWeight: '700',
    marginRight: 6,
  },
  completedChipCheck: {
    color: '#34d399', // teal-green checkmark for contrast
    fontSize: 16,
  },
  
  
});

export default styles;

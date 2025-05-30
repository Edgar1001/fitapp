import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#0f172a', // dark navy
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#93c5fd', // light blue
    marginBottom: 10,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#1e293b', // slate-800
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  dateText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#93c5fd',
    fontWeight: 'bold',
  },
  input: {
    height: 44,
    borderColor: '#3b82f6',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 12,
    borderRadius: 8,
    backgroundColor: '#1e3a8a',
    color: '#dbeafe',
    justifyContent: 'center',
  },
  activitiesContainer: {
    marginTop: 20,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    backgroundColor: '#1e40af', // dark blue
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  activityName: {
    fontWeight: 'bold',
    color: '#dbeafe',
  },
  activityTime: {
    fontSize: 14,
    color: '#a5b4fc',
  },
  buttonGroup: {
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  changeDateButton: {
    backgroundColor: '#334155',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  changeDateButtonText: {
    color: '#f1f5f9',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  deleteButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  viewButton: {
    backgroundColor: '#059669',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#10b981',
  },
  viewButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#dbeafe',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#60a5fa',
    marginBottom: 10,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  cancelButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  pastActivityItem: {
    backgroundColor: '#334155', // dark grey-blue
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
    color: '#dbeafe',
    backgroundColor: '#1e3a8a',
    borderRadius: 8,
    padding: 10,
    borderColor: '#60a5fa',
    borderWidth: 1,
  },
});

export default styles;

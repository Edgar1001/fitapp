// Calendar.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fce7f3',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#db2777',
    marginBottom: 10,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff0f6',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#f472b6',
  },
  dateText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#831843',
    fontWeight: 'bold',
  },
  input: {
    height: 44,
    borderColor: '#f472b6',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 12,
    borderRadius: 8,
    backgroundColor: '#fce7f3',
    justifyContent: 'center',
  },
  activitiesContainer: {
    marginTop: 20,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    backgroundColor: '#fff0f6',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f472b6',
  },
  activityName: {
    fontWeight: 'bold',
    color: '#4c1d95',
  },
  activityTime: {
    fontSize: 14,
    color: '#6b7280',
  },
  buttonGroup: {
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#f472b6',
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
    backgroundColor: '#e5e7eb',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  changeDateButtonText: {
    color: '#374151',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#fecaca',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f472b6',
  },
  deleteButtonText: {
    color: '#7f1d1d',
    fontWeight: 'bold',
    fontSize: 14,
  },
  viewButton: {
    backgroundColor: '#bbf7d0',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f472b6',
  },
  viewButtonText: {
    color: '#374151',
    fontWeight: 'bold',
    fontSize: 14,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f472b6',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e91e63',
    marginBottom: 10,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#f472b6',
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
    backgroundColor: '#d1d5db',
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
  },
});

export default styles;

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a', // dark navy background
  },
  topBar: {
    height: 50,
    backgroundColor: '#64748b', // slate-800
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  menuButton: {
    marginRight: 15,
    position: 'relative',
  },
  menuText: {
    color: '#ffffff',
    fontSize: 24,
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sidebar: {
    position: 'absolute',
    top: 50,
    left: 0,
    width: 250,
    bottom: 0,
    backgroundColor: 'rgba(30, 41, 59, 0.95)', // slate-900 w/ opacity
    zIndex: 10,
    padding: 20,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    borderTopRightRadius: 40,
  },
  sidebarButton: {
    backgroundColor: '#1e3a8a', // blue-800
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#3b82f6', // blue-500
  },
  sidebarButtonText: {
    color: '#dbeafe', // blue-100
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#dc2626', // red-600
    borderColor: '#ef4444',     // red-500
  },
  logoutButtonText: {
    color: '#ffffff',
  },
  sidebarIcon: {
    marginRight: 10,
  },
  sidebarButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: '#0f172a', // match safeArea
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hamburgerIcon: {
    width: 30,
    height: 22,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  line: {
    width: 30,
    height: 3,
    backgroundColor: '#e0f2fe', // light blue line
    borderRadius: 2,
  },
  splash: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: 'rgba(96, 165, 250, 0.2)', // translucent blue
    top: -10,
    left: -4,
  },
  settingsButton: {
    backgroundColor: '#334155', // slate-700
    borderColor: '#1e293b',     // slate-800
  },
});

export default styles;

// Viewer.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fce7f3',
  },
  topBar: {
    height: 50,
    backgroundColor: '#020202',
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
    color: 'white',
    fontSize: 24,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sidebar: {
    position: 'absolute',
    top: 50,
    left: 0,
    width: 250,
    bottom: 0,
    backgroundColor: 'rgba(17, 17, 17, 0.8)',
    zIndex: 10,
    padding: 20,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderTopRightRadius: 40,
  },
  sidebarButton: {
    backgroundColor: '#fbcfe8',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ec4899',
  },
  sidebarButtonText: {
    color: '#831843',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    borderColor: '#f87171',
  },
  logoutButtonText: {
    color: 'white',
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
    backgroundColor: '#fce7f3',
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
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  splash: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: 'rgba(241, 236, 238, 0.83)',
    top: -10,
    left: -4,
  },
  settingsButton: {
    backgroundColor: '#6b7280',
    borderColor: '#4b5563',
  },
});

export default styles;

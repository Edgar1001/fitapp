// backgroundLocationTask.ts
import * as TaskManager from 'expo-task-manager';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import { API_BASE_URL } from './config'; // adjust path

export const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  console.log(`[${new Date().toISOString()}] 🔁 TaskManager triggered.`);

  if (error) {
    console.error('❌ Background location task error:', error);
    return;
  }

  if (!data) {
    console.warn('⚠️ No data in background task trigger.');
    return;
  }

  const { locations } = data as { locations: Location.LocationObject[] };
  const latestLocation = locations[0];

  if (latestLocation) {
    const { latitude, longitude } = latestLocation.coords;
    console.log(`[${new Date().toISOString()}] 📌 Latest coords: ${latitude}, ${longitude}`);

    try {
      const userIdStr = await SecureStore.getItemAsync('userId');
      const userId = userIdStr ? parseInt(userIdStr, 10) : null;

      if (!userId) {
        console.warn('⚠️ No userId found in SecureStore.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/locations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, latitude, longitude }),
      });

      console.log('📤 POST response status:', response.status);
      if (!response.ok) {
        const text = await response.text();
        console.error('❌ Failed to save location. Response:', text);
      }
    } catch (e) {
      console.error('❌ Error saving background location:', e);
    }
  }
});

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IS_FIRST_LAUNCH_KEY: string = 'isFirstLaunch';
interface OnboardingHook {
  showOnboarding: boolean;
  finishOnboarding: () => Promise<void>;
  }

/**
 * A custom hook that manages the onboarding state and persistence.
 * Determines if the app is being launched for the first time and handles the onboarding flow.
 * 
 * @returns {Object} An object containing:
 *   - showOnboarding: boolean - Indicates whether onboarding should be displayed
 *   - finishOnboarding: () => Promise<void> - Function to complete the onboarding process
 * 
 * @example
 * ```tsx
 * const { showOnboarding, finishOnboarding } = useOnboarding();
 * 
 * if (showOnboarding) {
 *   return <OnboardingScreen onComplete={finishOnboarding} />;
 * }
 * ```
 */
export function useOnboarding(): OnboardingHook {
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);

  useEffect(() => {
    fetchOnboardingStatus();
  }, []);

/**
 * Fetches the onboarding status from AsyncStorage to determine if this is the first app launch.
 * Sets the showOnboarding state based on the stored value.
 * 
 * @async
 * @throws {Error} Logs error to console if AsyncStorage access fails
 */
  const fetchOnboardingStatus = async (): Promise<void> => {
    try {
      const isFirstLaunch = await AsyncStorage.getItem(IS_FIRST_LAUNCH_KEY);
      setShowOnboarding(isFirstLaunch === 'true');
    } catch (error) {
      console.error('Error fetching onboarding status:', error);
    }
  };

/**
 * Completes the onboarding process by setting the first launch flag to false in AsyncStorage
 * and updating the onboarding visibility state.
 * 
 * @throws {Error} When there's an error saving to AsyncStorage
 * @returns {Promise<void>} A promise that resolves when the onboarding status is updated
 */
  const finishOnboarding = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem(IS_FIRST_LAUNCH_KEY, 'false');
      setShowOnboarding(false);
    } catch (error) {
      console.error('Error setting onboarding status:', error);
    }
  };

  return { showOnboarding, finishOnboarding };
}
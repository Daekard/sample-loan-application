export function restrictNumberInput(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'Tab') {
        event.preventDefault();
    }
}

/**
 * Small utility function to read a value from the session storage or return null if it doesn't exist
 * @param key The key to read from the session storage
 */
export function loadFromSessionStorage<T>(key: string): T | null {
    const storedState = sessionStorage.getItem(key);
    if (storedState) {
        return JSON.parse(storedState) as T;
    } else {
        return null;
    }
}
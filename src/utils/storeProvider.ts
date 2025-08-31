import { store } from '../store';

// Simple store provider for Lit components
export class StoreProvider {
  private static instance: StoreProvider;
  private subscribers: Set<() => void> = new Set();

  static getInstance(): StoreProvider {
    if (!StoreProvider.instance) {
      StoreProvider.instance = new StoreProvider();
    }
    return StoreProvider.instance;
  }

  subscribe(callback: () => void): () => void {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  notify(): void {
    this.subscribers.forEach(callback => callback());
  }

  getState() {
    return store.getState();
  }

  dispatch(action: any) {
    store.dispatch(action);
    this.notify();
  }
}

export const storeProvider = StoreProvider.getInstance();

// Subscribe to store changes
store.subscribe(() => {
  storeProvider.notify();
});

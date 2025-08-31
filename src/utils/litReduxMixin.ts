import { LitElement } from 'lit';
import { storeProvider } from './storeProvider';

export const LitReduxMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  class LitReduxElement extends superClass {
    private unsubscribe?: () => void;

    connectedCallback() {
      super.connectedCallback();
      this.unsubscribe = storeProvider.subscribe(() => {
        this.requestUpdate();
      });
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      if (this.unsubscribe) {
        this.unsubscribe();
      }
    }

    protected get store() {
      return storeProvider.getState();
    }

    protected dispatch(action: any) {
      storeProvider.dispatch(action);
    }
  }

  return LitReduxElement;
};

type Constructor<T = {}> = new (...args: any[]) => T;

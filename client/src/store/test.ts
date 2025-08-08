import { create } from 'zustand';

// 1. Define the type for the store's state and actions
interface CounterState {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
}

// 2. Create the store with type annotations
const useCounterStore = create<CounterState>((set) => ({
  bears: 0,
  increasePopulation: () =>
    set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears: number) => set({ bears: newBears }),
}));

export default useCounterStore;

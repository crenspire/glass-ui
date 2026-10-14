/* The provider refracts the most recently pushed backdrop; pages push their own on mount and pop it on unmount. */
export interface BackdropEntry<T> { id: number; src: T; live?: boolean }

export function pushBackdrop<T>(stack: BackdropEntry<T>[], e: BackdropEntry<T>) {
  return [...stack.filter(x => x.id !== e.id), e]
}

export function popBackdrop<T>(stack: BackdropEntry<T>[], id: number) {
  return stack.filter(x => x.id !== id)
}

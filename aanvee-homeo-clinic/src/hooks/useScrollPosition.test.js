import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import useScrollPosition from './useScrollPosition';

describe('useScrollPosition', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  it('returns 0 initially when page is not scrolled', () => {
    const { result } = renderHook(() => useScrollPosition());
    expect(result.current).toBe(0);
  });

  it('updates when window is scrolled', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 150, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(150);
  });

  it('tracks multiple scroll position changes', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe(50);

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe(200);

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe(0);
  });

  it('cleans up event listener on unmount', () => {
    const { unmount } = renderHook(() => useScrollPosition());

    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});

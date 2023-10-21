import { createContext, useContext, useEffect, useState } from 'react';

export const breakpoints = {
  xlg: 1200,
  lg: 992,
  md: 768,
  sm: 576,
  xsm: 0,
  /**
 * Compares two breakpoint values and returns true if the first value is smaller than the second value.
 * @param {number} a - The first breakpoint value to compare.
 * @param {number} b - The second breakpoint value to compare.
 * @returns {boolean} - a<b
 */
  smaller(a, b) {
    return this[a] < this[b];
  },

  /**
   * Compares two breakpoint values and returns true if the first value is larger than the second value.
   * @param {number} a - The first breakpoint value to compare.
   * @param {number} b - The second breakpoint value to compare.
   * @returns {boolean} - a>b
   */
  larger(a, b) {
    return this[a] > this[b];
  },

  /**
   * Compares two breakpoint values and returns true if the first value is larger than or equal to the second value.
   * @param {number} a - The first breakpoint value to compare.
   * @param {number} b - The second breakpoint value to compare.
   * @returns {boolean} -a>=b
   */
  largerOrEqual(a, b) {
    return this[a] >= this[b];
  },

  /**
   * Compares two breakpoint values and returns true if the first value is smaller than or equal to the second value.
   * @param {number} a - The first breakpoint value to compare.
   * @param {number} b - The second breakpoint value to compare.
   * @returns {boolean} - a<=b
   */
  smallerOrEqual(a, b) {
    return this[a] <= this[b];
  },

  /**
   * Compares two breakpoint values and returns true if the first value is equal to the second value.
   * @param {number} a - The first breakpoint value to compare.
   * @param {number} b - The second breakpoint value to compare.
   * @returns {boolean} - a==b
   */
  equal(a, b) {
    return this[a] === this[b];
  },

};
const BreakpointsContext = createContext(null);

export const useBreakpoints = () => useContext(BreakpointsContext);

export default function BreakpointsProvider({ children }) {
  const [breakpoint, setBreakpoint] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newBreakpoint = Object.keys(breakpoints).find((key) => width > breakpoints[key]);
      if (breakpoint != newBreakpoint) setBreakpoint(newBreakpoint);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <BreakpointsContext.Provider value={{ breakpoint }}>
      {children}
    </BreakpointsContext.Provider>
  );
}
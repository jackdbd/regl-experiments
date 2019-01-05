import {
  toBeEmpty,
  toBeInTheDocument,
  toBeVisible,
  toHaveClass,
  toHaveTextContent,
} from "jest-dom";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import "jest-dom/extend-expect";
import "react-testing-library/cleanup-after-each";

/* Extend jest with custom matchers for the DOM.
 * https://github.com/gnapse/jest-dom
 */
expect.extend({
  toBeEmpty,
  toBeInTheDocument,
  toBeVisible,
  toHaveClass,
  toHaveTextContent,
});

/* Extend jest with a custom matcher for visual regressions.
 * https://github.com/americanexpress/jest-image-snapshot
 */
expect.extend({ toMatchImageSnapshot });

/* Visual regression tests take a lot of time, and the default 5000ms timeout
 * might not be enough.
 */
jest.setTimeout(30000);

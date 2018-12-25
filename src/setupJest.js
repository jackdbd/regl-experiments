/* extend jest with custom matchers from jest-dom
 * https://github.com/gnapse/jest-dom
 */
import "jest-dom/extend-expect";
/* Visual regression tests take a lot of time, and the default 5000ms timeout
 * might not be enough.
 */
jest.setTimeout(30000);

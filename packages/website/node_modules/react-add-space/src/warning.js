// @flow

let warning = () => {};

if (__DEV__) {
  warning = function warn(condition, message) {
    if (typeof console !== 'undefined') {
      if (!condition) {
        console.error(`Warning from <Spacer />: ${message}`);
      }
    }
  };
}

export default warning;

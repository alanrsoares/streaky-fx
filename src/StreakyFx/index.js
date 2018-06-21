export const map = (predicate: Event => any) => handler => (event: Event) =>
  handler(predicate(event));

export const filter = (predicate: Event => boolean) => handler => {
  let started = null;

  return (event: Event) => {
    const elapsed = Date.now() - started;

    if (!predicate(event, elapsed)) {
      return;
    }

    started = Date.now();

    handler(event);
  };
};

export const throttle = (timeout: number) =>
  filter((_, elapsed) => elapsed >= timeout);

export const debounce = (timeout: number) => handler => {
  let started = null;
  let debounceId = null;

  return event => {
    event.persist(); // needed for react >= 16.3

    const elapsed = Date.now() - started;

    if (elapsed <= timeout) {
      window.clearTimeout(debounceId);
    }

    const debounceHandler = () => handler(event);

    // reset state and delay handler
    started = Date.now();
    debounceId = window.setTimeout(debounceHandler, timeout);
  };
};

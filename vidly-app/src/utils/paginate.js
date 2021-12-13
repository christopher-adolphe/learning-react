import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;

  return _(items) // Creating a LoDash wrapper with `items` array param so that we can chain LoDash methods
    .slice(startIndex) // Slicing the `items` array at the `startIndex`
    .take(pageSize) // Taking the number of elements from the sliced array
    .value() // Unwrapping the value obtained after chaining the LoDash methods
}

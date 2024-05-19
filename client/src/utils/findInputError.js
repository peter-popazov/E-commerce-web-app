export function findInputError(errors, id) {
  const filtered = Object.keys(errors)
    .filter((key) => key.includes(id))
    .reduce((cur, key) => {
      return Object.assign(cur, { error: errors[key] });
    }, {});
  return filtered;
}

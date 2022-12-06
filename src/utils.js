export function getNewId(arrayObjects) {
  let keys = arrayObjects.reduce((acc, object) => {
    return [...acc, object.id];
  }, []);
  let result = Math.max(...keys) + 1;
  return result;
}

export const getDefaultValues = (partialState: Record<string, string | number | boolean>, initialState: Record<string, string | number | boolean>) => {
  return Object.entries(partialState)
    .reduce((acc, [key, value]) => {
      if (value === null || value === undefined) {
        return { ...acc, [key]: (initialState)[key] };
      }

      return { ...acc, [key]: value }
    }, {});
};

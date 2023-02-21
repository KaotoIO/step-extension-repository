export const hasOwn = <T extends object,>(obj: T, fieldName?: string | keyof T): fieldName is keyof T => {
  return typeof fieldName === 'string'
    && Object.hasOwn(obj, fieldName);
}

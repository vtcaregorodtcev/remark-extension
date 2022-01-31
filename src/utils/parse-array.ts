export const parseArray = <T>(val: string): T[] => JSON.parse(val || '[]');

let mock = JSON.parse(localStorage.getItem('mock') || '{}');

export type StorageType = 'sync' | 'local';

export const getStorage = (type: StorageType = 'sync') => chrome?.storage?.[type] || {
  get: ([key]: string[], cb: (result: Record<string, string>) => void) => { cb(mock) },
  set: (setObj: Record<string, string>, cb: Function) => {
    mock = { ...mock, ...setObj };

    cb();

    localStorage.setItem('mock', JSON.stringify(mock));
  }
}
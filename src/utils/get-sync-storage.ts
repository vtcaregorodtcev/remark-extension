let mock = JSON.parse(localStorage.getItem('mock') || '{}');

export const getSyncStorage = () => chrome?.storage?.sync || {
  get: ([key]: string[], cb: (result: Record<string, string>) => void) => { cb(mock) },
  set: (setObj: Record<string, string>, cb: Function) => {
    mock = { ...mock, ...setObj };

    cb();

    localStorage.setItem('mock', JSON.stringify(mock));
  }
}
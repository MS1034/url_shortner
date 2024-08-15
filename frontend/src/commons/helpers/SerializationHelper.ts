type RenameKeys<T, R extends Record<string, string>> = {
  [K in keyof T as K extends keyof R ? R[K] : K]: K extends keyof R
    ? T[K]
    : T[K];
};

type Serializable<T> = {
  [K in keyof T]: T[K];
};

export default function transformData<T extends Record<string, any>>(
  data: T[],
  renameKeys: Record<keyof T, string>,
  excludeKeys: (keyof T)[]
): Serializable<T>[] {
  return data.map((item) => {
    const transformedItem = Object.keys(item).reduce((acc, key) => {
      if (!excludeKeys.includes(key as keyof T)) {
        const newKey = renameKeys[key as keyof T] || key;
        acc[newKey as keyof T] = item[key];
      }
      return acc;
    }, {} as Serializable<T>);

    return transformedItem;
  });
}

export interface TableColumnConfig<T> {
  displayName: string;
  show: boolean;
  render?: (row: T) => React.ReactNode;
}

export type TableConfig<T> = {
  [key in keyof T]?: TableColumnConfig<T>;
};

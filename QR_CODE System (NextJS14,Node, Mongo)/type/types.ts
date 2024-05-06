export type Diff<Type, ExcludeKeys extends keyof any> = Pick<Type, Exclude<keyof Type, ExcludeKeys>>;

export interface QrDataItem {
    title: string;
    originalUrl: string;
    shortId: string;
    filePath: string;
    status: string;
    user: string;
    scan: string;
    // include other properties as needed
  }


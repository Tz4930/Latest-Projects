type Diff<Type, ExcludeKeys extends keyof any> = Pick<Type, Exclude<keyof Type, ExcludeKeys>>;

// File: typeUtilities.ts

// Omit properties from type T that are also in type K
type OmitWithTag<T, K extends keyof any> = Omit<T, K>;

// Corrected Diff type to explicitly include properties in T that are not in Base
type Diff<Base, T extends Base> = { 
    [P in Exclude<keyof T, keyof Base>]: T[P]; 
};

// A compile-time check that enforces the passed type argument to have no properties
function checkFields<T extends { [k in keyof any]: never }>(): void {}

// Use `export type` for exporting types/interfaces
export type { Diff, OmitWithTag };
export { checkFields };

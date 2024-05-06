
// File: utils/checkApiRoutes.ts
import * as authRoute from '../app/api/auth/route';
import { Diff, checkFields } from './typeUtilities'; // Assume these are defined/imported correctly

// Import the RouteHandlers interface
import { RouteHandlers } from '../type/apiRouteTypes';

// New utility type to exclude the 'default' property
type ExcludeDefault<T> = { [P in Exclude<keyof T, 'default'>]: T[P] };

// Use the utility type to exclude 'default' before applying Diff
type CleanedAuthRoute = ExcludeDefault<typeof authRoute>;
type AuthRouteType = Diff<RouteHandlers, CleanedAuthRoute>;

// Perform the compile-time check
checkFields<AuthRouteType>(); 
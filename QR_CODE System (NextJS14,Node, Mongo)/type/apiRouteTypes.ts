// File: types/apiRouteTypes.ts

// Define a type that represents the possible methods your API routes can have.
// This example includes a subset of HTTP methods, but you can extend it as needed.
interface RouteHandlers {
    GET?: Function;
    POST?: Function;
    PUT?: Function;
    DELETE?: Function;
    PATCH?: Function;
    OPTIONS?: Function;
    // Add any other methods or properties expected in your route handlers.
  }
  
  // Export the type so it can be imported elsewhere in your project.
  export type{ RouteHandlers };
  
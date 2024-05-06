type JWTPayload = {
    userId: string;
  };
  
  function parseJwt(token: string): JWTPayload | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window.atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
  
      return JSON.parse(jsonPayload) as JWTPayload;
    } catch (error) {
      console.error("Failed to parse JWT", error);
      return null;
    }
  }
  
  export { parseJwt };
  
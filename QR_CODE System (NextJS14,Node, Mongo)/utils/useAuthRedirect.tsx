
const useAuthRedirect = (): void => {
        // Ensure code runs only on client side
        if (typeof window === 'undefined') {
            return;
        }

        const token = localStorage.getItem('token');
        const path = window.location.pathname;

        // Redirect to login if no token and not already on the login page
        if (!token && path !== '/Login') {
            window.location.href = '/Login';
        }

        // Redirect to the root if there's a token and on the Login page
        if (token && path === '/Login') {
            window.location.href = '/';
        }
};

export default useAuthRedirect;

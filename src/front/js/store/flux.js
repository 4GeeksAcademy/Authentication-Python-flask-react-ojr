const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            token: sessionStorage.getItem('token') || null,
            message: null,
            demo: [
                {
                    title: 'FIRST',
                    background: 'white',
                    initial: 'white'
                },
                {
                    title: 'SECOND',
                    background: 'white',
                    initial: 'white'
                }
            ]
        },
        actions: {
            login: async (email, password) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password })
                    });
                    if (resp.status !== 200) {
                        alert('There has been some error');
                        return false;
                    }
                    const data = await resp.json();
                    sessionStorage.setItem('token', data.token);
                    setStore({ token: data.token });
                    return true;
                } catch (error) {
                    console.error('Error during login:', error);
                }
            },
            logout: () => {
                sessionStorage.removeItem('token');
                setStore({ token: null });
            },
            getMessage: async () => {
                // Existing code...
            },
            changeColor: (index, color) => {
                // Existing code...
            }
        }
    };
};

export default getState;

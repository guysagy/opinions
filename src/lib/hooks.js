import { useState, useEffect } from 'react';

export function useIsClient() {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);
    return isClient;
}

export function useFormState(action) {
    const [state, setState] = useState({ loading: false, error: null });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setState({loading: true, error: null});
        const form = event.currentTarget;
        const formData = new FormData(form);
        console.log('formData = ', formData);
        try {
            const result = await action(formData);
            if (result?.isError) {
                setState({loading: false, error: result.message});
            } else {
                form.reset();
                setState({loading: false, error: null});
            }
        } catch (error) {
            console.log('[CommentForm] error : ', error);
            setState({loading: false, error});
        }
    }

    return [state, handleSubmit];
}

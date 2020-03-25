import React, {useState} from 'react';
import { signup } from '../helpers/auth';

function Signup() {

    const [errors, setErrors] = useState('');

    const signIn = async (method) => {
        try {
            await signup(method);
        } catch(err) {
            setErrors(err);
        }
    }

    return (        
        <div>
            <button onClick={() => signIn('google')}>Signup with Google!</button>
            <button onClick={() => signIn('facebook')}>Signup with Google!</button>
            {errors.length > 0 ? <p>{errors}</p> : null}
        </div>
    )
}

export default Signup

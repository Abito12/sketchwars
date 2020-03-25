import { auth } from '../services/firebase';

export const signup = (method) => {
    let provider = null;
    switch(method.toLowerCase()){
        case 'google':
            provider = new auth.GoogleAuthProvider();
            break;
        case 'facebook':
            provider = new auth.FacebookAuthProvider();
            break;
        default:
            provider = new auth.GoogleAuthProvider();
    }
    return auth().signInWithPopup(provider);    
}
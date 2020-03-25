import { db } from "../services/firebase";

export const seedUser = (collection, user) => {
    db.ref(collection).push({  
        "uid": user.uid,
        "creationTime": Date.now(),
        "gamesPlayed": 0,
        "gamesWon": 0,
        "gamesForfeit": 0,
        "email": user.email,
        "name": user.displayName || user.email,
        "streak": 0,
        "prefferedLanguageId": "en"
    });
}

export const seedAppConfig = (collection="appConfig") => {
    db.ref(collection).push({  
        "roundTime": 10,
        "theme": "light",
        "numQuestions": 10,
        "questionScore": 20
    });
}

export const seedCategory = (collection="categories", cats) => {
    cats.map(c => {
        return db.ref(collection).push({
            "name": c
        });
    });    
}


export const seedLanguage = (collection="languages", langs) => {    
    langs.map(c => {
        return db.ref(collection).push({
            "name": c
        });
    });    
}


export const seedQuestions = (collection="questionBank", questions) => {    
    questions.map(c => {
        return db.ref(collection).push(c);
    });    
}



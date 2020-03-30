export const getRandomIndex = arr => Math.floor(Math.random() * arr.length);

export const shuffleArray = (array=[]) => {
    let temp = [];
    const originalLength = array.length;
    for (var i = 0; i < originalLength; i++) {
        temp.push(array.splice(Math.floor(Math.random()*array.length),1));
    }
    return temp;
}

export const isEmptyObj = (obj) => {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

export const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

export const getInitials = (sen) => {
    return sen.split(" ").map(w => w[0]).join("");
}


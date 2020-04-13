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

export const mapCodeToLanguage = (code) => {
    switch(code.toLowerCase()) {              
      case 'ml':
        return "Malayalam";
      case 'en':
      default:
        return "English";
    }
  }

export const randomWithProbability = (n=5, min=8, max=16) => {
    // creates an array with n zeroes followed by numbers ranging from min...max.
    // this ensures that the probability to get zero is increased
    let probabilityArray = [...(new Array(n)).fill(0), ...[...Array(max).keys() ].splice(min)];
    let idx = Math.floor(Math.random() * probabilityArray.length);
    return probabilityArray[idx];
  }

  export const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

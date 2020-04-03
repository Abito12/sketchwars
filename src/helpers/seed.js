import { db } from "../services/firebase";

export const seedUser = (collection, user) => {
  db.ref(collection).push({
    uid: user.uid,
    creationTime: Date.now(),
    gamesPlayed: 0,
    gamesWon: 0,
    gamesForfeit: 0,
    email: user.email,
    name: user.displayName || user.email,
    streak: 0,
    prefferedLanguageId: "en"
  });
};

export const seedAppConfig = (collection = "appConfig") => {
  db.ref(collection).push({
    roundTime: 10,
    theme: "light",
    numQuestions: 10,
    questionScore: 20
  });
};

export const seedCategory = (collection = "categories", cats) => {
  cats.map(c => {
    return db.ref(collection).push({
      name: c
    });
  });
};

export const seedLanguage = (collection = "languages", langs) => {
  langs.map(c => {
    return db.ref(collection).push({
      name: c
    });
  });
};

export const seedQuestions = (collection = "questionBank", questions) => {
  questions.map(c => {
    return db.ref(collection).push(c);
  });
};

const questions = [
  {
    question:
      "At which bridge does the annual Oxford and Cambridge boat race start?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["Hammersmith", "Vauxhall ", "Battersea", "Putney"],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports"
  },
  {
    question:
      "Who was the British professional wrestler Shirley Crabtree better known as?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["Giant Haystacks", "Kendo Nagasaki", "Masambula", "Big Daddy"],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports"
  },
  {
    question:
      "Which English football club has the nickname &#039;The Foxes&#039;?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      "Northampton Town",
      "Bradford City",
      "West Bromwich Albion",
      "Leicester City"
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports"
  },
  {
    question:
      "How many soccer players should be on the field at the same time?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["20", "24", "26", "22"],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "Manchester United won the 2013-14 English Premier League.",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["True", "False"],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "How many scoring zones are there on a conventional dart board?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["62", "42", "102", "82"],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "With which doubles partner did John McEnroe have most success?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      "Mark Woodforde",
      "Michael Stich",
      "Mary Carillo",
      "Peter Fleming"
    ],
    difficulty: "hard",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "In baseball, how many fouls are an out?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["5", "3", "2", "0"],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports"
  },
  {
    question:
      "Soccer player Cristiano Ronaldo opened a museum dedicated to himself.",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["False", "True"],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "Which nation hosted the FIFA World Cup in 2006?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["United Kingdom", "Brazil", "South Africa", "Germany"],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "The F1 season of 1994 is remembered for what tragic event?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      "The Showdown (Australia)",
      "Verstappen on Fire (Germany)",
      "Schumacher&#039;s Ban (Britain)",
      "Death of Ayrton Senna (San Marino)"
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "Peyton Manning retired after winning Super Bowl XLIX.",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["True", "False"],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "Who won the 2015 Formula 1 World Championship?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      "Nico Rosberg",
      "Sebastian Vettel",
      "Jenson Button",
      "Lewis Hamilton"
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports"
  },
  {
    question:
      "Skateboarding will be included in the 2020 Summer Olympics in Tokyo.",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["False", "True"],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "Tennis was once known as Racquetball.",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["True", "False"],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "Which team was the 2015-2016 NBA Champions?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      "Golden State Warriors",
      "Toronto Raptors",
      "Oklahoma City Thunders",
      "Cleveland Cavaliers"
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "Which team was the 2014-2015 NBA Champions?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      "Cleveland Cavaliers",
      "Houston Rockets",
      "Atlanta Hawks",
      "Golden State Warriors"
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "Where was the Games of the XXII Olympiad held?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["Barcelona", "Tokyo", "Los Angeles", "Moscow"],
    difficulty: "hard",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "Josh Mansour is part of what NRL team?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      "Melbourne Storm",
      "Sydney Roosters",
      "North Queensland Cowboys",
      "Penrith Panthers"
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "Which car manufacturer won the 2016 24 Hours of Le Mans?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["Toyota", "Audi", "Ferrari", "Porsche"],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports"
  },
  {
    question:
      "Which male player won the gold medal of table tennis singles in 2016 Olympics Games?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      "Zhang Jike (China)",
      "Jun Mizutani (Japan)",
      "Vladimir Samsonov (Belarus)",
      "Ma Long (China)"
    ],
    difficulty: "hard",
    flagCount: 0,
    category: "Sports"
  },
  {
    question:
      "Which soccer team won the Copa Am&eacute;rica 2015 Championship ?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["Argentina", "Brazil", "Paraguay", "Chile"],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports"
  },
  {
    question:
      "What national team won the 2016 edition of UEFA European Championship?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["France", "Germany", "England", "Portugal"],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports"
  },
  {
    question:
      "In Baseball, how many times does the ball have to be pitched outside of the strike zone before the batter is walked?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["1", "2", "3", "4"],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports"
  },
  {
    question:
      "Which city did the former NHL team &quot;The Nordiques&quot; originiate from?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["Houston", "Montreal", "New York", "Quebec City"],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "What team won the 2016 MLS Cup?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      "Colorado Rapids",
      "Toronto FC",
      "Montreal Impact",
      "Seattle Sounders"
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "What is the oldest team in the NFL?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      "Chicago Bears",
      "Green Bay Packers",
      "New York Giants",
      "Arizona Cardinals"
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "What year did the New Orleans Saints win the Super Bowl?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["2008", "2010", "2011", "2009"],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports"
  },
  {
    question:
      "What is the full name of the footballer &quot;Cristiano Ronaldo&quot;?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      "Cristiano Ronaldo los Santos Diego",
      "Cristiano Armando Diego Ronaldo",
      "Cristiano Luis Armando Ronaldo",
      "Cristiano Ronaldo dos Santos Aveiro"
    ],
    difficulty: "hard",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "What year was hockey legend Wayne Gretzky born?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["1965", "1959", "1963", "1961"],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "Which year was the third Super Bowl held?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["1968", "1971", "1970", "1969"],
    difficulty: "hard",
    flagCount: 0,
    category: "Sports"
  },
  {
    question:
      "Which of the following pitchers was named National League Rookie of the Year for the 2013 season?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["Jacob deGrom", "Shelby Miller", "Matt Harvey", "Jose Fernandez"],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "When was the first official international game played?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["1880", "1863", "1865", "1872"],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports"
  },
  {
    question:
      "Which boxer was banned for taking a bite out of Evander Holyfield&#039;s ear in 1997?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      "Roy Jones Jr.",
      "Evander Holyfield",
      "Lennox Lewis",
      "Mike Tyson"
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports"
  },
  {
    question:
      "What is the most common type of pitch thrown by pitchers in baseball?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["Slowball", "Screwball", "Palmball", "Fastball"],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports"
  },
  {
    question:
      "In bowling, what is the term used for getting three consecutive strikes?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["Flamingo", "Birdie", "Eagle", "Turkey"],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports"
  },
  {
    question:
      "Which African American is in part responsible for integrating  Major League baseball?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      "Curt Flood",
      "Roy Campanella",
      "Satchell Paige",
      "Jackie Robinson"
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports"
  },
  {
    question:
      "Which player &quot;kung-fu kicked&quot; a Crystal Palace fan in January 1995?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["David Seamen", "Ashley Cole", "Mark Hughes", "Eric Cantona"],
    difficulty: "hard",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "Who is Manchester United&#039;s top premier league goal scorer?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      "Sir Bobby Charlton",
      "Ryan Giggs",
      "David Beckham",
      "Wayne Rooney"
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "Who is Manchester United&#039;s leading appearance maker?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["David Beckham", "Wayne Rooney", "Eric Cantona", "Ryan Giggs"],
    difficulty: "hard",
    flagCount: 0,
    category: "Sports"
  },
  {
    question:
      "Who won the premier league title in the 2015-2016 season following a fairy tale run?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["Tottenham Hotspur", "Watford", "Stoke City", "Leicester City"],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports"
  },
  {
    question:
      "Which of the following player scored a hat-trick during their Manchester United debut?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      "Cristiano Ronaldo",
      "Robin Van Persie",
      "David Beckham",
      "Wayne Rooney"
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports"
  },
  {
    question:
      "Which professional wrestler fell from the rafters to his death during a live Pay-Per-View event in 1999?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["Chris Benoit", "Lex Luger", "Al Snow", "Owen Hart"],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports"
  },
  {
    question:
      "&quot;Stadium of Light&quot; is the home stadium for which soccer team?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      "Barcelona FC",
      "Paris Saints-Germain",
      "Manchester United",
      "Sunderland FC"
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "Which country will host the 2022 FIFA World Cup?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: ["USA", "Japan", "Switzerland", "Qatar"],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "Who won the 2017 Formula One World Drivers&#039; Championship?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      "Sebastian Vettel",
      "Nico Rosberg",
      "Max Verstappen",
      "Lewis Hamilton"
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports"
  },
  {
    question:
      "Which Formula 1 driver switched teams in the middle of the 2017 season?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      "Daniil Kvyat",
      "Jolyon Palmer",
      "Rio Haryanto",
      "Carlos Sainz Jr."
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "Who won the UEFA Champions League in 2017?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      "Atletico Madrid",
      "AS Monaco FC",
      "Juventus F.C.",
      "Real Madrid C.F."
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "Who won the UEFA Champions League in 2016?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      "FC Bayern Munich",
      "Atletico Madrid",
      "Manchester City F.C.",
      "Real Madrid C.F."
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports"
  },
  {
    question: "Who won the 2011 Stanley Cup?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      "Montreal Canadiens",
      "New York Rangers",
      "Toronto Maple Leafs",
      "Boston Bruins"
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports"
  }
];

const categoryMap = {
  History: "-M3rLkmKk9Cv13bZRiG8",
  "Science & Nature": "-M3rLkmMlMv6BFHjzizo",
  "Science: Computers": "-M3rLkmMlMv6BFHjzizp",
  "General Knowledge": "-M3rLkmNapWTregRSKQ-",
  "Entertainment: Music": "-M3rLkmNapWTregRSKQ0",
  "Entertainment: Comics": "-M3rLkmNapWTregRSKQ1",
  "Entertainment: Video Games": "-M3rLkmNapWTregRSKQ2",
  "Entertainment: Japanese Anime & Manga": "-M3rLkmOf9rNhse4uW8b",
  Geography: "-M3rLkmOf9rNhse4uW8c",
  Sports: "-M3rLkmOf9rNhse4uW8d",
  "Entertainment: Board Games": "-M3rLkmOf9rNhse4uW8e",
  Politics: "-M3rLkmOf9rNhse4uW8f",
  Celebrities: "-M3rLkmOf9rNhse4uW8g",
  "Entertainment: Books": "-M3rLkmPplV-BdR3Or-T",
  "Entertainment: Television": "-M3rLkmQdBRGq-HoKK30",
  "Entertainment: Cartoon & Animations": "-M3rLkmQdBRGq-HoKK31"
};

export const testSeeder = () => {
  questions.forEach(ques => {
    const cid = categoryMap[ques.category];
    db.ref(`questionBank/${cid}`).push({ ...ques, catefory: null });
  });
};

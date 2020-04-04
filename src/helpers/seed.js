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
    prefferedLanguageId: "en",
  });
};

export const seedAppConfig = (collection = "appConfig") => {
  db.ref(collection).push({
    roundTime: 10,
    theme: "light",
    numQuestions: 10,
    questionScore: 20,
  });
};

export const seedCategory = (collection = "categories", cats) => {
  cats.map((c) => {
    return db.ref(collection).push({
      name: c,
    });
  });
};

export const seedLanguage = (collection = "languages", langs) => {
  langs.map((c) => {
    return db.ref(collection).push({
      name: c,
    });
  });
};

export const seedQuestions = (collection = "questionBank", questions) => {
  questions.map((c) => {
    return db.ref(collection).push(c);
  });
};

const questions = [
  {
    question: "Which of the following sports is not part of the triathlon?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Cycling" },
      { id: 1, text: "Swimming" },
      { id: 2, text: "Running" },
      { id: 3, text: "Horse-Riding" },
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports",
  },
  {
    question:
      "How many times did Martina Navratilova win the Wimbledon Singles Championship?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Ten" },
      { id: 1, text: "Seven" },
      { id: 2, text: "Eight" },
      { id: 3, text: "Nine" },
    ],
    difficulty: "hard",
    flagCount: 0,
    category: "Sports",
  },
  {
    question:
      "With which team did Michael Schumacher make his Formula One debut at the 1991 Belgian Grand Prix?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Benetton" },
      { id: 1, text: "Ferrari" },
      { id: 2, text: "Mercedes" },
      { id: 3, text: "Jordan" },
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports",
  },
  {
    question:
      "Which German sportswear company&#039;s logo is the &#039;Formstripe&#039;?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Nike" },
      { id: 1, text: "Adidas" },
      { id: 2, text: "Reebok" },
      { id: 3, text: "Puma" },
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports",
  },
  {
    question:
      "Who was the British professional wrestler Shirley Crabtree better known as?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Giant Haystacks" },
      { id: 1, text: "Kendo Nagasaki" },
      { id: 2, text: "Masambula" },
      { id: 3, text: "Big Daddy" },
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports",
  },
  {
    question:
      "Which English football club has the nickname &#039;The Foxes&#039;?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Northampton Town" },
      { id: 1, text: "Bradford City" },
      { id: 2, text: "West Bromwich Albion" },
      { id: 3, text: "Leicester City" },
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "Which team won the 2015-16 English Premier League?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Liverpool" },
      { id: 1, text: "Cheslea" },
      { id: 2, text: "Manchester United" },
      { id: 3, text: "Leicester City" },
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "A stimpmeter measures the speed of a ball over what surface?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: " Football Pitch" },
      { id: 1, text: "Cricket Outfield" },
      { id: 2, text: "Pinball Table" },
      { id: 3, text: "Golf Putting Green" },
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "How many scoring zones are there on a conventional dart board?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "62" },
      { id: 1, text: "42" },
      { id: 2, text: "102" },
      { id: 3, text: "82" },
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "In a game of snooker, what colour ball is worth 3 points?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Yellow" },
      { id: 1, text: "Brown" },
      { id: 2, text: "Blue" },
      { id: 3, text: "Green" },
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "Which nation hosted the FIFA World Cup in 2006?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "United Kingdom" },
      { id: 1, text: "Brazil" },
      { id: 2, text: "South Africa" },
      { id: 3, text: "Germany" },
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "The F1 season of 1994 is remembered for what tragic event?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "The Showdown (Australia)" },
      { id: 1, text: "Verstappen on Fire (Germany)" },
      { id: 2, text: "Schumacher&#039;s Ban (Britain)" },
      { id: 3, text: "Death of Ayrton Senna (San Marino)" },
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports",
  },
  {
    question:
      "The Rio 2016 Summer Olympics held it&#039;s closing ceremony on what date?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "August 23" },
      { id: 1, text: "August 19" },
      { id: 2, text: "August 17" },
      { id: 3, text: "August 21" },
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "Which country will host the 2020 Summer Olympics?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "China" },
      { id: 1, text: "Australia" },
      { id: 2, text: "Germany" },
      { id: 3, text: "Japan" },
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "Which country is hosting the 2022 FIFA World Cup?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Uganda" },
      { id: 1, text: "Vietnam" },
      { id: 2, text: "Bolivia" },
      { id: 3, text: "Qatar" },
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "Who won the 2015 Formula 1 World Championship?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Nico Rosberg" },
      { id: 1, text: "Sebastian Vettel" },
      { id: 2, text: "Jenson Button" },
      { id: 3, text: "Lewis Hamilton" },
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports",
  },
  {
    question:
      "Which driver has been the Formula 1 world champion for a record 7 times?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Ayrton Senna" },
      { id: 1, text: "Fernando Alonso" },
      { id: 2, text: "Jim Clark" },
      { id: 3, text: "Michael Schumacher" },
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "Where was the Games of the XXII Olympiad held?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Barcelona" },
      { id: 1, text: "Tokyo" },
      { id: 2, text: "Los Angeles" },
      { id: 3, text: "Moscow" },
    ],
    difficulty: "hard",
    flagCount: 0,
    category: "Sports",
  },
  {
    question:
      "Which car company is the only Japanese company which won the 24 Hours of Le Mans?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Toyota" },
      { id: 1, text: "Subaru" },
      { id: 2, text: "Nissan" },
      { id: 3, text: "Mazda" },
    ],
    difficulty: "hard",
    flagCount: 0,
    category: "Sports",
  },
  {
    question:
      "Which Italian footballer told Neuer where he&#039;s putting his shot and dragging it wide, during the match Italy-Germany, UEFA EURO 2016?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Insigne" },
      { id: 1, text: "Barzagli" },
      { id: 2, text: "Giaccherini" },
      { id: 3, text: "Pelle" },
    ],
    difficulty: "hard",
    flagCount: 0,
    category: "Sports",
  },
  {
    question:
      "Which soccer team won the Copa Am&eacute;rica 2015 Championship ?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Argentina" },
      { id: 1, text: "Brazil" },
      { id: 2, text: "Paraguay" },
      { id: 3, text: "Chile" },
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "Which team won 2014 FIFA World Cup in Brazil?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Argentina" },
      { id: 1, text: "Brazil" },
      { id: 2, text: "Netherlands" },
      { id: 3, text: "Germany" },
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "How many points did LeBron James score in his first NBA game?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "19" },
      { id: 1, text: "69" },
      { id: 2, text: "41" },
      { id: 3, text: "25" },
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports",
  },
  {
    question:
      "In Baseball, how many times does the ball have to be pitched outside of the strike zone before the batter is walked?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "1" },
      { id: 1, text: "2" },
      { id: 2, text: "3" },
      { id: 3, text: "4" },
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports",
  },
  {
    question:
      "Which of the following Grand Slam tennis tournaments occurs LAST?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "French Open" },
      { id: 1, text: "Wimbledon" },
      { id: 2, text: "Australian Open" },
      { id: 3, text: "US Open" },
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "What year did the New Orleans Saints win the Super Bowl?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "2008" },
      { id: 1, text: "2010" },
      { id: 2, text: "2011" },
      { id: 3, text: "2009" },
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports",
  },
  {
    question:
      "What is the exact length of one non-curved part in Lane 1 of an Olympic Track?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "100m" },
      { id: 1, text: "100yd" },
      { id: 2, text: "109.36yd" },
      { id: 3, text: "84.39m" },
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "Which team has won the most Stanley Cups in the NHL?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Chicago Blackhawks" },
      { id: 1, text: "Toronto Maple Leafs" },
      { id: 2, text: "Detroit Red Wings" },
      { id: 3, text: "Montreal Canadians" },
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports",
  },
  {
    question:
      "Which portuguese island is soccer player Cristiano Ronaldo from?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Terceira" },
      { id: 1, text: "Santa Maria" },
      { id: 2, text: "Porto Santo" },
      { id: 3, text: "Madeira" },
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports",
  },
  {
    question:
      "Who won the 2015 College Football Playoff (CFP) National Championship? ",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Alabama Crimson Tide" },
      { id: 1, text: "Clemson Tigers" },
      { id: 2, text: "Wisconsin Badgers" },
      { id: 3, text: "Ohio State Buckeyes" },
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports",
  },
  {
    question:
      "Which of the following pitchers was named National League Rookie of the Year for the 2013 season?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Jacob deGrom" },
      { id: 1, text: "Shelby Miller" },
      { id: 2, text: "Matt Harvey" },
      { id: 3, text: "Jose Fernandez" },
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "Why was The Green Monster at Fenway Park was originally built?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "To make getting home runs harder." },
      { id: 1, text: "To display advertisements." },
      { id: 2, text: "To provide extra seating." },
      { id: 3, text: "To prevent viewing games from outside the park." },
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports",
  },
  {
    question:
      "Which sport is NOT traditionally played during the Mongolian Naadam festival?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Wrestling" },
      { id: 1, text: "Archery" },
      { id: 2, text: "Horse-Racing" },
      { id: 3, text: "American Football" },
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "Which car manufacturer won the 2017 24 Hours of Le Mans?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Toyota" },
      { id: 1, text: "Audi" },
      { id: 2, text: "Chevrolet" },
      { id: 3, text: "Porsche" },
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports",
  },
  {
    question:
      "Which NBA player won Most Valuable Player for the 1999-2000 season?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Allen Iverson" },
      { id: 1, text: "Kobe Bryant" },
      { id: 2, text: "Paul Pierce" },
      { id: 3, text: "Shaquille O&#039;Neal" },
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "In what sport does Fanny Chmelar compete for Germany?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Swimming" },
      { id: 1, text: "Showjumping" },
      { id: 2, text: "Gymnastics" },
      { id: 3, text: "Skiing" },
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports",
  },
  {
    question:
      "What team did England beat in the semi-final stage to win in the 1966 World Cup final?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "West Germany" },
      { id: 1, text: "Soviet Union" },
      { id: 2, text: "Brazil" },
      { id: 3, text: "Portugal" },
    ],
    difficulty: "hard",
    flagCount: 0,
    category: "Sports",
  },
  {
    question:
      "In bowling, what is the term used for getting three consecutive strikes?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Flamingo" },
      { id: 1, text: "Birdie" },
      { id: 2, text: "Eagle" },
      { id: 3, text: "Turkey" },
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "How many French Open&#039;s did Bj&ouml;rn Borg win?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "4" },
      { id: 1, text: "9" },
      { id: 2, text: "2" },
      { id: 3, text: "6" },
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports",
  },
  {
    question:
      "Who is often called &quot;the Maestro&quot; in the men&#039;s tennis circuit?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Bill Tilden" },
      { id: 1, text: "Boris Becker" },
      { id: 2, text: "Pete Sampras" },
      { id: 3, text: "Roger Federer" },
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports",
  },
  {
    question:
      "How many premier league trophies did Sir Alex Ferguson win during his time at Manchester United?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "11" },
      { id: 1, text: "20" },
      { id: 2, text: "22" },
      { id: 3, text: "13" },
    ],
    difficulty: "medium",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "Who is Manchester United&#039;s leading appearance maker?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "David Beckham" },
      { id: 1, text: "Wayne Rooney" },
      { id: 2, text: "Eric Cantona" },
      { id: 3, text: "Ryan Giggs" },
    ],
    difficulty: "hard",
    flagCount: 0,
    category: "Sports",
  },
  {
    question:
      "Who won the premier league title in the 2015-2016 season following a fairy tale run?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Tottenham Hotspur" },
      { id: 1, text: "Watford" },
      { id: 2, text: "Stoke City" },
      { id: 3, text: "Leicester City" },
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "When was the FC Schalke 04 founded?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "1909" },
      { id: 1, text: "2008" },
      { id: 2, text: "1999" },
      { id: 3, text: "1904" },
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "Who did Steven Gerrard win the Champions League with?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Real Madrid" },
      { id: 1, text: "Chelsea" },
      { id: 2, text: "Man City" },
      { id: 3, text: "Liverpool" },
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports",
  },
  {
    question:
      "&quot;Stadium of Light&quot; is the home stadium for which soccer team?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Barcelona FC" },
      { id: 1, text: "Paris Saints-Germain" },
      { id: 2, text: "Manchester United" },
      { id: 3, text: "Sunderland FC" },
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "Which country will host the 2022 FIFA World Cup?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "USA" },
      { id: 1, text: "Japan" },
      { id: 2, text: "Switzerland" },
      { id: 3, text: "Qatar" },
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "Who won the 2017 Formula One World Drivers&#039; Championship?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Sebastian Vettel" },
      { id: 1, text: "Nico Rosberg" },
      { id: 2, text: "Max Verstappen" },
      { id: 3, text: "Lewis Hamilton" },
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "Who won the UEFA Champions League in 2017?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "Atletico Madrid" },
      { id: 1, text: "AS Monaco FC" },
      { id: 2, text: "Juventus F.C." },
      { id: 3, text: "Real Madrid C.F." },
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports",
  },
  {
    question: "Which two teams played in Super Bowl XLII?",
    answerId: 3,
    answeredCount: 0,
    askedCount: 0,
    choices: [
      { id: 0, text: "The Green Bay Packers &amp; The Pittsburgh Steelers" },
      { id: 1, text: "The Philadelphia Eagles &amp; The New England Patriots" },
      { id: 2, text: "The Seattle Seahawks &amp; The Denver Broncos" },
      { id: 3, text: "The New York Giants &amp; The New England Patriots" },
    ],
    difficulty: "easy",
    flagCount: 0,
    category: "Sports",
  },
];


export const testSeeder = () => {
  questions.forEach((ques) => {
    //const cid = categoryMap[ques.category];
    db.ref(`questionBank/-M44-6f4Q0JICodnveLg`).push({ ...ques, category: null });
  });
};

localStorage.setItem(
  "___user_lang___",
  navigator.language || navigator.userLanguage || "en-EN"
);

const STAT__EVENT_NAMES = {
  "gender.male": "",
  "gender.female": "",
  "gender.no": "",
  "animation.turbulence": "turbelence indicator",
  "animation.forecasts": "flight forecast",
  "animation.tracking": "flight tracking",
  "animation.no_fear": "flying without fear",
  "animation.podcast": "explanatory podcast",
  "animation.what_gender": "",
  "qustion.what_purpose": "main goal",
  "question.how.feel": "feel before flight",
  "question.last.flight": "last flight",
  "question.fear": "scares during flight",
  "question.select": "during the flight",
  "question.place.in.flight": "seat prefered",
  "question.landing": "during landing",
  "question.next.flight": "next flight",
  "answer.tracking": "tracking",
  "answer.anxiety": "reduce anxiety",
  "answer.rid.fobia": "overcome",
  "answer.relax": "calm",
  "answer.mild.anxiety": "nervous",
  "answer.significant.anxiety": "anxiety",
  "answer.severe.stress": "stress",
  "answer.panic": "overwhelmed",
  "answer.less.one.month": "1 month",
  "answer.one.five.months": "1-5 month",
  "answer.six.twelve.months": "6-12 month",
  "answer.one.two.years": "1-2 years",
  "answer.five.years": "5 years",
  "answer.never": "never",
  "answer.human.factor": "human factor",
  "answer.technical.malfunction": "technical",
  "answer.turbulence": "turbulence",
  "answer.bad.weather": "weather",
  "answer.lose.control": "lack of control",
  "answer.no.exit": "inability to exit",
  "answer.panic.attack": "panic attack",
  "answer.enclosed_space": "closed space",
  "answer.every.moment": "notice everything",
  "answer.faces": "watch flight attendans",
  "answer.engine": "engine sound",
  "answer.fear.to.move": "afraid to move",
  "answer.armrests": "squeeze chair",
  "answer.toilets": "use bathroom",
  "answer.seat.belt": "tighten seatbelt",
  "answer.anticipate.turbulence": "anticipate turbulence",
  "answer.relieved": "feel relieved when landing",
  "answer.center_of_flight": "middle",
  "answer.end_of_flight": "tail",
  "answer.near_window": "window",
  "answer.far.window": "away from window",
  "answer.an_aisle_seat": "aisle seat",
  "answer.the_plane_lands": "relief when landed",
  "answer.return.flight": "feel horrified return",
  "answer.never_fly_again": "never fly again",
  "answer.lucky": "think you lucky",
  "answer.body.copes.with.fear": "woried body next time",
  "answer.investigate": "promise dealing with it",
  "answer.in.a.month": "more than month",
  "answer.within.month": "within a month",
  "answer.within.week": "within a week",
  "answer.tomorray": "tomorrow",
  "answer.today": "today",
  "answer.never.fear": 'I don’t fly',
  "button.none": "",
  "button.continue": "",
  "global.success": "",
  "global.initial": "",
  "global.name": "",
};

const GLOBAL_TRANSLATIONS = {
  "ru-RU": [
    { "gender.male": "Мужской" },
    { "gender.female": "Женский" },
    { "gender.no": "Предпочитаю не отвечать" },
    { "animation.turbulence": "Индикатор турбулентности" },
    { "animation.forecasts": "Прогнозы полетов" },
    { "animation.tracking": "Отслеживание полета" },
    { "animation.no_fear": "Летать без страха" },
    { "animation.podcast": "Пояснительные подкасты" },
    { "animation.what_gender": "Какой ваш пол?" },
    {
      "qustion.what_purpose": "Какова ваша главная цель?",
    },
    {
      "question.how.feel": "Как вы себя чувствуете до и во время полета?",
    },
    {
      "question.last.flight": "Как давно был ваш последний полёт?",
    },
    {
      "question.fear": "Что вас пугает во время полета?",
    },
    {
      "question.select": "Во время полета вы:",
    },
    {
      "question.place.in.flight": "Какое место в самолете вы предпочитаете?",
    },
    {
      "question.landing": "Во время приземления вы:",
    },
    {
      "question.next.flight": "Когда ваш следующий рейс?",
    },
    {
      "answer.tracking": "Отслеживание рейсов",
    },
    {
      "answer.anxiety": "Управление и снижение беспокойства в полете",
    },
    {
      "answer.rid.fobia": "Избавиться от аэрофобии",
    },
    {
      "answer.relax": "Расслабление и покой",
    },
    {
      "answer.mild.anxiety": "Лёгкая тревожность",
    },
    {
      "answer.significant.anxiety": "Существенная тревожность",
    },
    {
      "answer.severe.stress": "Сильный стресс",
    },
    {
      "answer.panic": "Ужас и паника",
    },
    {
      "answer.less.one.month": "Менее 1 месяца назад",
    },
    {
      "answer.one.five.months": "1-5 месяцев назад",
    },
    {
      "answer.six.twelve.months": "6-12 месяцев назад",
    },
    {
      "answer.one.two.years": "1-2 года назад",
    },
    {
      "answer.five.years": "Еще 5 лет назад",
    },
    {
      "answer.never": "Никогда не летал(а) до этого",
    },
    {
      "answer.human.factor": "Человеческий фактор",
    },
    {
      "answer.technical.malfunction": "Техническая неисправность",
    },
    {
      "answer.turbulence": "Турбулентность",
    },
    {
      "answer.bad.weather": "Плохая погода",
    },
    {
      "answer.lose.control": "Отсутствие контроля над ситуацией",
    },
    {
      "answer.no.exit": "Невозможность выйти",
    },
    {
      "answer.panic.attack": "Вероятность панической атаки",
    },
    {
      "answer.enclosed_space": "Закрытое пространство",
    },
    {
      "answer.every.moment": "Замечайте каждый момент полета самолета",
    },
    {
      "answer.faces":
        "Следите за выражением лиц бортпроводников, чтобы убедиться, что все в порядке",
    },
    {
      "answer.engine": "Слушайте звуки двигателя",
    },
    {
      "answer.fear.to.move": "Слишком боитесь пошевелиться",
    },
    {
      "answer.armrests": "Сожмите подлокотники стула пальцами",
    },
    {
      "answer.toilets": "Пользуйтесь туалетом чаще, чем обычно",
    },
    {
      "answer.seat.belt": "Слишком туго затяните ремень безопасности",
    },
    {
      "answer.anticipate.turbulence": "Предвидеть турбулентность",
    },
    {
      "answer.relieved":
        "Почувствуйте облегчение только после того, как самолет начнет приземляться",
    },
    {
      "answer.center_of_flight":
        "В середине самолета, чтобы меньше чувствовать турбулентность",
    },
    {
      "answer.end_of_flight":
        "В хвосте, потому что вы слышали, что это самое безопасное место в самолете",
    },
    {
      "answer.near_window":
        "У окна, потому что хочешь посмотреть, как проходит твой рейс",
    },
    {
      "answer.far.window": "Подальше от окна, потому что вид из окна пугающий",
    },
    {
      "answer.an_aisle_seat":
        "Сиденье у прохода, чтобы не чувствовать себя в ловушке",
    },
    {
      "answer.the_plane_lands":
        "Испытывайте облегчение только после того, как самолет приземлится",
    },
    {
      "answer.return.flight":
        "Испытываете ужас при мысли о своем обратном рейсе",
    },
    {
      "answer.never_fly_again":
        "Обещаете себе, что больше никогда не будете летать",
    },
    {
      "answer.lucky": "Считаете, что в это раз вам повезло",
    },
    {
      "answer.body.copes.with.fear":
        "Переживаете,  сможет ли ваш организм справиться с таким страхом в следующий раз",
    },
    {
      "answer.investigate": "Обещаете себе начать разбираться с этим страхом",
    },
    {
      "answer.in.a.month": "Через месяц",
    },
    {
      "answer.within.month": "В течение месяца",
    },
    {
      "answer.within.week": "В течение недели",
    },
    {
      "answer.tomorray": "Завтра или послезавтра",
    },
    {
      "answer.today": "Сегодня",
    },
    {"answer.never.fear": 'Я не летаю, потому что боюсь'},
    {
      "button.none": "Ничего из вышеперечисленного",
    },
    {
      "button.continue": "Продолжить",
    },
    { "global.success": "Успешно" },
    { "global.initial": "Боитесь летать?" },
    { "global.name": "Flight Buddy" },
  ],

  "en-EN": [
    { "gender.male": "Male" },
    { "gender.female": "Female" },
    { "gender.no": "Prefer not to answer" },
    { "animation.turbulence": "Turbulence Indicator" },
    {
      "animation.turbulence_title":
        "Track and decode every movement of the aircraft",
    },
    { "animation.forecasts": "Flight Forecasts" },
    { "animation.forecasts_title": "Keep everything under control" },
    { "animation.tracking": "Flight Tracking" },
    {
      "animation.tracking_title":
        "Check in your flight and get the latest updates",
    },
    { "animation.no_fear": "Flying without Fear" },
    {
      "animation.no_fear_title":
        "Watch and learn how to deal with your fears effectively",
    },
    { "animation.podcast": "Explanatory Podcasts" },
    { "animation.podcast_title": "Learn everything about air travel" },
    { "animation.what_gender": "What is your gender?" },
    {
      "qustion.what_purpose": "What is your main goal?",
    },
    {
      "question.how.feel": "How do you feel before and during the flight?",
    },
    {
      "question.last.flight": "When was your last flight?",
    },
    {
      "question.fear": "What scares you during the flight?",
    },
    {
      "question.select": " During the flight you:",
    },
    {
      "question.place.in.flight": "Which plane seat do you prefer?",
    },
    {
      "question.landing": "During landing you:",
    },
    {
      "question.next.flight": "When is your next flight?",
    },
    {
      "answer.tracking": "Flight tracking",
    },
    {
      "answer.anxiety": "Managing and reducing in-flight anxiety",
    },
    {
      "answer.rid.fobia": "Overcoming my fear of flying",
    },
    {
      "answer.relax": "Calm and relaxed",
    },
    {
      "answer.mild.anxiety": "Nervous",
    },
    {
      "answer.significant.anxiety": "Anxious",
    },
    {
      "answer.severe.stress": "Intense stress",
    },
    {
      "answer.panic": "Overwhelmed with dread and panic",
    },
    {
      "answer.less.one.month": "Less than 1 month ago",
    },
    {
      "answer.one.five.months": "1-5 month ago",
    },
    {
      "answer.six.twelve.months": "6-12 months ago",
    },
    {
      "answer.one.two.years": "1-2 years ago",
    },
    {
      "answer.five.years": "More 5 years ago",
    },
    {
      "answer.never": "Never flown before",
    },
    {
      "answer.human.factor": "Human factor",
    },
    {
      "answer.technical.malfunction": "Technical failure",
    },
    {
      "answer.turbulence": "Turbulence",
    },
    {
      "answer.bad.weather": "Bad weather",
    },
    {
      "answer.lose.control": "Lack of control over the situation",
    },
    {
      "answer.no.exit": "Inability to exit",
    },
    {
      "answer.panic.attack": "Possibility of panic attack",
    },
    {
      "answer.enclosed_space": "Closed space",
    },
    {
      "answer.every.moment": "Notice every moment of the aircraft",
    },
    {
      "answer.faces":
        "Watch flight attendants facial expressions to make sure that everything is alright",
    },
    {
      "answer.engine": "Listen to engine sounds",
    },
    {"answer.never.fear": 'I don’t fly because of fear'},
    {
      "answer.fear.to.move": "Are too afraid to move",
    },
    {
      "answer.armrests": "Squeeze chair armrests with your fingers",
    },
    {
      "answer.toilets": "Use bathroom more often than usual",
    },
    {
      "answer.seat.belt": "Tighten your seatbelt too tight",
    },
    {
      "answer.anticipate.turbulence": "Anticipate turbulence",
    },
    {
      "answer.relieved": "Feel relieved only after the plane starts to land",
    },
    {
      "answer.center_of_flight":
        "In the middle of a plane to feel less turbulence",
    },
    {
      "answer.end_of_flight":
        "At the tail end because you heard that it’s safest place on plane",
    },
    {
      "answer.near_window":
        "By the window because you want to watch how your flight goes",
    },
    {
      "answer.far.window":
        "Away from the window because the view from the window is scary",
    },
    {
      "answer.an_aisle_seat": "Aisle seat to avoid feeling trapped",
    },
    {
      "answer.the_plane_lands":
        "Experience relief only after the plane touches down",
    },
    {
      "answer.return.flight":
        "Feel horrified thinking about your return flight",
    },
    {
      "answer.never_fly_again":
        "Promise yourself that you will never fly again",
    },
    {
      "answer.lucky": "Think you are a lucky one this time",
    },
    {
      "answer.body.copes.with.fear":
        "Worry weather your body can handle such fear next time",
    },
    {
      "answer.investigate":
        "Promise yourself to start dealing with fear of fling",
    },
    {
      "answer.in.a.month": "In over a month",
    },
    {
      "answer.within.month": "Within a month",
    },
    {
      "answer.within.week": "Within a week",
    },
    {
      "answer.tomorray": "Tomorrow or day after tomorrow",
    },
    {
      "answer.today": "Today",
    },
    {
      "button.none": "None of the above",
    },
    {
      "button.continue": "Continue",
    },
    { "global.success": "Success" },
    { "global.initial": "FEAR OF FLYING?" },
    { "global.name": "Flight Buddy" },
    {
      "global.agreement":
        '<p class="agreement-text">By pressing Continue I hereby agree to processing of my personal data. <a class="agreement-link" href="#">Privacy Policy</a> and <a class="agreement-link" href="#">Terms and Conditions</a> apply.</p>',
    },
  ],
};

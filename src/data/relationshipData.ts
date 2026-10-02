export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  story: string;
  photoUrl: string;
  location?: string;
  tag: string;
  iconName: string;
}

export interface FlashCardItem {
  id: string;
  title: string;
  subtitle: string;
  frontPrompt: string;
  memory: string;
  dateOrPlace?: string;
  gradient: string;
  accentColor: string;
  icon: string;
}

export interface PolaroidItem {
  id: string;
  imageUrl: string;
  caption: string;
  date: string;
  rotation: number; // e.g. -4 to 4 degrees
  location?: string;
  note?: string;
}

export interface OpenWhenEnvelope {
  id: string;
  title: string;
  icon: string;
  teaser: string;
  letter: string;
  signoff: string;
  gradient: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ReasonItem {
  id: number;
  reason: string;
  detail?: string;
  category?: 'sweet' | 'funny' | 'deep' | 'memory';
}

export interface RelationshipData {
  names: {
    person1: string;
    person2: string;
    coupleNickname: string;
  };
  anniversary: string;
  relationshipStartDate: string; // YYYY-MM-DD
  daysCount: number;
  tagline: string;
  introSubtitle: string;
  
  timeline: TimelineEvent[];
  flashCards: FlashCardItem[];
  polaroids: PolaroidItem[];
  openWhen: OpenWhenEnvelope[];
  quiz: QuizQuestion[];
  reasons: ReasonItem[];
  song: {
    title: string;
    artist: string;
    audioUrl: string;
    albumArt: string;
    personalNote: string;
    favoriteLyricOrLine: string;
  };
  letter: {
    heading: string;
    body: string[];
    closing: string;
    signature: string;
    postscript: string;
  };
  finalSurprise: {
    countdownSeconds: number;
    quote1: string;
    quote2: string;
    mainTitle: string;
    subHeading: string;
    closingNote: string;
  };
}

export const relationshipData: RelationshipData = {
  names: {
    person1: "Aapka Yash",
    person2: "Wife Jii",
    coupleNickname: "Our Little World"
  },
  anniversary: "6 Months",
  relationshipStartDate: "2024-04-02",
  daysCount: 182,
  tagline: "182 days. Countless memories. One beautiful story.",
  introSubtitle: "Six months ago, the universe gave me my favorite person.",

  timeline: [
    {
      id: "beginning",
      date: "Day 1 — The Spark",
      title: "The Beginning",
      subtitle: "Jab do anjaan raahein ek ho gayi ✨",
      story: "Ham dono ek dusre ko tab mile jab ham ek dusre ko dhoondh bhi nahi rahe the... Ek random chat se baatein shuru hui aur dekhte hi dekhte ek khoobsurat nayi kahani ka aagaaz ho gaya.",
      photoUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1000&auto=format&fit=crop",
      location: "Instagram",
      tag: "First Glimpse",
      iconName: "Sparkles"
    },
    {
      id: "first-convo",
      date: "Day 4 — The Late Night Texts",
      title: "First Proper Conversation",
      subtitle: "Rohit bhai ki reels aur non-stop chats 😂",
      story: "Woh pehli Instagram chat ki lambi conversation jab ham ek dusre ko jaanna start kar rahe the, Rohit bhai ki reels share kar rahe the... Sach me, woh starting toh bilkul alag hi thi! Har notification par chehre par ajeeb si khushi aa jaati thi.",
      photoUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000&auto=format&fit=crop",
      location: "Instagram DMs",
      tag: "Reels & Late Night Chats",
      iconName: "MessageCircleHeart"
    },
    {
      id: "first-call",
      date: "Day 12 — Hours in a Blink",
      title: "First Phone Call",
      subtitle: "Teri aawaaz aur woh pyari si shaam ✨",
      story: "Woh shaam jab tune phone karne ke liye bola tha, tu kuch kaam kar rahi thi, teri aawaaz suni, tujhse baat kari... Woh shaam toh bilkul alag hi thi! Uske baad se har din tere call ka intezaar karna, aur tere call aate hi chehre par ek alag si khushi aa jaana... kya toh sukoon tha.",
      photoUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop",
      tag: "Pure Sukoon ❤️",
      iconName: "PhoneCall"
    },
    {
      id: "today",
      date: "Day 182 — Exactly 6 Months",
      title: "Today & Forever Forward",
      subtitle: "Har mushkil me ek dusre ka sahara bane rahe ❤️",
      story: "In 6 mahino ka safar asaan nahi gaya, na jaane kya kya hamne sath dekha, kitni musibaton ka samna kiya... par har mod par sath rahe, kabhi kisi ka hath nahi chhodha. Tune meri har galti ko maaf karke mujhe sanwara, aur maine teri har baat par tujhe sambhala hai. In 6 mahino me hamne na jaane kya kya jhela hai, par hamara pyaar har tufaan ke baad aur bhi gehra hota gaya.",
      photoUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop",
      location: "Hamesha Ke Liye",
      tag: "Unbreakable Bond",
      iconName: "Infinity"
    }
  ],

  flashCards: [
    {
      id: "card-1",
      title: "How It All Started 💌",
      subtitle: "Click to flip & read the secret thought",
      frontPrompt: "Do you remember the very first thought I had when I saw you?",
      memory: "I thought to myself: 'Whoever gets to make her laugh every day is the luckiest human alive.' I had no idea that just a few months later, I’d be getting to hear your sweet giggle every single day.",
      dateOrPlace: "Day 1 • First Glimpse",
      gradient: "from-[#FB7185]/20 via-[#171329] to-[#0B0A16]",
      accentColor: "#FB7185",
      icon: "💌"
    },
    {
      id: "card-2",
      title: "The Moment I Knew 🥹",
      subtitle: "Click to flip & see when it clicked",
      frontPrompt: "The exact moment I knew you were something extraordinary...",
      memory: "It was that rainy evening when you noticed I was feeling drained. Without saying a word, you made me warm tea, sat beside me, and let me rest my head on your shoulder. You made silence feel warmer than any words ever could.",
      dateOrPlace: "Rainy Tuesday • Cozy Corner",
      gradient: "from-[#A78BFA]/20 via-[#171329] to-[#0B0A16]",
      accentColor: "#A78BFA",
      icon: "🥹"
    },
    {
      id: "card-3",
      title: "Our Funniest Memory 😂",
      subtitle: "Click to flip & try not to laugh",
      frontPrompt: "The culinary disaster we will never speak of in public...",
      memory: "Attempting to bake pasta from scratch and setting off the smoke detector three times! We ended up eating slightly burnt garlic bread on the living room floor while tearing up from laughing so hard.",
      dateOrPlace: "The Kitchen Disaster Night",
      gradient: "from-[#FBBF24]/20 via-[#171329] to-[#0B0A16]",
      accentColor: "#FBBF24",
      icon: "😂"
    },
    {
      id: "card-4",
      title: "Our First Photo 📸",
      subtitle: "Click to flip & revisit the frame",
      frontPrompt: "Why that blurry camera roll picture means the world...",
      memory: "It wasn't posed or filtered. You caught me looking at you with that silly, goofy grin. Whenever I have an overwhelming day, that photo reminds me where home is.",
      dateOrPlace: "Sunset by the Harbor",
      gradient: "from-[#FDA4AF]/20 via-[#171329] to-[#0B0A16]",
      accentColor: "#FDA4AF",
      icon: "📸"
    },
    {
      id: "card-5",
      title: "Something I Love About You ❤️",
      subtitle: "Click to flip & uncover a truth",
      frontPrompt: "A subtle thing you do that you probably don't even realize...",
      memory: "The way your eyes light up when you talk about something you're passionate about, and how you squeeze my hand three times whenever we cross the road. It makes my heart melt every single time.",
      dateOrPlace: "Every Single Day",
      gradient: "from-[#FB7185]/25 via-[#171329] to-[#0B0A16]",
      accentColor: "#FB7185",
      icon: "❤️"
    },
    {
      id: "card-6",
      title: "A Moment I Wish I Could Relive 🌙",
      subtitle: "Click to flip & step back in time",
      frontPrompt: "If I had a time machine for just thirty minutes...",
      memory: "I would go back to that night under the starry sky on the dock. We had one shared earphone in each ear, sitting in complete stillness, with our shoulders touching and the calm water rippling below us.",
      dateOrPlace: "Midnight Under Constellations",
      gradient: "from-[#818CF8]/25 via-[#171329] to-[#0B0A16]",
      accentColor: "#818CF8",
      icon: "🌙"
    },
    {
      id: "card-7",
      title: "My Favourite Little Thing About Us 🫶",
      subtitle: "Click to flip & celebrate our vibe",
      frontPrompt: "What makes us feel unlike anything else in this world...",
      memory: "That we can be 100% ridiculous, childish, silly weirdos together without any judgment, and two seconds later have the deepest, soul-baring conversation about our dreams. You are my best friend and love of my life.",
      dateOrPlace: "Our Secret Language",
      gradient: "from-[#F43F5E]/20 via-[#171329] to-[#0B0A16]",
      accentColor: "#F43F5E",
      icon: "🫶"
    }
  ],

  polaroids: [
    {
      id: "pol-1",
      imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
      caption: "One of my absolute favourite days.",
      date: "May 14, 2024",
      rotation: -3,
      location: "Sunset by the pier",
      note: "You kept laughing at how windblown my hair was!"
    },
    {
      id: "pol-2",
      imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop",
      caption: "You looked so cute here 🥺",
      date: "June 2, 2024",
      rotation: 2.5,
      location: "Morning coffee date",
      note: "Caught you taking pictures of your croissant first."
    },
    {
      id: "pol-3",
      imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop",
      caption: "I still remember this moment vividly.",
      date: "July 19, 2024",
      rotation: -2,
      location: "Stargazing cliff",
      note: "It got freezing cold so we huddled inside one big blanket."
    },
    {
      id: "pol-4",
      imageUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop",
      caption: "Our spontaneous road trip detour ✨",
      date: "August 11, 2024",
      rotation: 3.5,
      location: "Highway overlook",
      note: "We took the wrong exit and found this viewpoint by accident."
    },
    {
      id: "pol-5",
      imageUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop",
      caption: "The golden hour glow on your smile.",
      date: "August 29, 2024",
      rotation: -1.5,
      location: "Botanical gardens",
      note: "You were smelling every single flower in sight."
    },
    {
      id: "pol-6",
      imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop",
      caption: "Proof that we belong together ❤️",
      date: "September 15, 2024",
      rotation: 2,
      location: "City rooftop evening",
      note: "Our eyes locked and everything else blurred away."
    }
  ],

  openWhen: [
    {
      id: "env-miss-me",
      title: "Open when you miss me",
      icon: "💌",
      teaser: "For when distance or a busy day feels a little too quiet...",
      letter: "Hey my love,\n\nIf you're opening this, I know the space between us feels a little too heavy right now. Close your eyes for three seconds and take a deep breath. Can you feel that? That’s me, thinking of you in this exact moment.\n\nNo matter where we are or what we’re doing, my heart is always anchored to yours. Remember the warmth of our longest hugs, the way we fit so naturally, and how fast time flies when we're together again. I’m only ever a text, a phone call, or a heartbeat away.\n\nCounting down the minutes until I hold you again.",
      signoff: "Forever yours,",
      gradient: "from-rose-500/20 to-purple-900/30"
    },
    {
      id: "env-bad-day",
      title: "Open when you're having a bad day",
      icon: "🌧️",
      teaser: "Take a deep breath. You are stronger and more loved than you know.",
      letter: "My sweet girl,\n\nI’m sorry today has been unkind to you. First of all: you don't have to be strong or positive right now. You are allowed to be tired. You are allowed to just pause.\n\nPlease remember: bad days do not define your worth, and today's storm does not mean the sunshine won't return tomorrow. You carry so much grace, kindness, and light in your heart. Drink some water, put on comfy clothes, and wrap yourself in a blanket—pretend it’s my arms.\n\nI believe in you always, even when you forget to believe in yourself.",
      signoff: "Your biggest fan & safe haven,",
      gradient: "from-blue-500/20 to-indigo-900/30"
    },
    {
      id: "env-need-hug",
      title: "Open when you need a hug",
      icon: "🥺",
      teaser: "A warm squeeze through words, delivered straight to your heart.",
      letter: "Sweetheart,\n\nImagine me standing right in front of you. I'm pulling you into my chest, wrapping both arms securely around you, and resting my chin gently on your head. \n\nFeel your shoulders drop. Let all the tension melt away. You are safe. You are cherished. Nothing in this world can harm this soft place we built together. Stay here in this imagined embrace for as long as you need.\n\nSending you the tightest, warmest, never-ending hug right now.",
      signoff: "Held closely forever,",
      gradient: "from-amber-500/20 to-rose-900/30"
    },
    {
      id: "env-why-love",
      title: "Open when you want to know why I love you",
      icon: "❤️",
      teaser: "In case you ever need a gentle reminder of how captivating you are...",
      letter: "Where do I even begin?\n\nI love you not just for the way you make me feel, but for who you are. I love your gentle heart, the compassion you extend to everyone, and the playful spark in your eye when you're being mischievous.\n\nI love how you remember the tiniest details about things I love. I love the crinkle by your nose when you burst out laughing. I love that being with you feels like exhaling after holding my breath for years.\n\nI love you because you are you. And that is more than enough.",
      signoff: "With all my heart & soul,",
      gradient: "from-pink-500/20 to-rose-900/30"
    },
    {
      id: "env-smile",
      title: "Open when you need to smile",
      icon: "😂",
      teaser: "Emergency giggles and reminder of our goofy moments!",
      letter: "Emergency Smile Kit Activated! 🚨\n\nRemember when we tried to take that 'aesthetic' video and tripped over the curb? Or when you made that ridiculously funny squeak sound trying to catch the dropped popcorn?\n\nYou have the most radiant, infectious smile on this planet. When you smile, your entire face glows, and honestly, the world looks about ten times brighter.\n\nIf you haven't smiled yet reading this: check your camera mirror right now—see that cutie looking back at you? That's my girlfriend, and she has the cutest smile in the galaxy!",
      signoff: "Your personal comedian,",
      gradient: "from-yellow-500/20 to-orange-900/30"
    }
  ],

  quiz: [
    {
      id: "q-1",
      question: "Who said 'I love you' first? 👀",
      options: [
        "You did, with zero hesitation!",
        "I did, while nervously holding your hand",
        "We said it at the exact same second",
        "It was blurted out during a late night conversation"
      ],
      correctIndex: 1,
      explanation: "I was so nervous my hands were shaking, but looking at you, I just couldn't keep it inside any longer! ❤️"
    },
    {
      id: "q-2",
      question: "Where did we have our first proper long conversation?",
      options: [
        "In the car with rain tapping on the glass",
        "That cozy coffee corner by the window",
        "On the phone until 3 AM on a weeknight",
        "Walking endlessly down the downtown avenue"
      ],
      correctIndex: 2,
      explanation: "Neither of us wanted to say goodnight first! We were both exhausted the next day and completely didn't care. 🥰"
    },
    {
      id: "q-3",
      question: "Who gets jealous faster? (Be honest! 🙈)",
      options: [
        "Definitely me, even though I pretend I don't",
        "Definitely you, with that adorable little pout",
        "Neither, we are 100% chill (yeah right)",
        "Both of us equally if anyone looks for more than 2 seconds"
      ],
      correctIndex: 3,
      explanation: "Let's be real: we're both secretly protective because we know how special what we have is! 🤭"
    },
    {
      id: "q-4",
      question: "Who is more likely to say 'I'm fine' when they're clearly NOT fine?",
      options: [
        "Me, trying to be tough",
        "You, crossing your arms and looking away",
        "Whoever is hungry at that exact moment",
        "Both of us until food arrives"
      ],
      correctIndex: 1,
      explanation: "I can read your eyes within 0.2 seconds. You cannot fool me, my love! 🤍"
    },
    {
      id: "q-5",
      question: "Who misses the other person more throughout the day?",
      options: [
        "You miss me more!",
        "I miss you by an astronomical amount",
        "It's a tie, our notification logs prove it",
        "Trick question: we never leave each other's thoughts"
      ],
      correctIndex: 3,
      explanation: "Ding ding! The only correct answer: You live rent-free in my mind 24/7/365. 💫"
    }
  ],

  reasons: [
    { id: 1, reason: "Because you make ordinary days feel extraordinary.", detail: "Even doing laundry or grocery shopping is an adventure with you." },
    { id: 2, reason: "Because I can be 100% unapologetically myself around you.", detail: "No masks, no filters, just total comfort." },
    { id: 3, reason: "Because your smile fixes things you don't even know are broken.", detail: "One glance at your grin melts any stress away." },
    { id: 4, reason: "Because somehow you became my favourite notification.", detail: "My phone lighting up with your name will always trigger butterflies." },
    { id: 5, reason: "Because of the gentle way you squeeze my hand three times.", detail: "Our little silent code that says 'I love you'." },
    { id: 6, reason: "Because you believe in my dreams even when I doubt myself.", detail: "You give me the courage to reach higher." },
    { id: 7, reason: "Because your laugh is the most joyful sound in this world.", detail: "I would spend all day telling bad jokes just to hear it." },
    { id: 8, reason: "Because we have our own secret language and inside jokes.", detail: "One shared look across a crowded room and we both burst out." },
    { id: 9, reason: "Because you listen with your whole heart.", detail: "You remember things I mentioned offhandedly weeks ago." },
    { id: 10, reason: "Because resting my head on your chest feels like home.", detail: "The safest, most peaceful corner of the universe." },
    { id: 11, reason: "Because of your kindness to animals and strangers.", detail: "Your empathy is one of the most attractive things about you." },
    { id: 12, reason: "Because you make me want to be the best version of myself.", detail: "Not because you ask me to, but because you inspire me." },
    { id: 13, reason: "Because car rides with you are mini concerts.", detail: "Singing off-key with our hands waving in the air." },
    { id: 14, reason: "Because of how cute you look when you're half asleep.", detail: "Cozy in blankets with messy hair, looking like pure sunshine." },
    { id: 15, reason: "Because you respect my boundaries and honor my feelings.", detail: "A mature, safe, and nurturing love." },
    { id: 16, reason: "Because you let me have the last bite of dessert.", detail: "If that isn't true love, nothing is." },
    { id: 17, reason: "Because you remember the little details about coffee orders.", detail: "Sweet, considerate, and effortlessly thoughtful." },
    { id: 18, reason: "Because we can sit in comfortable silence for hours.", detail: "No pressure to fill the air, just shared presence." },
    { id: 19, reason: "Because your hugs have real healing powers.", detail: "Like wrapping myself in a warm cloud after a storm." },
    { id: 20, reason: "Because you celebrate my smallest wins with genuine pride.", detail: "You hype me up like nobody else." },
    { id: 21, reason: "Because you challenge me intellectually and stimulate my mind.", detail: "Deep conversations about the universe and human nature." },
    { id: 22, reason: "Because of the silly dance moves you break out in the kitchen.", detail: "Uninhibited, funny, and utterly adorable." },
    { id: 23, reason: "Because you forgive quickly and choose love over pride.", detail: "We solve things as a team, always." },
    { id: 24, reason: "Because the smell of your perfume lingers on my favorite hoodie.", detail: "And I refuse to wash it for days." },
    { id: 25, reason: "Because you give the most thoughtful gifts and surprises.", detail: "Always centered on meaning rather than mere things." },
    { id: 26, reason: "Because looking at the future with you is exciting, not scary.", detail: "I see a lifetime of adventures ahead." },
    { id: 27, reason: "Because you love me on the days I'm hard to love.", detail: "Steadfast, patient, and unconditional." },
    { id: 28, reason: "Because your eyes still make my heart skip a beat.", detail: "Even after 182 days of looking into them." },
    { id: 29, reason: "Because you chose me, and you keep choosing me every day.", detail: "The greatest gift I've ever received." },
    { id: 30, reason: "Because in a world of billions of people, my soul chose yours.", detail: "And I would choose you in every lifetime, in every universe." }
  ],

  song: {
    title: "Until I Found You / Our Melody",
    artist: "Stephen Sanchez (Or Our Favorite Acoustic Track)",
    audioUrl: "/audio/our-song.mp3",
    albumArt: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop",
    personalNote: "Remember playing this song while parked near the coastline? Whenever this melody plays, I'm immediately transported back to looking at you with the dashboard light glowing on your face.",
    favoriteLyricOrLine: "I would never fall in love until I found her..."
  },

  letter: {
    heading: "To My Dearest Wife Jii,",
    body: [
      "Six months ago, I didn't know that one person could become such a beautiful, vital part of my everyday life. Before you, meri zindagi chal rahi thi... ek insaan tha jo bas jee raha tha, par aapke aane ke baad maine jeevan jeena shuru kiya, duniya ko dusre nazariye se dekhna shuru kiya. Aapne mujhe sanwara hai.",
      "Ye 182 din bahut kuch sikha gaye... aapko jeena aur mujhe aapke sahare jeena sikha gaye. Aapke bina main bas ek zinda laash hoon, tumhare bina na jaane mera kya hoga... tumhare bina bikhar jaunga, apne aap ko main phir se kho doonga. Tere pyaar ne mujhe sanwara hai, tere liye main kuch bhi kar jaunga, tujhe bachane ke liye bhagwan se bhi lad jaunga.",
      "Thank you for being my peace when life is chaotic, my laughter when things get tough, and my favorite part of waking up. Thank you for every little touch, every shared smile, and every time you reached out just to hold my hand. Har mushkil me mera sath nibhane ke liye shukriya, meri har galti maaf karne ke liye tera main shukrguzaar hoon.",
      "Tere pyaar me main kho jana chahta hoon... tujhse main shaadi karna chahta hoon. Happy 6 months, my favorite person. If the first six months felt this magical, I can't wait to see what the rest of our lives will bring."
    ],
    closing: "Forever and always yours,",
    signature: "Aapka Yash ❤️",
    postscript: "P.S. Scroll down... I have one last surprise waiting for you."
  },

  finalSurprise: {
    countdownSeconds: 3,
    quote1: "Here's to everything we've already lived...",
    quote2: "...and everything that's still waiting for us.",
    mainTitle: "I LOVE YOU",
    subHeading: "Happy 6-Month Anniversary, My World",
    closingNote: "Our story is only getting started. ✨"
  }
};

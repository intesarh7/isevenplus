type EventEmojis = {
  topLeft?: string;
  topRight?: string;
  bottomLeft?: string;
  bottomRight?: string;
};

export type EventType = {
  name: string;
  title: string;
  themes?: string[];
  defaultTheme: string;
  bg: string;
  colors: string[];
  animation?: string;
  emojis?: EventEmojis; // ✅ NEW
};

export const EVENTS: Record<string, EventType> = {

  diwali: {
    name: "Diwali",
    title: "Happy Diwali 🪔",
    themes: ["gold", "dark"],
    defaultTheme: "gold",
    bg: "/images/diwali/bg.jpg",
    colors: ["#FFD700", "#FF6B00"],
    animation: "sparkle",
    emojis: {
      topLeft: "🪔",
      topRight: "🎆",
      bottomLeft: "✨",
      bottomRight: "💥",
    },
  },

  birthday: {
    name: "Birthday",
    title: "Happy Birthday 🎂",
    themes: ["gold", "dark"],
    defaultTheme: "colorful",
    bg: "/images/birthday/bg.jpg",
    colors: ["#FF4081", "#7C4DFF"],
    animation: "bounce",
    emojis: {
      topLeft: "🎈",
      topRight: "🎉",
      bottomLeft: "🎂",
      bottomRight: "🎁",
    },
  },

  eid: {
    name: "Eid",
    title: "Eid Mubarak 🌙",
    themes: ["gold", "dark"],
    defaultTheme: "dark",
    bg: "/images/eid/bg.jpg",
    colors: ["#00C853", "#FFD700"],
    animation: "fade",
    emojis: {
      topLeft: "🌙",
      topRight: "🕌",
      bottomLeft: "✨",
    },
  },
  holi: {
    name: "Holi",
    title: "Happy Holi 🌈",
    defaultTheme: "colorful",
    themes: ["gold", "dark"],
    bg: "/images/holi/bg.jpg",
    colors: ["#FF4081", "#00C853"],
    animation: "float",
    emojis: {
      topLeft: "🌈",
      topRight: "🎨",
      bottomLeft: "💧",
      bottomRight: "✨",
    },
  },

  christmas: {
    name: "Christmas",
    title: "Merry Christmas 🎄",
    themes: ["gold", "dark"],
    defaultTheme: "dark",
    bg: "/images/christmas/bg.jpg",
    colors: ["#FF0000", "#00C853"],
    animation: "snow",
    emojis: {
      topLeft: "🎄",
      topRight: "🎅",
      bottomLeft: "🎁",
      bottomRight: "❄️",
    },
  },

  newyear: {
    name: "New Year",
    title: "Happy New Year 🎆",
    themes: ["gold", "dark"],
    defaultTheme: "dark",
    bg: "/images/newyear/bg.jpg",
    colors: ["#FFD700", "#000"],
    animation: "fireworks",
    emojis: {
      topLeft: "🎆",
      topRight: "🎉",
      bottomLeft: "🥂",
      bottomRight: "✨",
    },
  },

  valentine: {
    name: "Valentine",
    title: "Happy Valentine ❤️",
    themes: ["gold", "dark"],
    defaultTheme: "pink",
    bg: "/images/valentine/bg.jpg",
    colors: ["#FF4081", "#FF1744"],
    animation: "heartbeat",
    emojis: {
      topLeft: "❤️",
      topRight: "💘",
      bottomLeft: "🌹",
      bottomRight: "💝",
    },
  },

  independence: {
    name: "Independence Day",
    title: "Happy Independence Day 🧡🤍💚",
    themes: ["gold", "dark", "tricolor"],
    defaultTheme: "tricolor",
    bg: "/images/india/bg.jpg",
    colors: ["#FF9933", "#FFFFFF", "#138808"],
    animation: "wave",
    emojis: {
      topLeft: "🛞",
      topRight: "🎉",
      bottomLeft: "🕊️",
      bottomRight: "✨",
    },
  },

  republic: {
    name: "Republic Day",
    themes: ["gold", "dark"],
    title: "Happy Republic Day 🇮🇳",
    defaultTheme: "tricolor",
    bg: "/images/india/bg.jpg",
    colors: ["#FF9933", "#FFFFFF", "#138808"],
    animation: "wave",
    emojis: {
      topLeft: "🇮🇳",
      topRight: "🎉",
      bottomLeft: "🕊️",
      bottomRight: "✨",
    },
  },

  rakhi: {
    name: "Raksha Bandhan",
    title: "Happy Raksha Bandhan 💫",
    defaultTheme: "gold",
    themes: ["gold", "dark"],
    bg: "/images/rakhi/bg.jpg",
    colors: ["#FFD700", "#FF4081"],
    animation: "rotate",
    emojis: {
      topLeft: "🪢",
      topRight: "💫",
      bottomLeft: "🎁",
      bottomRight: "✨",
    },
  },

  teachers: {
    name: "Teacher's Day",
    title: "Happy Teacher's Day 📚",
    defaultTheme: "light",
    themes: ["gold", "dark"],
    bg: "/images/teacher/bg.jpg",
    colors: ["#3F51B5", "#FFC107"],
    animation: "fade",
    emojis: {
      topLeft: "📚",
      topRight: "✏️",
      bottomLeft: "🎓",
      bottomRight: "✨",
    },
  },

  mothers: {
    name: "Mother's Day",
    title: "Happy Mother's Day 💐",
    defaultTheme: "pink",
    themes: ["gold", "dark"],
    bg: "/images/mother/bg.jpg",
    colors: ["#FF4081", "#F8BBD0"],
    animation: "float",
    emojis: {
      topLeft: "💐",
      topRight: "❤️",
      bottomLeft: "👩‍👧",
      bottomRight: "✨",
    },
  },

  fathers: {
    name: "Father's Day",
    title: "Happy Father's Day 👔",
    defaultTheme: "dark",
    themes: ["gold", "dark"],
    bg: "/images/father/bg.jpg",
    colors: ["#212121", "#757575"],
    animation: "fade",
    emojis: {
      topLeft: "👔",
      topRight: "💙",
      bottomLeft: "👨‍👦",
      bottomRight: "✨",
    },
  },

  friendship: {
    name: "Friendship Day",
    title: "Happy Friendship Day 🤝",
    defaultTheme: "colorful",
    themes: ["gold", "dark"],
    bg: "/images/friend/bg.jpg",
    colors: ["#FF4081", "#00BCD4"],
    animation: "bounce",
    emojis: {
      topLeft: "🤝",
      topRight: "💖",
      bottomLeft: "🎉",
      bottomRight: "✨",
    },
  },

  halloween: {
    name: "Halloween",
    title: "Happy Halloween 🎃",
    defaultTheme: "dark",
    themes: ["gold", "dark"],
    bg: "/images/halloween/bg.jpg",
    colors: ["#FF6D00", "#000"],
    animation: "shake",
    emojis: {
      topLeft: "🎃",
      topRight: "👻",
      bottomLeft: "🕷️",
      bottomRight: "✨",
    },
  },

  thanksgiving: {
    name: "Thanksgiving",
    title: "Happy Thanksgiving 🦃",
    defaultTheme: "warm",
    themes: ["gold", "dark"],
    bg: "/images/thanks/bg.jpg",
    colors: ["#8D6E63", "#FFB74D"],
    animation: "fade",
    emojis: {
      topLeft: "🦃",
      topRight: "🍁",
      bottomLeft: "🥧",
      bottomRight: "✨",
    },
  },

  womensday: {
    name: "Women's Day",
    title: "Happy Women's Day 💜",
    defaultTheme: "purple",
    themes: ["gold", "dark"],
    bg: "/images/women/bg.jpg",
    colors: ["#9C27B0", "#E1BEE7"],
    animation: "glow",
    emojis: {
      topLeft: "💜",
      topRight: "👩",
      bottomLeft: "🌸",
      bottomRight: "✨",
    },
  },

  mensday: {
    name: "Men's Day",
    title: "Happy Men's Day 💙",
    defaultTheme: "blue",
    themes: ["gold", "dark"],
    bg: "/images/men/bg.jpg",
    colors: ["#2196F3", "#0D47A1"],
    animation: "fade",
    emojis: {
      topLeft: "💙",
      topRight: "👨",
      bottomLeft: "🎩",
      bottomRight: "✨",
    },
  },

  earthday: {
    name: "Earth Day",
    title: "Happy Earth Day 🌍",
    defaultTheme: "green",
    themes: ["gold", "dark"],
    bg: "/images/earth/bg.jpg",
    colors: ["#4CAF50", "#8BC34A"],
    animation: "float",
    emojis: {
      topLeft: "🌍",
      topRight: "🌱",
      bottomLeft: "🌳",
      bottomRight: "✨",
    },
  },

  childrensday: {
    name: "Children's Day",
    title: "Happy Children's Day 🧸",
    defaultTheme: "colorful",
    themes: ["gold", "dark"],
    bg: "/images/kids/bg.jpg",
    colors: ["#FF4081", "#FFC107"],
    animation: "bounce",
    emojis: {
      topLeft: "🧸",
      topRight: "🎈",
      bottomLeft: "🍭",
      bottomRight: "✨",
    },
  },
};
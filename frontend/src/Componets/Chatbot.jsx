// frontend/src/components/Chatbot/Chatbot.jsx
import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

import "./Chatbot.css";

const ONBOARDING = [
  "Hi! I'm your **Tomato Assistant** 🍴",
  "Let's find your next meal! Ask me to **browse the menu** , **check on your order** or **get help** 🍔!"
];

const FAQ = [
 // --- Greetings ---
  {
    triggers: ["hi", "hello", "hey"],
    response: () => {
      const greetings = [
        "Hello! 👋 How can I help you today?",
        "Hi there! 🍅 What would you like to do?",
        "Good night! 😴 Don't forget to dream about delicious meals!"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
  },

  // --- Goodbye ---
  {
    triggers: ["bye", "goodbye", "see you", "catch you later"],
    response: () => {
      const farewells = [
        "Goodbye! 🍴",
        "See you later! 👋 Stay hungry!",
        "Catch you later! 🌟 Happy cooking!"
      ];
      return farewells[Math.floor(Math.random() * farewells.length)];
    }
  },

  // --- Your Q&A ---
  {
    triggers: ["how do i place my first order", "first order", "place order"],
    response: `Ordering is as easy as 1-2-3! 🥳 Here’s how you can get started:

 **Explore** the menu 🍽️  
 **Add** items to your **cart** 🛒  
 **Checkout** to confirm ✅

That's it! Your meal will be on its way to you. 🚀`
  },
{
  triggers: ["looking for something specific", "specific", "search", "filter"],
  response: `Finding your perfect meal is a breeze! 🍃 On our Menu page, you can:

➡️ **Search** for a dish directly by name. ⌨️
➡️ **Filter** by categories like Salad, Rolls, or Desserts. 🥗
➡️ **Sort** the entire menu by price or name. ↕️

Happy hunting! 🎉`
},
  {
    triggers: ["where is my food", "track my order", "my food"],
    response: `Eagerly awaiting your delivery? 🕒 We get it!

For real-time updates, simply **log in** 👤 to your account and visit the **My Orders** section. You can **track** your order's journey right to your **doorstep**. 🏠`
  },
  {
    triggers: ["how can i share my feedback", "feedback", "review", "rating"],
    response: `Your opinion matters to us! ✨

To share your thoughts ✍️, please scroll down to the **Feedback Form** on our main page. Leaving a **rating** and a **review** helps us make Food-Del even better for you! ❤️`
  },
  {
    triggers: ["is there a mobile app", "mobile app", "app", "download app"],
    response: `Absolutely! Take Food-Del with you wherever you go. 🗺️

Scroll to the bottom of our site to find the **Download Tomato App** section and get the app for your device:

▶️ **Google Play** for Android
🍏 **App Store** for iOS

Enjoy the convenience of ordering with just a tap! 👇`
  },
  {
    triggers: ["how do i subscribe to the newsletter", "subscribe", "newsletter"],
    response: `Be the first to know about exclusive deals 💰, new dishes 🍲, and special offers! 🎁

Just head to the footer at the bottom of the page, enter your email into the **Newsletter** box, and click **Subscribe**. You're in! 🙌`
  },

  // --- Joke feature ---
  {
    triggers: ["tell me a joke", "joke", "funny", "food joke"],
    response: () => getNextJoke()
  },
  {
  triggers: ["*"], // wildcard or fallback
  response: (input) => `😔 **Sorry**, I couldn't find anything for .  
You can try asking something.`
  }
];

// --- Food Jokes ---
const FOOD_JOKES = [
  "What did the olive say when it fell from the tree? Olive... I've fallen! 🫒😅",

"Why did the milkshake bring a straw to the party? To stir things up! 🥤🎉",

"What's a pickle's favorite game show? Dill or No Dill! 🥒📺",

"Why was the oatmeal late for breakfast? It got stuck in a traffic jam! 🥣🚗",

"What did the baby corn ask its mom? Where's popcorn? 🌽🥺",

"Why did the bees go on strike? They wanted more honey and shorter working flowers! 🐝🍯",

"Why was the cake so good at tennis? It had a great slice! 🎂🎾",

"What did the taco say to the burrito? You're my spec-taco-lar other half! 🌮❤️",

"Why did the bell pepper get arrested? For assault and peppery! 🌶️🚔",

"What did the dough say to the baker? I knead you! 🍞❤️",

"Why was the butter late for the party? It was spread too thin. 🧈😥",

"What do you call a fake potato? An imi-tater! 🥔😜",   

"What do you call a sleeping pizza? A pi-zzzzzz-a! 🍕😴",

"Why did the tofu cross the road? To get to the other choyd! 🥢🥬",

"What did the beer say to its friends? 'Don't worry, beer happy! 🍺😄'",
];


let shownJokeIndices = [];
function getNextJoke() {
  if (shownJokeIndices.length === FOOD_JOKES.length) shownJokeIndices = [];
  let index;
  do { index = Math.floor(Math.random() * FOOD_JOKES.length); } while (shownJokeIndices.includes(index));
  shownJokeIndices.push(index);
  return FOOD_JOKES[index];
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showAll, setShowAll] = useState(false);
  const inputRef = useRef(null);
  const endRef = useRef(null);

  const QUICK_QUESTIONS = [
    "How do I place my first order? 🍕",
    "How do I subscribe to the newsletter? 💌",
    "Where is my food? 🛵",
    "How can I share my feedback? ⭐",
    "Is there a mobile app I can use? 📱",
    "Looking for something specific? 🔍"
  ];

  useEffect(() => {
    const saved = localStorage.getItem("foodio_chat_messages");
    setMessages([]);
  }, []);

  useEffect(() => {
    localStorage.setItem("foodio_chat_messages", JSON.stringify(messages));
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

// --- On Chatbot Open: Onboarding + Community Tip ---
useEffect(() => {
    if (open && messages.length === 0) {
      const intro = ONBOARDING.map((t, i) => ({ from: "bot", text: t, id: Date.now() + i }));
      setTimeout(() => setMessages((p) => [...p, ...intro]), 200);

      // Randomly show tip or joke after onboarding
      setTimeout(() => {
        const isTip = Math.random() < 0.5;
        const extraMsg = isTip
          ? { from: "bot", text: getRandomTip(), type: "tip", id: Date.now() + 1000 }
          : { from: "bot", text: getNextJoke(), type: "joke", id: Date.now() + 1000 };
        setMessages((p) => [...p, extraMsg]);
      }, 800);

      setTimeout(() => inputRef.current?.focus(), 300);
    } else if (open) inputRef.current?.focus();
  }, [open, messages]);

  function searchRecipes(searchTerm) {
    const term = searchTerm.toLowerCase();

    const allRecipes = [
      ...(recipes.topRated || []),
      ...(recipes.trending || []),
      ...(recipes.newest || []),
    ];

    const results = allRecipes.filter(recipe => {
      return (
        recipe.title.toLowerCase().includes(term) ||
        recipe.mainIngredient.toLowerCase().includes(term) ||
        recipe.category.toLowerCase().includes(term) ||
        recipe.ingredients.some(ing => ing.name.toLowerCase().includes(term))
      );
    });

    if (results.length) {
      return results.map(r =>
        `🍽️ **${r.title}**\n\n**Ingredients:** ${r.ingredients.map(i => i.name).join(", ")}${
          r.instructions ? `\n**Instructions:** ${r.instructions}` : ""
        }`
      ).join("\n\n---\n\n");
    }

    // Always return something, even if no matches
    return `Sorry, I couldn't find recipes for "${searchTerm}". Here's a tip instead: ${getRandomTip()}`;
  }
async function findResponse(text) {
  const lc = text.toLowerCase().trim();

 //  FAQ match
  const faqItem = FAQ.find(item =>
    item.triggers.some(trig => {
      if (trig === "*") return false; // skip wildcard for now
      const keywords = trig.toLowerCase().split(" ");
      return keywords.every(word => lc.includes(word));
    })
  );

 if (faqItem) {
    if (typeof faqItem.response === "function") return await faqItem.response(text);
    return faqItem.response;
  }

 // Recipe match
  const recipeResponse = searchRecipes(text);
  if (recipeResponse) return recipeResponse;

 // Fallback wildcard
  const fallback = FAQ.find(f => f.triggers.includes("*"));
  if (fallback) return typeof fallback.response === "function" ? fallback.response(text) : fallback.response;
}



  async function sendMessage(rawText) {
    const text = rawText.trim();
    if (!text) return;
    const userMsg = { from: "user", text, id: Date.now() };
    setMessages((p) => [...p, userMsg]);

    setTimeout(async () => {
      const botText = await findResponse(text);
      const botMsg = { from: "bot", text: botText, id: Date.now() + 1 };
      setMessages((p) => [...p, botMsg]);
    }, 500);
  }

  function handleSubmit(e) {
    e?.preventDefault();
    sendMessage(input);
    setInput("");
  }

  async function quickQA(question) { await sendMessage(question); }

  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((s) => !s); }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

 return (
    <>
      {open && (
        <div className="chatbot-container">
          {/* Chat Header */}
          <div className="chatbot-header">
            <div className="header-info">
              <div className="icon">👨‍🍳</div>
              <div>
                <div className="title">Tomato Assistant</div>
                <div className="subtitle">Quick help & onboarding</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="close-btn">✕</button>
          </div>

          {/* Messages */}
          <div className="messages-container">
            {messages.length === 0 && <div style={{ paddingTop: '2rem', textAlign: 'center', fontSize: '0.75rem', color: '#9ca3af' }}>Ask a question to get started.</div>}
             {messages.map((m) => {
              if (m.type === "tip") {
                return (
                  <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="message-wrapper bot">
                    <div className="tip-message-container">
                      <div className="tip-label">💡 Tip</div>
                      <div className="message-bubble bot-message"><ReactMarkdown>{m.text}</ReactMarkdown></div>
                    </div>
                  </motion.div>
                );
              }
              if (m.type === "joke") {
                return (
                  <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="message-wrapper bot">
                    <div className="tip-message-container">
                      <div className="tip-label">😂 Joke</div>
                      <div className="message-bubble bot-message"><ReactMarkdown>{m.text}</ReactMarkdown></div>
                    </div>
                  </motion.div>
                );
              }
              return (
                <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`message-wrapper ${m.from}`}>
                  <div className={`message-bubble ${m.from === 'user' ? 'user-message' : 'bot-message'}`}>
                    <ReactMarkdown>{m.text}</ReactMarkdown>
                  </div>
                </motion.div>
              );
            })}
            <div ref={endRef} />
          </div>

          {/* Quick Questions */}
          <div className="quick-questions">
            {(showAll ? QUICK_QUESTIONS : QUICK_QUESTIONS.slice(0, 3)).map((q, i) => (
              <button key={i} onClick={() => quickQA(q)} className="quick-question-btn">
                {q}
              </button>
            ))}
            <button onClick={() => setShowAll(!showAll)} className="quick-question-btn">
              {showAll ? "See less" : "See more"}
            </button>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="input-form">
            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question..." className="input-field" />
            <button type="submit" className="send-btn" disabled={!input.trim()}>➤</button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      {!open && (
        <button
            aria-label="Open help chat"
            onClick={() => setOpen((s) => !s)}
            className="fab-btn"
        >
            
          🍔
        </button>
        )}
    </>
  );
}
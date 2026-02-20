let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");
let voiceWave = document.querySelector("#voiceWave");
let statusText = document.querySelector("#statusText");

// Speech synthesis function
function speak(text) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1.2;
    text_speak.volume = 1;
    text_speak.lang = "en-US";
    
    // Get available voices
    let voices = window.speechSynthesis.getVoices();
    
    // Try to find a good female voice
    let preferredVoice = voices.find(voice => 
        voice.name.includes("Google UK") || 
        voice.name.includes("Female") || 
        voice.name.includes("Samantha") ||
        voice.name.includes("Microsoft Zira")
    );
    
    if (preferredVoice) {
        text_speak.voice = preferredVoice;
    }
    
    // Update status
    statusText.textContent = "Speaking...";
    
    // When speaking ends
    text_speak.onend = function() {
        statusText.textContent = "Listening for commands...";
    };
    
    window.speechSynthesis.speak(text_speak);
}

// Welcome message based on time
function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    let greeting = "";
    
    if (hours >= 0 && hours < 12) {
        greeting = "Good Morning Manish! How can I help you today?";
    } else if (hours >= 12 && hours < 17) {
        greeting = "Good Afternoon Manish! Ready to assist you.";
    } else {
        greeting = "Good Evening Manish! What can I do for you?";
    }
    
    speak(greeting);
}

// Initialize speech recognition
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

// Configure recognition
recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = "en-US";

recognition.onstart = function() {
    // Show listening UI
    voice.style.display = "none";
    voiceWave.style.display = "flex";
    btn.style.background = "linear-gradient(135deg, #ff6b6b, #feca57)";
    content.innerText = "Listening...";
    statusText.textContent = "Listening... Speak now";
};

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    statusText.textContent = "Processing...";
    takeCommand(transcript.toLowerCase());
};

recognition.onerror = function(event) {
    console.error("Speech recognition error", event.error);
    content.innerText = "Error. Please try again.";
    statusText.textContent = "Error occurred. Click button to try again.";
    resetUI();
};

recognition.onend = function() {
    resetUI();
};

function resetUI() {
    setTimeout(() => {
        voice.style.display = "block";
        voiceWave.style.display = "none";
        btn.style.background = "linear-gradient(135deg, #6c5ce7, #a463f5)";
        content.innerText = "Click here to talk to me";
        statusText.textContent = "Listening for commands...";
    }, 1000);
}

btn.addEventListener("click", () => {
    // Check if browser supports speech recognition
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
        alert("Sorry, your browser doesn't support speech recognition. Try Chrome, Edge, or Safari.");
        return;
    }
    
    try {
        recognition.start();
    } catch (error) {
        console.error("Recognition error:", error);
        content.innerText = "Click to try again";
    }
});

function takeCommand(message) {
    // Reset UI
    voice.style.display = "block";
    voiceWave.style.display = "none";
    btn.style.background = "linear-gradient(135deg, #6c5ce7, #a463f5)";
    
    // Process commands
    if (message.includes("hello") || message.includes("hey") || message.includes("hi")) {
        speak("Hello Manish! How's your day going?");
        
    } else if (message.includes("how are you")) {
        speak("I'm doing great, Manish! Thanks for asking. How can I assist you?");
        
    } else if (message.includes("who are you")) {
        speak("I'm KI, your virtual assistant created by Manish Gupta. I can help you with various tasks like opening websites, telling time, or searching the internet.");
        
    } else if (message.includes("your name")) {
        speak("My name is KI, short for Knowledge Interface.");
        
    } else if (message.includes("thank")) {
        speak("You're welcome, Manish! Happy to help.");
        
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube for you...");
        window.open("https://youtube.com", "_blank");
        
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com", "_blank");
        
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://facebook.com", "_blank");
        
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://instagram.com", "_blank");
        
    } else if (message.includes("open calculator")) {
        speak("Opening calculator...");
        window.open("calculator://", "_blank");
        
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("https://web.whatsapp.com", "_blank");
        
    } else if (message.includes("open gmail")) {
        speak("Opening Gmail...");
        window.open("https://mail.google.com", "_blank");
        
    } else if (message.includes("open github")) {
        speak("Opening GitHub...");
        window.open("https://github.com", "_blank");
        
    } else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        speak(`The time is ${time}`);
        
    } else if (message.includes("date") || message.includes("today")) {
        let date = new Date().toLocaleDateString([], { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        speak(`Today is ${date}`);
        
    } else if (message.includes("weather")) {
        speak("I'm sorry, I don't have access to weather data yet. But I can search for weather online for you.");
        window.open("https://www.google.com/search?q=weather", "_blank");
        
    } else if (message.includes("search for") || message.includes("google")) {
        let searchQuery = message.replace("search for", "")
                                 .replace("google", "")
                                 .replace("ki", "")
                                 .trim();
        speak(`Searching for ${searchQuery} on Google`);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, "_blank");
        
    } else if (message.includes("play music") || message.includes("play song")) {
        speak("Opening YouTube Music for you");
        window.open("https://music.youtube.com", "_blank");
        
    } else if (message.includes("joke") || message.includes("funny")) {
        let jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs!",
            "Why did the developer go broke? Because he used up all his cache!",
            "What's a computer's favorite beat? An algorithm!",
            "Why do Java developers wear glasses? Because they can't C#!"
        ];
        let randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        speak(randomJoke);
        
    } else if (message.includes("bye") || message.includes("goodbye")) {
        speak("Goodbye Manish! Have a great day! Feel free to call me anytime.");
        
    } else {
        // Default: Search on Google
        let finalText = `I found this information about ${message} on Google.`;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
    }
}

// Load voices and welcome message
window.speechSynthesis.onvoiceschanged = function() {
    // Optional: Preload voices
    window.speechSynthesis.getVoices();
};

// Welcome user when page loads (optional - uncomment if you want)
// window.addEventListener('load', () => {
//     setTimeout(wishMe, 1000);
// });

// Make takeCommand globally available
window.takeCommand = takeCommand;
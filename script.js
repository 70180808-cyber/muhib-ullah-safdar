const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

let faqs = [];

async function loadFAQs() {
    try {
        const response = await fetch("/api/faqs");
        faqs = await response.json();
    } catch (error) {
        console.log("Unable to load FAQs");
    }
}

function addMessage(message, className) {
    const div = document.createElement("div");
    div.className = className;
    div.style.padding = "12px";
    div.style.marginBottom = "10px";
    div.style.borderRadius = "10px";
    div.style.whiteSpace = "pre-line";
    div.textContent = message;

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

const romanQuestions = {
    "library": ["library ki timing", "library kab khulti hai", "library ka time"],
    "attendance": ["attendance kitni honi chahiye", "attendance requirement kya hai"],
    "bus": ["bus kab nikalti hai", "university bus timing", "bus ka time"],
    "fee": ["fee ki last date kya hai", "fee kab jama karwani hai"],
    "lab": ["lab kab khulti hai", "lab ki timing kya hai"],
    "exam": ["bimari ki wajah se midterm miss ho gaya", "midterm miss ho jaye to kya karun"],
    "fyp": ["fyp proposal kaise submit karun", "fyp ki last date kya hai"],
    "help": ["madad ke liye kahan contact karun", "helpdesk se kaise contact karun"]
};

function sendMessage() {
    const question = userInput.value.trim().toLowerCase();

    if (question === "") return;

    addMessage(userInput.value, "user-message");
    userInput.value = "";

    const keywords = {
        "library": ["library", "kitab khana"],
        "attendance": ["attendance", "hazri"],
        "bus": ["bus", "transport"],
        "fee": ["fee", "challan", "fees"],
        "lab": ["lab", "laboratory"],
        "exam": ["midterm", "exam", "paper"],
        "fyp": ["fyp", "project proposal"],
        "help": ["help", "contact", "madad", "helpdesk"]
    };

    let category = null;

    for (const key in keywords) {
        if (keywords[key].some(word => question.includes(word))) {
            category = key;
            break;
        }
    }

    if (category) {
        const matchedFAQ = faqs.find(faq => {
            return faq.id === {
                library: "FAQ-03",
                attendance: "FAQ-02",
                bus: "FAQ-07",
                fee: "FAQ-05",
                lab: "FAQ-01",
                exam: "FAQ-04",
                fyp: "FAQ-06",
                help: "FAQ-08"
            }[category];
        });

        if (matchedFAQ) {
            addMessage(
                matchedFAQ.answer + "\n\nFAQ ID: " + matchedFAQ.id,
                "bot-message"
            );
            return;
        }
    }

    addMessage(
        "Sorry, ye information hamare FAQ database mein available nahi hai.",
        "bot-message"
    );
}

userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") sendMessage();
});

loadFAQs();
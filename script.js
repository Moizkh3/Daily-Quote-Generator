const api_url = "https://api.api-ninjas.com/v1/quotes";
const api_key = "rxuV6OVJr5BhYZD4VO8XFg==61d4SCvhcmuiZDzt";

const quoteText = document.querySelector("blockquote"); // Quote block
const authorText = document.querySelector("span"); // Author name
const newQuoteBtn = document.querySelector("#new-quote"); // New Quote button
const tweetBtn = document.querySelector("#tweet"); // X (Twitter) button

async function getQuote() {
    try {
        const response = await fetch(api_url, {
            method: "GET",
            headers: {
                "X-Api-Key": api_key
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const quote = data[0].quote;
        const author = data[0].author;

        quoteText.innerText = `"${quote}"`; // Update blockquote
        authorText.innerText = ` ${author}`; // Update author

        // ✅ Corrected X (Twitter) share link
        const tweetUrl = `https://x.com/intent/post?text=${encodeURIComponent(`"${quote}" - ${author}`)}`;
        tweetBtn.setAttribute("href", tweetUrl);
        tweetBtn.setAttribute("target", "_blank"); // Open in new tab
    } catch (error) {
        console.error("Error fetching quote:", error);
        quoteText.innerText = "Failed to load quote. Please try again.";
        authorText.innerText = "";
    }
}

// Load a quote when the page loads
getQuote();

// Fetch a new quote when 'New Quote' button is clicked
newQuoteBtn.addEventListener("click", getQuote);

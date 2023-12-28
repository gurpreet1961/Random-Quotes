const topicsArray = [
    "age",
    "alone",
    "amazing",
    "anger",
    "architecture",
    "art",
    "attitude",
    "beauty",
    "best",
    "birthday",
    "business",
    "car",
    "change",
    "communication",
    "computers",
    "cool",
    "courage",
    "dad",
    "dating",
    "death",
    "design",
    "dreams",
    "education",
    "environmental",
    "equality",
    "experience",
    "failure",
    "faith",
    "family",
    "famous",
    "fear",
    "fitness",
    "food",
    "forgiveness",
    "freedom",
    "friendship",
    "funny",
    "future",
    "god",
    "good",
    "government",
    "graduation",
    "great",
    "happiness",
    "health",
    "history",
    "home",
    "hope",
    "humor",
    "imagination",
    "inspirational",
    "intelligence",
    "jealousy",
    "knowledge",
    "leadership",
    "learning",
    "legal",
    "life",
    "love",
    "marriage",
    "medical",
    "men",
    "mom",
    "money",
    "morning",
    "movies",
    "success"
];
var currentCategory = "none";

const categoryEle = document.querySelector(".category");
async function fetchData(category) {
    const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
    const apiKey = 'qpSAH3hLaYms7r9fJz74Dw==palTjjiwrJfAOEHC';

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

function getRandomNumber(n) {
    return Math.floor(Math.random() * (n + 1));
}
topicsArray.map((ele) => {
    const category_item = document.createElement("a");
    category_item.setAttribute("class", "category-item")
    category_item.href = "#quote"
    category_item.innerText = ele;
    category_item.addEventListener('click', (() => {
        currentCategory = ele;
        showQuote(fetchData(ele))
    }));
    categoryEle.append(category_item);
})

const showQuote = async (data) => {
    const quote = document.querySelector("#quote>h3");
    quote.innerText = "Loading...!!! 🔃"
    data = await data;
    quote.innerText = data[0].quote;
}

const newQuoteBtn = document.querySelector(".newQuoteBtn");
newQuoteBtn.addEventListener("click", (() => {
    if (currentCategory === "none") {
        const idx = getRandomNumber(topicsArray.length);
        showQuote(fetchData(topicsArray[idx]));
    } else {
        showQuote(fetchData(currentCategory));
    }
}))

const subjects = ["girl", "boy", "man"] ;//, "woman", "children", "baby", "he", "she", "it", "they", "we"];
const qualifiedSubjects = []; //["old man", "little girl"];
const actions = ["is buying", "is selling", "is eating"]; // "peels", "cuts", "grates", "boils", "cooks"];
const themeNouns = ["strawberry", "apple", "orange"]; //, "watermelon", "pineapple", "banana"];
// const qualifiedNouns = ["raw", "fresh", "red", "ripe", "a dozen", "two", "three", "four", "many", "few"];

const image_links = {
    "girl is eating apple": "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/little-girl-eating-an-apple-anna-omelchenko.jpg",
    "boy is buying apple": "https://media.istockphoto.com/id/1092911284/photo/little-boy-shopping-for-apples.jpg?s=612x612&w=0&k=20&c=ICbHDVxC3xAIlFqjj0kSC7Ty-IhYRpRZXgTPXC8FTnI=",
    "boy is selling apple": "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/a-boy-selling-apples-warren-gale.jpg",
    "boy is eating apple": "https://www.shutterstock.com/shutterstock/videos/14489833/thumb/10.jpg?ip=x480",
    "boy is eating orange": "https://g3.img-dpreview.com/BDF1AC4D454F4CEA820BF8011643CB91.jpg",
    "boy is selling orange": "https://c8.alamy.com/comp/D7KTJD/boy-selling-oranges-luxor-egypt-13-january-2013-D7KTJD.jpg",
    "boy is buying orange": "https://catholiccharities.org/wp-content/uploads/boy-with-apple-and-orange-2.jpg",
    "boy is buying strawberry": "https://img.freepik.com/premium-photo/excited-child-boy-supermarket-is buying-vegetables-strawberry-healthy-food-children-funny-shopping_265223-33537.jpg?w=2000",
    "boy is selling strawberry": "https://i.ytimg.com/vi/IpktIzOqTdo/maxresdefault.jpg",
    "boy is eating strawberry": "https://c8.alamy.com/comp/BGTCXJ/boy-eating-strawberry-cape-town-western-cape-south-africa-BGTCXJ.jpg",
    "girl is buying apple": "https://media.istockphoto.com/id/936496972/photo/little-girl-picks-out-apples-at-the-grocery-store.jpg?s=612x612&w=0&k=20&c=XEQTU60hcMMuIrRAu5AvO1CPLJNOmywKABtC_DFzRmE=",
    "girl is selling apple": "https://previews.123rf.com/images/jackf/jackf1707/jackf170702942/81928324-happy-woman-stuff-in-apron-selling-sweet-seasonal-apples-at-marketplace.jpg",
    "girl is eating orange": "https://c8.alamy.com/comp/2F3TNC6/cute-little-girl-eating-orange-in-kitchen-2F3TNC6.jpg",
    "girl is selling orange": "https://live.staticflickr.com/40/94325987_c07f3c2a0c_b.jpg",
    "girl is buying orange": "https://c8.alamy.com/comp/2JHEK42/focused-fifteen-year-old-girl-chooses-ripe-oranges-2JHEK42.jpg",
    "girl is eating strawberry": "https://media.sciencephoto.com/image/f0027707/800wm",
    "girl is buying strawberry": "https://vindy.media.clients.ellingtoncms.com/img/photos/2018/06/17/img_1444_t625.jpg?7bf89ecc353d9147b6b4cfd3048cedf379d10738",
    "girl is selling strawberry": "https://cdn.openart.ai/stable_diffusion/533f6fbcc8ca450d007858dfa51e58895b48e2ec_2000x2000.webp",
    "man is buying apple": "https://images.freeimages.com/images/premium/previews/2421/24213743-man-buying-apples.jpg",
    "man is selling apple": "https://media.istockphoto.com/id/1210753396/photo/indian-man-selling-fresh-apples-on-the-street-bhaktapur.jpg?s=170667a&w=0&k=20&c=JC6ISGpa6X5WBzWeXKcAUkedmtZns-PdXRYgOLmnhWI=",
    "man is eating orange": "https://media.istockphoto.com/id/877338182/photo/man-eating-sour-an-orange.jpg?s=612x612&w=0&k=20&c=GLJg8PYNA26ziwx_JLcwhnJ--Q0OvSCSMIj-FmyKoDc=",
    "man is selling orange": "https://t1.thpservices.com/previewimage/gallil/2c463bb5dabd5280ae52a636b9b2dbfe/a68-3597996.jpg",
    "man is buying orange": "https://static2.bigstockphoto.com/4/5/3/large1500/354148337.jpg",
    "man is eating strawberry": "https://c8.alamy.com/comp/WM1FRX/happy-young-man-eating-a-strawberry-isolated-on-white-background-WM1FRX.jpg",
    "man is buying strawberry": "https://s3.envato.com/files/261611119/335-mckinsey-120.jpg",
    "man is selling strawberry": "https://c8.alamy.com/comp/BKXBC6/young-male-strawberry-seller-is selling-strawberries-to-an-old-man-wearing-BKXBC6.jpg",
    "man is eating apple": "https://as2.ftcdn.net/v2/jpg/00/49/97/79/1000_F_49977997_gVmpVDTysUYqpyA48yhUJB7GHR4RovAK.jpg",
}

let currentQuestionIndex = 0;
let score = 0;

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function loadNextQuestion() {

    const descriptionElement = document.getElementById("description");
    const imageOptions = document.querySelectorAll(".image-option img");
    const correctIndexElement = document.getElementById("correctIdx");
    const feedbackElement = document.getElementById("feedback");

    const subject = getRandomElement(subjects.concat(qualifiedSubjects));
    const action = getRandomElement(actions);
    const noun = getRandomElement(themeNouns); //.concat(qualifiedNouns));

    const description = `${subject} ${action} ${noun}`;

    const distractors = [];
    while (distractors.length < 2) {
        const randomSubject = getRandomElement(subjects.concat(qualifiedSubjects));
        const randomAction = getRandomElement(actions);
        const randomNoun = getRandomElement(themeNouns); // .concat(qualifiedNouns));
        const randomOption = `${randomSubject} ${randomAction} ${randomNoun}`;

        if (randomOption !== description && !distractors.includes(randomOption)) {
            distractors.push(randomOption);
        }
    }

    const options = [description, ...distractors];
    shuffleArray(options);

    const correctAnswerIndex = options.indexOf(description);

    descriptionElement.textContent = description;
    
    imageOptions[0].src = image_links[options[0]];
    imageOptions[1].src = image_links[options[1]];
    imageOptions[2].src = image_links[options[2]];

    correctIndexElement.textContent = correctAnswerIndex;
    feedbackElement.textContent = "";

}

function checkAnswer(selectedOptionIndex) {

    const feedbackElement = document.getElementById("feedback");
    const scoreElement = document.getElementById("score");
    const correctIndexElement = document.getElementById("correctIdx");

    const correctAnswerIndex = parseInt(correctIndexElement.textContent);

    if (selectedOptionIndex === correctAnswerIndex) {
        feedbackElement.textContent = "Correct!";
        score++;
        scoreElement.textContent = `Score: ${score}`;
    } else {
        feedbackElement.textContent = "Incorrect. Try again.";
    }
}


loadNextQuestion();

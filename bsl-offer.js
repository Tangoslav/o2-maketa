// Initialize the page by showing hero search first
document.addEventListener('DOMContentLoaded', function() {
    console.log('BSL OFFER JAVASCRIPT');

    // Select all forms on the page
    const forms = document.querySelectorAll('form');

    // Add event listener to each form
    forms.forEach(function(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission
            console.log('Form submission prevented');
        });
    });

    document.querySelectorAll('a').forEach(function(anchor) {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('Anchor link disabled:', anchor.href);
        });
    });

    // Fetch and display offers from the local JSON file
    fetchOffersFromJSON();
});

// Function to fetch offers from offer_list.json
function fetchOffersFromJSON() {
    fetch('./offer_list.json') // Ensure this path is correct relative to your HTML file
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Offer list loaded successfully:', data);
            displayOffers(data); // Pass the offerList to your function
        })
        .catch(error => {
            console.error('Error loading offer_list.json:', error);
        });
}

// ----------- Technology Functions --------------- //

function displayTechnologies(techList) {
    const techTable = document.querySelector('.tech-table');
    const technologiesSection = document.getElementById('technologiesSection');

    if (techList.length > 0) {
        technologiesSection.classList.remove('hidden'); // Show the section
        techTable.innerHTML = ''; // Clear previous content

        techList.forEach(tech => {
            const techFeature = createTechnologyCard(tech);
            techTable.appendChild(techFeature);
        });
    } else {
        technologiesSection.classList.add('hidden'); // Keep section hidden if no data
    }
}

function createTechnologyCard(tech) {
    const techFeature = document.createElement('div');
    techFeature.classList.add('tech-feature');

    const techIcon = createTechnologyIcon(tech.type);
    const techContent = createTechnologyContent(tech);

    techFeature.appendChild(techIcon);
    techFeature.appendChild(techContent);

    return techFeature;
}

function createTechnologyIcon(type) {
    const techIconBorder = document.createElement('span');
    techIconBorder.classList.add('material-icons', 'tech-feature-icon-border');

    const icons = {
        'OPTICAL': 'lightbulb',        // Icon for Optical Fiber
        'VDSLBONDING': 'link',         // Icon for Bonding
        'AIRFIX': 'satellite',         // Icon for AirFix
        'VDSLVECTORING': 'network_check', // Icon for Vectoring
        'VDSL': 'cable',               // Icon for VDSL
        '5G': 'phone_iphone',          // Icon for 5G
        'MULTIMEDIA': 'movie',         // Icon for Multimedia
        'MSAN': 'router',              // Icon for MSAN
        'WTTX': 'wifi',                // Icon for WTTX
        'LTE5GINTERNET': 'signal_wifi_4_bar',  // Icon for LTE/5G Internet
        'LTE3700': 'signal_cellular_alt',      // Icon for LTE 3700
        'LTE2600': 'signal_cellular_alt',      // Icon for LTE 2600
        'LTE2100': 'signal_cellular_alt',      // Icon for LTE 2100
        'LTE1800': 'signal_cellular_alt',      // Icon for LTE 1800
        'LTE800': 'signal_cellular_alt',       // Icon for LTE 800
        'LTE700': 'signal_cellular_alt',       // Icon for LTE 700
        'GSM': 'network_cell',          // Icon for GSM
        'AF20INDOOR': 'satellite_alt',  // Icon for AirFix 2 Indoor
        '5GNR3700': '5g',               // Icon for 5G NR 3700
        '5GNR1800': '5g',               // Icon for 5G NR 1800
        'DEFAULT': 'build'              // Default icon
    };

    const techIcon = document.createElement('span');
    techIcon.classList.add('material-icons', 'tech-feature-icon');
    techIconBorder.appendChild(techIcon);

    techIcon.innerText = icons[type] || icons['DEFAULT'];
    return techIconBorder;
}

function createTechnologyContent(tech) {
    const techContent = document.createElement('div');

    const techTitle = document.createElement('div');
    techTitle.classList.add('tech-feature-title');
    techTitle.innerText = tech.type;

    const techDetail = document.createElement('div');
    techDetail.classList.add('tech-feature-detail');
    techDetail.innerText = `${tech.maxDownSpeed} Mbps - Priority: ${tech.priority} - Area: ${tech.priorityArea}`;

    techContent.appendChild(techTitle);
    techContent.appendChild(techDetail);

    return techContent;
}

// ----------- Offer Functions --------------- //

// function displayOffers(offerList) {
//     const offerCardsContainer = document.getElementById('offerCards');
//     const offersSection = document.querySelector("div.d2-gtariff");
//
//     if (offerList.length > 0) {
//         console.log(offerList);
//         offersSection.classList.remove('hidden'); // Show the section
//         offerCardsContainer.innerHTML = ''; // Clear existing cards
//
//         offerList.forEach(offer => {
//             const card = createOfferCard(offer);
//             offerCardsContainer.appendChild(card);
//         });
//     } else {
//         offersSection.classList.add('hidden'); // Keep section hidden if no offers
//     }
// }

function displayOffers(offerList) {
    const offerCardsContainer = document.getElementsByClassName('d2-gtariff')[0];
    const offersSection = document.getElementsByClassName('d2-gtariff')[0];

    if (offerList.length > 0) {
        offersSection.classList.remove('hidden'); // Show the section
        offerCardsContainer.innerHTML = ''; // Clear existing cards

        offerList.forEach(offer => {
            const card = createOfferCard(offer);
            offerCardsContainer.appendChild(card);
        });
    } else {
        offersSection.classList.add('hidden'); // Keep section hidden if no offers
    }
}

// function createOfferCard(offer) {
//     const card = document.createElement('div');
//     card.classList.add('d2-box__content', 'd2-typo--center', 'd2-box__content--vertical-40');
//
//     card.innerHTML = `
//         <h3 class="d2-stack d2-typo--md-size-7">
//             <strong class="insite-only">Optický až ${offer.maxDownSpeed / 1000} Mb/s</strong>
//         </h3>
//         <div class="d2-stack">
//             <div class="insite-only d2-stack d2-text d2-text--benefits d2-typo--size-2">
//                 <p>${offer.description}</p>
//             </div>
//         </div>
//         <div class="d2-stack">
//             <picture>
//                 <img alt="O2 TV v ceně" class="d2-img d2-img--box" src="./path_to_image.jpg">
//             </picture>
//         </div>
//         <div class="d2-stack">
//             <div class="insite-only d2-stack d2-mktese">
//                 <strong>${offer.priceWithVAT} Kč</strong>&nbsp;/ měsíc
//             </div>
//             <div class="insite-only d2-stack d2-stack--top-10 d2-typo--size-2">
//                 <p>na prvních 6 měsíců, pak dle zvoleného tarifu</p>
//             </div>
//         </div>
//         <div class="d2-stack">
//             <a class="d2-btn d2-btn--secondary d2-btn--full-width" href="#" title="Ověřit dostupnost">
//                 <span class="d2-btn__text">Ověřit dostupnost</span>
//             </a>
//         </div>
//     `;
//
//     return card;
// }

function createOfferCard(offer) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('js2-pad-container', 'd2-gtariff__item');

    const card = document.createElement('div');
    card.classList.add('d2-rounded--12', 'd2-shadow--light-15', 'd2-box', 'd2-box--border-2', 'd2-box--gray', 'd2-bgr--default', 'd2-typo--center', 'js2-scrollspy', 'js2-scrollspy--animate', 'd2-animate');
    card.setAttribute('data-scroll-offset', '40');
    card.setAttribute('id', `box-${offer.code}`);

    const cardContent = document.createElement('div');
    cardContent.classList.add('d2-box__content', 'd2-typo--center', 'd2-box__content--vertical-40');

    // Title
    const title = document.createElement('h3');
    title.classList.add('d2-stack', 'd2-typo--md-size-7');
    const titleStrong = document.createElement('strong');
    titleStrong.classList.add('insite-only');
    titleStrong.innerHTML = offer.code;
    title.appendChild(titleStrong);

    // Description
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('d2-stack');
    const innerDescriptionDiv = document.createElement('div');
    innerDescriptionDiv.classList.add('insite-only', 'd2-stack', 'd2-text', 'd2-text--benefits', 'd2-typo--size-2');
    const descriptionP = document.createElement('p');
    descriptionP.innerHTML = offer.description ? offer.description : "Náš nejrychlejší internet, se kterým hravě připojíte velký počet zařízení, můžete streamovat ve 4K a bez prodlev používat náročné aplikace.";
    innerDescriptionDiv.appendChild(descriptionP);
    descriptionDiv.appendChild(innerDescriptionDiv);

    // Image section
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('d2-stack', 'js2-tooltip');
    imgDiv.setAttribute('data-tooltip-content-source', 'next::div');
    imgDiv.setAttribute('data-tooltip-placement', 'bottom');
    imgDiv.setAttribute('data-tooltip-theme', 'medium normal');
    imgDiv.setAttribute('aria-expanded', 'false');

    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('d2-stack', 'd2-stack--30');

    const picture = document.createElement('picture');
    const img = document.createElement('img');
    img.setAttribute('loading', 'lazy');
    img.setAttribute('src', 'o2_web_copy_files/-a195405');
    img.setAttribute('alt', 'O2 TV v ceně');
    img.classList.add('d2-img', 'd2-img--box', 'js-exponea-image', 'd2-loading--lazy');
    picture.appendChild(img);
    imgWrapper.appendChild(picture);
    imgDiv.appendChild(imgWrapper);

    // Hidden section
    const hiddenSection = document.createElement('div');
    hiddenSection.classList.add('js2-loading-hidden', 'd2-typo--center', 'd2-text', 'd2-typo--size-1', 'd2-stack');
    hiddenSection.style.display = 'none';
    hiddenSection.innerHTML = 'S jakýmkoliv tarifem O2&nbsp;Internetu získáte digitální televizi O2&nbsp;TV Modrá s&nbsp;více jak 30&nbsp;televizními kanály.';

    // Price section
    const priceDiv = document.createElement('div');
    priceDiv.classList.add('d2-stack');
    const priceWrapper = document.createElement('div');
    priceWrapper.classList.add('insite-only', 'd2-stack', 'd2-mktese');
    priceWrapper.setAttribute('data-content-purpose', '');

    const priceStrong = document.createElement('strong');
    priceStrong.innerHTML = `${offer.prices[0].priceWithVAT} Kč`;
    priceWrapper.appendChild(priceStrong);
    priceWrapper.innerHTML += '&nbsp;/ měsíc';
    const priceNote = document.createElement('div');
    priceNote.classList.add('insite-only', 'd2-stack', 'd2-stack--top-10', 'd2-typo--size-2');
    priceNote.innerHTML = '<p>na prvních 6 měsíců, pak dle zvoleného tarifu</p>';
    priceDiv.appendChild(priceWrapper);
    priceDiv.appendChild(priceNote);

    // Button section
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('d2-stack');
    const button = document.createElement('a');
    button.classList.add('d2-btn', 'd2-btn--secondary', 'd2-btn--full-width', 'js-exponea-button-url');
    button.setAttribute('href', '#s-checker');
    button.setAttribute('data-tracking-button-id', 'a229403');
    button.setAttribute('aria-label', 'Ověřit dostupnost');
    button.setAttribute('title', 'Ověřit dostupnost');
    button.setAttribute('data-lb-action', 'Ověřit dostupnost');

    const buttonText = document.createElement('span');
    buttonText.classList.add('d2-btn__text', 'js-exponea-button-text');
    buttonText.innerHTML = 'Ověřit dostupnost';
    button.appendChild(buttonText);
    buttonDiv.appendChild(button);

    // Assemble card content
    cardContent.appendChild(title);
    cardContent.appendChild(descriptionDiv);
    cardContent.appendChild(imgDiv);
    cardContent.appendChild(hiddenSection);
    cardContent.appendChild(priceDiv);
    cardContent.appendChild(buttonDiv);

    // Assemble the complete card
    card.appendChild(cardContent);
    cardContainer.appendChild(card);

    console.log("Created offer card for offer " + offer.code);

    return cardContainer;
}

// ----------- Fetch Offers --------------- //

function fetchOffersOnLocality() {
    const spinner = document.getElementById('loadingSpinner');
    spinner.style.display = 'block'; // Show spinner

    fetch('http://localhost:3000/api/private/v2/offers/on-locality', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            eligibility: {
                evaluationType: "LENIENT"
            },
            groupCodes: [
                "GROUP_CHEAP"
            ],
            channel: "ESHOP_2.0",
            locality: {
                type: "ADDRESS_ID",
                crossId: "AD53222652"
            }
        })
    })
        .then(response => response.json())
        .then(data => {
            spinner.style.display = 'none'; // Hide spinner when done

            // Display technologies if available, otherwise keep the section hidden
            if (data.localityScanCheck && data.localityScanCheck.technologyList) {
                displayTechnologies(data.localityScanCheck.technologyList);
            }

            // Display offers if available, otherwise keep the section hidden
            if (data.offerList && data.offerList.length > 0) {
                displayOffers(data.offerList);
            }
        })
        .catch(error => {
            spinner.style.display = 'none'; // Hide spinner on error
            console.error('Error fetching offers on locality:', error);
        });
}

// Hero Search Functionality
function heroSearch(event) {
    if (event.key === 'Enter') {
        triggerHeroSearch();
    }
}

function triggerHeroSearch() {
    const mainContent = document.getElementById('mainContent');
    const enteredLocation = document.getElementById('heroSearchInput').value.trim();

    if (enteredLocation) {
        updateLocationDisplay(enteredLocation);
        mainContent.classList.add('show-content');
        document.body.style.overflow = 'auto';
        mainContent.scrollIntoView({ behavior: 'smooth' });
        fetchOffersOnLocality(); // Fetch offers after search
    }
}

function updateLocationDisplay(location) {
    const locationDisplay = document.getElementById('locationDisplay');
    locationDisplay.textContent = location || 'Your Area';
}

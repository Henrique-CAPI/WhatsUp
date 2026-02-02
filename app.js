let mainMenu, coordinateForm, loadingState, loadingMessage, errorState;
let mainContent, locationInfo, coordinates, errorMessage;
let retryBtn, refreshBtn, objectsList, objectCount, emptyState;
let useCurrentLocationBtn, enterCoordinatesBtn, backToMenuBtn;
let changeLocationBtn, errorBackBtn, coordsForm, latitudeInput, longitudeInput;
let lastLocationDiv, lastLocationBtn, lastLocationCoords;

let detailView, detailBg, detailCloseBtn, detailList;
let detailName, detailType, detailIcon, detailBasicInfo, detailFactsList;

let userLocation = null;
let locationMethod = null;
let currentObjects = [];
let selectedObjectIndex = null;
let isRefreshing = false;

const LAST_COORDS_KEY = 'whatsup_last_coordinates';

const PLANETS = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

const PLANET_BODIES = {
    'Mercury': Astronomy.Body.Mercury,
    'Venus': Astronomy.Body.Venus,
    'Mars': Astronomy.Body.Mars,
    'Jupiter': Astronomy.Body.Jupiter,
    'Saturn': Astronomy.Body.Saturn,
    'Uranus': Astronomy.Body.Uranus,
    'Neptune': Astronomy.Body.Neptune
};

const CELESTIAL_DATA = {
    'Sun': {
        basicInfo: {
            'Type': 'G-type Main-sequence Star',
            'Age': '4.6 billion years',
            'Diameter': '1,392,700 km',
            'Mass': '1.989 × 10³⁰ kg',
            'Temperature': '5,500°C (surface)',
            'Distance': '149.6 million km',
            'Orbital Period': 'N/A (center)',
            'Day Length': '25 days (equator)'
        },
        facts: [
            'The Sun is the undisputed heavyweight of our solar system, containing an astounding 99.86% of all the mass in our cosmic neighborhood. This means all eight planets, their moons, asteroids, comets, and everything else combined make up less than 0.2% of the total mass. Jupiter, the largest planet, would need to be about 1,000 times more massive to even begin nuclear fusion like the Sun.',
            'When you look up at the Sun, you\'re actually seeing it as it was about 8 minutes and 20 seconds ago. Light travels at roughly 300,000 kilometers per second, yet even at this incredible speed, it takes over 8 minutes to cross the 150 million kilometers between the Sun and Earth. The light you see was generated in the Sun\'s core about 100,000 years before that, slowly working its way to the surface.',
            'Deep in its core, the Sun operates as a colossal nuclear fusion reactor, converting approximately 600 million tons of hydrogen into helium every single second. During this process, about 4 million tons of matter is transformed directly into energy following Einstein\'s famous equation E=mc². This has been happening for 4.6 billion years and will continue for another 5 billion years.',
            'While we often depict the Sun as yellow or orange in artwork, it\'s actually white when viewed from space. Earth\'s atmosphere scatters the shorter blue wavelengths of sunlight (which is why our sky is blue), leaving the longer yellow and red wavelengths to reach our eyes. At sunrise and sunset, when sunlight travels through more atmosphere, it appears even more orange or red.',
            'The Sun\'s fate is already written in the laws of physics. In approximately 5 billion years, it will exhaust the hydrogen fuel in its core and begin fusing helium. This will cause it to expand dramatically into a red giant, growing so large that it will engulf Mercury and Venus completely, and possibly Earth as well. Eventually, it will shed its outer layers and collapse into a white dwarf about the size of Earth.'
        ]
    },
    'Moon': {
        basicInfo: {
            'Type': 'Natural Satellite',
            'Age': '4.5 billion years',
            'Diameter': '3,474 km',
            'Mass': '7.35 × 10²² kg',
            'Temperature': '-173°C to 127°C',
            'Distance': '384,400 km (from Earth)',
            'Orbital Period': '27.3 days',
            'Day Length': '29.5 Earth days'
        },
        facts: [
            'Our Moon is gradually escaping from Earth, drifting away at a rate of about 3.8 centimeters per year—roughly the same rate your fingernails grow. This recession is caused by tidal interactions between the Earth and Moon. Billions of years ago, the Moon was much closer and appeared far larger in the sky. In the distant future, it will be too far away to create total solar eclipses.',
            'The Moon\'s gravitational influence extends far beyond creating ocean tides. It has been slowing Earth\'s rotation for billions of years through tidal friction. Early in Earth\'s history, days were only about 6 hours long. The Moon also stabilizes Earth\'s axial tilt at around 23.5 degrees, which is crucial for maintaining our relatively stable climate and seasons.',
            'Only 12 human beings have ever set foot on another world, and all of them walked on the Moon during NASA\'s Apollo program between 1969 and 1972. Neil Armstrong and Buzz Aldrin were the first during Apollo 11, while Eugene Cernan was the last, leaving the lunar surface in December 1972. No human has returned since, though multiple nations are now planning crewed lunar missions.',
            'The Moon is essentially a time capsule preserving a record of 4.5 billion years of solar system history. Without weather, wind, or liquid water to cause erosion, the footprints left by Apollo astronauts will remain virtually unchanged for tens of millions of years. The only forces that can disturb them are micrometeorite impacts and the solar wind, which act extremely slowly.',
            'A complete day-night cycle on the Moon—from one sunrise to the next at any given location—takes about 29.5 Earth days, known as a synodic month. This means lunar locations experience about two weeks of continuous daylight followed by two weeks of darkness. Surface temperatures swing dramatically between these extremes, reaching 127°C in sunlight and plunging to -173°C in shadow.'
        ]
    },
    'Mercury': {
        basicInfo: {
            'Type': 'Terrestrial Planet',
            'Age': '4.5 billion years',
            'Diameter': '4,879 km',
            'Mass': '3.30 × 10²³ kg',
            'Temperature': '-180°C to 430°C',
            'Distance': '57.9 million km',
            'Orbital Period': '88 Earth days',
            'Day Length': '176 Earth days'
        },
        facts: [
            'Mercury holds the record for the most extreme temperature swings in our solar system. Its surface can reach a scorching 430°C (800°F) during the day—hot enough to melt lead and zinc—then plummet to -180°C (-290°F) at night. This 600-degree variation occurs because Mercury has virtually no atmosphere to trap and distribute heat, and its slow rotation keeps each side facing the Sun or space for extended periods.',
            'Despite being the closest planet to the Sun, Mercury is not the hottest planet in our solar system—that title belongs to Venus. Mercury lacks a significant atmosphere, so it cannot trap the Sun\'s heat through a greenhouse effect. Venus, with its thick carbon dioxide atmosphere, traps heat so efficiently that its surface temperature is a consistent 465°C, much hotter than Mercury\'s average.',
            'Mercury\'s iron core is enormous relative to its size, making up approximately 85% of the planet\'s radius and about 60% of its total mass. Scientists believe this unusual proportion may be the result of a massive ancient impact that stripped away much of Mercury\'s outer rocky mantle, leaving behind a planet that is essentially a giant metal ball with a thin rocky shell.',
            'Time moves strangely on Mercury due to its unique orbital dynamics. A single year—one complete orbit around the Sun—takes just 88 Earth days. However, because Mercury rotates so slowly on its axis, one complete day-night cycle takes 176 Earth days, meaning a Mercury day is actually twice as long as its year. If you lived on Mercury, you would celebrate two birthdays every day.',
            'Mercury\'s surface is a museum of cosmic violence, covered with impact craters accumulated over billions of years. The largest, the Caloris Basin, spans about 1,550 kilometers—so large that the impact that created it sent shockwaves through the entire planet. Unlike Earth, Mercury has no geological activity, weather, or water to erode these features, so they remain preserved almost exactly as they formed.'
        ]
    },
    'Venus': {
        basicInfo: {
            'Type': 'Terrestrial Planet',
            'Age': '4.5 billion years',
            'Diameter': '12,104 km',
            'Mass': '4.87 × 10²⁴ kg',
            'Temperature': '465°C (average)',
            'Distance': '108.2 million km',
            'Orbital Period': '225 Earth days',
            'Day Length': '243 Earth days'
        },
        facts: [
            'Venus is the only planet in our solar system that rotates clockwise when viewed from above its north pole, a phenomenon called retrograde rotation. On Venus, the Sun rises in the west and sets in the east—the opposite of what we experience on Earth. Scientists believe this backward spin may have been caused by a massive ancient collision or by complex tidal interactions between Venus\'s thick atmosphere and the Sun\'s gravity.',
            'Venus presents a mind-bending temporal paradox: its day is longer than its year. The planet takes 243 Earth days to complete one rotation on its axis, but only 225 Earth days to orbit the Sun. Combined with its retrograde rotation, this means that from the surface of Venus, you would see the Sun rise and set only twice per Venusian year, creating a calendar unlike anything else in the solar system.',
            'Venus is the hottest planet in our solar system, with surface temperatures averaging 465°C (869°F)—hot enough to melt lead. This extreme heat is caused by a runaway greenhouse effect. Venus\'s thick atmosphere is 96% carbon dioxide and is 90 times denser than Earth\'s, trapping solar radiation so efficiently that the surface remains uniformly hot whether it\'s day, night, equator, or pole.',
            'Standing on Venus\'s surface would be like being 900 meters underwater on Earth. The atmospheric pressure is about 92 times greater than Earth\'s sea-level pressure, enough to crush most submarines. Soviet Venera landers that reached the surface in the 1970s and 80s survived only 23 to 127 minutes before succumbing to the extreme pressure and temperature. No spacecraft has landed there since 1985.',
            'Venus is often called Earth\'s "twin" because the two planets are remarkably similar in size—Venus\'s diameter is 95% of Earth\'s—and mass. However, conditions on Venus are nightmarish compared to Earth. Its surface is hidden beneath permanent sulfuric acid clouds, the pressure and temperature would kill a human instantly, and water cannot exist in liquid form anywhere on the planet. It serves as a stark warning of what runaway climate change might look like.'
        ]
    },
    'Mars': {
        basicInfo: {
            'Type': 'Terrestrial Planet',
            'Age': '4.6 billion years',
            'Diameter': '6,779 km',
            'Mass': '6.42 × 10²³ kg',
            'Temperature': '-87°C to -5°C',
            'Distance': '227.9 million km',
            'Orbital Period': '687 Earth days',
            'Day Length': '24h 37m'
        },
        facts: [
            'Mars is home to Olympus Mons, the largest known volcano in the solar system and one of the most impressive geological features ever discovered. Rising 22 kilometers above the surrounding plains—nearly three times the height of Mount Everest—and spanning 600 kilometers in diameter, it\'s so large that you couldn\'t see its peak from its base due to the curvature of Mars. Despite its size, its slopes are so gradual you could walk up them without climbing gear.',
            'The distinctive rust-red color that gives Mars its nickname "the Red Planet" comes from iron oxide—ordinary rust—in its soil and rocks. Billions of years ago, Mars had liquid water on its surface, and the iron minerals were oxidized through chemical reactions with water and atmospheric oxygen. Today, this oxidized iron dust covers much of the surface and gets kicked up into the thin atmosphere, giving even the Martian sky a butterscotch or pinkish hue.',
            'Mars experiences seasons very similar to Earth\'s, and for the same reason: its rotational axis is tilted at about 25 degrees relative to its orbital plane, compared to Earth\'s 23.5 degrees. However, because Mars\'s orbit is more elliptical than Earth\'s, its seasons vary more in length and intensity. Summer in the southern hemisphere is shorter but more intense than summer in the northern hemisphere.',
            'Valles Marineris is a vast canyon system that would dwarf the Grand Canyon beyond comparison. Stretching over 4,000 kilometers along the Martian equator—a distance comparable to the width of the continental United States—it reaches depths of up to 7 kilometers. Scientists believe it formed not through water erosion like the Grand Canyon, but through the splitting and stretching of the crust as volcanic activity warped the planet\'s surface.',
            'A Martian day, called a "sol," is remarkably close to an Earth day at 24 hours and 37 minutes. This similarity has been both a blessing and a challenge for Mars rover operators, who initially synchronized their schedules with Martian time. However, living on "Mars time" while on Earth proved exhausting, as each day their schedule shifted by 37 minutes relative to Earth\'s day-night cycle.'
        ]
    },
    'Jupiter': {
        basicInfo: {
            'Type': 'Gas Giant',
            'Age': '4.6 billion years',
            'Diameter': '139,820 km',
            'Mass': '1.90 × 10²⁷ kg',
            'Temperature': '-110°C (clouds)',
            'Distance': '778.5 million km',
            'Orbital Period': '11.9 Earth years',
            'Day Length': '9h 56m'
        },
        facts: [
            'Jupiter is the heavyweight champion of our solar system by an enormous margin. It contains more than twice the combined mass of all other planets, moons, asteroids, comets, and debris in the solar system put together. If Jupiter had been about 80 times more massive, it would have ignited nuclear fusion in its core and become a small star, making our solar system a binary star system.',
            'The Great Red Spot is perhaps the most famous storm in the solar system—a colossal anticyclone that has been raging for at least 400 years, since astronomers first observed it in the 1600s. This storm is so large that Earth could fit inside it with room to spare. Wind speeds at its edges reach up to 680 kilometers per hour. Interestingly, the storm has been shrinking over the past century and may eventually disappear.',
            'Jupiter\'s moon Ganymede holds the distinction of being the largest moon in our entire solar system, with a diameter of 5,268 kilometers—making it larger than the planet Mercury and about 75% the size of Mars. If Ganymede orbited the Sun instead of Jupiter, it would easily be classified as a planet. It\'s also the only moon known to have its own magnetic field.',
            'Despite being the largest planet, Jupiter has the shortest day of any planet in our solar system, completing one full rotation in just under 10 hours. This rapid spin—combined with the fact that Jupiter is a gas giant with no solid surface—causes the planet to bulge noticeably at its equator. Jupiter\'s equatorial diameter is about 9,000 kilometers larger than its polar diameter.',
            'Jupiter\'s magnetic field is the strongest of any planet, roughly 20,000 times more powerful than Earth\'s. This creates intense radiation belts around the planet that would be lethal to unprotected astronauts. The magnetic field extends so far into space that it reaches Saturn\'s orbit, and it accelerates charged particles to near light speed, creating radio emissions detectable from Earth.'
        ]
    },
    'Saturn': {
        basicInfo: {
            'Type': 'Gas Giant',
            'Age': '4.5 billion years',
            'Diameter': '116,460 km',
            'Mass': '5.68 × 10²⁶ kg',
            'Temperature': '-140°C (clouds)',
            'Distance': '1.43 billion km',
            'Orbital Period': '29.4 Earth years',
            'Day Length': '10h 42m'
        },
        facts: [
            'Saturn\'s magnificent ring system is composed primarily of countless chunks of water ice, ranging in size from tiny grains no larger than sand to enormous blocks as big as houses. While the rings span an incredible distance of up to 282,000 kilometers from edge to edge, they are remarkably thin—averaging only about 10 meters in thickness. If the rings were scaled down to the size of a sheet of paper, they would be 10,000 times thinner than a human hair.',
            'Saturn holds a remarkable distinction among planets: it\'s the least dense planet in our solar system, with an average density of only 0.687 grams per cubic centimeter—less than water\'s density of 1 gram per cubic centimeter. This means that if you could find a bathtub large enough, Saturn would float in it. This low density is because Saturn is composed mainly of hydrogen and helium gases.',
            'Saturn\'s moon Titan is one of the most fascinating worlds in the solar system. It\'s the only moon with a dense atmosphere—thicker than Earth\'s—and the only place besides Earth known to have liquid lakes and rivers on its surface. However, these aren\'t filled with water but with liquid methane and ethane. Titan\'s thick orange haze hides a complex world with rain, seasons, and weather patterns.',
            'Though Saturn\'s rings appear solid and substantial from Earth, they would barely register as a thin mist if you flew through them. The total mass of all the ring material is estimated at about 15 quintillion kilograms—which sounds enormous but is only about half the mass of Saturn\'s small moon Mimas. Scientists now believe the rings may be relatively young, perhaps only 100 million years old, meaning dinosaurs might have seen a ringless Saturn.',
            'Saturn\'s atmosphere hosts some of the most extreme weather in the solar system. Wind speeds can reach an astonishing 1,800 kilometers per hour near the equator—five times faster than the strongest hurricanes on Earth. The planet also features a bizarre hexagonal storm at its north pole, a six-sided jet stream pattern about 30,000 kilometers across that has persisted for decades and has no known equivalent anywhere else in the universe.'
        ]
    },
    'Uranus': {
        basicInfo: {
            'Type': 'Ice Giant',
            'Age': '4.5 billion years',
            'Diameter': '50,724 km',
            'Mass': '8.68 × 10²⁵ kg',
            'Temperature': '-195°C (clouds)',
            'Distance': '2.87 billion km',
            'Orbital Period': '84 Earth years',
            'Day Length': '17h 14m'
        },
        facts: [
            'Uranus is the most tilted planet in our solar system, rotating on its side with an axial tilt of 98 degrees. While most planets spin like tops, Uranus rolls around the Sun more like a ball. Scientists believe this extreme tilt was likely caused by one or more catastrophic collisions with Earth-sized objects billions of years ago during the chaotic early days of the solar system.',
            'The extreme axial tilt of Uranus creates the most unusual seasons in the solar system. Each pole experiences about 42 continuous years of sunlight during summer, followed by 42 years of darkness during winter. When Voyager 2 flew by in 1986, the planet\'s south pole was pointed almost directly at the Sun, meaning the entire southern hemisphere was experiencing perpetual daylight while the north was in complete darkness.',
            'Uranus holds the distinction of being the first planet discovered in modern history using a telescope. On March 13, 1781, the astronomer William Herschel spotted it from his garden in Bath, England. Initially, he thought it was a comet. The discovery doubled the known size of the solar system and demonstrated that there were more worlds waiting to be found beyond the ancient planets visible to the naked eye.',
            'Uranus appears as a featureless blue-green ball in most images, a color caused by methane gas in its upper atmosphere. Methane absorbs red wavelengths of sunlight and reflects blue and green wavelengths back into space. Unlike Jupiter and Saturn with their colorful bands and storms, Uranus appears remarkably uniform because its extreme cold causes most atmospheric activity to occur in deeper, hidden layers.',
            'Uranus possesses 13 known rings, though they are far fainter and darker than Saturn\'s brilliant rings. Discovered in 1977 during a stellar occultation observation, Uranus\'s rings are composed of very dark particles—possibly organic compounds processed by radiation—and range from about 2 to 100 kilometers in width. The rings are so dark that they reflect only about 2% of the light that hits them.'
        ]
    },
    'Neptune': {
        basicInfo: {
            'Type': 'Ice Giant',
            'Age': '4.5 billion years',
            'Diameter': '49,244 km',
            'Mass': '1.02 × 10²⁶ kg',
            'Temperature': '-200°C (clouds)',
            'Distance': '4.50 billion km',
            'Orbital Period': '165 Earth years',
            'Day Length': '16h 6m'
        },
        facts: [
            'Neptune hosts the most violent weather in the entire solar system, with wind speeds that can reach an almost incomprehensible 2,100 kilometers per hour—nearly supersonic and about nine times stronger than the most powerful hurricanes on Earth. What makes this truly puzzling is that Neptune receives very little solar energy at its vast distance from the Sun, yet somehow generates enough internal heat to drive these extreme atmospheric dynamics.',
            'Neptune was the first planet discovered through mathematical prediction rather than direct observation. After Uranus was discovered, astronomers noticed its orbit was being perturbed by the gravity of an unknown object. In 1846, using only mathematics, French astronomer Urbain Le Verrier predicted exactly where to look. That same year, German astronomer Johann Galle pointed his telescope at those coordinates and found Neptune within one degree of the predicted position.',
            'Neptune\'s largest moon, Triton, is one of the strangest objects in the solar system. It orbits Neptune backwards (retrograde), opposite to the planet\'s rotation—the only large moon to do so. This strongly suggests Triton didn\'t form alongside Neptune but was instead captured from the Kuiper Belt. Triton is slowly spiraling inward and will eventually be torn apart by Neptune\'s gravity, possibly forming a ring system rivaling Saturn\'s.',
            'Neptune\'s orbital period of 165 Earth years means that significant anniversaries in its discovery are rare events. In 2011, Neptune completed its first full orbit around the Sun since Johann Galle first observed it in 1846. This means that only about one Neptunian year has passed in all of recorded human observation of the planet, and anyone born after 2011 will likely not live to see it complete another orbit.',
            'Despite receiving only about 1/900th of the solar energy that Earth receives, Neptune radiates more than twice as much energy as it absorbs from the Sun. This excess heat must come from the planet\'s interior, likely from ongoing gravitational contraction and possibly from differentiation—the slow sinking of denser materials toward the core. This internal heat engine is what powers Neptune\'s incredibly violent atmospheric storms.'
        ]
    }
};

function init() {
    mainMenu = document.getElementById('main-menu');
    coordinateForm = document.getElementById('coordinate-form');
    loadingState = document.getElementById('loading-state');
    loadingMessage = document.getElementById('loading-message');
    errorState = document.getElementById('error-state');
    mainContent = document.getElementById('main-content');
    locationInfo = document.getElementById('location-info');
    coordinates = document.getElementById('coordinates');
    errorMessage = document.getElementById('error-message');
    retryBtn = document.getElementById('retry-btn');
    refreshBtn = document.getElementById('refresh-btn');
    objectsList = document.getElementById('objects-list');
    objectCount = document.getElementById('object-count');
    emptyState = document.getElementById('empty-state');
    useCurrentLocationBtn = document.getElementById('use-current-location-btn');
    enterCoordinatesBtn = document.getElementById('enter-coordinates-btn');
    backToMenuBtn = document.getElementById('back-to-menu-btn');
    changeLocationBtn = document.getElementById('change-location-btn');
    errorBackBtn = document.getElementById('error-back-btn');
    coordsForm = document.getElementById('coords-form');
    latitudeInput = document.getElementById('latitude');
    longitudeInput = document.getElementById('longitude');
    lastLocationDiv = document.getElementById('last-location');
    lastLocationBtn = document.getElementById('last-location-btn');
    lastLocationCoords = document.getElementById('last-location-coords');
    
    detailView = document.getElementById('detail-view');
    detailBg = document.getElementById('detail-bg');
    detailCloseBtn = document.getElementById('detail-close-btn');
    detailList = document.getElementById('detail-list');
    detailName = document.getElementById('detail-name');
    detailType = document.getElementById('detail-type');
    detailIcon = document.getElementById('detail-icon');
    detailBasicInfo = document.getElementById('detail-basic-info');
    detailFactsList = document.getElementById('detail-facts-list');

    useCurrentLocationBtn.addEventListener('click', handleUseCurrentLocation);
    enterCoordinatesBtn.addEventListener('click', handleEnterCoordinates);
    backToMenuBtn.addEventListener('click', showMainMenu);
    changeLocationBtn.addEventListener('click', showMainMenu);
    
    coordsForm.addEventListener('submit', handleCoordinateSubmit);
    
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', handlePresetLocation);
    });
    
    retryBtn.addEventListener('click', handleRetry);
    errorBackBtn.addEventListener('click', showMainMenu);
    refreshBtn.addEventListener('click', refreshData);
    
    lastLocationBtn.addEventListener('click', handleLastLocation);
    
    detailCloseBtn.addEventListener('click', closeDetailView);
    
    showMainMenu();
}

function showMainMenu() {
    mainMenu.classList.remove('hidden');
    coordinateForm.classList.add('hidden');
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    mainContent.classList.add('hidden');
    locationInfo.classList.add('hidden');
    refreshBtn.classList.add('hidden');
    
    userLocation = null;
    locationMethod = null;
}

function handleUseCurrentLocation() {
    locationMethod = 'gps';
    mainMenu.classList.add('hidden');
    requestLocation();
}

function handleEnterCoordinates() {
    locationMethod = 'manual';
    mainMenu.classList.add('hidden');
    coordinateForm.classList.remove('hidden');
    
    const lastCoords = getLastCoordinates();
    if (lastCoords) {
        const latDir = lastCoords.latitude >= 0 ? 'N' : 'S';
        const lonDir = lastCoords.longitude >= 0 ? 'E' : 'W';
        lastLocationCoords.textContent = `${Math.abs(lastCoords.latitude).toFixed(4)}° ${latDir}, ${Math.abs(lastCoords.longitude).toFixed(4)}° ${lonDir}`;
        lastLocationDiv.classList.remove('hidden');
    } else {
        lastLocationDiv.classList.add('hidden');
    }
    
    latitudeInput.focus();
}

function handleCoordinateSubmit(event) {
    event.preventDefault();
    
    const lat = parseFloat(latitudeInput.value);
    const lon = parseFloat(longitudeInput.value);
    
    if (isNaN(lat) || lat < -90 || lat > 90) {
        showError('Please enter a valid latitude between -90 and 90.');
        return;
    }
    
    if (isNaN(lon) || lon < -180 || lon > 180) {
        showError('Please enter a valid longitude between -180 and 180.');
        return;
    }
    
    userLocation = {
        latitude: lat,
        longitude: lon
    };
    
    saveLastCoordinates(userLocation);
    
    coordinateForm.classList.add('hidden');
    showLoading('Calculating celestial positions...');
    displayCoordinates();
    fetchCelestialObjects();
}

function handleLastLocation() {
    const lastCoords = getLastCoordinates();
    if (lastCoords) {
        latitudeInput.value = lastCoords.latitude;
        longitudeInput.value = lastCoords.longitude;
    }
}

function saveLastCoordinates(coords) {
    try {
        localStorage.setItem(LAST_COORDS_KEY, JSON.stringify({
            latitude: coords.latitude,
            longitude: coords.longitude,
            timestamp: Date.now()
        }));
    } catch (e) {
        console.warn('Could not save coordinates to localStorage:', e);
    }
}

function getLastCoordinates() {
    try {
        const stored = localStorage.getItem(LAST_COORDS_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.warn('Could not read coordinates from localStorage:', e);
    }
    return null;
}

function handlePresetLocation(event) {
    const btn = event.currentTarget;
    const lat = parseFloat(btn.dataset.lat);
    const lon = parseFloat(btn.dataset.lon);
    
    latitudeInput.value = lat;
    longitudeInput.value = lon;
    
    coordsForm.dispatchEvent(new Event('submit'));
}

function handleRetry() {
    if (locationMethod === 'gps') {
        requestLocation();
    } else {
        coordinateForm.classList.remove('hidden');
        errorState.classList.add('hidden');
    }
}

let geoRetryCount = 0;
const MAX_GEO_RETRIES = 2;

function requestLocation() {
    showLoading('Detecting your location...');
    geoRetryCount = 0;
    attemptGeolocation(true);
}

function attemptGeolocation(highAccuracy) {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser. Please use "Enter Coordinates" instead.');
        return;
    }
    
    if (window.isSecureContext === false) {
        showError('Location access requires a secure connection (HTTPS). Please use "Enter Coordinates" instead, or access the app via HTTPS.');
        return;
    }

    const options = {
        enableHighAccuracy: highAccuracy,
        timeout: highAccuracy ? 15000 : 30000,
        maximumAge: 60000
    };

    navigator.geolocation.getCurrentPosition(
        onLocationSuccess,
        (error) => onLocationErrorWithRetry(error, highAccuracy),
        options
    );
}

function onLocationErrorWithRetry(error, wasHighAccuracy) {
    if (wasHighAccuracy && geoRetryCount < MAX_GEO_RETRIES) {
        if (error.code === error.TIMEOUT || error.code === error.POSITION_UNAVAILABLE) {
            geoRetryCount++;
            showLoading('Still searching for your location...');
            attemptGeolocation(false);
            return;
        }
    }
    
    onLocationError(error);
}

function onLocationSuccess(position) {
    userLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    };
    
    saveLastCoordinates(userLocation);
    
    showLoading('Calculating celestial positions...');
    displayCoordinates();
    fetchCelestialObjects();
}

function onLocationError(error) {
    let message;
    
    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = 'Location access was denied. Please enable location permissions in your browser settings, or use "Enter Coordinates" to manually input a location.';
            break;
        case error.POSITION_UNAVAILABLE:
            message = 'Location information is unavailable. Please try again or use "Enter Coordinates".';
            break;
        case error.TIMEOUT:
            message = 'Location request timed out. Please try again or use "Enter Coordinates".';
            break;
        default:
            message = 'An unknown error occurred while getting your location. Please try "Enter Coordinates" instead.';
    }
    
    showError(message);
}

function displayCoordinates() {
    const lat = userLocation.latitude.toFixed(4);
    const lon = userLocation.longitude.toFixed(4);
    const latDir = userLocation.latitude >= 0 ? 'N' : 'S';
    const lonDir = userLocation.longitude >= 0 ? 'E' : 'W';
    
    coordinates.textContent = `${Math.abs(lat)}° ${latDir}, ${Math.abs(lon)}° ${lonDir}`;
    locationInfo.classList.remove('hidden');
}

async function fetchCelestialObjects() {
    try {
        const objects = [];
        
        const celestialBodies = getCelestialBodies();
        objects.push(...celestialBodies);
        
        objects.sort((a, b) => {
            const aDistanceFromZenith = Math.abs(90 - a.altitude);
            const bDistanceFromZenith = Math.abs(90 - b.altitude);
            return aDistanceFromZenith - bDistanceFromZenith;
        });
        
        showContent(objects);
    } catch (error) {
        console.error('Error fetching celestial objects:', error);
        showError('Failed to fetch celestial data. Please try again.');
    }
}

function getCelestialBodies() {
    const observer = new Astronomy.Observer(userLocation.latitude, userLocation.longitude, 0);
    const now = new Date();
    const objects = [];
    
    const MIN_ALTITUDE = 20;
    
    const moonEquator = Astronomy.Equator(Astronomy.Body.Moon, now, observer, true, true);
    const moonHorizon = Astronomy.Horizon(now, observer, moonEquator.ra, moonEquator.dec, 'normal');
    
    if (moonHorizon.altitude >= MIN_ALTITUDE) {
        objects.push({
            name: 'Moon',
            type: 'Moon',
            altitude: moonHorizon.altitude,
            azimuth: moonHorizon.azimuth,
            relativePosition: getRelativePosition(moonHorizon.altitude, moonHorizon.azimuth)
        });
    }
    
    const sunEquator = Astronomy.Equator(Astronomy.Body.Sun, now, observer, true, true);
    const sunHorizon = Astronomy.Horizon(now, observer, sunEquator.ra, sunEquator.dec, 'normal');
    
    if (sunHorizon.altitude >= MIN_ALTITUDE) {
        objects.push({
            name: 'Sun',
            type: 'Star',
            altitude: sunHorizon.altitude,
            azimuth: sunHorizon.azimuth,
            relativePosition: getRelativePosition(sunHorizon.altitude, sunHorizon.azimuth)
        });
    }
    
    for (const planetName of PLANETS) {
        const body = PLANET_BODIES[planetName];
        const equator = Astronomy.Equator(body, now, observer, true, true);
        const horizon = Astronomy.Horizon(now, observer, equator.ra, equator.dec, 'normal');
        
        if (horizon.altitude >= MIN_ALTITUDE) {
            objects.push({
                name: planetName,
                type: 'Planet',
                altitude: horizon.altitude,
                azimuth: horizon.azimuth,
                relativePosition: getRelativePosition(horizon.altitude, horizon.azimuth)
            });
        }
    }
    
    return objects;
}

function getRelativePosition(altitude, azimuth) {
    const distanceFromZenith = Math.abs(90 - altitude);
    
    let altitudeDesc;
    if (distanceFromZenith <= 5) {
        return 'Directly overhead';
    } else if (distanceFromZenith <= 15) {
        altitudeDesc = 'Almost directly overhead, slightly';
    } else if (distanceFromZenith <= 30) {
        altitudeDesc = 'High above, toward the';
    } else if (distanceFromZenith <= 50) {
        altitudeDesc = 'Above you to the';
    } else {
        altitudeDesc = 'Low in the';
    }
    
    const direction = getCardinalDirection(azimuth);
    
    return `${altitudeDesc} ${direction}`;
}

function getCardinalDirection(azimuth) {
    azimuth = ((azimuth % 360) + 360) % 360;
    
    if (azimuth >= 337.5 || azimuth < 22.5) return 'north';
    if (azimuth >= 22.5 && azimuth < 67.5) return 'northeast';
    if (azimuth >= 67.5 && azimuth < 112.5) return 'east';
    if (azimuth >= 112.5 && azimuth < 157.5) return 'southeast';
    if (azimuth >= 157.5 && azimuth < 202.5) return 'south';
    if (azimuth >= 202.5 && azimuth < 247.5) return 'southwest';
    if (azimuth >= 247.5 && azimuth < 292.5) return 'west';
    if (azimuth >= 292.5 && azimuth < 337.5) return 'northwest';
    
    return 'sky';
}

function getObjectIcon(type) {
    switch (type) {
        case 'Planet':
            return '🪐';
        case 'Moon':
            return '🌕';
        case 'Star':
            return '☀️';
        case 'Satellite':
            return '🛰️';
        default:
            return '✨';
    }
}

function getObjectImageUrl(name) {
    const images = {
        'Sun': 'assets/celestialObjects/sun.jpg',
        'Moon': 'assets/celestialObjects/moon.jpg',
        'Mercury': 'assets/celestialObjects/mercury.jpg',
        'Venus': 'assets/celestialObjects/venus.jpg',
        'Mars': 'assets/celestialObjects/mars.jpg',
        'Jupiter': 'assets/celestialObjects/jupiter.jpg',
        'Saturn': 'assets/celestialObjects/saturn.jpg',
        'Uranus': 'assets/celestialObjects/uranus.jpg',
        'Neptune': 'assets/celestialObjects/neptune.jpg'
    };
    return images[name] || images['Sun'];
}

function getPositionIcon(altitude) {
    const distanceFromZenith = Math.abs(90 - altitude);
    if (distanceFromZenith <= 5) return '🎯';
    if (distanceFromZenith <= 15) return '🔝';
    if (distanceFromZenith <= 30) return '⬆️';
    return '↗️';
}

function createObjectCard(obj) {
    const card = document.createElement('div');
    card.className = 'object-card';
    
    const typeClass = obj.type.toLowerCase();
    const imageUrl = getObjectImageUrl(obj.name);
    
    card.innerHTML = `
        <div class="object-card-bg" style="background-image: url('${imageUrl}')"></div>
        <div class="object-card-overlay"></div>
        <div class="object-card-content">
            <div class="object-card-header">
                <span class="object-icon">${getObjectIcon(obj.type)}</span>
                <div class="object-info">
                    <h3 class="object-name">${obj.name}</h3>
                    <span class="object-type ${typeClass}">${obj.type}</span>
                </div>
            </div>
            <div class="object-position">
                <span class="position-icon">${getPositionIcon(obj.altitude)}</span>
                <span>${obj.relativePosition}</span>
            </div>
            <div class="object-details">
                <div class="detail-item">
                    <span class="detail-label">Altitude</span>
                    <span class="detail-value">${obj.altitude.toFixed(1)}°</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">From Zenith</span>
                    <span class="detail-value">${Math.abs(90 - obj.altitude).toFixed(1)}°</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Azimuth</span>
                    <span class="detail-value">${obj.azimuth.toFixed(1)}°</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Direction</span>
                    <span class="detail-value">${getCardinalDirection(obj.azimuth).charAt(0).toUpperCase() + getCardinalDirection(obj.azimuth).slice(1)}</span>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

function refreshData() {
    if (userLocation) {
        isRefreshing = true;
        refreshBtn.classList.add('refreshing');
        refreshBtn.classList.remove('success');
        fetchCelestialObjects();
    } else {
        showMainMenu();
    }
}

function showLoading(message = 'Loading...') {
    loadingState.classList.remove('hidden');
    loadingMessage.textContent = message;
    mainMenu.classList.add('hidden');
    coordinateForm.classList.add('hidden');
    errorState.classList.add('hidden');
    mainContent.classList.add('hidden');
    refreshBtn.classList.add('hidden');
}

function showError(message) {
    loadingState.classList.add('hidden');
    errorState.classList.remove('hidden');
    mainContent.classList.add('hidden');
    refreshBtn.classList.add('hidden');
    errorMessage.textContent = message;
    
    if (isRefreshing) {
        isRefreshing = false;
        refreshBtn.classList.remove('refreshing');
    }
}

function showContent(objects) {
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    mainContent.classList.remove('hidden');
    refreshBtn.classList.remove('hidden');
    
    if (isRefreshing) {
        isRefreshing = false;
        refreshBtn.classList.remove('refreshing');
        refreshBtn.classList.add('success');
        
        const refreshText = refreshBtn.querySelector('.refresh-text');
        const refreshIcon = refreshBtn.querySelector('.refresh-icon');
        if (refreshText) refreshText.textContent = 'Updated!';
        if (refreshIcon) refreshIcon.textContent = '✓';
        
        setTimeout(() => {
            refreshBtn.classList.remove('success');
            if (refreshText) refreshText.textContent = 'Refresh';
            if (refreshIcon) refreshIcon.textContent = '↻';
        }, 1500);
    }
    
    currentObjects = objects;
    
    objectsList.innerHTML = '';
    
    if (objects.length === 0) {
        emptyState.classList.remove('hidden');
        objectCount.textContent = '0 objects';
        return;
    }
    
    emptyState.classList.add('hidden');
    objectCount.textContent = `${objects.length} object${objects.length !== 1 ? 's' : ''}`;
    
    objects.forEach((obj, index) => {
        const card = createObjectCard(obj);
        card.addEventListener('click', () => openDetailView(index));
        objectsList.appendChild(card);
    });
}

function openDetailView(index) {
    selectedObjectIndex = index;
    const obj = currentObjects[index];
    
    document.body.classList.add('detail-open');
    
    const imageUrl = getObjectImageUrl(obj.name);
    detailBg.style.backgroundImage = `url('${imageUrl}')`;
    
    detailList.innerHTML = '';
    currentObjects.forEach((listObj, i) => {
        const card = createDetailListCard(listObj, i);
        if (i === index) {
            card.classList.add('selected');
        }
        card.addEventListener('click', () => selectDetailObject(i));
        detailList.appendChild(card);
    });
    
    updateDetailInfo(obj);
    
    detailView.classList.remove('hidden');
    detailView.offsetHeight;
    detailView.classList.add('active');
    
    setTimeout(() => {
        const selectedCard = detailList.querySelector('.selected');
        if (selectedCard) {
            selectedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 100);
}

function createDetailListCard(obj, index) {
    const card = document.createElement('div');
    card.className = 'object-card';
    card.dataset.index = index;
    
    const typeClass = obj.type.toLowerCase();
    const imageUrl = getObjectImageUrl(obj.name);
    
    card.innerHTML = `
        <div class="object-card-bg" style="background-image: url('${imageUrl}')"></div>
        <div class="object-card-overlay"></div>
        <div class="object-card-content">
            <div class="object-card-header">
                <span class="object-icon">${getObjectIcon(obj.type)}</span>
                <div class="object-info">
                    <h3 class="object-name">${obj.name}</h3>
                    <span class="object-type ${typeClass}">${obj.type}</span>
                </div>
            </div>
            <div class="object-position">
                <span class="position-icon">${getPositionIcon(obj.altitude)}</span>
                <span>${obj.relativePosition}</span>
            </div>
        </div>
    `;
    
    return card;
}

function selectDetailObject(index) {
    if (index === selectedObjectIndex) return;
    
    selectedObjectIndex = index;
    const obj = currentObjects[index];
    
    const imageUrl = getObjectImageUrl(obj.name);
    detailBg.style.backgroundImage = `url('${imageUrl}')`;
    
    detailList.querySelectorAll('.object-card').forEach((card, i) => {
        card.classList.toggle('selected', i === index);
    });
    
    detailIcon.style.opacity = '0';
    detailName.style.opacity = '0';
    detailType.style.opacity = '0';
    detailBasicInfo.style.opacity = '0';
    detailFactsList.style.opacity = '0';
    
    setTimeout(() => {
        updateDetailInfo(obj);
        detailIcon.style.opacity = '1';
        detailName.style.opacity = '1';
        detailType.style.opacity = '1';
        detailBasicInfo.style.opacity = '1';
        detailFactsList.style.opacity = '1';
    }, 200);
}

function updateDetailInfo(obj) {
    detailIcon.textContent = getObjectIcon(obj.type);
    detailName.textContent = obj.name;
    detailType.textContent = obj.type;
    detailType.className = 'detail-type ' + obj.type.toLowerCase();
    
    const data = CELESTIAL_DATA[obj.name];
    
    detailBasicInfo.innerHTML = '';
    
    const observationData = {
        'Current Altitude': `${obj.altitude.toFixed(1)}°`,
        'Current Azimuth': `${obj.azimuth.toFixed(1)}°`,
        'Direction': getCardinalDirection(obj.azimuth).charAt(0).toUpperCase() + getCardinalDirection(obj.azimuth).slice(1),
        'From Zenith': `${Math.abs(90 - obj.altitude).toFixed(1)}°`
    };
    
    Object.entries(observationData).forEach(([label, value]) => {
        const item = document.createElement('div');
        item.className = 'basic-info-item';
        item.innerHTML = `
            <span class="basic-info-label">${label}</span>
            <span class="basic-info-value">${value}</span>
        `;
        detailBasicInfo.appendChild(item);
    });
    
    if (data && data.basicInfo) {
        Object.entries(data.basicInfo).forEach(([label, value]) => {
            const item = document.createElement('div');
            item.className = 'basic-info-item';
            item.innerHTML = `
                <span class="basic-info-label">${label}</span>
                <span class="basic-info-value">${value}</span>
            `;
            detailBasicInfo.appendChild(item);
        });
    }
    
    detailFactsList.innerHTML = '';
    if (data && data.facts) {
        data.facts.forEach(fact => {
            const p = document.createElement('p');
            p.textContent = fact;
            detailFactsList.appendChild(p);
        });
    } else {
        const p = document.createElement('p');
        p.textContent = 'Scientific data for this object is currently being compiled.';
        detailFactsList.appendChild(p);
    }
    
    [detailIcon, detailName, detailType, detailBasicInfo, detailFactsList].forEach(el => {
        el.style.transition = 'opacity 0.2s ease';
    });
}

function closeDetailView() {
    detailView.classList.remove('active');
    
    document.body.classList.remove('detail-open');
    
    setTimeout(() => {
        detailView.classList.add('hidden');
        selectedObjectIndex = null;
    }, 400);
}

function initShootingStars() {
    scheduleNextShootingStar();
}

function scheduleNextShootingStar() {
    const delay = 5000 + Math.random() * 8000;
    
    setTimeout(() => {
        createShootingStar();
        scheduleNextShootingStar();
    }, delay);
}

function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    
    const dx = -320;
    const dy = 90;
    
    const angle = Math.atan2(-dy, -dx) * (180 / Math.PI);
    
    const minLeft = 35;
    const maxLeft = 85;
    const minTop = 10;
    const maxTop = 70;
    
    const initLeft = minLeft + Math.random() * (maxLeft - minLeft);
    const initTop = minTop + Math.random() * (maxTop - minTop);
    
    const size = 0.5 + Math.random() * 1.5;
    
    const tail = 100 + size * 40;
    
    star.style.setProperty('--initLeft', `${initLeft}%`);
    star.style.setProperty('--initTop', `${initTop}%`);
    star.style.setProperty('--angle', `${angle}deg`);
    star.style.setProperty('--size', `${size}px`);
    star.style.setProperty('--tail', `${tail}px`);
    
    document.body.appendChild(star);
    
    requestAnimationFrame(() => {
        star.classList.add('animate');
    });
    
    setTimeout(() => {
        star.remove();
    }, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
    init();
    initShootingStars();
});

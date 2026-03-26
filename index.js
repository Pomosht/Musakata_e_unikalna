let currentXP = 0;
const maxXP = 500;

const locations = [
    { 
        name: "с. Гела", 
        lat: 41.6453, 
        lng: 24.5583, 
        npc: "Гайдаря Стоян", 
        task: "Изгубих си дървения мех за гайдата в гората. Можеш ли да го намериш?", 
        reward: 80 
    },
    { 
        name: "с. Косово", 
        lat: 41.9056, 
        lng: 24.7031, 
        npc: "Баба Мария", 
        task: "Трябват ми 3 стръка мащерка за лечебния чай.", 
        reward: 50 
    },
    { 
        name: "с. Широка лъка", 
        lat: 41.6775, 
        lng: 24.5833, 
        npc: "Майстор Калин", 
        task: "Помогни ми да пренеса камъните за новия мост.", 
        reward: 120 
    }
];

function initMap() {
    const mapOptions = {
        zoom: 8,
        center: { lat: 42.1354, lng: 24.7453 }, // Пловдив център
        styles: [
            { "featureType": "water", "stylers": [{ "color": "#a2daf2" }] },
            { "featureType": "landscape", "stylers": [{ "color": "#f2f2f2" }] },
            { "featureType": "poi.park", "stylers": [{ "color": "#d1e6d1" }] }
        ],
        disableDefaultUI: true,
        zoomControl: true
    };

    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    locations.forEach(loc => {
        const marker = new google.maps.Marker({
            position: { lat: loc.lat, lng: loc.lng },
            map: map,
            title: loc.name,
            animation: google.maps.Animation.DROP
        });

        marker.addListener("click", () => {
            displayQuest(loc);
        });
    });
}

function displayQuest(loc) {
    const container = document.getElementById("quest-content");
    container.innerHTML = `
        <div class="quest-card">
            <h3 style="margin-top:0;">📍 ${loc.name}</h3>
            <p><strong>NPC:</strong> ${loc.npc}</p>
            <p><em>"${loc.task}"</em></p>
            <button class="btn-action" onclick="completeQuest(${loc.reward}, '${loc.name}')">Приеми и изпълни (+${loc.reward} XP)</button>
        </div>
    `;
}

function completeQuest(reward, name) {
    currentXP += reward;
    if (currentXP > maxXP) currentXP = maxXP;

    // Обновяване на UI
    document.getElementById("xp-val").innerText = currentXP;
    const progress = (currentXP / maxXP) * 100;
    document.getElementById("xp-bar-fill").style.width = progress + "%";

    const container = document.getElementById("quest-content");
    container.innerHTML = `
        <div class="quest-card success">
            <h3>🎉 Успех!</h3>
            <p>Ти помогна на хората в <strong>${name}</strong>.</p>
            <p>Спечели <strong>${reward} XP</strong></p>
        </div>
    `;

    if (currentXP >= maxXP) {
        setTimeout(() => {
            alert("Честито! Ти си Герой на Родопите!");
        }, 500);
    }
}
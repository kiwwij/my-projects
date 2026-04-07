document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn.querySelector('i');
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        setMapTiles(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
    }

    const map = L.map('map', { zoomControl: false }).setView([48.3794, 31.1656], 6);
    L.control.zoom({ position: 'topright' }).addTo(map);

    let currentTileLayer;

    function setMapTiles(theme) {
        if (currentTileLayer) {
            map.removeLayer(currentTileLayer);
        }
        
        const url = theme === 'dark' 
            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
            
        currentTileLayer = L.tileLayer(url, {
            attribution: '&copy; OSM | kiwwij'
        }).addTo(map);

        currentTileLayer.on('load', () => {
            document.getElementById('map-loader').classList.add('hidden');
            document.getElementById('map').classList.add('loaded');
        });
    }

    setMapTiles(savedTheme);

    window.addEventListener('resize', () => {
        map.invalidateSize();
    });

    const searchInput = document.getElementById('city-search');
    const searchBtn = document.getElementById('search-btn');
    const clearBtn = document.getElementById('clear-search-btn');
    const suggestionsList = document.getElementById('suggestions-list');
    
    let searchTimeout;
    let currentMarker = null;

    function fetchCitySuggestions(query) {
        if (query.length < 2) {
            suggestionsList.classList.add('hidden');
            return;
        }

        fetch(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=ua&q=${encodeURIComponent(query)}&limit=5`)
            .then(response => response.json())
            .then(data => {
                suggestionsList.innerHTML = '';
                
                if (data && data.length > 0) {
                    data.forEach(place => {
                        const li = document.createElement('li');
                        const shortName = place.display_name.split(',').slice(0, 2).join(',');
                        li.textContent = shortName;
                        
                        li.addEventListener('click', () => {
                            selectCity(place.lat, place.lon, shortName);
                        });
                        
                        suggestionsList.appendChild(li);
                    });
                    suggestionsList.classList.remove('hidden');
                } else {
                    suggestionsList.classList.add('hidden');
                }
            })
            .catch(err => console.error(err));
    }

    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length > 0) {
            clearBtn.classList.remove('hidden');
            searchTimeout = setTimeout(() => {
                fetchCitySuggestions(query);
            }, 400);
        } else {
            clearBtn.classList.add('hidden');
            suggestionsList.classList.add('hidden');
        }
    });

    function selectCity(lat, lon, name) {
        searchInput.value = name;
        suggestionsList.classList.add('hidden');
        
        if (currentMarker) {
            map.removeLayer(currentMarker);
        }

        map.flyTo([lat, lon], 12);

        currentMarker = L.circleMarker([lat, lon], {
            radius: 8,
            fillColor: "#e74c3c",
            color: "#fff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.9,
            pane: 'markerPane'
        }).addTo(map);

        currentMarker.bindPopup(`<b>${name}</b>`).openPopup();
    }

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (!query) return;
        
        fetch(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=ua&q=${encodeURIComponent(query)}&limit=1`)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    selectCity(data[0].lat, data[0].lon, data[0].display_name.split(',')[0]);
                }
            });
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.classList.add('hidden');
        suggestionsList.classList.add('hidden');
        
        if (currentMarker) {
            map.removeLayer(currentMarker);
            currentMarker = null;
        }
        
        map.flyTo([48.3794, 31.1656], 6);
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-group')) {
            suggestionsList.classList.add('hidden');
        }
    });

    const imageUrl = 'ukrainian-ethno-cultural-regions/historical-regions-map.png';
    const imageBounds = [[44.2, 22.1], [52.4, 40.2]]; 

    const toggleRegions = document.getElementById('toggle-regions');
    const opacitySlider = document.getElementById('opacity-slider');

    const savedToggleState = localStorage.getItem('isEthnoMapActive') === 'true'; 
    const savedOpacity = localStorage.getItem('ethnoMapOpacity') ? parseFloat(localStorage.getItem('ethnoMapOpacity')) : 0.75;

    toggleRegions.checked = savedToggleState;
    opacitySlider.value = savedOpacity;

    const imageOverlay = L.imageOverlay(imageUrl, imageBounds, {
        opacity: savedOpacity,
        interactive: true
    });

    if (savedToggleState) {
        imageOverlay.addTo(map);
    }

    toggleRegions.addEventListener('change', (e) => {
        if (e.target.checked) {
            imageOverlay.addTo(map);
            localStorage.setItem('isEthnoMapActive', 'true');
        } else {
            map.removeLayer(imageOverlay);
            localStorage.setItem('isEthnoMapActive', 'false');
        }
    });

    opacitySlider.addEventListener('input', (e) => {
        const newOpacity = e.target.value;
        imageOverlay.setOpacity(newOpacity);
        localStorage.setItem('ethnoMapOpacity', newOpacity);
    });
});
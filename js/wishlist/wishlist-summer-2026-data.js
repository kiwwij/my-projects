// Статусы: "planned", "playing", "paused", "completed", "unplanned_completed", "unplanned_dropped" "changed_mind", "dropped"
// https://www.thesignmaker.co.nz/wp-content/smush-webp/2019/04/C16_Work-In-Progress.png.webp

const gamesData = [
    {
        title: "Resident Evil Requiem",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3764200/ce5437442768e38eb575f205ab9397d0264017b0/header.jpg?t=1772587704",
        steam_link: "https://store.steampowered.com/app/3764200/Resident_Evil_Requiem/",
        review_link: "https://telegra.ph/Resident-Evil-Requiem-review-04-01",
        playtime: "11",
        price_uah: 1999,
        discount_percent: 0,
        release_date: "27 фев. 2026 г.",
        play_status: "dropped",
        rating: "",
        progress: 71
    },
    {
        title: "Resident Evil 3",
        steam_link: "https://store.steampowered.com/app/952060/Resident_Evil_3/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/952060/header.jpg?t=1768956538",
        release_date: "3 апр. 2020 г.",
        price_uah: 1200,
        discount_percent: 90,
        playtime: "6",
        rating: "",

        play_status: "unplanned_dropped",
        review_link: "https://www.thesignmaker.co.nz/wp-content/smush-webp/2019/04/C16_Work-In-Progress.png.webp",
        progress: 40
    },
    {
        title: "Slay the Princess — The Pristine Cut",
        steam_link: "https://store.steampowered.com/app/1989270/Slay_the_Princess__The_Pristine_Cut/?curator_clanid=1949621",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1989270/74a54248cfec29144de5e867a333c30e6d62801d/header.jpg?t=1775751748",
        release_date: "23 окт. 2023 г.",
        price_uah: 375,
        discount_percent: 45,
        playtime: "3",
        rating: "",

        play_status: "changed_mind",
        review_link: "",
        progress: 0
    },
    {
        title: "Steelrising - Cagliostro's Secrets",
        steam_link: "https://store.steampowered.com/app/2004261/Steelrising__Cagliostros_Secrets/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2004261/header.jpg?t=1668070903",
        release_date: "10 ноя. 2022 г.",
        price_uah: 229,
        discount_percent: 50,
        playtime: "2",
        rating: "",

        play_status: "changed_mind",
        review_link: "https://steamcommunity.com/id/serhiosergey/recommended/1283400/",
        progress: 0
    },
    {
        title: "Steelrising",
        steam_link: "https://store.steampowered.com/app/1283400/Steelrising/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1283400/header.jpg?t=1764149288",
        release_date: "8 сен. 2022 г.",
        price_uah: 579,
        discount_percent: 90,
        playtime: "8",
        rating: "",

        play_status: "completed",
        review_link: "https://steamcommunity.com/id/serhiosergey/recommended/1283400/",
        progress: 100
    },
    {
        title: "The Dark Pictures Anthology: House of Ashes",
        steam_link: "https://store.steampowered.com/app/1281590/The_Dark_Pictures_Anthology_House_of_Ashes/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1281590/header.jpg?t=1728912876",
        release_date: "22 окт. 2021 г.",
        price_uah: 499,
        discount_percent: 90,
        playtime: "6",
        rating: "",

        play_status: "unplanned_completed",
        review_link: "",
        progress: 100
    },
    {
        title: "The Last of Us™ Part II Remastered",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2531310/header.jpg?t=1750959180",
        steam_link: "https://store.steampowered.com/app/2531310/Odni_iz_nas_CHast_II_Obnovlennaya_versiya/",
        review_link: "",
        playtime: "23",
        price_uah: 1499,
        discount_percent: 20,
        release_date: "3 апр. 2025 г.",
        play_status: "planned",
        rating: "",
        progress: 0
    },
    {
        title: "FINAL FANTASY XVI",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2515020/header.jpg?t=1773294537",
        steam_link: "https://store.steampowered.com/app/2515020/FINAL_FANTASY_XVI/",
        review_link: "",
        playtime: "38",
        price_uah: 1399,
        discount_percent: 50,
        release_date: "17 сен. 2024 г.",
        play_status: "planned",
        rating: "",
        progress: 0
    },
    {
        title: "ELDEN RING Shadow of the Erdtree Edition",
        steam_link: "https://store.steampowered.com/sub/1010505/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/subs/1010505/c590abe17785b48b25190685ccca24ea6bbd658c/header_586x192.jpg?t=1741302182",
        release_date: "21 июн. 2024 г.",
        price_uah: 2399,
        discount_percent: 0,
        playtime: "60",
        rating: "94",

        play_status: "dropped",
        review_link: "https://telegra.ph/ELDEN-RING-Shadow-of-the-Erdtree-Edition-04-26",
        progress: 101
    },
    {
        title: "SWORD ART ONLINE Alicization Lycoris",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1009290/header.jpg?t=1750782350",
        steam_link: "https://store.steampowered.com/app/1009290/SWORD_ART_ONLINE_Alicization_Lycoris/",
        review_link: "",
        playtime: "63",
        price_uah: 649,
        discount_percent: 84,
        release_date: "10 июл. 2020 г.",
        play_status: "completed",
        rating: "",
        progress: 100
    },
    {
        title: "CRISIS CORE –FINAL FANTASY VII– REUNION",
        steam_link: "https://store.steampowered.com/app/1608070/CRISIS_CORE_FINAL_FANTASY_VII_REUNION/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1608070/header.jpg?t=1727791468",
        release_date: "13 дек. 2022 г.",
        price_uah: 1099,
        discount_percent: 60,
        playtime: "14",
        rating: "78",

        play_status: "planned",
        review_link: "",
        progress: 0
    },
    {
        title: "Re:ZERO -Starting Life in Another World- The Prophecy of the Throne",
        steam_link: "https://store.steampowered.com/app/1277510/ReZERO_Starting_Life_in_Another_World_The_Prophecy_of_the_Throne/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1277510/header.jpg",
        release_date: "28 янв. 2021 г.",
        price_uah: 699,
        discount_percent: 80,
        playtime: "16",
        rating: "",

        play_status: "paused",
        review_link: "",
        progress: 20
    },
    {
        title: "Echoes of Aincrad",
        poster: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2244210/7f0745382bc945351cc3334c7f0b947c8a22b896/header.jpg?t=1773426830",
        steam_link: "https://store.steampowered.com/app/2244210/Echoes_of_Aincrad/",
        review_link: "",
        playtime: "",
        price_uah: 1999,
        discount_percent: 0,
        release_date: "10 июл. 2026 г.",
        play_status: "planned",
        rating: "",
        progress: 0
    },
    {
        title: "Kena: Scars of Kosmora",
        poster: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3485810/cdc09903826e4e34076552de69664202e51c0392/header.jpg?t=1772132932",
        steam_link: "https://store.steampowered.com/app/3485810/Kena_Scars_of_Kosmora/",
        review_link: "",
        playtime: "",
        price_uah: "",
        discount_percent: 0,
        release_date: "2026",
        play_status: "planned",
        rating: "",
        progress: 0
    },
    {
        title: "Castaway Diary: Portal to the Unknown Isles",
        steam_link: "https://store.steampowered.com/app/4382260/Castaway_Diary_Portal_to_the_Unknown_Isles/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4382260/98d25ebb3f3192467170d5d6617bc659806f4d8e/header.jpg?t=1776126468",
        release_date: "2026",
        price_uah: "",
        discount_percent: 0,
        playtime: "",
        rating: "",

        play_status: "planned",
        review_link: "",
        progress: 0
    },
    {
        title: "FINAL FANTASY X/X-2 HD Remaster",
        steam_link: "https://store.steampowered.com/app/359870/FINAL_FANTASY_XX2_HD_Remaster/?l=russian",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/359870/header.jpg?t=1773826230",
        release_date: "12 мая. 2016 г.",
        price_uah: 379,
        discount_percent: 60,
        playtime: "50",
        rating: "",

        play_status: "planned",
        review_link: "",
        progress: 0
    },
    {
        title: "Clair Obscur: Expedition 33",
        steam_link: "https://store.steampowered.com/app/1903340/Clair_Obscur_Expedition_33/?l=russian",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1903340/be3305b02d4db0dffa3458537118423bf2792d7e/header.jpg?t=1773676780",
        release_date: "24 апр. 2025 г.",
        price_uah: 1499,
        discount_percent: 20,
        playtime: "29",
        rating: "",

        play_status: "planned",
        review_link: "",
        progress: 0
    },
    {
        title: "Homura Hime",
        steam_link: "https://store.steampowered.com/app/1820000/Homura_Hime/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1820000/9d60f6fb747e235e59bf4f8399adf6a8f55d8f12/header.jpg?t=1773399168",
        release_date: "4 мар. 2026 г.",
        price_uah: 515,
        discount_percent: 10,
        playtime: "10",
        rating: "74",

        play_status: "planned",
        review_link: "",
        progress: 0
    },
];
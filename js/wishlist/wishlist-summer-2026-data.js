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
        rating: "89",
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
        rating: "90",

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

        play_status: "changed_mind",
        review_link: "https://steamcommunity.com/id/serhiosergey/recommended/2778580?snr=1_5_9__402",
        progress: 0
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
        play_status: "changed_mind",
        rating: "",
        progress: 0
    },
    {
        title: "CODE VEIN Demo",
        steam_link: "https://store.steampowered.com/app/678960/CODE_VEIN/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1192670/header.jpg?t=1580311484",
        release_date: "27 сен. 2019 г.",
        price_uah: 0,
        discount_percent: 0,
        playtime: "2",
        rating: "",

        play_status: "completed",
        review_link: "",
        progress: 100
    },
    {
        title: "CODE VEIN II - Character Creator Demo",
        steam_link: "https://store.steampowered.com/app/3733960/CODE_VEIN_II__Character_Creator_Demo/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3733960/90cb4eaaff1ae8d11832620ef29d76cf79ca67bb/header.jpg?t=1769122815",
        release_date: "23 янв. 2026 г.",
        price_uah: 0,
        discount_percent: 0,
        playtime: "1",
        rating: "70",

        play_status: "completed",
        review_link: "",
        progress: 100
    },
    {
        title: "Your Friend's Mom",
        steam_link: "https://store.steampowered.com/app/4397180/Your_Friends_Mom/",
        poster: "https://clan.fastly.steamstatic.com/images/45982283/799ed1952ac372b48111a557db298b3c6cd261ca_400x225.png", // https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4397180/9c614cc9be49ac2b8840f199e4842c83ca682d44/header.jpg?t=1776080503
        release_date: "6 мар. 2026 г.",
        price_uah: 27,
        discount_percent: 27,
        playtime: "6",
        rating: "",

        play_status: "completed",
        review_link: "",
        progress: 100
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

        play_status: "changed_mind",
        review_link: "",
        progress: 0
    },
    {
        title: "REANIMAL Friend's Pass",
        steam_link: "https://store.steampowered.com/app/2129530/REANIMAL/?l=ukrainian",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2129530/4cdda917a0155258a2e7909d7869f35d8f980f96/header.jpg?t=1771918402",
        release_date: "13 фев. 2026 г.",
        price_uah: 0,
        discount_percent: 0,
        playtime: "6",
        rating: "80",

        play_status: "unplanned_dropped",
        review_link: "",
        progress: 17
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

        play_status: "changed_mind",
        review_link: "",
        progress: 0
    },
    {
        title: "tModLoader",
        steam_link: "https://store.steampowered.com/app/1281930/tModLoader/?l=russian",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1281930/header.jpg?t=1718143594",
        release_date: "16 мая. 2020 г.",
        price_uah: 0,
        discount_percent: 0,
        playtime: "19",
        rating: "83",

        play_status: "unplanned_completed",
        review_link: "",
        progress: 101
    },
    {
        title: "Terraria",
        steam_link: "https://store.steampowered.com/app/105600/Terraria/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg?t=1769844435",
        release_date: "16 мая. 2011 г.",
        price_uah: 225,
        discount_percent: 50,
        playtime: "10",
        rating: "",

        play_status: "unplanned_completed",
        review_link: "",
        progress: 101
    },
    {
        title: "Dispatch Demo",
        steam_link: "https://store.steampowered.com/app/3674060/Dispatch_Demo/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3674060/77ff82991a726d1d8973d7efb744e55a534659a3/header.jpg?t=1749414581",
        release_date: "29 мая. 2025 г.",
        price_uah: "0",
        discount_percent: 0,
        playtime: "0.5",
        rating: "87",

        play_status: "completed",
        review_link: "",
        progress: 100
    },
    {
        title: "Subnautica 2",
        steam_link: "https://store.steampowered.com/app/1962700/Subnautica_2/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1962700/header.jpg?t=1779360380",
        release_date: "14 мая. 2026 г.",
        price_uah: 899,
        discount_percent: 0,
        playtime: "15",
        rating: "",

        play_status: "dropped",
        review_link: "",
        progress: 70
    },
    {
        title: "Dispatch",
        steam_link: "https://store.steampowered.com/app/2592160/Dispatch/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2592160/header.jpg?t=1779899220",
        release_date: "22 окт. 2025 г.",
        price_uah: "600",
        discount_percent: 20,
        playtime: "7.5",
        rating: "87",

        play_status: "completed",
        review_link: "https://telegra.ph/Dispatch-review-06-08",
        progress: 100
    },
    {
        title: "Echoes of Aincrad DEMO Version",
        steam_link: "https://store.steampowered.com/app/2244210/Echoes_of_Aincrad/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4148250/afd5a96ebc1247efc4e3bf864bf3ea219b9a4e7e/header.jpg?t=1781542585",
        release_date: "15 июн. 2026 г.",
        price_uah: 0,
        discount_percent: 0,
        playtime: "7",
        rating: "60",

        play_status: "dropped",
        review_link: "",
        progress: 27
    },
    {
        title: "Echoes of Aincrad",
        poster: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2244210/7f0745382bc945351cc3334c7f0b947c8a22b896/header.jpg?t=1773426830",
        steam_link: "https://store.steampowered.com/app/2244210/Echoes_of_Aincrad/",
        review_link: "",
        playtime: "35",
        price_uah: 1999,
        discount_percent: 0,
        release_date: "10 июл. 2026 г.",
        play_status: "changed_mind",
        rating: "60",
        progress: 0
    },
    {
        title: "Mortal Shell II - Open Beta",
        steam_link: "https://store.steampowered.com/app/4711740/Mortal_Shell_II__V_betateste/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4711740/022831730f6b0dcddf6fdf5812b8f9eea5c165db/header_russian.jpg?t=1780931153",
        release_date: "6 июн. 2026 г.",
        price_uah: 0,
        discount_percent: 0,
        playtime: "3",
        rating: "",

        play_status: "changed_mind",
        review_link: "",
        progress: 0
    },
    {
        title: "ATRI -My Dear Moments-",
        steam_link: "https://store.steampowered.com/app/1230140/ATRI_My_Dear_Moments/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1230140/header.jpg?t=1761759369",
        release_date: "18 июн. 2020 г.",
        price_uah: 292,
        discount_percent: 55,
        playtime: "10",
        rating: "80",

        play_status: "changed_mind",
        review_link: "",
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

        play_status: "changed_mind",
        review_link: "",
        progress: 0
    },
    {
        title: "Slender: The Eight Pages",
        steam_link: "",
        poster: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Slender_Logo.jpg",
        release_date: "26 июн. 2012 г.",
        price_uah: 0,
        discount_percent: 0,
        playtime: "0.5",
        rating: "78",

        play_status: "unplanned_completed",
        review_link: "",
        progress: 100
    },
    {
        title: "CODE VEIN",
        steam_link: "https://store.steampowered.com/app/678960/CODE_VEIN/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/678960/header.jpg?t=1766015412",
        release_date: "27 сен. 2019 г.",
        price_uah: 799,
        discount_percent: 90,
        playtime: "16",
        rating: "",

        play_status: "completed",
        review_link: "https://steamcommunity.com/id/serhiosergey/recommended/678960/",
        progress: 100
    },
    {
        title: "Русы не против Ящерок 2",
        steam_link: "https://store.steampowered.com/app/2642840/Rusy_ne_protiv_YAshherok_2/",
        poster: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2642840/fdf0c62899f36a04f172c5bcf5af5c8ce1582f90/header_russian.jpg?t=1775738702",
        release_date: "6 ноя. 2025 г.",
        price_uah: 225,
        discount_percent: 30,
        playtime: "1",
        rating: "",

        play_status: "unplanned_completed",
        review_link: "",
        progress: 100
    },
    {
        title: "Гиперборея: Хорнизоляция",
        steam_link: "https://store.steampowered.com/app/4102950/Giperboreya_Xornizolyacziya/?curator_clanid=40305758",
        poster: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4102950/6b0a7fc035c2db46013dee9839cbf3524437d859/header.jpg?t=1775862661",
        release_date: "9 апр. 2026 г.",
        price_uah: 130,
        discount_percent: 25,
        playtime: "0.2",
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
        play_status: "unplanned_dropped",
        rating: "",
        progress: 0
    },
    {
        title: "ELDEN RING NIGHTREIGN",
        steam_link: "https://store.steampowered.com/app/2622380/ELDEN_RING_NIGHTREIGN/?l=russian",
        poster: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2622380/header.jpg?t=1773099036",
        release_date: "30 мая. 2025 г.",
        price_uah: 1199,
        discount_percent: 25,
        playtime: "53",
        rating: "77",

        play_status: "unplanned_dropped",
        review_link: "https://steamcommunity.com/id/serhiosergey/recommended/2622380?snr=1_5_9__402",
        progress: 0
    },
    {
        title: "Minecraft",
        steam_link: "",
        poster: "https://gaming-cdn.com/images/products/442/616x353/minecraft-java-and-bedrock-edition-pc-mac-cover.jpg?v=1769503807",
        release_date: "17 май. 2009 г.",
        price_uah: 1350,
        discount_percent: 50,
        playtime: "5",
        rating: "",

        play_status: "unplanned_completed",
        review_link: "",
        progress: 100
    },
    {
        title: "Escape from Yandere",
        steam_link: "https://store.steampowered.com/app/4081840/Escape_from_Yandere/",
        poster: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4081840/357a2f59ec1939f8d0025c0121e86b0f3dabf12c/header.jpg?t=1771446146",
        release_date: "7 фев. 2026 г.",
        price_uah: 124,
        discount_percent: 20,
        playtime: "1",
        rating: "",

        play_status: "unplanned_dropped",
        review_link: "",
        progress: 80
    },
    {
        title: "Cult of the Lamb",
        steam_link: "https://store.steampowered.com/app/1313140/Cult_of_the_Lamb/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1313140/19f32bb477a6e9d058e05193b4e282149bd70644/header.jpg?t=1769836674",
        release_date: "11 авг. 2022 г.",
        price_uah: 499,
        discount_percent: 60,
        playtime: "14",
        rating: "",

        play_status: "unplanned_dropped",
        review_link: "",
        progress: 3
    },
    {
        title: "Hades II",
        steam_link: "https://store.steampowered.com/app/1145350/Hades_II/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1145350/91ac334a2c137d08968ccc0bc474a02579602100/header.jpg?t=1779901265",
        release_date: "25 сен. 2025 г.",
        price_uah: 460,
        discount_percent: 30,
        playtime: "30",
        rating: "",

        play_status: "unplanned_dropped",
        review_link: "",
        progress: 1
    },
    {
        title: "ELDEN VINS",
        steam_link: "https://www.nexusmods.com/eldenring/mods/4709",
        poster: "https://staticdelivery.nexusmods.com/mods/4333/images/4709/4709-1753168052-1592421421.png",
        release_date: "7 дек. 2024 г.",
        price_uah: 1799,
        discount_percent: 40,
        playtime: "18",
        rating: "94",

        play_status: "completed",
        review_link: "https://telegra.ph/ELDEN-VINS-review-07-20",
        progress: 100
    },
    {
        title: "Clair Obscur: Expedition 33",
        steam_link: "https://store.steampowered.com/app/1903340/Clair_Obscur_Expedition_33/?l=russian",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1903340/be3305b02d4db0dffa3458537118423bf2792d7e/header.jpg?t=1773676780",
        release_date: "24 апр. 2025 г.",
        price_uah: 1499,
        discount_percent: 20,
        playtime: "18",
        rating: "",

        play_status: "completed",
        review_link: "https://steamcommunity.com/id/serhiosergey/recommended/1903340/",
        progress: 100
    },
    {
        title: "The Convergence",
        steam_link: "https://www.nexusmods.com/eldenring/mods/3419",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7MAsm6QpkcaCv7Nl9pNvPAhaA5_ekwqBBPrCSkICnwA80OsDit3Pw7eM&s=10",
        release_date: "6 мар. 2024 г.",
        price_uah: 1799,
        discount_percent: 40,
        playtime: "18",
        rating: "94",

        play_status: "unplanned_dropped",
        review_link: "",
        progress: 1
    },
    {
        title: "Detroit: Become Human",
        steam_link: "https://store.steampowered.com/app/1222140/Detroit_Become_Human/?l=russian",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1222140/header.jpg?t=1667468479",
        release_date: "18 июн. 2020 г.",
        price_uah: "1299",
        discount_percent: 90,
        playtime: "12",
        rating: "",

        play_status: "unplanned_dropped",
        review_link: "https://kiwwij.github.io/kiwwij-anime-tier-list/",
        progress: 35
    },
    {
        title: "ATRI -My Dear Moments- Demo",
        steam_link: "https://store.steampowered.com/app/1230140/ATRI_My_Dear_Moments/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1263470/header.jpg?t=1588321271",
        release_date: "1 май. 2020",
        price_uah: 0,
        discount_percent: 0,
        playtime: "2",
        rating: "80",

        play_status: "playing",
        review_link: "",
        progress: 25
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

        play_status: "paused",
        review_link: "https://www.thesignmaker.co.nz/wp-content/smush-webp/2019/04/C16_Work-In-Progress.png.webp",
        progress: 30
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
        title: "CODE VEIN II",
        steam_link: "https://store.steampowered.com/app/2362060/CODE_VEIN_II/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2362060/955e8f3fce6d832c286ac8013657ed6fc51f1f85/header.jpg?t=1770242240",
        release_date: "30 янв. 2026 г.",
        price_uah: 1999,
        discount_percent: 25,
        playtime: "33",
        rating: "70",

        play_status: "planned",
        review_link: "",
        progress: 0
    },
    {
        title: "Stupid Never Dies",
        steam_link: "https://store.steampowered.com/app/3486530/Stupid_Never_Dies/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3486530/a0e9e634387acee3b2b6fc0dbb6110a890b0050d/header.jpg?t=1773348495",
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
        title: "Bayonetta",
        steam_link: "https://store.steampowered.com/app/460790/Bayonetta/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/460790/header.jpg?t=1763677459",
        release_date: "11 апр. 2017 г.",
        price_uah: "499",
        discount_percent: 70,
        playtime: "11",
        rating: "",

        play_status: "planned",
        review_link: "",
        progress: 0
    },
    {
        title: "FINAL FANTASY VII REVELATION",
        steam_link: "https://store.steampowered.com/app/4354570/FINAL_FANTASY_VII_REVELATION/",
        poster: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4354570/c82a370d62d715234771be34c6ff3c928c7d78e2/header.jpg?t=1781198176",
        release_date: "2027 г.",
        price_uah: "",
        discount_percent: 0,
        playtime: "",
        rating: "",

        play_status: "planned",
        review_link: "",
        progress: 0
    },
];
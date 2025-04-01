


    // STANDARD
    var STANDARD_BOOKMAKERS = ['Betfred', '888Sport', 'Paddy Power', 'Betway', 'Skybet', 'Virgin Bet', 'Bet365', 'BetVictor', 'SpreadEx', 'BetMGM', 'Unibet', 'BoyleSports', '10Bet', 'StarSports', 'PricedUP', 'Sporting Index', 'QuinnBet', 'Midnite', 'BetGoodwin', 'VBet', 'AK Bets', 'Ladbrokes', 'William Hill', 'Livescore', 'Coral']
    var STANDARD_EXCHANGES = ['Smarkets', 'Betfair Exchange', 'Matchbook']


    // OTHER MARKETS
    var OVER_UNDER_BOOKMAKERS = ['888Sport', 'Virgin Bet', 'Betway', 'Skybet', 'Betfred', 'Ladbrokes', 'William Hill', 'Livescore', 'Coral']
    var OVER_UNDER_EXCHANGES = ['Betfair Exchange']
    var BTTS_BOOKMAKERS = ['888Sport', 'Virgin Bet', 'Betway', 'Skybet', 'Betfred', 'Ladbrokes', 'William Hill', 'Livescore', 'Coral']
    var BTTS_EXCHANGES = ['Betfair Exchange']

    //2UP
    var TWOUP_BOOKMAKERS = ['Bet365', 'Ladbrokes', 'Skybet', 'William Hill', 'Coral']
    var TWOUP_EXCHANGES = ['Smarkets', 'Betfair Exchange', 'Matchbook']

    //EXTRA PLACE
    var EXTRA_PLACE_BOOKMAKERS = ['Betfred', '888Sport', 'Paddy Power', 'Betway', 'Skybet', 'Virgin Bet', 'Bet365', 'BetVictor', 'SpreadEx', 'BetMGM', 'Unibet', 'BoyleSports', '10Bet', 'StarSports', 'PricedUP', 'Sporting Index', 'QuinnBet', 'Midnite', 'BetGoodwin', 'VBet', 'AK Bets', 'Ladbrokes', 'William Hill', 'Livescore', 'Coral']
    var EXTRA_PLACE_EXCHANGES = ['Smarkets', 'Betfair Exchange', 'Matchbook']

    //EACH WAY
    var EACH_WAY_BOOKMAKERS = ['Betfred', '888Sport', 'Paddy Power', 'Betway', 'Skybet', 'Virgin Bet', 'Bet365', 'BetVictor', 'SpreadEx', 'BetMGM', 'Unibet', 'BoyleSports', '10Bet', 'StarSports', 'PricedUP', 'Sporting Index', 'QuinnBet', 'Midnite', 'BetGoodwin', 'VBet', 'AK Bets', 'Ladbrokes', 'William Hill', 'Livescore', 'Coral']
    var EACH_WAY_EXCHANGES = ['Smarkets', 'Betfair Exchange', 'Matchbook']

    //DUTCHING 
    var DUTCHING_BOOKMAKERS = ['Betfred', '888Sport', 'Paddy Power', 'Betway', 'Skybet', 'Virgin Bet', 'Bet365', 'BetVictor', 'SpreadEx', 'BetMGM', 'Unibet', 'BoyleSports', '10Bet', 'StarSports', 'PricedUP', 'Sporting Index', 'QuinnBet', 'Midnite', 'BetGoodwin', 'VBet', 'AK Bets', 'Ladbrokes', 'William Hill', 'Livescore', 'Coral']
    var DUTCHING_EXCHANGES = ['Smarkets', 'Betfair Exchange', 'Matchbook']

    //BOG 
    var BOG_BOOKMAKERS = ['Betfred', '888Sport', 'Paddy Power', 'Betway', 'Skybet', 'Virgin Bet', 'Bet365', 'BetVictor', 'SpreadEx', 'BetMGM', 'Unibet', 'BoyleSports', '10Bet', 'StarSports', 'PricedUP', 'Sporting Index', 'QuinnBet', 'Midnite', 'BetGoodwin', 'VBet', 'AK Bets', 'Ladbrokes', 'William Hill', 'Livescore', 'Coral']
    var BOG_EXCHANGES = ['Smarkets', 'Betfair Exchange', 'Matchbook']


    // WIX SITE JUST NEEDS AN UPDATED LIST OF ALL OF THEM LIKE BELOW, AND IT WILL DO USE GENERAL INFO HERE TO FILTER
    // ALSO NEED TO UPDATE PROFIT TRACKER AND MOBILE PROFIT TRACKER

    var bookmakerImages = {
        "10Bet": "https://static.wixstatic.com/media/7a0e3a_dc4396b6acac4f8e8c6b48d4236747c7~mv2.png",
        "888Sport": "https://static.wixstatic.com/media/7a0e3a_39af396146c84a38a96e953f938290ef~mv2.png",
        "Bet365": "https://static.wixstatic.com/media/7a0e3a_74b1758549414a87aef5c7d5d4a2c619~mv2.png",
        "Bet600": "https://static.wixstatic.com/media/7a0e3a_f246bfd0e60e437585c79d24ab27b4f0~mv2.png",
        "BetGoodwin": "https://static.wixstatic.com/media/7a0e3a_9848deaabc2d4eb797957fb961372033~mv2.png",
        "BetMGM": "https://static.wixstatic.com/media/7a0e3a_1be9e466f5754e22981886692d69deb8~mv2.png",
        "BetUK": "https://static.wixstatic.com/media/7a0e3a_27a9ecf4eb2042bfb0ff1b09ecc0e202~mv2.png",
        "BetVictor": "https://static.wixstatic.com/media/7a0e3a_6bea71614dad44019eb7657e7fb97bb2~mv2.png",
        "Betway": "https://static.wixstatic.com/media/7a0e3a_2e3ef618674d4c94a2850b097873d5bb~mv2.png",
        "BetZone": "https://static.wixstatic.com/media/7a0e3a_d1e0766b549a409aa9fdcbfb03ebc900~mv2.png",
        "Betano": "https://static.wixstatic.com/media/7a0e3a_06df3b06fe8c43a8a15962f0324109da~mv2.png",
        "Betfair Exchange": "https://static.wixstatic.com/media/7a0e3a_42e9ff11344a49fea33b58dcda917542~mv2.png",
        "Betfred": "https://static.wixstatic.com/media/7a0e3a_475f8122a9234ce6b476fd166b34ee89~mv2.png",
        "BoyleSports": "https://static.wixstatic.com/media/7a0e3a_88594ed61d4e465cbb89f2cb731a5226~mv2.png",
        "BresBet": "https://static.wixstatic.com/media/7a0e3a_298e93dd2951448394d8c5d6d0e40f73~mv2.png",
        "CopyBet": "https://static.wixstatic.com/media/7a0e3a_7639840a36854961bde4fda778d08807~mv2.png",
        "Coral": "https://static.wixstatic.com/media/7a0e3a_0203374d89e4480f9686d5581f599a29~mv2.png",
        "DAZN Bet": "https://static.wixstatic.com/media/7a0e3a_0d29eed8ae31492cb36e695f5ef99243~mv2.png",
        "FafaBet": "https://static.wixstatic.com/media/7a0e3a_c1b2a17fa2294336b620e1c808537918~mv2.png",
        "FitzDares": "https://static.wixstatic.com/media/7a0e3a_2cfbc7c41c6b41faa30b731d9f6b822a~mv2.png",
        "Grosvenor": "https://static.wixstatic.com/media/7a0e3a_ddd695ca43234f2f992d8a329f2c3130~mv2.png",
        "Hollywood Bets": "https://static.wixstatic.com/media/7a0e3a_aaee0dfef04740fdba459c916942df91~mv2.png",
        "Kwiff": "https://static.wixstatic.com/media/7a0e3a_c2ecfb4964e3445a8989ac350cc547a6~mv2.png",
        "Ladbrokes": "https://static.wixstatic.com/media/7a0e3a_07992cbc85d945e9b57648111039f899~mv2.png",
        "LeoVegas": "https://static.wixstatic.com/media/7a0e3a_046dc5d74a0e4969a8ae97621392e9fd~mv2.png",
        "Livescore": "https://static.wixstatic.com/media/7a0e3a_a3167bbd323a4656afc84718bbf88380~mv2.png",
        "Lottoland": "https://static.wixstatic.com/media/7a0e3a_93219c714b554f309efa17e32bb84547~mv2.png",
        "Midnite": "https://static.wixstatic.com/media/7a0e3a_aef8f4249eb84014b9d101801ed16833~mv2.png",
        "NRG": "https://static.wixstatic.com/media/7a0e3a_41c0f42c2b03417a96756cf09238256c~mv2.png",
        "NetBet": "https://static.wixstatic.com/media/7a0e3a_6a2378b66a8c4b1489968c88fc0c493c~mv2.png",
        "Paddy Power": "https://static.wixstatic.com/media/7a0e3a_fcbb73ffbfa6454b8506f7a6e7e25c67~mv2.png",
        "Parimatch": "https://static.wixstatic.com/media/7a0e3a_8d758436e3294657ab36115cfeb07e48~mv2.png",
        "PlanetSportBet": "https://static.wixstatic.com/media/7a0e3a_1ca0c9f5bb514a22ad2a42c2726bd1f1~mv2.png",
        "QuinnBet": "https://static.wixstatic.com/media/7a0e3a_8a5853fa8cbb4ec69e8939ec31e6dea6~mv2.png",
        "Rhino Bet": "https://static.wixstatic.com/media/7a0e3a_1211a46db3dc44fda37c8b6541893faf~mv2.png",
        "Skybet": "https://static.wixstatic.com/media/7a0e3a_3b25d869c20042f38fc666d42118cedb~mv2.png",
        "Space Casino": "https://static.wixstatic.com/media/7a0e3a_6d28deda641f4283923eb6a9f062a18b~mv2.png",
        "Sporting Bet": "https://static.wixstatic.com/media/7a0e3a_244491d3eacf4b3aab826f380175d65a~mv2.png",
        "Sporting Index": "https://static.wixstatic.com/media/7a0e3a_cfbd3b75ad62487680c059b122d3aa41~mv2.png",
        "SpreadEx": "https://static.wixstatic.com/media/7a0e3a_45609bd37d194c1f8d17cc2d32f47dc4~mv2.png",
        "StarSports": "https://static.wixstatic.com/media/7a0e3a_59e5257dc642477abaa8702660ca3621~mv2.png",
        "TalkSPORT BET": "https://static.wixstatic.com/media/7a0e3a_a5a4e2c5542e473682f225d0bff59052~mv2.png",
        "The Pools": "https://static.wixstatic.com/media/7a0e3a_a90d9ef212ce4120bb4fb787efdc3376~mv2.png",
        "Tote": "https://static.wixstatic.com/media/7a0e3a_4066fc2bbae6424597186b69bceba7b8~mv2.png",
        "Unibet": "https://static.wixstatic.com/media/7a0e3a_4a787aa683664c4aaa145705e0ebc893~mv2.png",
        "VBet": "https://static.wixstatic.com/media/7a0e3a_efd50a72013945059b1f6ea062f0e9be~mv2.png",
        "Vickers Bet": "https://static.wixstatic.com/media/7a0e3a_aba860a329d2463798f4ee53469710a0~mv2.png",
        "Virgin Bet": "https://static.wixstatic.com/media/7a0e3a_d7313dc914d245acb174e5958627ce8e~mv2.png",
        "William Hill": "https://static.wixstatic.com/media/7a0e3a_0269c527e1ab4ea9be81154957f4c824~mv2.png",
        "AK Bets": 'https://static.wixstatic.com/media/7a0e3a_11e7e76214754f33a216d0c9d6db1ea1~mv2.png', 
        "PricedUP": 'https://static.wixstatic.com/media/7a0e3a_08a41acb30d34b99b404c84d57bdccf0~mv2.png',
    };


    var exchangeImages = {
        "Betfair Exchange": 'https://static.wixstatic.com/media/7a0e3a_42e9ff11344a49fea33b58dcda917542~mv2.png',
        "Smarkets": "https://static.wixstatic.com/media/7a0e3a_64979ac474b340868914fbf484d4ee89~mv2.png",
        "Matchbook": "https://static.wixstatic.com/media/7a0e3a_c44a32e46bc34b6da0c9665311ed48b1~mv2.png"
    };


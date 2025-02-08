


    // STANDARD
    let STANDARD_BOOKMAKERS = ['Betfred', '888Sport', 'Paddy Power', 'Betway', 'Skybet', 'Virgin Bet', 'Bet365', 'BetVictor', 'Spreadex', 'BetMGM', 'Unibet', 'BoyleSports', '10Bet', 'Star Sports', 'PricedUP', 'Sporting Index', 'QuinnBet', 'Midnite', 'BetGoodwin', 'VBet', 'AK Bets']
    let STANDARD_EXCHANGES = ['Smarkets', 'Betfair Exchange']

    //2UP
    let TWOUP_BOOKMAKERS = ['Bet365']
    let TWOUP_EXCHANGES = ['Smarkets', 'Betfair Exchange']

    //EXTRA PLACE
    let EXTRA_PLACE_BOOKMAKERS = ['Betfred', '888Sport', 'Paddy Power', 'Betway', 'Skybet', 'Virgin Bet']
    let EXTRA_PLACE_EXCHANGES = ['Smarkets', 'Betfair Exchange']

    //EACH WAY
    let EACH_WAY_BOOKMAKERS = ['Betfred', '888Sport', 'Paddy Power', 'Betway', 'Skybet', 'Virgin Bet']
    let EACH_WAY_EXCHANGES = ['Smarkets', 'Betfair Exchange']

    //DUTCHING 
    let DUTCHING_BOOKMAKERS = ['Betfred', '888Sport', 'Paddy Power', 'Betway', 'Skybet', 'Virgin Bet', 'Bet365', 'BetVictor', 'Spreadex', 'BetMGM', 'Unibet', 'BoyleSports', '10Bet', 'Star Sports', 'PricedUP', 'Sporting Index', 'QuinnBet', 'Midnite', 'BetGoodwin', 'VBet', 'AK Bets']
    let DUTCHING_EXCHANGES = ['Smarkets', 'Betfair Exchange']

    //BOG 
    let BOG_BOOKMAKERS = ['Betfred', '888Sport', 'Paddy Power', 'Betway', 'Skybet', 'Virgin Bet']
    let BOG_EXCHANGES = ['Smarkets', 'Betfair Exchange']

    let bookmakerImages = {
        "Bet365": 'https://static.wixstatic.com/media/7a0e3a_74b1758549414a87aef5c7d5d4a2c619~mv2.png',
        "Betfred": 'https://static.wixstatic.com/media/7a0e3a_475f8122a9234ce6b476fd166b34ee89~mv2.png',
        "Virgin Bet": 'https://static.wixstatic.com/media/7a0e3a_d7313dc914d245acb174e5958627ce8e~mv2.png', 
        "Livescore": 'https://static.wixstatic.com/media/7a0e3a_a3167bbd323a4656afc84718bbf88380~mv2.png',
        "888Sport": 'https://static.wixstatic.com/media/7a0e3a_39af396146c84a38a96e953f938290ef~mv2.png',
        "Paddy Power": 'https://static.wixstatic.com/media/7a0e3a_fcbb73ffbfa6454b8506f7a6e7e25c67~mv2.png',
        "Skybet": 'https://static.wixstatic.com/media/7a0e3a_3b25d869c20042f38fc666d42118cedb~mv2.png',
        "Betway": 'https://static.wixstatic.com/media/7a0e3a_2e3ef618674d4c94a2850b097873d5bb~mv2.png',
        "William Hill": 'https://static.wixstatic.com/media/7a0e3a_0269c527e1ab4ea9be81154957f4c824~mv2.png',
        "BetVictor": 'https://static.wixstatic.com/media/7a0e3a_6bea71614dad44019eb7657e7fb97bb2~mv2.png',
        "Spreadex": 'https://static.wixstatic.com/media/7a0e3a_45609bd37d194c1f8d17cc2d32f47dc4~mv2.png', 
        "BetMGM": 'https://static.wixstatic.com/media/7a0e3a_1be9e466f5754e22981886692d69deb8~mv2.png', 
        "Unibet": 'https://static.wixstatic.com/media/7a0e3a_4a787aa683664c4aaa145705e0ebc893~mv2.png', 
        "BoyleSports": 'https://static.wixstatic.com/media/7a0e3a_88594ed61d4e465cbb89f2cb731a5226~mv2.png', 
        "10Bet": 'https://static.wixstatic.com/media/7a0e3a_dc4396b6acac4f8e8c6b48d4236747c7~mv2.png', 
        "Star Sports": 'https://static.wixstatic.com/media/7a0e3a_59e5257dc642477abaa8702660ca3621~mv2.png', 
        "Sporting Index": 'https://static.wixstatic.com/media/7a0e3a_cfbd3b75ad62487680c059b122d3aa41~mv2.png', 
        "PricedUP": 'https://static.wixstatic.com/media/7a0e3a_08a41acb30d34b99b404c84d57bdccf0~mv2.png',
        "QuinnBet": 'https://static.wixstatic.com/media/7a0e3a_8a5853fa8cbb4ec69e8939ec31e6dea6~mv2.png', 
        "Midnite": 'https://static.wixstatic.com/media/7a0e3a_aef8f4249eb84014b9d101801ed16833~mv2.png', 
        "BetGoodwin": 'https://static.wixstatic.com/media/7a0e3a_9848deaabc2d4eb797957fb961372033~mv2.png', 
        "VBet": 'https://static.wixstatic.com/media/7a0e3a_efd50a72013945059b1f6ea062f0e9be~mv2.png', 
        "AK Bets": 'https://static.wixstatic.com/media/7a0e3a_11e7e76214754f33a216d0c9d6db1ea1~mv2.png', 

    };

    let exchangeImages = {
        "Betfair Exchange": 'https://static.wixstatic.com/media/7a0e3a_42e9ff11344a49fea33b58dcda917542~mv2.png',
        "Smarkets": "https://static.wixstatic.com/media/7a0e3a_64979ac474b340868914fbf484d4ee89~mv2.png",
        "Matchbook": "https://static.wixstatic.com/media/7a0e3a_c44a32e46bc34b6da0c9665311ed48b1~mv2.png"
    };


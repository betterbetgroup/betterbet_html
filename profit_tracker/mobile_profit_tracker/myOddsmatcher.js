






const LARGE_FONT_WIDTH = 1650;

const MEDIUM_FONT_WIDTH = 1490;

const SMALL_FONT_WIDTH = 1190;








    let is_premium_member = false;


    let globalData = [];
    let filteredData = [];

    let currentPage = 1;
    const rowsPerPage = 10;


    let sort_ActualProfit = 'descending';
    let sort_qualifying_loss = 'descending';
    let sort_potential_profit = 'descending';
    let sort_date_and_time = 'descending';


    let current_sort = 'date and time';



    const bookmakerImages = {
        "10Bet": "https://static.wixstatic.com/media/7a0e3a_dc4396b6acac4f8e8c6b48d4236747c7~mv2.png",
        "888Sport": "https://static.wixstatic.com/media/7a0e3a_39af396146c84a38a96e953f938290ef~mv2.png",
        "AK Bets": 'https://static.wixstatic.com/media/7a0e3a_11e7e76214754f33a216d0c9d6db1ea1~mv2.png', 
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
        "PricedUP": 'https://static.wixstatic.com/media/7a0e3a_08a41acb30d34b99b404c84d57bdccf0~mv2.png',
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
        "Other": 'https://static.wixstatic.com/media/7a0e3a_5ba0942899474154a8d3d0ab5095bc1e~mv2.png'
    };

    const exchangeImages = {
        "Betfair Exchange": 'https://static.wixstatic.com/media/7a0e3a_42e9ff11344a49fea33b58dcda917542~mv2.png',
        "Matchbook": "https://static.wixstatic.com/media/7a0e3a_c44a32e46bc34b6da0c9665311ed48b1~mv2.png", 
        "Smarkets": "https://static.wixstatic.com/media/7a0e3a_64979ac474b340868914fbf484d4ee89~mv2.png",
        "Other": 'https://static.wixstatic.com/media/7a0e3a_5ba0942899474154a8d3d0ab5095bc1e~mv2.png'
    };



    const bookmakerUrls = {
        "10Bet": "https://www.10bet.co.uk/sports",
        "888Sport": "https://www.888sport.com/",
        "Bet365": "https://www.bet365.com/#/HO/",
        "Bet600": "https://m.bet600.co.uk/",
        "BetGoodwin": "https://betgoodwin.co.uk/sportsbook/",
        "BetMGM": "https://www.betmgm.co.uk/",
        "BetUK": "https://www.betuk.com/",
        "BetVictor": "https://www.betvictor.com/",
        "Betway": "https://betway.com/en-gb/",
        "BetZone": "https://betzone.co.uk/",
        "Betano": "https://www.betano.co.uk/",
        "Betfair Exchange": "https://www.betfair.com/exchange/plus/",
        "Betfred": "https://www.betfred.com/",
        "BoyleSports": "https://www.boylesports.com/",
        "BresBet": "https://bresbet.com/",
        "CopyBet": "https://www.copybet.com/",
        "Coral": "https://www.coral.co.uk/",
        "DAZN Bet": "https://www.daznbet.com/en-gb",
        "FafaBet": "https://www.fafabet.co.uk/sportsbook/index.html",
        "FitzDares": "https://fitzdares.com/sportsbook/",
        "Grosvenor": "https://www.grosvenorcasinos.com/",
        "Hollywood Bets": "https://www.hollywoodbets.co.uk/",
        "Kwiff": "https://kwiff.com/sports/featured/",
        "Ladbrokes": "https://sports.ladbrokes.com/",
        "LeoVegas": "https://www.leovegas.co.uk/",
        "Livescore": "https://www.livescorebet.com/uk/",
        "Lottoland": "https://www.lottoland.co.uk/",
        "Midnite": "https://www.midnite.com/",
        "NRG": "https://nrg.bet/",
        "NetBet": "https://www.netbet.co.uk/",
        "Paddy Power": "https://www.paddypower.com/bet",
        "Parimatch": "https://www.parimatch.co.uk/en-gb/",
        "PlanetSportBet": "https://planetsportbet.com/",
        "QuinnBet": "https://www.quinnbet.com/sportsbook/",
        "Rhino Bet": "https://rhino.bet/",
        "Skybet": "https://m.skybet.com/",
        "Space Casino": "https://www.spacecasino.co.uk/",
        "Sporting Bet": "https://sports.sportingbet.com/en/sports",
        "Sporting Index": "https://www.sportingindex.com/sports/en-GB/spread-betting",
        "SpreadEx": "https://www.SpreadEx.com/sports/en-GB/spread-betting",
        "StarSports": "https://starsports.bet/",
        "TalkSPORT BET": "https://www.talksportbet.com/",
        "The Pools": "https://www.thepools.com/",
        "Tote": "https://tote.co.uk/",
        "Unibet": "https://www.Unibet.co.uk/",
        "VBet": "https://www.vbet.co.uk/",
        "Vickers Bet": "https://www.vickers.bet/",
        "Virgin Bet": "https://www.virginbet.com/",
        "William Hill": "https://sports.williamhill.com/betting/en-gb",
    };

    const exchangeUrls = {
        "Betfair Exchange": "https://www.betfair.com/exchange/plus/",
        "Smarkets": "https://smarkets.com/",
        "Matchbook": "https://www.matchbook.com/", 
    };


    const oddsmatcher_list = ['Manual', 'Standard', '2up', 'BOG', 'Each Way', 'Extra Place', 'Dutching']

    const calculator_list = ['No Calculator', 'Standard', '2up', 'Extra Place', 'Each Way', 'Dutching', 'Sequential Lay', 'Multi Lay']


    let customFilters = {

        'No Filter':
            
            {
                "bookmakers": Object.keys(bookmakerImages),
                "exchanges": Object.keys(exchangeImages),                    
                "oddsmatchers": oddsmatcher_list,
                "calculators": calculator_list,
                "startTime": "",
                "endTime": "",
                "minQualifyingLoss": "null",
                "minPotentialProfit": "null",
                "minActualProfit": "null",
                "maxActualProfit": "null"
            }
        
        }



        let globalFilters = {
            bookmakers: Object.keys(bookmakerImages),
            exchanges: Object.keys(exchangeImages),    
            oddsmatchers: oddsmatcher_list,
            calculators: calculator_list,
            startTime: '',
            endTime: '',
            minQualifyingLoss: null,
            minPotentialProfit: null,    
            minActualProfit: null,
            maxActualProfit: null,
        };



let data_loaded_from_wix = false;




class ProfitTracker extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: 'open' }); 

        this.isContentLoaded = false;
        this.attributeChangeQueue = [];
        
    }

    connectedCallback() {

        this.style.visibility = 'hidden'; // Make the host element visible

        this.loadConfettiScript();


            this.render()  
            .then(() => {

                this.addStyles()
                .then(() => {

                    this.style.visibility = 'visible';

                    this.runSpecificScript(); 
                    this.add_loading_row();
                    this.isContentLoaded = true;
                    this.processQueuedAttributeChanges();
                    this.handleResize();
                    window.addEventListener('resize', this.handleResize.bind(this));

                });

            });
            
    }

    static get observedAttributes() {
        return ['data-odds']; // Specify which attributes to observe
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.isContentLoaded) {
            if (name === 'data-odds') {
                this.process_new_final_data(newValue);
            }
        } else {
            this.attributeChangeQueue.push({ name, oldValue, newValue });
        }
    }
    processQueuedAttributeChanges() {

        this.attributeChangeQueue.forEach(change => {
            this.attributeChangedCallback(change.name, change.oldValue, change.newValue);
        });
        this.attributeChangeQueue = [];
    }

    process_new_final_data(data) {

        data_loaded_from_wix = true;

        data = JSON.parse(data);

        if (data.wix_filters) {
            // ADD FILTERS TO OPTIONS
            this.add_filters(data.wix_filters)
        }

        is_premium_member = data.premium_member;


        // use rows to update the table - filter and sort appropriatly first

        if (data.rows) {
            globalData = data.rows;
            this.clean_global_data();
            this.filterData();
        }


        // run something with filters

    }




    clean_global_data() {

        globalData.forEach((row) => {
            
            row.qloss = this.cleanAndValidateNumber(row.qloss);
            row.potentialprofit = this.cleanAndValidateNumber(row.potentialprofit);
            row.actualprofit = this.cleanAndValidateNumber(row.actualprofit);
            
            if (row.date == undefined || row.date == null || row.date == '') {
                row.date = '01/01/01';
            }

            row.date = this.convertDateFormat(row.date);


            switch (row.calculator) {
                case 'standard':
                case 'Standard':
                    row.calculator = 'Standard';
                    break;              
                case '2up':
                    row.calculator = '2up';
                    break;                
                case 'extraplace':
                case 'Extra Place':
                    row.calculator = 'Extra Place';
                    break;                
                case 'eachway':
                case 'Each Way':
                    row.calculator = 'Each Way';
                    break;                
                case 'dutching':
                case 'Dutching':
                    row.calculator = 'Dutching';
                    break;                
                case 'sequential':
                case 'Sequential Lay':
                    row.calculator = 'Sequential Lay';
                    break;
                case 'multi':
                case 'Multi Lay':
                    row.calculator = 'Multi Lay';
                    break;
                default:
                    row.calculator = 'No Calculator'; 
                    break;
            }

            if (row.oddsmatcher_type == undefined || row.oddsmatcher_type == null || row.oddsmatcher_type == '') {
                row.oddsmatcher_type = 'Manual';
            }

        });

    }










    get_bookmaker_image(bookmaker) {
        if (bookmakerImages[bookmaker]) {
            return bookmakerImages[bookmaker];
        } else {
            return this.get_exchange_image(bookmaker); // Or a default URL if you prefer
        }
    }
    
    get_exchange_image(exchange) {
        if (exchangeImages[exchange]) {
            return exchangeImages[exchange];
        } else {
            return 'https://static.wixstatic.com/media/7a0e3a_5ba0942899474154a8d3d0ab5095bc1e~mv2.png'; // Or a default URL if you prefer
        }
    }


    get_bookmaker_url(bookmaker) {
        if (bookmakerUrls[bookmaker]) {
            return bookmakerUrls[bookmaker];
        } else {
            return this.get_exchange_url(bookmaker); 
        }
    }
    
    get_exchange_url(exchange) {
        if (exchangeUrls[exchange]) {
            return exchangeUrls[exchange];
        } else {
            return null; 
        }
    }

    

    
    sort_rows_by_actual_profit(rows, method) {

        return rows.sort((a, b) => {
                // Remove the '%' and convert to float for comparison

                const ratingA = parseFloat(a.actualprofit);
                const ratingB = parseFloat(b.actualprofit);
    
                if (method == 'descending') {
                    return ratingB - ratingA;  // Sort in descending order
                } else {
                    return ratingA - ratingB;
                }
            });
    }
    
    

    sort_rows_by_qualifying_loss(rows, method) {
        return rows.sort((a, b) => {

    
                const ratingA = parseFloat(a.qloss.replace('£', '').replace('+', ''));
                const ratingB = parseFloat(b.qloss.replace('£', '').replace('+', ''));
    
                if (method == 'descending') {
                    return ratingB - ratingA;  // Sort in descending order
                } else {
                    return ratingA - ratingB;
                }
            });
    }
    
    
    sort_rows_by_potential_profit(rows, method) {
        return rows.sort((a, b) => {

    
                const ratingA = parseFloat(a.potentialprofit.replace('£', '').replace('+', ''));
                const ratingB = parseFloat(b.potentialprofit.replace('£', '').replace('+', ''));
    
                if (method == 'descending') {
                    return ratingB - ratingA;  // Sort in descending order
                } else {
                    return ratingA - ratingB;
                }
            });
    }
    
    sort_rows_by_date_and_time(rows, method) {
        return rows.sort((a, b) => {
            // Parse dates using the custom function
            const dateA = this.parseDateAndTime_sort(a.date).getTime();
            const dateB = this.parseDateAndTime_sort(b.date).getTime();
    
            if (method === 'descending') {
                return dateB - dateA;  // Sort in descending order
            } else {
                return dateA - dateB;  // Default to ascending order
            }
        });
    }
    

    parseDateAndTime_sort(dateStr) {
        // Expected date format: dd/mm/yyyy
        const parts = dateStr.split('/');
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1; // Month is 0-based
            const year = parseInt(parts[2], 10); // Use the full year directly from the input
    
            return new Date(year, month, day);
        }
        throw new Error('Invalid date format');
    }
    
    
    
    
    convertDateFormat(dateStr) {

        let [day, month, year] = dateStr.split('/');
        let shortYear = year.slice(-2);
        return `${day}/${month}/${shortYear}`;
    }
    
    
    parseDateAndTime_filterData(dateString) {
        return dateString;
    }
    
    
    removeNonQualifyingBetOptions() {
    
        const filtersDropdown = this.shadowRoot.getElementById('filters-dropdown-select-container');
    
        const options = Array.from(this.shadowRoot.querySelectorAll('.dropdown-option-filter'));
    
    
        options.forEach(option => {
            if (option.dataset.value !== 'No Filter') {
                option.remove();
            }
        });
    
    }



    
    
    
    displayRows(page, rows, totalPages) {

        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedItems = rows.slice(start, end);
    
        this.shadowRoot.querySelector('.container_div').innerHTML = '';


        this.add_loading_row();

        let min = 169;
        let max = 420;

        setTimeout(() => {

            this.shadowRoot.querySelector('.container_div').innerHTML = '';
            
            if (filteredData.length == 0) {
                this.add_no_data_row();
            }

            this.appendRows(paginatedItems);
        
            this.shadowRoot.getElementById('pagination-info').textContent = `Page ${page} of ${totalPages}`;
            
            if (totalPages == 0) {
                this.shadowRoot.getElementById('pagination-info').textContent = `Page 0 of 0`;
            }

        }, Math.floor(Math.random() * (max - min + 1) + min));


    }
    
    

    setupPagination() {    

        let rows_to_send = filteredData;
        let totalPages = Math.ceil(rows_to_send.length / rowsPerPage); // Recalculate total pages
    
        this.displayRows(currentPage, rows_to_send, totalPages); // Display the current page
    
        this.shadowRoot.getElementById('prev-page').onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                this.displayRows(currentPage, rows_to_send, totalPages);
            }
        };
    
        this.shadowRoot.getElementById('next-page').onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                this.displayRows(currentPage, rows_to_send, totalPages);
            }
        };


    }
    
    
    
    getRowObjById(rowId) {
        // Assuming globalData is accessible globally
        return globalData.find(item => item.betId === rowId);
    }
    
    
  
    process_click_message_info_select_and_upgrade(event) {

        let rowobj = this.getRowObjById(event.target.getAttribute('data-id'), globalData); 

        let obj_to_send = {...rowobj};

        let message_type;

        if (event.target.className === 'select_button') {
            message_type = 'Select-Event';
            obj_to_send.date = this.revertDateFormat(obj_to_send.date)
        }
        if (event.target.className === 'calculator_image') {
            message_type = 'Calculator';
            obj_to_send.date = this.revertDateFormat(obj_to_send.date)
        }

        let message = {
            row: obj_to_send
        };


        // on final profit change button as well it should raise an event

            
        const raise_event = new CustomEvent(message_type, {
            detail: message,  
            bubbles: true,       // Allows the event to bubble up through the DOM
            composed: true        // Allows the event to pass through shadow DOM boundaries
        });

        this.shadowRoot.dispatchEvent(raise_event); 
    
    }
    

    revertDateFormat(dateStr) {
        let [day, month, shortYear] = dateStr.split('/');
        let fullYear = `20${shortYear}`; // Prefix '20' to make it the 2000s decade
        return `${day}/${month}/${fullYear}`;
    }


    create_row(row) {

        let bookmaker_image = this.get_bookmaker_image(row.bookie)
        let exchange_image = this.get_bookmaker_image(row.exchange)

        let profit_data = this.get_profit_data_formatted(row);

        const tr = document.createElement('div');

        tr.className = 'container_div_around_each_item';

        tr.setAttribute('data-id', row.betId);



        let bookmaker_link = row.bookmaker_link;

        if (bookmaker_link == undefined) {
            bookmaker_link = this.get_bookmaker_url(row.bookie);
        }


        let exchange_link = row.exchange_link;

        if (exchange_link == undefined) {
            exchange_link = this.get_bookmaker_url(row.exchange);
        }


        tr.innerHTML = ` 

            <div class="table_data_row" >

                    <div class="mobile_title_div top_title_div">

                        Date

                    </div>
                
                    <div class="date_div_mobile" >
                        ${row.date}
                    </div> 


                    <div class="div_around_bookmaker_and_exchange_title mobile_title_div" style="padding-left: 0;">

                        <span class="bookmaker_and_exchange">

                            Bookmaker

                        </span>

                        <span class="bookmaker_and_exchange">

                            Exchange

                        </span>

                    </div>

                    <div class="div_around_bookmaker_exhange_images" > 

                        <div class="mobile_bookmaker_logo">
                            <a class="anchor_round_bookmaker" ${bookmaker_link ? `href="${bookmaker_link}"` : ''} target="_blank" >
                                <img class='bookmaker_img' src="${bookmaker_image}" >
                            </a>
                        </div>

                        <div class="mobile_exchange_logo">
                            <a class="anchor_round_exchange" ${exchange_link ? `href="${exchange_link}"` : ''} target="_blank" >
                                <img class='exchange_img' src="${exchange_image}" >
                            </a>
                        </div>

                    </div>


                    <div class="mobile_title_div">
                        Description
                    </div>

                    <div class="description_content_div">

                        ${row.description || ''}

                    </div>


                    <div class="div_around_bookmaker_and_exchange_title mobile_title_div above_profit_values" style="padding-left: 0;">

                        <span class="actual_profit_headers">

                            Qualifying<br>Loss

                        </span>

                        <span class="actual_profit_headers">

                            Potential<br>Profit

                        </span>

                        <div class="actual_profit_headers settled_actual_profit">
                            <div style="font-size: 12px;">Settled</div>

                            <svg class="tick_svg"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#00ff00" stroke="#00ff00" width="11" height="11" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="tick"> <polyline fill="none" points="3.7 14.3 9.6 19 20.3 5" stroke="#00ff00" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"></polyline> </g> </g> </g></svg>

                            <span class="span_slash_between_settled">/</span>

                            <svg class="cross_svg" style=" margin-right: 4px;" fill="#ff0000" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000" width="8.5" height="8.5">
                                <g id="SVGRepo_bgCarrier" stroke-width="0" ></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"> 
                                    <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fill-rule="evenodd"></path> 
                                </g>
                            </svg>                
                        </div>

                        <span class="actual_profit_headers">

                            Final<br>Profit

                        </span>



                    </div>



                    <div class="profit_container">

                        <div class="qloss_div_mobile" >
                            ${profit_data.qualifying_loss}
                        </div> 

                        <div class="potentialprofit_div_mobile" >
                            ${profit_data.potential_profit}
                        </div> 

                        <div class="expected_profit_data">
                            <input type="checkbox" data-id="${row.betId}" name="is_settled" class="settled_checkbox" ${row.complete ? 'checked' : ''}>
                        </div>

                        <div class=${profit_data.actual_profit_class} >
                            ${profit_data.actualprofit}
                        </div> 


                    </div>

                </div>


                <div class="div_for_buttons" >

                    ${(row.calculator != 'No Calculator') ? `<button class="info_button" data-id=${row.betId} >

                        <div class="tooltip_div_around_calculator" id="info_image_${row.betId}" data-tooltip=${row.calculator.replace(' ', '-') || ''} style="background: None; height:35px; width:35px; padding:0; margin: 0; display: flex;">
                            <img class="calculator_image" data-id="${row.betId}" id="more_info_button" src="https://img.icons8.com/?size=100&id=12780&format=png&color=000000" alt="Info">
                        </div>

                    </button>` : ''}

                    <button class="select_button" data-id=${row.betId} >
                        Open
                    </button>

                </div>

        `

        

        const tableBody = this.shadowRoot.querySelector('.container_div');

        tableBody.appendChild(tr);
        
    }


    
    
    add_loading_row() {
    
        const loadingrow = document.createElement('div');
        loadingrow.setAttribute('id', 'loadingScreenRow'); 
        loadingrow.innerHTML = `

        <td colspan="100%" style="padding: 0;">
            <div class="loading">
                <div class="neon-pulse">
                    <div class="neon-bar"></div>
                    <div class="neon-bar"></div>
                    <div class="neon-bar"></div>
                    <div class="neon-bar"></div>
                </div>
                <h2 class="loading-text">Collecting Matched Betting Data...</h2>
            </div>
        </td>

    `;

        const tableBody = this.shadowRoot.querySelector('.container_div');
        tableBody.append(loadingrow);

        this.alternateText();

    }



        
    add_no_data_row() {
    
        const no_data_row = document.createElement('div');
        no_data_row.setAttribute('id', 'no-data-row'); 
        no_data_row.innerHTML = `

        <td colspan="100%" style="padding: 0;">
            <div class="no-data-div">

                <h2 class="loading-text no-data-text">No Data Collected Yet...</h2>
            </div>
        </td>

    `;

        const tableBody = this.shadowRoot.querySelector('.container_div');
        tableBody.append(no_data_row);

    }





alternateText() {

    const loadingText = this.shadowRoot.querySelector('.loading-text');
    let toggle = false; // State tracking

    setInterval(() => {
        if (toggle) {
            loadingText.textContent = 'Collecting Matched Betting Data...';
        } else {
            loadingText.textContent = 'Processing Bet Data...';
        }
        toggle = !toggle; 
    }, 3500); 

}


    
    

    
    
    get_sort_type_using_current_sort() {
    
        if (current_sort == 'actual profit') {
            return sort_ActualProfit;
        }
        if (current_sort == 'potential profit') {
            return sort_potential_profit;
        } 
        if (current_sort == 'qualifying loss') {
            return sort_qualifying_loss;
        }
        if (current_sort == 'date and time') {
            return sort_date_and_time;
        }
    
        return sort_qualifying_loss;
    
    }
    
    


    
    





    
    
    set_global_filters_as_filters_selected_in_dropdown(filters) {
    
    
        if (!filters) {
            console.log("(No Selected Filter)s provided for updating.");
            return;
        }
    
        // Update each key in globalFilters with the new values from filters
        globalFilters.bookmakers = filters.bookmakers || [];
        globalFilters.exchanges = filters.exchanges || [];        
        globalFilters.oddsmatchers = filters.oddsmatchers || [];
        globalFilters.calculators = filters.calculators || [];
        globalFilters.startTime = filters.startTime || '';
        globalFilters.endTime = filters.endTime || '';
    
        // Handle potential "null" strings and convert them back to null
        globalFilters.minQualifyingLoss = filters.minQualifyingLoss !== "null" ? parseFloat(filters.minQualifyingLoss) : null;
        globalFilters.minPotentialProfit = filters.minPotentialProfit !== "null" ? parseFloat(filters.minPotentialProfit) : null;        
        globalFilters.minActualProfit = filters.minActualProfit !== "null" ? parseFloat(filters.minActualProfit) : null;
        globalFilters.maxActualProfit = filters.maxActualProfit !== "null" ? parseFloat(filters.maxActualProfit) : null;
    
    
    }
    
    
    
    set_input_values_using_filter(filters) {

        let scope = this.shadowRoot;
    
        function manageDropdownCheckboxes(dropdownId, selectedItems, selectAllText) {
            const dropdown = scope.getElementById(dropdownId);
            const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]:not(.select-all)');
            const selectAllCheckbox = dropdown.querySelector('.select-all');
    
            // Check all boxes if the list is empty
            if (selectedItems.length === 0) {
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });
                selectAllCheckbox.checked = false; // Ensure the select-all box is checked
            } else {
                let allChecked = true;
    
                checkboxes.forEach(checkbox => {
                    if (selectedItems.includes(checkbox.parentNode.textContent.trim())) {
                        checkbox.checked = true;
                    } else {
                        checkbox.checked = false;
                        allChecked = false;
                    }
                });
    
                // Manage the select-all checkbox based on individual checkbox states
                selectAllCheckbox.checked = allChecked;
            }
        }
    
        // Apply filters for dropdowns with select-all functionality
        manageDropdownCheckboxes('bookmakers-dropdown-options', filters.bookmakers, 'Select All Bookmakers');
        manageDropdownCheckboxes('exchanges-dropdown-options', filters.exchanges, 'Select All Exchanges');
        manageDropdownCheckboxes('oddsmatchers-dropdown-options', filters.oddsmatchers, 'Select All Oddsmatchers');
        manageDropdownCheckboxes('calculators-dropdown-options', filters.calculators, 'Select All Calculators');
    




        const startTimeSelect = this.shadowRoot.getElementById('date-range-start');
        startTimeSelect.value = this.convertDate_for_date_input(filters.startTime) || '';

        const endTimeselect = this.shadowRoot.getElementById('date-range-end');
        endTimeselect.value = this.convertDate_for_date_input(filters.endTime) || '';
    
    
        function setInputValue(id, value) {
            const input = scope.getElementById(id);
            input.value = value === 'null' ? '' : value;
        }
    

        

        setInputValue('min-qualifying-loss', filters.minQualifyingLoss);
        setInputValue('min-potential-profit', filters.minPotentialProfit);
        setInputValue('min-actual-profit', filters.minActualProfit);
        setInputValue('max-actual-profit', filters.maxActualProfit);
    
    
    
    }

    convertDate_for_date_input(dateStr) {

        try {
            const [day, month, year] = dateStr.split('/');
            const fullYear = parseInt(year, 10) + 2000;
            return `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        } catch {
            return '';
        }
    }
    





    
    
    function_that_takes_global_filters_and_appends_it_to_current_with_name(name_for_filter) {
    
        let is_delete_option = false;
    
        if (!name_for_filter) {
            return {
                filters_to_send: null,
                is_delete: false
            };
        }
    
        // Check if the filter name already exists and log the action
        if (customFilters.hasOwnProperty(name_for_filter)) {
            console.log("Duplicate filter name provided; updating existing filter.");
            is_delete_option = true;
        } else {
            console.log("Adding new filter:", name_for_filter);
        }
    
    
        customFilters[name_for_filter] = {
            "bookmakers": globalFilters.bookmakers.slice(),
            "exchanges": globalFilters.exchanges.slice(), 
            "oddsmatchers": globalFilters.oddsmatchers.slice(),
            "calculators": globalFilters.calculators.slice(), 
            "startTime": globalFilters.startTime || "", 
            "endTime": globalFilters.endTime || "", 
            "minQualifyingLoss": globalFilters.minQualifyingLoss || "null",
            "minPotentialProfit": globalFilters.minPotentialProfit || "null",
            "minActualProfit": globalFilters.minActualProfit || "null",
            "maxActualProfit": globalFilters.maxActualProfit || "null",
        };
    
        return {
    
            filters_to_send: customFilters[name_for_filter],
            is_delete: is_delete_option
    
        }
    
    }
    
    
    
    
    
    
    
    function_using_global_data_and_global_filters_to_make_filtered_data() {
    
        const now = new Date(); 
    
        filteredData = globalData.filter(row => {

            let bookmakerMatch = globalFilters.bookmakers.includes(row.bookie);

            if (globalFilters.bookmakers.includes('Other')) {
                if (bookmakerMatch == false && !Object.keys(bookmakerImages).includes(row.bookie)) {
                    bookmakerMatch = true;
                }
            }

            let exchangeMatch = globalFilters.exchanges.includes(row.exchange);

            if (globalFilters.exchanges.includes('Other')) {
                if (exchangeMatch == false && !Object.keys(exchangeImages).includes(row.exchange)) {
                    exchangeMatch = true;
                }
            }

            const oddsmatcherMatch = globalFilters.oddsmatchers.includes(row.oddsmatcher_type);
            const calculatorMatch = globalFilters.calculators.includes(row.calculator);

            const qualifyingLossMatch = globalFilters.minQualifyingLoss === null || parseFloat(row.qloss.replace('£', '')) >= globalFilters.minQualifyingLoss;
            const potentialProfitMatch = globalFilters.minPotentialProfit === null || parseFloat(row.potentialprofit.replace('£', '')) >= globalFilters.minPotentialProfit;
    
            const minActualProfitMatch = globalFilters.minActualProfit === null || parseFloat(row.actualprofit.replace('£', '')) >= globalFilters.minActualProfit;
            const maxActualProfitMatch = globalFilters.maxActualProfit === null || parseFloat(row.actualprofit.replace('£', '')) <= globalFilters.maxActualProfit;
    
            const startTimeMatch = globalFilters.startTime === '' || 
                this.convertDateToJSDate(row.date) >= this.convertDateToJSDate(globalFilters.startTime);

            const endTimeMatch = globalFilters.endTime === '' || 
                this.convertDateToJSDate(row.date) <= this.convertDateToJSDate(globalFilters.endTime);

    
            return bookmakerMatch && exchangeMatch && oddsmatcherMatch && calculatorMatch && qualifyingLossMatch && potentialProfitMatch && minActualProfitMatch && maxActualProfitMatch && startTimeMatch && endTimeMatch ;
        
        
        });
    
    
    
    }

    convertDateToJSDate(dateStr) {
        const [day, month, year] = dateStr.split('/');
        const fullYear = '20' + year; // Convert yy to yyyy (assuming all dates are in the 2000s)
        return new Date(`${fullYear}-${month}-${day}`);
    }
    
    
    

    
    
    curve_corners_of_filter_dropdown() {
    
        let dropdown = this.shadowRoot.querySelector('#filters-dropdown-select-container')
    
        dropdown.style.borderRadius = '10px';
    }
    
    
    closeAllDropdowns() {
        const dropdowns = this.shadowRoot.querySelectorAll('.dropdown-options');
        dropdowns.forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    
        let dropdown_corners = this.shadowRoot.querySelectorAll('.custom-select-container');
    
        dropdown_corners.forEach((dropdown) => {
    
            dropdown.style.borderRadius = '5px';
    
        });
    
    
        // ALSO CLOSE FILTER DROPDOWN
        this.shadowRoot.querySelector('#filters-dropdown-options').style.display = 'none';
    
        this.curve_corners_of_filter_dropdown();
    
    }
    
    
    append_options_for_the_four_filter_dropdowns(containerId, optionsList) {
        const container = this.shadowRoot.querySelector(containerId);
        optionsList.forEach(option => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.checked = true;
            const span = document.createElement('span'); // Create span for custom checkbox
            label.appendChild(input);
            label.appendChild(span); // Append span to label
            label.appendChild(document.createTextNode(option));
            container.appendChild(label);
        });
    }
    
    
    
    
    
    
    
    getCheckedOptions(containerId) {
        const container = this.shadowRoot.querySelector(containerId);
        const labels = container.querySelectorAll('label');
        const checkedOptions = [];
    
        labels.forEach(label => {
            const checkbox = label.querySelector('input[type="checkbox"]');
            if (checkbox && !checkbox.classList.contains('select-all') && checkbox.checked) {
                checkedOptions.push(label.textContent.trim());
            }
        });
    
        return checkedOptions;
    }
    
    
    
    
    
    
    
    
    
    
    
    go_to_input_and_update_global_for_the_input(filterId) {
    
        switch (filterId) {
    
            case 'bookmakers-dropdown-select-container':
                globalFilters.bookmakers = this.getCheckedOptions('#bookmakers-dropdown-options');
                break;
            case 'exchanges-dropdown-select-container':
                globalFilters.exchanges = this.getCheckedOptions('#exchanges-dropdown-options');
                break;


            case 'oddsmatchers-dropdown-select-container':
                globalFilters.oddsmatchers = this.getCheckedOptions('#oddsmatchers-dropdown-options');
                break;
            case 'calculators-dropdown-select-container':
                globalFilters.calculators = this.getCheckedOptions('#calculators-dropdown-options');
                break;
    

            case 'min-qualifying-loss':
                let ql = parseFloat(this.shadowRoot.getElementById('min-qualifying-loss').value);
                globalFilters.minQualifyingLoss = isNaN(ql) ? null : ql;
                break;
            case 'min-potential-profit':
                let pp = parseFloat(this.shadowRoot.getElementById('min-potential-profit').value);
                globalFilters.minPotentialProfit = isNaN(pp) ? null : pp;
                break;

    

            case 'min-actual-profit':
                let ap = parseFloat(this.shadowRoot.getElementById('min-actual-profit').value);
                globalFilters.minActualProfit = isNaN(ap) ? null : ap;
                break;

            case 'max-actual-profit':
                let apmax = parseFloat(this.shadowRoot.getElementById('max-actual-profit').value);
                globalFilters.maxActualProfit = isNaN(apmax) ? null : apmax;

                break;
                
            case 'date-range':
                globalFilters.startTime = this.reverseConvertDate_from_input_to_global_filters(this.shadowRoot.getElementById('date-range-start').value);
                globalFilters.endTime = this.reverseConvertDate_from_input_to_global_filters(this.shadowRoot.getElementById('date-range-end').value);
                break;

        }
    
    
    }

        reverseConvertDate_from_input_to_global_filters(dateStr) {
            
            try {
                const [year, month, day] = dateStr.split('-');
                const shortYear = year.slice(-2);
                return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${shortYear}`;
            } catch {
                return '';
            }
    }
    
    
    
    
    removeOptionFromDropdown(name_for_filter) {
        
        const filtersDropdown = this.shadowRoot.getElementById('filters-dropdown-select-container');
            
        let optionToRemove = filtersDropdown.querySelector(`div[data-value="${name_for_filter}"]`);
        
        if (optionToRemove) {
            // Remove the found option from the dropdown
            optionToRemove.remove();
            console.log(`Option with value '${name_for_filter}' removed.`);
        } else {
            // Log if the option was not found
            console.log(`Option with value '${name_for_filter}' not found.`);
        }
    }
    
    
    
    
    
    
    
    open_text_box_and_confirm() {
    
        this.shadowRoot.querySelector('.filter-dropdown-name-div').style.display = 'flex';
        this.shadowRoot.querySelector('.confirm-filter-name').style.display = 'block';
        this.shadowRoot.querySelector('.cancel-making-filter').style.display = 'flex';
    
    
        this.shadowRoot.querySelector('.div-outside-filter-dropdown').style.display = 'none';
        this.shadowRoot.querySelector('.save-filter-button').style.display = 'none';
    
    }
    
    close_boxes() {
    
        let filter_name_label = this.shadowRoot.querySelector('#type-filter-name');
        filter_name_label.textContent = 'Filter Name';
    
        this.shadowRoot.querySelector('#get-filter-name').value = '';
    
        this.shadowRoot.querySelector('.filter-dropdown-name-div').style.display = 'none';
        this.shadowRoot.querySelector('.confirm-filter-name').style.display = 'none';
        this.shadowRoot.querySelector('.cancel-making-filter').style.display = 'none';
    
    
        this.shadowRoot.querySelector('.div-outside-filter-dropdown').style.display = 'flex';
        this.shadowRoot.querySelector('.save-filter-button').style.display = 'inline-block';
    }
    
    
    get_name_and_close_boxes() {
    
        let filter_name_label = this.shadowRoot.querySelector('#type-filter-name');
    
        let filter_name = this.shadowRoot.querySelector('#get-filter-name').value;
    
        if (filter_name == '') {
    
    
            if (!filter_name_label.textContent.includes('Enter a Valid Name')) {
    
                let newSpan = document.createElement('span');
                let nSpan = document.createElement('span');
                nSpan.textContent = ' ------ ';
                newSpan.textContent = 'Enter a Valid Name';
                newSpan.style.color = '#ff0000'; // Red color for the appended text
                filter_name_label.appendChild(nSpan);
                filter_name_label.appendChild(newSpan);
    
    
                setTimeout(() => {
    
                    filter_name_label.textContent = 'Filter Name';
                    
                }, 5000);
            
            }
    
    
            return '';
    
    
        }
    
        filter_name_label.textContent = 'Filter Name';
    
        this.shadowRoot.querySelector('#get-filter-name').value = '';
    
        this.shadowRoot.querySelector('.filter-dropdown-name-div').style.display = 'none';
        this.shadowRoot.querySelector('.confirm-filter-name').style.display = 'none';
        this.shadowRoot.querySelector('.cancel-making-filter').style.display = 'none';
    
    
        this.shadowRoot.querySelector('.div-outside-filter-dropdown').style.display = 'flex';
        this.shadowRoot.querySelector('.save-filter-button').style.display = 'inline-block';
    
        return filter_name;
    
    }
    
    
    
    
    append_options_for_dropdowns() {
    
        this.append_options_for_the_four_filter_dropdowns('#bookmakers-dropdown-options', Object.keys(bookmakerImages));
        this.append_options_for_the_four_filter_dropdowns('#exchanges-dropdown-options', Object.keys(exchangeImages));
        this.append_options_for_the_four_filter_dropdowns('#oddsmatchers-dropdown-options', oddsmatcher_list);
        this.append_options_for_the_four_filter_dropdowns('#calculators-dropdown-options', calculator_list);
    
    }
    
    
    
    
    create_event_listeners_for_select_containers() {
    
        const selectContainers = this.shadowRoot.querySelectorAll('.custom-select-container');
    
        selectContainers.forEach(container => {
            const selectAll = container.querySelector('.select-all');
            const checkboxes = container.querySelectorAll('input[type="checkbox"]:not(.select-all)');
    
    
            // EVENT LISTENERS FOR THE DROPDOWNS, FOR CLICKING AND VALUE CHANGES. IT JUST CALLS THE UPDATEGLOBALFILTERS FOR EACH, AND TOGGLES DISPLAY OF DROPDOWNS
    
            selectAll.addEventListener('change', (event) => {
                checkboxes.forEach(checkbox => {
                    checkbox.checked = selectAll.checked;
                });
                this.updateGlobalFilters(container.id);
            });
    
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', (event) => {
                    selectAll.checked = Array.from(checkboxes).every(c => c.checked);
                    this.updateGlobalFilters(container.id);
                });
            });
    
            container.addEventListener('click', (event) => {
    
                event.stopPropagation(); // Stop the click from closing the dropdown immediately
    
                if (container.querySelector('.dropdown-options').style.display == 'block') {
                    container.querySelector('.dropdown-options').style.display = 'none';
                    container.style.borderRadius = '5px';
    
                } else {
                this.closeAllDropdowns(); // Close all other dropdowns
                container.querySelector('.dropdown-options').style.display = 'block'; // Show current dropdown
                container.style.borderRadius = '5px 5px 0 0';
                
                }
            });
    
    
        });
    
        this.shadowRoot.addEventListener('click', (event) => {
            if (!event.target.closest('.custom-select-container')) {
                this.closeAllDropdowns();
            }
        });
    
    
    }
    
    
    
    
    
    
    create_text_box_and_time_dropdown_event_listeners() {
    
        const textInputs = this.shadowRoot.querySelectorAll('.text-input');
        textInputs.forEach(input => {
            input.addEventListener('input', () => this.updateGlobalFilters(input.id));
        });


        let date_range_inputs = this.shadowRoot.querySelectorAll('.date-range-input');

        date_range_inputs.forEach((input) => {
            
            input.addEventListener('input', () => {

                this.validateDateRange();
                // within the validate date range function it will update global filters

            });

        });

    
    }
    
    
    
    deepEqual(obj1, obj2) {
    
        if (obj1 === obj2) {
            return true;
        }
        if (obj1 == null || typeof obj1 != "object" || obj2 == null || typeof obj2 != "object") {
            return false;
        }
    
        let keysA = Object.keys(obj1), keysB = Object.keys(obj2);
        if (keysA.length != keysB.length) {
            
            return false;
        }
    
        for (let key of keysA) {
            if (!keysB.includes(key) || !this.deepEqual(obj1[key], obj2[key])) {
                return false;
            }
        }
    
        return true;
    }
    
    
    
    
    
    
    
    remove_all_option_style() {
        let option_divs = this.shadowRoot.querySelectorAll('.dropdown-option-filter');
        option_divs.forEach((option) => {
            // Remove the active class from all options
            option.classList.remove('active');
        });
    }
    
    set_background_for_current_option(name) {
        // Ensure all styles are reset first
        this.remove_all_option_style();
    
        let option_divs = this.shadowRoot.querySelectorAll('.dropdown-option-filter');
        option_divs.forEach((option) => {
            if (option.dataset.value == name) {
                // Add the active class to the matching option
                option.classList.add('active');
            }
        });
    }
    
    
    
    
    
    
    
    
    check_if_dropdown_matches_global_filter_settings() {
    
        let keys = Object.keys(customFilters)
    
        let filtersDropdown = this.shadowRoot.querySelector('#filters-select');
    
        this.remove_all_option_style();
    
        let found_match = false;
    
        keys.forEach((key) => {
    
    
            let adjusted_global_filters = {
                "bookmakers": globalFilters.bookmakers.slice(), 
                "exchanges": globalFilters.exchanges.slice(), 
                "oddsmatchers": globalFilters.oddsmatchers.slice(), 
                "calculators": globalFilters.calculators.slice(), 
                "startTime": globalFilters.startTime || "", 
                "endTime": globalFilters.endTime || "", 
                "minQualifyingLoss": globalFilters.minQualifyingLoss || "null",
                "minPotentialProfit": globalFilters.minPotentialProfit || "null", 
                "minActualProfit": globalFilters.minActualProfit || "null",
                "maxActualProfit": globalFilters.maxActualProfit || "null"
            };
    
    
            if (this.deepEqual(customFilters[key], adjusted_global_filters)) {
    
                filtersDropdown.value = key;
    
                this.set_background_for_current_option(key)
    
                found_match = true;
    
            }
    
    
        });
    
    
        if (!found_match) {
    
            filtersDropdown.value = 'Select Filter';
    
        }
    
    
    }
    
    
    make_filter_selection_value_as_saved(filter_name) {
    
        let filtersDropdown = this.shadowRoot.querySelector('#filters-select');
        filtersDropdown.value = filter_name;
    
    }

    

    
    
    check_options_filter_border_bottom() {
        const list_of_options = this.shadowRoot.querySelectorAll('.dropdown-option-filter');
    
        // First, ensure all options have a bottom border
        list_of_options.forEach(option => {
            option.style.borderBottom = '1px solid #444';
        });
    
        // Remove the border from the last option
        if (list_of_options.length > 0) {
            list_of_options[list_of_options.length - 1].style.borderBottom = 'none';
        }
    }
    
    
    
    
    
    append_filter_name_to_filter_options_in_dropdown(name_for_filter) {
        
        const container = this.shadowRoot.getElementById('filters-dropdown-options');
    
        // Create the option container
        const optionDiv = document.createElement('div');
        optionDiv.className = 'dropdown-option-filter';
        optionDiv.dataset.value = name_for_filter; // Ensure value attribute is set for use in click event
        optionDiv.textContent = name_for_filter;
    
        
    
        optionDiv.addEventListener('click', (event) => {
    
            if (name_for_filter) {
    
                const filter = customFilters[name_for_filter];
    
                this.set_background_for_current_option(name_for_filter)
    
                this.apply_custom_filters_from_dropdown(filter);
    
                this.set_global_filters_as_filters_selected_in_dropdown(filter);
                
                this.shadowRoot.querySelector('#filters-select').value = name_for_filter;
    
                this.remove_all_option_style();
    
                this.set_background_for_current_option(name_for_filter)
    
                this.filterData();
        
            } 
    
        });
    
    
        // Create the confirm delete button
        const confirmDelete = document.createElement('button');
        confirmDelete.className = 'confirm-delete-button';
        confirmDelete.textContent = `Confirm Deleting '${name_for_filter}'`;

        confirmDelete.addEventListener('click', (event) => {

            event.stopPropagation();

            optionDiv.remove();

            delete customFilters[name_for_filter]; // Delete the key-value pair

            this.check_if_dropdown_matches_global_filter_settings();

            this.check_options_filter_border_bottom();

            const raise_event = new CustomEvent('Delete-Filter', {
                detail: { filter_name: name_for_filter },  
                bubbles: true,       // Allows the event to bubble up through the DOM
                composed: true        // Allows the event to pass through shadow DOM boundaries
            });
    
            this.shadowRoot.dispatchEvent(raise_event); 
    
        });
    


    
        // Create the delete button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'filter-delete-button';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function(event) {
    
            event.stopPropagation();
    
            confirmDelete.style.display = 'block';
    
            deleteButton.style.display = 'none';
    
    
            setTimeout(() => {
    
                confirmDelete.style.display = 'none';
    
                deleteButton.style.display = 'block';
                
            }, 6000);
    
        };
    
        // Append the delete button to the option container
    
        if (name_for_filter != 'No Filter') {
            optionDiv.appendChild(confirmDelete);
            optionDiv.appendChild(deleteButton);
        }
    
        // Append the option container to the dropdown
        container.appendChild(optionDiv);
    
    
        this.check_options_filter_border_bottom();
    
    
    }
    
    
    
    
    add_event_listener_for_saved_filters() {
    
        let container = this.shadowRoot.querySelector('#filters-dropdown-select-container')
    
        container.addEventListener('click', (event) => {
    
            event.stopPropagation(); // Stop the click from closing the dropdown immediately
    
            if (this.shadowRoot.querySelector('#filters-dropdown-options').style.display == 'block') {
                this.shadowRoot.querySelector('#filters-dropdown-options').style.display = 'none'
                container.style.borderRadius = '10px';
            } else {
            this.closeAllDropdowns(); // Close all other dropdowns
            this.shadowRoot.querySelector('#filters-dropdown-options').style.display = 'block'; // Show current dropdown
            container.style.borderRadius = '10px 10px 0 0';
    
            
            }
        });
    
    }

    
  
    
    // APPEND THE ROWS TO THE PAGE - TAKING CURRENT PAGE ROWS
    
    appendRows(rows) {
        
        rows.forEach(row => {
    
            this.create_row(row);
    
        });

        this.add_event_listener_for_complete_settled_checkboxes();

        this.handleResize();

    
    }
    
    
    

    
    
    





    updateGlobalFilters(filterId) {
    
        this.go_to_input_and_update_global_for_the_input(filterId);
    
        this.check_if_dropdown_matches_global_filter_settings();
        
        this.filterData();
    
    }
    
    
    

    
    sort_data(sort_by, method) {
    
            if (sort_by == 'actual profit') {
                globalData = this.sort_rows_by_actual_profit(globalData, method)
            } else if (sort_by == 'potential profit') {
                globalData = this.sort_rows_by_potential_profit(globalData, method)
            } else if (sort_by == 'qualifying loss') {
                globalData = this.sort_rows_by_qualifying_loss(globalData, method)
            } else if (sort_by == 'date and time') {
                globalData = this.sort_rows_by_date_and_time(globalData, method)
            }
    
    }
    
    
    filterData() {

        if (!data_loaded_from_wix) {
            return;
        }
            
        this.sort_data(current_sort, this.get_sort_type_using_current_sort());
        
        this.function_using_global_data_and_global_filters_to_make_filtered_data();
    
        this.setupPagination();

    }
    
    

    add_filters(filterObject) {
    
        this.removeNonQualifyingBetOptions();
    
        if (Object.keys(filterObject).length === 0) {
            return; 
        }
    
        for (const [filterName, filters] of Object.entries(filterObject)) {
    
            customFilters[filterName] = filters;
    
            this.append_filter_to_options(filterName);
        }
    
    
    }
    
    
    
    
    
    
    
    // ALWAYS SET THE CUSTOM FILTERS NEW FILTER JUST BEFORE DOING THIS - SHOULD BE ON LOAD, WHEN FILTER CREATED (WHERE IT SHOULD ALSO DELETE DUPLICATES AND SWITCH TO THAT FILTER), AND WHEN RECEIVING FROM WIX
    
    append_filter_to_options(name_for_filter) {
    
        if (name_for_filter == "") {
            return
        }
    
        this.append_filter_name_to_filter_options_in_dropdown(name_for_filter);
    
    }
    
    
  
    
    append_global_filters_to_options(name_for_filter) {
        
        return this.function_that_takes_global_filters_and_appends_it_to_current_with_name(name_for_filter)
    
    }
    
    
   
        
    apply_custom_filters_from_dropdown(filters) {
        
        this.set_input_values_using_filter(filters);
    
    }
    
 
        
    confirm_filter_name() {

        let filter_name = this.get_name_and_close_boxes();

        // THAT TAKES GLOBAL FILTERS AND ADDS IT TO CUSTOM FILTERS BEFORE IT GOES INTO THE OPTIONS FOR THE DROPDOWN
        const obj = this.append_global_filters_to_options(filter_name);

        if (filter_name == '') {return;}

        // REMOVE FROM DROP DOWN IF THERE IS ALREADY SOMETHING WITH THAT NAME
        if (obj.is_delete) { this.removeOptionFromDropdown(filter_name); }

        // APPEND FILTER TO OPTIONS USING JUST THE NAME AS IT GETS THE VALUE IN THE FUNCTION

        this.append_filter_to_options(filter_name);


        // MAKE THE FILTER THE SELECTED FILTER AFTER IT'S CREATED

        this.make_filter_selection_value_as_saved(filter_name);

        this.remove_all_option_style();

        this.set_background_for_current_option(filter_name)

        const raise_event = new CustomEvent('Save-Filter', {
            detail: { filter_name: filter_name, filters: obj.filters_to_send },  
            bubbles: true,       // Allows the event to bubble up through the DOM
            composed: true        // Allows the event to pass through shadow DOM boundaries
        });

        this.shadowRoot.dispatchEvent(raise_event); 

    }
    
    
    
    

        
    
    set_event_listener_for_sort_click_and_select() {
        
        this.shadowRoot.getElementById('outer-container-div').addEventListener('click', (event) => {
        
            if (event.target.classList.contains('sort_by')) {
            
                if (data_loaded_from_wix) {
                    //this.sort_data_on_click(event);
                }
        
            } else {
        
                this.process_click_message_info_select_and_upgrade(event);
        
            }
        
        });
    }
    


    add_event_listener_for_complete_settled_checkboxes() {

        this.shadowRoot.querySelectorAll('.settled_checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', () => {

                let open_final_profit = false;

                let rowobj = this.getRowObjById(checkbox.getAttribute('data-id'), globalData); 

                rowobj.complete = checkbox.checked;

                if (checkbox.checked) {

                    this.run_confetti(checkbox);

                    if (rowobj.actualprofit == '0.00' || rowobj.actualprofit == '' || rowobj.actualprofit == '0') {
                        open_final_profit = true;
                    }

                }

                let obj_to_send = {...rowobj};
                obj_to_send.date = this.revertDateFormat(obj_to_send.date);

                let message = {
                    row: obj_to_send,
                    checked: checkbox.checked,
                    open_final_profit: open_final_profit,
                };


                const raise_event = new CustomEvent('Checkbox', {
                    detail: message,  
                    bubbles: true,       // Allows the event to bubble up through the DOM
                    composed: true        // Allows the event to pass through shadow DOM boundaries
                });
        
                this.shadowRoot.dispatchEvent(raise_event); 


            });
        });

        // ALSO RAISE EVENT




        // on SUBMIT OF FINAL PROFIT NEED TO RAISE EVENT

        this.shadowRoot.querySelectorAll('.lightbox-submit').forEach(button => {
            button.addEventListener('click', function() {
                const betId = this.getAttribute('data-id');
                const lightbox = this.shadowRoot.querySelector(`#lightbox-${betId}`);
                const overlay = this.shadowRoot.querySelector('#overlay');
                
                lightbox.style.display = 'none';
                overlay.style.display = 'none';
            });
        });



    }
    


    validateDateRange() {

        const startDate = this.shadowRoot.getElementById('date-range-start').value;
        const endDate = this.shadowRoot.getElementById('date-range-end').value;
    
        if (startDate && endDate && startDate > endDate) {
            alert('End date must be after start date.');
            this.shadowRoot.getElementById('date-range-end').value = ''; // Reset end date
        }

        this.updateGlobalFilters('date-range');

    }
    
    add_hover_listener_to_select_boxes_and_calculator() {

        const selectBoxes = this.shadowRoot.querySelectorAll('.select_button, .info_button');

        selectBoxes.forEach(box => {
            
        box.addEventListener('mouseenter', () => {
            const dataId = box.getAttribute('data-id');
            const correspondingTr = this.shadowRoot.querySelectorAll(`tr[data-id="${dataId}"] td`);
            correspondingTr.forEach((td) => {
                td.classList.add('highlight');
            });
          });
      

          box.addEventListener('mouseleave', () => {
            const dataId = box.getAttribute('data-id');
            const correspondingTr = this.shadowRoot.querySelectorAll(`tr[data-id="${dataId}"] td`);
            correspondingTr.forEach((td) => {
                td.classList.remove('highlight');
            });
          });
        });

    }



    run_event_listener_for_checkbox_switch() {

        let doc = this.shadowRoot;

        doc.getElementById('filter-panel-container').style.display = 'none';
        doc.querySelector('.above-columns').style.display = 'none';

        this.shadowRoot.getElementById('toggleSwitch').addEventListener('change', function() {

            if (!this.checked) {
                
                doc.getElementById('filter-panel-container').style.display = 'none';
                doc.querySelector('.above-columns').style.display = 'none';

            } else {

                doc.getElementById('filter-panel-container').style.display = 'flex';
                doc.querySelector('.above-columns').style.display = 'flex';

            }


        });
    }




    add_event_listener_for_sorting() {

        this.shadowRoot.getElementById('date-range').addEventListener('change', () => {

            current_sort = this.shadowRoot.getElementById('date-range').value;
            this.filterData();
    
        });
    
    }




    runSpecificScript() {

        let filtName = 'No Filter'

        this.append_options_for_dropdowns();
        this.create_event_listeners_for_select_containers();
        this.create_text_box_and_time_dropdown_event_listeners();
        this.add_event_listener_for_saved_filters();

        this.set_event_listener_for_sort_click_and_select();

        this.shadowRoot.querySelector('.save-filter-button').addEventListener('click', () => { this.open_text_box_and_confirm() });
        this.shadowRoot.querySelector('.cancel-making-filter').addEventListener('click', () => { this.close_boxes() });
        this.shadowRoot.querySelector('.confirm-filter-name').addEventListener('click', () => { this.confirm_filter_name() });    


        this.run_event_listener_for_checkbox_switch();


        this.add_event_listener_for_sorting();


        this.append_filter_to_options(filtName);
        //this.make_filter_selection_value_as_saved(filtName);
        //this.set_background_for_current_option(filtName) 
        //let filterobj = customFilters[filtName];
            
        //this.apply_custom_filters_from_dropdown(filterobj);
        //this.set_global_filters_as_filters_selected_in_dropdown(filterobj);


    
    }































    















































































    // Method to inject CSS styles into the shadow DOM.

    render() {
        return fetch('https://betterbetgroup.github.io/betterbet_html/profit_tracker/mobile_profit_tracker/z.html')
            .then(response => response.text())
            .then(html => {
                this.shadowRoot.innerHTML = html;
    
                // Ensure elements are fully rendered

            });


    }



    getAbsoluteX(element) {
        let actualLeft = element.offsetLeft;
        let current = element.offsetParent; // Get the nearest positioned ancestor

        while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent; // Move up in the offsetParent chain
        }

        return actualLeft;

    }


    addStyles() {

        return new Promise((resolve, reject) => {

            try {

                const link = document.createElement('link');
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('href', 'https://betterbetgroup.github.io/betterbet_html/profit_tracker/mobile_profit_tracker/styles.css'); 
                
                link.onload = () => { resolve('done'); };

                this.shadowRoot.appendChild(link);

                    const fontAwesomeLink = document.createElement('link');
                    fontAwesomeLink.setAttribute('rel', 'stylesheet');
                    fontAwesomeLink.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
                    
                    this.shadowRoot.appendChild(fontAwesomeLink);



            } catch(error) {
                return reject(error)
            }

        });
    }


    // FUNCTIONS FOR SETTING WIDTH / RESIZING 

    handleResize() {

        const width = (window.innerWidth * 0.98)-10;
        const contentDiv = this.shadowRoot.getElementById('outer-container-div');
        contentDiv.style.width = `${width}px`; // MAKE THE OUTER CONTAINER BE THE WIDTH OF THE WINDOW

        //this.set_font_size(width);

        //this.change_dropdowns_dropdown_width(width);

        //check_if_make_description_text_smaller();  

    }   



    



    set_font_size(width) {

        let header_font_size = '16px';
        let data_font_size = '14px';

        let final_profit_header_width = '68px';
        let expected_profit_header = '135px';
        let ql_pp_data = '68px';
        let date_width = '80px';
        let event_width = '180px';
        let bet_width = '120px';


        let padding_top_sort_columns = '13px';

        let tick_svg_size = '20px';
        let cross_svg_size = '15px';

        let settled_line_font_size = '22px';

        let label_font_size = '12px';


        let filter_style_height = '40px';
        let filter_minus_two = '38px';


        let checkbox_size = '35px;';


        let text_on_top_height = '40px';
        let text_on_top = '16px';
        let delete_filter_font_size = '10px';



        let pagination_padding_top_bottom = '10px';
        let pagination_padding_left_right = '15px';
        let pagination_width = '100px';


        let select_font_size = '14px';
        let select_height = '30px';
        let select_width = '60px';




        if (width < LARGE_FONT_WIDTH) {

            header_font_size = '14px';
            data_font_size = '12px';

            final_profit_header_width = '68px';
            expected_profit_header = '135px';
            ql_pp_data = '68px';

            date_width = '60px';
            event_width = '150px';
            bet_width = '105px';

            padding_top_sort_columns = '11px';

            label_font_size = '10px';

            pagination_padding_top_bottom = '8px';
            pagination_padding_left_right = '10px';
            pagination_width = '85px';


        
        } 

        if (width < MEDIUM_FONT_WIDTH) {

            header_font_size = '12px';
            data_font_size = '10px';

            final_profit_header_width = '55px';
            expected_profit_header = '110px';
            ql_pp_data = '55px';

            date_width = '50px';
            event_width = '140px';
            bet_width = '95px';

            padding_top_sort_columns = '9px';

            tick_svg_size = '15px';
            cross_svg_size = '10px';

            settled_line_font_size = '16px';

            label_font_size = '10px';

            filter_style_height = '35px';
            filter_minus_two = '33px';

            checkbox_size = '25px';

            text_on_top_height = '35px';
            text_on_top = '14px';
            delete_filter_font_size = '8px';


            pagination_padding_top_bottom = '8px';
            pagination_padding_left_right = '5px';
            pagination_width = '75px';


            select_font_size = '12px';
            select_height = '27px';
            select_width = '57px';

 
        } 

        if (width < SMALL_FONT_WIDTH) {

            header_font_size = '10px';
            data_font_size = '8px';

            final_profit_header_width = '50px';
            expected_profit_header = '100px';
            ql_pp_data = '50px';

            date_width = '45px';
            event_width = '110px';
            bet_width = '65px';

            padding_top_sort_columns = '9px';

            tick_svg_size = '15px';
            cross_svg_size = '10px';

            settled_line_font_size = '16px';

            label_font_size = '10px';

            filter_style_height = '35px';
            filter_minus_two = '33px';

            checkbox_size = '20px';

            text_on_top_height = '35px';
            text_on_top = '14px';

            pagination_padding_top_bottom = '5px';
            pagination_padding_left_right = '3px';
            pagination_width = '70px';


            select_font_size = '10px';
            select_height = '23px';
            select_width = '52px';

 
        } 




        var select_boxes = this.shadowRoot.querySelectorAll('.select_button') 
        select_boxes.forEach(function(button) {
            button.style.fontSize = select_font_size;
            button.style.height = select_height
            button.style.width = select_width
        });




        var pagination_buttons = this.shadowRoot.querySelectorAll('#next-page, #prev-page') 
        pagination_buttons.forEach(function(button) {
            button.style.paddingLeft = pagination_padding_left_right;
            button.style.paddingRight = pagination_padding_left_right;
            button.style.paddingTop = pagination_padding_top_bottom;
            button.style.paddingBottom = pagination_padding_top_bottom;
            button.style.width = pagination_width;
        });


        let tooltips = this.shadowRoot.querySelectorAll('[data-tooltip]');
        tooltips.forEach(function(pq) {
            pq.style.setProperty('--tooltip-fontSize', header_font_size);
        });





        var top_texts = this.shadowRoot.querySelectorAll('.save-filter-button, #filters-select, .dropdown-option-filter, .confirm-filter-name, .text-input-filter-name') 
        top_texts.forEach(function(box) {
            box.style.height = text_on_top_height;
            box.style.fontSize = text_on_top;
        });

        var checkboxes_settled = this.shadowRoot.querySelectorAll('.settled_checkbox')
        checkboxes_settled.forEach(function(check) {
            check.style.height = final_profit_header_width;
            check.style.width = final_profit_header_width;
            check.style.backgroundSize = checkbox_size;

        });

        var headers = this.shadowRoot.querySelectorAll('th, .text-input, .custom-select-trigger input, .date-range-input, .dropdown-options label');
        headers.forEach(function(header) {
            header.style.fontSize = header_font_size;
        });



        var headers = this.shadowRoot.querySelectorAll('#date_and_time_header, #expected_profit_header, #final_profit_header');
        headers.forEach(function(header) {
            header.style.paddingTop = padding_top_sort_columns;
        });



        this.shadowRoot.querySelector('#pagination-info').style.fontSize = data_font_size;
        this.shadowRoot.querySelector('#prev-page').style.fontSize = data_font_size;
        this.shadowRoot.querySelector('#next-page').style.fontSize = data_font_size;


        var cells = this.shadowRoot.querySelectorAll('td');
        cells.forEach(function(cell) {
            cell.style.fontSize = data_font_size;
        });

        var profit_qual = this.shadowRoot.querySelectorAll('.positive_profit_data, .negative_profit_data');
        profit_qual.forEach(function(pq) {
            pq.style.fontSize = data_font_size;
        });



        var delete_filters = this.shadowRoot.querySelectorAll('.filter-delete-button, .confirm-delete-button');
        delete_filters.forEach(function(pq) {
            pq.style.fontSize = delete_filter_font_size;
        });

       



        // row heights are done by changing these .settled_checkbox, .expected_profit_data, 
        
        // and these heights AND LINE HEIGHTS .negative_profit_data, .positive_profit_data, 

        let to_change_row_heights = this.shadowRoot.querySelectorAll('.negative_profit_data, .positive_profit_data, .expected_profit_data')
        to_change_row_heights.forEach(function(pq) {
            pq.style.height = final_profit_header_width;
            pq.style.lineHeight = final_profit_header_width;
        });


        let labels = this.shadowRoot.querySelectorAll('.filter-label')
        labels.forEach(function(pq) {
            pq.style.fontSize = label_font_size;
        });




        let filters = this.shadowRoot.querySelectorAll('.custom-select-container, custom-input-container, #min-actual-profit, #min-qualifying-loss, #min-potential-profit, #max-actual-profit, text-input, .date-range-input ')
        filters.forEach(function(pq) {
            pq.style.height = filter_style_height;
        });   


        filters = this.shadowRoot.querySelectorAll('.text-input-container')
        filters.forEach(function(pq) {
            pq.style.setProperty('--filter-height', filter_minus_two);
        });   


    }



    change_dropdowns_dropdown_width(width) {

        const dropdowns = this.shadowRoot.querySelectorAll('.dropdown-options');
        let dropdown_width = '100%'
        
            if (width < 1050) {
                dropdown_width = '120%'
            }

        dropdowns.forEach(dropdown => {
            dropdown.style.width = dropdown_width;
        });
    }


    loadConfettiScript() {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1";
        script.onload = () => {
            // You can now safely use confetti functions here if needed
        };
        script.onerror = () => {
            console.error('Failed to load the confetti script');
        };
        this.shadowRoot.appendChild(script); // Append the script to the shadow DOM
    }



    cleanAndValidateNumber(input) {

        try {

        let cleanedInput = input.replace(/£/g, '');
    
        // Check if the remaining is a valid number (could start with + or -)
        if (/^[+-]?\d+(\.\d+)?$/.test(cleanedInput)) {
            return parseFloat(cleanedInput).toFixed(2); // Keep as string for display
        } else {
            return '0';
        }

        } catch {
            return '0';
        } 
    }
    
    
    get_profit_data_formatted(row) {
    
        let actual_profit_class = 'actualprofit_div_mobile_posotive'
        let qualifying_loss = 0;
        let potential_profit = 0;
        let actualprofit = 0;
    
        
        if (row.qloss.toString().includes('-')) {
            qualifying_loss = row.qloss.replace('-', '-£');
        } else {
            qualifying_loss = '£' + (row.qloss).toString();
        }
    
        if (qualifying_loss == '£0.00' || qualifying_loss == '£' || qualifying_loss == '£0') {
            qualifying_loss = '£0.00'
        }
    
        if (row.potentialprofit.toString().includes('-')) {
            potential_profit = row.potentialprofit.replace('-', '-£');
        } else {
            potential_profit = '£' + (row.potentialprofit).toString();
        }
        if (potential_profit == '£0.00' || potential_profit == '£' || potential_profit == '£0') {
            potential_profit = '£0.00'
        }
    
        if (row.actualprofit.toString().includes('-')) {
            actual_profit_class = 'actualprofit_div_mobile_negative';
            actualprofit = row.actualprofit.replace('-', '-£');
        } else {
            actualprofit = '£' + (row.actualprofit).toString();
        }
        if (actualprofit == '£0.00' || actualprofit == '£' || actualprofit == '£0') {
            actualprofit = '£0.00'
        }
    
        return {
            actual_profit_class: actual_profit_class,
            qualifying_loss: qualifying_loss,
            potential_profit: potential_profit,
            actualprofit: actualprofit,
        }
    
    }

    run_confetti(checkbox) {

        const rect = checkbox.getBoundingClientRect();
                
        const originX = (rect.left + rect.right) / 2 / window.innerWidth;
        const originY = (rect.top + rect.bottom) / 2 / window.innerHeight;

        confetti({
            particleCount: 100,
            spread: 70,
            origin: {
                x: originX,
                y: originY
            } 
        });
    }







}

customElements.define('profit-tracker', ProfitTracker);




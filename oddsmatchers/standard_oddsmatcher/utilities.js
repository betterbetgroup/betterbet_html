

let globalFilters = {
    sports: [],
    markets: [],
    bookmakers: [],
    exchanges: [],
    startTime: '',
    minLiquidity: null,
    minBackOdds: null,
    maxBackOdds: null,
    minRating: null,
    maxRating: null,
    minQualifyingLoss: null,
    minPotentialProfit: null,
};



const marketsList = ['Match Odds', 'Winner', 'BTTS', 'Over/Under'];



    let SHOW_DATE_AND_TIME = true;
    let SHOW_SPORT = true;
    let SHOW_RATING = true;
    let SHOW_INFO = true;

    let MAKE_ODDS_AND_BOOKMAKER_SMALL = false;



    const MIN_WIDTH_FOR_DATE_AND_TIME = 1200;
    const MIN_WIDTH_FOR_SPORT = 1300;
    const MIN_WIDTH_FOR_RATING = 1150;
    const MIN_WIDTH_FOR_INFO = 1000;

    const CHANGE_SIZE_OF_LAY_ODDS_AND_BACK_ODDS = 1250;



    let is_premium_member = true;



    let globalData = [];
    let filteredData = [];

    let currentPage = 1;
    const rowsPerPage = 10;


    let sort_rating = 'ascending';
    let sort_qualifying_loss = 'descending';
    let sort_potential_profit = 'ascending';
    let sort_date_and_time = 'ascending';


    let current_sort = 'qualifying loss';






    const sportIconUrls = {
        "Football": "https://img.icons8.com/?size=100&id=65497&format=png&color=000000",
        "Horse Racing": "https://img.icons8.com/?size=100&id=LuhFumPGCq9L&format=png&color=000000"
    };

    const bookmakerImages = {
        "Bet365": 'https://static.wixstatic.com/media/7a0e3a_74b1758549414a87aef5c7d5d4a2c619~mv2.png',
        "Betfred": 'https://static.wixstatic.com/media/7a0e3a_7f5a1de40338499f862587a987744fde~mv2.png',
        "Virgin Bet": 'https://static.wixstatic.com/media/7a0e3a_d7313dc914d245acb174e5958627ce8e~mv2.png', 
        "Livescore": 'https://static.wixstatic.com/media/7a0e3a_a3167bbd323a4656afc84718bbf88380~mv2.png',
        "888Sport": 'https://static.wixstatic.com/media/7a0e3a_39af396146c84a38a96e953f938290ef~mv2.png',
        "Paddy Power": 'https://static.wixstatic.com/media/7a0e3a_fcbb73ffbfa6454b8506f7a6e7e25c67~mv2.png',
        "Skybet": 'https://static.wixstatic.com/media/7a0e3a_3b25d869c20042f38fc666d42118cedb~mv2.png',
        "Betway": 'https://static.wixstatic.com/media/7a0e3a_2e3ef618674d4c94a2850b097873d5bb~mv2.png',
        "William Hill": 'https://static.wixstatic.com/media/7a0e3a_0269c527e1ab4ea9be81154957f4c824~mv2.png',

    };

    const exchangeImages = {
        "Betfair Exchange": 'https://static.wixstatic.com/media/7a0e3a_42e9ff11344a49fea33b58dcda917542~mv2.png',
        "Smarkets": "https://static.wixstatic.com/media/7a0e3a_64979ac474b340868914fbf484d4ee89~mv2.png",
        "Matchbook": "https://static.wixstatic.com/media/7a0e3a_c44a32e46bc34b6da0c9665311ed48b1~mv2.png"
    };






let customFilters = {

'Qualifying Bet':

        {
            "sports": Object.keys(sportIconUrls),
            "markets": marketsList,
            "bookmakers": Object.keys(bookmakerImages),
            "exchanges": Object.keys(exchangeImages),
            "startTime": "today-tomorrow",
            "minLiquidity": "null",
            "minBackOdds": "null",
            "maxBackOdds": "null",
            "minRating": "null",
            "maxRating": "null",
            "minQualifyingLoss": "null",
            "minPotentialProfit": "null"
        }

}



function get_sport_icon_url(sport) {
    if (sportIconUrls[sport]) {
        return sportIconUrls[sport];
    } else {
        console.log("No icon URL found for sport:", sport);
        return null; // Or a default URL if you prefer
    }
}

function get_bookmaker_image(bookmaker) {
    if (bookmakerImages[bookmaker]) {
        return bookmakerImages[bookmaker];
    } else {
        console.log("No image found for bookmaker:", bookmaker);
        return null; // Or a default URL if you prefer
    }
}

function get_exchange_image(exchange) {
    if (exchangeImages[exchange]) {
        return exchangeImages[exchange];
    } else {
        console.log("No image found for exchange:", exchange);
        return null; // Or a default URL if you prefer
    }
}


function sort_rows_by_rating(rows, method) {
	return rows.sort((a, b) => {
            // Remove the '%' and convert to float for comparison
            const ratingA = parseFloat(a.rating.replace('%', ''));
            const ratingB = parseFloat(b.rating.replace('%', ''));

            if (method == 'descending') {
                return ratingB - ratingA;  // Sort in descending order
            } else {
                return ratingA - ratingB;
            }
        });
}




const filter_panel_container = document.querySelector('#filter-panel-container');
    
const box_for_covering_filters_ = document.querySelector('#covering_filters')
box_for_covering_filters_.style.width = filter_panel_container.offsetWidth + 'px';
box_for_covering_filters_.style.height = filter_panel_container.offsetHeight + 'px';

let rect_start = filter_panel_container.getBoundingClientRect();
box_for_covering_filters_.style.left = rect_start.left + 'px';



if (is_premium_member) {

    box_for_covering_filters_.style.display = 'none';

}




function sort_rows_by_qualifying_loss(rows, method) {
	return rows.sort((a, b) => {

            const ratingA = parseFloat(a.qualifying_loss.replace('£', '').replace('+', ''));
            const ratingB = parseFloat(b.qualifying_loss.replace('£', '').replace('+', ''));

            if (method == 'descending') {
                return ratingB - ratingA;  // Sort in descending order
            } else {
                return ratingA - ratingB;
            }
        });
}


function sort_rows_by_potential_profit(rows, method) {
	return rows.sort((a, b) => {

            const ratingA = parseFloat(a.potential_profit.replace('£', '').replace('+', ''));
            const ratingB = parseFloat(b.potential_profit.replace('£', '').replace('+', ''));

            if (method == 'descending') {
                return ratingB - ratingA;  // Sort in descending order
            } else {
                return ratingA - ratingB;
            }
        });
}

function sort_rows_by_date_and_time(rows, method) {
    return rows.sort((a, b) => {

        const dateA = parseDateAndTime(a.date_and_time);
        const dateB = parseDateAndTime(b.date_and_time);

        if (method === 'descending') {
            return dateB - dateA;  // Sort in descending order
        } else {
            return dateA - dateB;
        }
    });
}





function parseDateAndTime(dateString) {
    const [date, time] = dateString.split(' ');
    const [day, month, year] = date.split('/');
    const [hour, minute] = time.split(':');

    // Adjust year format and create a Date object
    const fullYear = parseInt(year, 10) + 2000; // Adjust based on your specific needs
    return new Date(fullYear, parseInt(month, 10) - 1, parseInt(day, 10), parseInt(hour, 10), parseInt(minute, 10));
}

function parseDateAndTime_filterData(dateString) {
    const [date, time] = dateString.split(' ');
    const [day, month, year] = date.split('/');
    const [hour, minute] = time.split(':');
    return new Date(`20${year}`, month - 1, day, hour, minute);
}


function removeNonQualifyingBetOptions() {

    const filtersDropdown = document.getElementById('filters-dropdown-select-container');

    const options = Array.from(document.querySelectorAll('.dropdown-option-filter'));


    options.forEach(option => {
        if (option.dataset.value !== 'Qualifying Bet') {
            option.remove();
        }
    });

}





function displayRows(page, rows) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = rows.slice(start, end);

    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = '';
    appendRows(paginatedItems);

    document.getElementById('pagination-info').textContent = `Page ${page} of ${totalPages}`;
}



function setupPagination() {


    let rows_to_send = filteredData;

    totalPages = Math.ceil(filteredData.length / rowsPerPage); // Recalculate total pages


    if (!is_premium_member) {

        rows_to_send = rows_to_send.slice(0, 3);
        totalPages = 1;

    }

    displayRows(currentPage, rows_to_send); // Display the current page

    document.getElementById('prev-page').onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            displayRows(currentPage, rows_to_send);
        }
    };

    document.getElementById('next-page').onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayRows(currentPage, rows_to_send);
        }
    };
}



function getRowObjById(rowId) {
    // Assuming globalData is accessible globally
    return globalData.find(item => item._id === rowId);
}


function process_click_message_info_select_and_upgrade(event) {

    const rowId = event.target.getAttribute('data-id');

    if (event.target.className === 'select_button') {

        // CHANGE THIS TO GET THE FULL ROW INFO FROM GLOBAL_DATA USING THE ROW ID AND SENDING THAT OBJ TO WIX

        let rowobj = getRowObjById(rowId); // Fetch the row data based on rowId

        let message = {

            type: 'Select Event',
            row: rowobj

        };

        window.parent.postMessage( message , '*');

    }
    if (event.target.className === 'more_info_image') {


    // CHANGE THIS TO GET THE FULL ROW INFO FROM GLOBAL_DATA USING THE ROW ID AND SENDING THAT OBJ TO WIX

    let rowobj = getRowObjById(rowId); // Fetch the row data based on rowId

        let message = {

            type: 'More Info',
            row: rowobj

        };

        window.parent.postMessage( message , '*');

    }
    if (event.target.className === 'upgrade-button' || event.target.className === 'padlock-image-button') {

        window.parent.postMessage({ type: 'Upgrade'}, '*');

    }

}



function check_row_info_in_append_rows() {

    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = ''; 

    const buttonContainer = document.getElementById('button-container');
    buttonContainer.innerHTML = ''; 

    const infoContainer = document.getElementById('info-container');
    infoContainer.innerHTML = '';

    if (!SHOW_DATE_AND_TIME) {
        document.getElementById('date_and_time_header').style.display = 'none';
    }


    if (!SHOW_SPORT) {
        document.getElementById('sport_header').style.display = 'none';
    }


    if (!SHOW_RATING) {
        document.getElementById('rating_header').style.display = 'none';
    }


    if (!SHOW_INFO) {
        document.getElementById('info-container').style.display = 'none';
    }


}




function create_row(row) {
    let sport_icon_url = get_sport_icon_url(row.sport)
    let bookmaker_image = get_bookmaker_image(row.bookmaker)
    let exchange_image = get_exchange_image(row.exchange)

    let qualifying_loss_class = 'positive_profit_data'
    let potential_profit_class = 'positive_profit_data'

    let qualifying_loss = 0;
    let potential_profit = 0;

    if (row.qualifying_loss.toString().includes('-')) {
        qualifying_loss_class = 'negative_profit_data';
        qualifying_loss = row.qualifying_loss;
    } else {
        qualifying_loss = '+' + (row.qualifying_loss).toString();
    }

    if (qualifying_loss == '+0.00') {
        qualifying_loss = '£0.00'
    }

    if (row.potential_profit.toString().includes('-')) {
        potential_profit_class = 'negative_profit_data';
        potential_profit = row.potential_profit;
    } else {
        potential_profit = '+' + (row.potential_profit).toString();
    }
    if (potential_profit == '+0.00') {
        potential_profit = '£0.00'
    }

    const tr = document.createElement('tr');

    tr.innerHTML = `
        ${SHOW_DATE_AND_TIME ? `<td id="date_time_${row._id}">${row.date_and_time}</td>` : ''}
        ${SHOW_SPORT ? `<td id="sport_${row._id}"><img src="${sport_icon_url}" alt="${row.sport}" style="width: 30px; height: 30px;"></td>` : ''}
        <td id="fixture_${row._id}">${row.fixture}</td>
        <td id="outcome_${row._id}">${row.outcome}</td>

        <td id="back_odds_data_${row._id}" class="no_padding_margin">
            <div class="odds_and_bookmaker">
                <div id="back_odds_value_${row._id}" class="back_odds_value">
                    <a href="${row.bookmaker_link}" target="_blank" class="odds-link">${row.back_odds}</a>
                </div>    
                <div class="at_symbol">@</div>
                <div id="bookmaker_logo_${row._id}" class="bookmaker_logo_div">
                    <a class="div_around_logo" href="${row.bookmaker_link}" target="_blank" >
                        <img class='bookmaker_logo_img' src="${bookmaker_image}" alt="${row.sport} ${row.bookmaker}">
                    </a>
                </div>
            </div>                
        </td>
        <td id="lay_odds_data_${row._id}" class="no_padding_margin">
            <div class="odds_and_bookmaker">
                <div id="lay_odds_value_${row._id}" class="lay_odds_value">
                    <a href="${row.exchange_link}" target="_blank" class="odds-link">${row.lay_odds}</a>
                </div>
                <div class="at_symbol">@</div>
                <div id="exchange_logo_${row._id}" class="exchange_logo_div">
                    <a class="div_around_logo" href="${row.exchange_link}" target="_blank" >
                        <img class='exchange_logo_img' src="${exchange_image}" alt="${row.sport} ${row.exchange}" >
                    </a>
                </div>
            </div>                
        </td>
        <td class="no_padding_margin">
            <div class="expected_profit_data">
                <div id='qualifying_loss_${row._id}' class='${qualifying_loss_class}'>${qualifying_loss}</div>
                <div id='potential_profit_${row._id}' class='${potential_profit_class}'>${potential_profit}</div>
            </div>
        </td>
        ${SHOW_RATING ? `<td id="rating_${row._id}">
            ${row.rating}
        </td>` : ''}
    `;




    const tableBody = document.querySelector('table tbody');
    const buttonContainer = document.getElementById('button-container');
    const infoContainer = document.getElementById('info-container');


    tableBody.appendChild(tr);


    let selectButton = document.createElement('button');
    selectButton.innerHTML = 'Select';
    selectButton.className = 'select_button';
    selectButton.setAttribute('data-id', row._id);



    buttonContainer.appendChild(selectButton);

    selectButton.style.display = 'none';



    let infoButton = document.createElement('button');
    infoButton.innerHTML = 
            `   
            <div id="info_image_${row._id}" data-tooltip="More info" style="background: None; height:35px; width:35px; padding:0; margin: 0; display: flex;">
                <img class="more_info_image" data-id="${row._id}" id="more_info_button" src="https://img.icons8.com/?size=100&id=xxQh3SPI3ID7&format=png&color=000000" alt="Info">
            </div>
            `

    
    infoButton.className = 'info_button';


    infoContainer.appendChild(infoButton);

    infoButton.style.display = 'none';


    setTimeout(() => {

        infoButton.style.display = 'block'

        selectButton.style.display = 'block'

        const row_height = getComputedStyle(tr).height.replace('px', '');

        const select_button_height = 35;
        const margin_top_for_select_button_on_row = (row_height - select_button_height) / 2;  

        const info_button_height = 35;
        const margin_top_for_info_button_on_row = (row_height - info_button_height) / 2;
                
            

        const trRect = tr.getBoundingClientRect();
        const selectRect = selectButton.getBoundingClientRect();
        const infoRect = infoButton.getBoundingClientRect();


        selectButton.style.marginTop = `${trRect.top - selectRect.top + margin_top_for_select_button_on_row}px`;
        infoButton.style.marginTop = `${trRect.top - infoRect.top + margin_top_for_info_button_on_row}px`;

        setTimeout(() => {
            selectButton.style.transition = 'all 0.3s ease';
            document.querySelector(`[data-id="${row._id}"]`).style.transition = 'all 0.3s ease';
        }, 100);

                
    }, 100);


}



function add_lock_if_premium() {

    if (!is_premium_member) {
        const placeholderRow = document.createElement('tr');
        placeholderRow.innerHTML = `

            <td colspan="100%" class="not_premium_member_row" >
                <div class="outer_div_upgrade" > 


                        <div class="outer_div_upgrade_text_row" > 

                            You Can Currently Only Access 3 Fixtures. Upgrade Below to Unlock the Full Oddsmatchers.

                            <a class="upgrade-button">Upgrade to Premium <img src="https://img.icons8.com/?size=100&id=60654&format=png&color=ffffff" class="padlock-image-button" alt="Padlock" > </a>

                        </div>

                </div>

                
            </td>

        `;

        const tableBody = document.querySelector('table tbody');
        tableBody.append(placeholderRow);

        
    }


}






function make_odds_and_platform_small_if_screen_small() {



    if (MAKE_ODDS_AND_BOOKMAKER_SMALL) {

        // CHANGE THE SIZING OF THE BOOKMAKER AND ODDS DATA BITS IF ITS BELOW 1300, SHOULD ALSO BRING DOWN OTHER ONES TOO

        // USE JAVASCRIPT VERY EASY

        const divAroundLogo = document.querySelectorAll('.div_around_logo');
        divAroundLogo.forEach(element => {
            element.style.width = '130px';
        });

        // Change style for elements with classes 'back_odds_value' and 'lay_odds_value'
        const oddsValues = document.querySelectorAll('.back_odds_value, .lay_odds_value');
        oddsValues.forEach(element => {
            element.style.marginLeft = '10px';
            element.style.fontSize = '14px';
            element.style.width = '45px';
            element.style.height = '25px';
            element.style.lineHeight = '25px';
        });

        // Change style for the element with class 'at_symbol'
        const atSymbol = document.querySelectorAll('.at_symbol');
        atSymbol.forEach(element => {
            element.style.fontSize = '14px';
            element.style.marginRight = '10px';
            element.style.marginLeft = '10px';
        });

        // Change style for elements with classes 'bookmaker_logo_div' and 'exchange_logo_div'
        const logoDivs = document.querySelectorAll('.bookmaker_logo_div, .exchange_logo_div');
        logoDivs.forEach(element => {
            element.style.marginRight = '10px';
        });


    }


}




function get_sort_type_using_current_sort() {

    if (current_sort == 'rating') {
        return sort_rating;
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





function sort_data_on_click(event) {

    var sortValue = event.target.getAttribute('data-sort');

    current_sort = sortValue;

    if (sortValue == 'rating') {

        filterData();

        if (sort_rating == 'ascending') {
            sort_rating = 'descending'
        } else {
            sort_rating = 'ascending'
        }
    }

    if (sortValue == 'potential profit') {

        filterData();

        if (sort_potential_profit == 'ascending') {
            sort_potential_profit = 'descending'
        } else {
            sort_potential_profit = 'ascending'
        }
    }


    if (sortValue == 'qualifying loss') {

        filterData();

        if (sort_qualifying_loss == 'ascending') {
            sort_qualifying_loss = 'descending'
        } else {
            sort_qualifying_loss = 'ascending'
        }
    }   


    if (sortValue == 'date and time') {

        filterData();

        if (sort_date_and_time == 'ascending') {
            sort_date_and_time = 'descending'
        } else {
            sort_date_and_time = 'ascending'
        }
    }   


}





function set_global_filters_as_filters_selected_in_dropdown(filters) {


    if (!filters) {
        console.log("(No Selected Filter)s provided for updating.");
        return;
    }

    // Update each key in globalFilters with the new values from filters
    globalFilters.sports = filters.sports || [];
    globalFilters.markets = filters.markets || [];
    globalFilters.bookmakers = filters.bookmakers || [];
    globalFilters.exchanges = filters.exchanges || [];
    globalFilters.startTime = filters.startTime || '';

    // Handle potential "null" strings and convert them back to null
    globalFilters.minLiquidity = filters.minLiquidity !== "null" ? parseFloat(filters.minLiquidity) : null;
    globalFilters.minBackOdds = filters.minBackOdds !== "null" ? parseFloat(filters.minBackOdds) : null;
    globalFilters.maxBackOdds = filters.maxBackOdds !== "null" ? parseFloat(filters.maxBackOdds) : null;
    globalFilters.minRating = filters.minRating !== "null" ? parseFloat(filters.minRating) : null;
    globalFilters.maxRating = filters.maxRating !== "null" ? parseFloat(filters.maxRating) : null;
    globalFilters.minQualifyingLoss = filters.minQualifyingLoss !== "null" ? parseFloat(filters.minQualifyingLoss) : null;
    globalFilters.minPotentialProfit = filters.minPotentialProfit !== "null" ? parseFloat(filters.minPotentialProfit) : null;


}



function set_input_values_using_filter(filters) {


    function manageDropdownCheckboxes(dropdownId, selectedItems, selectAllText) {
        const dropdown = document.getElementById(dropdownId);
        const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]:not(.select-all)');
        const selectAllCheckbox = dropdown.querySelector('.select-all');

        // Check all boxes if the list is empty
        if (selectedItems.length === 0) {
            checkboxes.forEach(checkbox => {
                checkbox.checked = true;
            });
            selectAllCheckbox.checked = true; // Ensure the select-all box is checked
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
    manageDropdownCheckboxes('sports-dropdown-options', filters.sports, 'Select All Sports');
    manageDropdownCheckboxes('markets-dropdown-options', filters.markets, 'Select All Markets');
    manageDropdownCheckboxes('exchanges-dropdown-options', filters.exchanges, 'Select All Exchanges');


    const startTimeSelect = document.getElementById('date-range');
    startTimeSelect.value = filters.startTime || '';


    function setInputValue(id, value) {
        const input = document.getElementById(id);
        input.value = value === 'null' ? '' : value;
    }

    setInputValue('min-liquidity', filters.minLiquidity);
    setInputValue('min-back-odds', filters.minBackOdds);
    setInputValue('max-back-odds', filters.maxBackOdds);
    setInputValue('min-rating', filters.minRating);
    setInputValue('max-rating', filters.maxRating);
    setInputValue('min-qualifying-loss', filters.minQualifyingLoss);
    setInputValue('min-potential-profit', filters.minPotentialProfit);




}



function function_that_takes_global_filters_and_appends_it_to_current_with_name(name_for_filter) {

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
        "sports": globalFilters.sports.slice(), // Create a shallow copy of the array
        "markets": globalFilters.markets.slice(), // Shallow copy
        "bookmakers": globalFilters.bookmakers.slice(), // Shallow copy
        "exchanges": globalFilters.exchanges.slice(), // Shallow copy
        "startTime": globalFilters.startTime || "", // Default to "null" if undefined or empty
        "minLiquidity": globalFilters.minLiquidity || "null",
        "minBackOdds": globalFilters.minBackOdds || "null",
        "maxBackOdds": globalFilters.maxBackOdds || "null",
        "minRating": globalFilters.minRating || "null",
        "maxRating": globalFilters.maxRating || "null",
        "minQualifyingLoss": globalFilters.minQualifyingLoss || "null",
        "minPotentialProfit": globalFilters.minPotentialProfit || "null"
    };

    return {

        filters_to_send: customFilters[name_for_filter],
        is_delete: is_delete_option

    }

}







function function_using_global_data_and_global_filters_to_make_filtered_data() {

    const now = new Date(); 

    filteredData = globalData.filter(row => {



        const sportMatch = globalFilters.sports.includes(row.sport);
        const marketMatch = globalFilters.markets.includes(row.market_type);
        const bookmakerMatch = globalFilters.bookmakers.includes(row.bookmaker);
        const exchangeMatch = globalFilters.exchanges.includes(row.exchange);
        const liquidityMatch = globalFilters.minLiquidity === null || parseFloat(row.lay_liquidity) >= globalFilters.minLiquidity;
        const backOddsMatch = (globalFilters.minBackOdds === null || parseFloat(row.back_odds) >= globalFilters.minBackOdds) &&
                              (globalFilters.maxBackOdds === null || parseFloat(row.back_odds) <= globalFilters.maxBackOdds);
        const ratingMatch = (globalFilters.minRating === null || parseFloat(row.rating.replace('%', '')) >= globalFilters.minRating) &&
                            (globalFilters.maxRating === null || parseFloat(row.rating.replace('%', '')) <= globalFilters.maxRating);
        const qualifyingLossMatch = globalFilters.minQualifyingLoss === null || parseFloat(row.qualifying_loss.replace('£', '')) >= globalFilters.minQualifyingLoss;
        const potentialProfitMatch = globalFilters.minPotentialProfit === null || parseFloat(row.potential_profit.replace('£', '')) >= globalFilters.minPotentialProfit;

        // Parse row date and time
        const rowDateTime = parseDateAndTime_filterData(row.date_and_time);
        let timeMatch = true; // Default to true if (No Selected Filter) is set


        if (globalFilters.startTime) {
            switch (globalFilters.startTime) {
                case '1h':
                    timeMatch = rowDateTime >= now && rowDateTime <= new Date(now.getTime() + 1 * 60 * 60 * 1000);
                    break;
                case '12h':
                    timeMatch = rowDateTime >= now && rowDateTime <= new Date(now.getTime() + 12 * 60 * 60 * 1000);
                    break;
                case '24h':
                    timeMatch = rowDateTime >= now && rowDateTime <= new Date(now.getTime() + 24 * 60 * 60 * 1000);
                    break;
                case 'today':
                    timeMatch = rowDateTime >= now && now.toDateString() === rowDateTime.toDateString();
                    break;
                case 'tomorrow':
                    timeMatch = rowDateTime >= now && new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString() === rowDateTime.toDateString();
                    break;
                case 'today-tomorrow':
                    timeMatch = rowDateTime >= now && (now.toDateString() === rowDateTime.toDateString() ||
                                new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString() === rowDateTime.toDateString());
                    break;
                case '3days':
                    timeMatch = rowDateTime >= now && rowDateTime <= new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
                    break;
                case '5days':
                    timeMatch = rowDateTime >= now && rowDateTime <= new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
                    break;
                case 'week':
                    timeMatch = rowDateTime >= now && rowDateTime <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                    break;
                default:
                    timeMatch = true;
            }
        }

        return sportMatch && marketMatch && bookmakerMatch && exchangeMatch && liquidityMatch && backOddsMatch && ratingMatch && qualifyingLossMatch && potentialProfitMatch && timeMatch;
    });


}








function make_width_changes_based_on_wix_site_width(newWidth) {


    if (newWidth < MIN_WIDTH_FOR_DATE_AND_TIME) {
        SHOW_DATE_AND_TIME = false;
    } else {
        SHOW_DATE_AND_TIME = true;
    }
    if (newWidth < MIN_WIDTH_FOR_SPORT) {
        SHOW_SPORT = false;
    } else {
        SHOW_SPORT = true;
    }
    if (newWidth < MIN_WIDTH_FOR_RATING) {
        SHOW_RATING = false;
    } else {
        SHOW_RATING = true;
    }
    if (newWidth < MIN_WIDTH_FOR_INFO) {
        SHOW_INFO = false;
    } else {
        SHOW_INFO = true;
    }


    if (newWidth < CHANGE_SIZE_OF_LAY_ODDS_AND_BACK_ODDS) {

        // CHANGE THE SIZING OF THE BOOKMAKER AND ODDS DATA BITS IF ITS BELOW 1300, SHOULD ALSO BRING DOWN OTHER ONES TOO

        // USE JAVASCRIPT VERY EASY

        MAKE_ODDS_AND_BOOKMAKER_SMALL = true;

    }

    const contentDiv = document.getElementById('outer-container-div');
    contentDiv.style.width = `${newWidth}px`;
    contentDiv.style.maxWidth = '100%';

    const filter_panel_container_ = document.querySelector('#filter-panel-container');
    
    const box_for_covering_filters = document.querySelector('#covering_filters')
    box_for_covering_filters.style.width = filter_panel_container_.offsetWidth + 'px';
    box_for_covering_filters.style.height = filter_panel_container_.offsetHeight + 'px';

    let rect_after_change = filter_panel_container.getBoundingClientRect();
    box_for_covering_filters_.style.left = rect_after_change.left + 'px';


    if (is_premium_member) {
        box_for_covering_filters.style.display = 'none';
    } else {
        box_for_covering_filters.style.display = 'flex';
    }

    

    const dropdowns = document.querySelectorAll('.dropdown-options');


    if (newWidth < 1100) {

        dropdowns.forEach(dropdown => {
            dropdown.style.width = '140%';
        });
    }


}


function curve_corners_of_filter_dropdown() {

    let dropdown = document.querySelector('#filters-dropdown-select-container')

    dropdown.style.borderRadius = '10px';
}


function closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown-options');
    dropdowns.forEach(dropdown => {
        dropdown.style.display = 'none';
    });

    let dropdown_corners = document.querySelectorAll('.custom-select-container');

    dropdown_corners.forEach((dropdown) => {

        dropdown.style.borderRadius = '5px';

    });


    // ALSO CLOSE FILTER DROPDOWN
    document.querySelector('#filters-dropdown-options').style.display = 'none';

    curve_corners_of_filter_dropdown();

}


function append_options_for_the_four_filter_dropdowns(containerId, optionsList) {
    const container = document.querySelector(containerId);
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







function getCheckedOptions(containerId) {
    const container = document.querySelector(containerId);
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











function go_to_input_and_update_global_for_the_input(filterId) {

    switch (filterId) {

        case 'sports-dropdown-select-container':
            globalFilters.sports = getCheckedOptions('#sports-dropdown-options');
            break;
        case 'markets-dropdown-select-container':
            globalFilters.markets = getCheckedOptions('#markets-dropdown-options');
            break;
        case 'bookmakers-dropdown-select-container':
            globalFilters.bookmakers = getCheckedOptions('#bookmakers-dropdown-options');
            break;
        case 'exchanges-dropdown-select-container':
            globalFilters.exchanges = getCheckedOptions('#exchanges-dropdown-options');
            break;


        case 'min-liquidity':
            globalFilters.minLiquidity = parseFloat(document.getElementById('min-liquidity').value) || null;
            break;
        case 'min-back-odds':
            globalFilters.minBackOdds = parseFloat(document.getElementById('min-back-odds').value) || null;
            break;
        case 'max-back-odds':
            globalFilters.maxBackOdds = parseFloat(document.getElementById('max-back-odds').value) || null;
            break;
        case 'min-rating':
            globalFilters.minRating = parseFloat(document.getElementById('min-rating').value) || null;
            break;
        case 'max-rating':
            globalFilters.maxRating = parseFloat(document.getElementById('max-rating').value) || null;
            break;
        case 'min-qualifying-loss':
            let ql = parseFloat(document.getElementById('min-qualifying-loss').value);
            globalFilters.minQualifyingLoss = isNaN(ql) ? null : ql;
            break;
        case 'min-potential-profit':
            let pp = parseFloat(document.getElementById('min-potential-profit').value);
            globalFilters.minPotentialProfit = isNaN(pp) ? null : pp;
            break;
        case 'date-range':
            globalFilters.startTime = document.getElementById('date-range').value;
            break;
    }


}




function removeOptionFromDropdown(name_for_filter) {
    
    const filtersDropdown = document.getElementById('filters-dropdown-select-container');

    console.log('removing specific option')
    
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







function open_text_box_and_confirm() {

    document.querySelector('.filter-dropdown-name-div').style.display = 'flex';
    document.querySelector('.confirm-filter-name').style.display = 'block';
    document.querySelector('.cancel-making-filter').style.display = 'flex';


    document.querySelector('.div-outside-filter-dropdown').style.display = 'none';
    document.querySelector('.save-filter-button').style.display = 'none';
    document.querySelector('.get-alerts-button').style.display = 'none';

}

function close_boxes() {

    let filter_name_label = document.querySelector('#type-filter-name');
    filter_name_label.textContent = 'Filter Name';

    document.querySelector('#get-filter-name').value = '';

    document.querySelector('.filter-dropdown-name-div').style.display = 'none';
    document.querySelector('.confirm-filter-name').style.display = 'none';
    document.querySelector('.cancel-making-filter').style.display = 'none';


    document.querySelector('.div-outside-filter-dropdown').style.display = 'flex';
    document.querySelector('.save-filter-button').style.display = 'block';
    document.querySelector('.get-alerts-button').style.display = 'flex';
}


function get_name_and_close_boxes() {

    let filter_name_label = document.querySelector('#type-filter-name');

    let filter_name = document.querySelector('#get-filter-name').value;

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

    document.querySelector('#get-filter-name').value = '';

    document.querySelector('.filter-dropdown-name-div').style.display = 'none';
    document.querySelector('.confirm-filter-name').style.display = 'none';
    document.querySelector('.cancel-making-filter').style.display = 'none';


    document.querySelector('.div-outside-filter-dropdown').style.display = 'flex';
    document.querySelector('.save-filter-button').style.display = 'block';
    document.querySelector('.get-alerts-button').style.display = 'flex';

    return filter_name;

}




function append_options_for_dropdowns() {

    append_options_for_the_four_filter_dropdowns('#sports-dropdown-options', Object.keys(sportIconUrls));
    append_options_for_the_four_filter_dropdowns('#markets-dropdown-options', marketsList);
    append_options_for_the_four_filter_dropdowns('#bookmakers-dropdown-options', Object.keys(bookmakerImages));
    append_options_for_the_four_filter_dropdowns('#exchanges-dropdown-options', Object.keys(exchangeImages));

}




function create_event_listeners_for_select_containers() {

    const selectContainers = document.querySelectorAll('.custom-select-container');

    selectContainers.forEach(container => {
        const selectAll = container.querySelector('.select-all');
        const checkboxes = container.querySelectorAll('input[type="checkbox"]:not(.select-all)');


        // EVENT LISTENERS FOR THE DROPDOWNS, FOR CLICKING AND VALUE CHANGES. IT JUST CALLS THE UPDATEGLOBALFILTERS FOR EACH, AND TOGGLES DISPLAY OF DROPDOWNS

        selectAll.addEventListener('change', function() {
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAll.checked;
            });
            updateGlobalFilters(container.id);
        });

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                selectAll.checked = Array.from(checkboxes).every(c => c.checked);
                updateGlobalFilters(container.id);
            });
        });

        container.addEventListener('click', (event) => {

            event.stopPropagation(); // Stop the click from closing the dropdown immediately

            if (container.querySelector('.dropdown-options').style.display == 'block') {
                container.querySelector('.dropdown-options').style.display = 'none';
                container.style.borderRadius = '5px';

            } else {
            closeAllDropdowns(); // Close all other dropdowns
            container.querySelector('.dropdown-options').style.display = 'block'; // Show current dropdown
            container.style.borderRadius = '5px 5px 0 0';
            
            }
        });


    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.custom-select-container')) {
            closeAllDropdowns();
        }
    });


}






function create_text_box_and_time_dropdown_event_listeners() {

    const textInputs = document.querySelectorAll('.text-input');
    textInputs.forEach(input => {
        input.addEventListener('input', () => updateGlobalFilters(input.id));
    });

    const startTimeSelect = document.getElementById('date-range');
    startTimeSelect.addEventListener('change', () => updateGlobalFilters(startTimeSelect.id));


}



function deepEqual(obj1, obj2) {

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
        if (!keysB.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}







function remove_all_option_style() {
    let option_divs = document.querySelectorAll('.dropdown-option-filter');
    option_divs.forEach((option) => {
        // Remove the active class from all options
        option.classList.remove('active');
    });
}

function set_background_for_current_option(name) {
    // Ensure all styles are reset first
    remove_all_option_style();

    let option_divs = document.querySelectorAll('.dropdown-option-filter');
    option_divs.forEach((option) => {
        if (option.dataset.value == name) {
            // Add the active class to the matching option
            option.classList.add('active');
        }
    });
}








function check_if_dropdown_matches_global_filter_settings() {

    let keys = Object.keys(customFilters)

    filtersDropdown = document.querySelector('#filters-select');

    remove_all_option_style();

    let found_match = false;

    keys.forEach((key) => {


        let adjusted_global_filters = {
            "sports": globalFilters.sports.slice(), 
            "markets": globalFilters.markets.slice(), 
            "bookmakers": globalFilters.bookmakers.slice(), 
            "exchanges": globalFilters.exchanges.slice(), 
            "startTime": globalFilters.startTime || "", 
            "minLiquidity": globalFilters.minLiquidity || "null",
            "minBackOdds": globalFilters.minBackOdds || "null",
            "maxBackOdds": globalFilters.maxBackOdds || "null",
            "minRating": globalFilters.minRating || "null",
            "maxRating": globalFilters.maxRating || "null",
            "minQualifyingLoss": globalFilters.minQualifyingLoss || "null",
            "minPotentialProfit": globalFilters.minPotentialProfit || "null"
        };


        if (deepEqual(customFilters[key], adjusted_global_filters)) {

            console.log(key)

            filtersDropdown.value = key;

            set_background_for_current_option(key)

            found_match = true;

        }


    });


    if (!found_match) {

        filtersDropdown.value = 'Select Filter';

    }


}


function make_filter_selection_value_as_saved(filter_name) {

    filtersDropdown = document.querySelector('#filters-select');
    filtersDropdown.value = filter_name;

}


function get_selected_filter_name() {

    return filtersDropdown = document.querySelector('#filters-select').value;


}






function check_options_filter_border_bottom() {
    const list_of_options = document.querySelectorAll('.dropdown-option-filter');

    // First, ensure all options have a bottom border
    list_of_options.forEach(option => {
        option.style.borderBottom = '1px solid #444';
    });

    // Remove the border from the last option
    if (list_of_options.length > 0) {
        list_of_options[list_of_options.length - 1].style.borderBottom = 'none';
    }
}





function append_filter_name_to_filter_options_in_dropdown(name_for_filter) {
    
    const container = document.getElementById('filters-dropdown-options');

    // Create the option container
    const optionDiv = document.createElement('div');
    optionDiv.className = 'dropdown-option-filter';
    optionDiv.dataset.value = name_for_filter; // Ensure value attribute is set for use in click event
    optionDiv.textContent = name_for_filter;

    

    optionDiv.addEventListener('click', function() {

        if (name_for_filter) {

            const filter = customFilters[name_for_filter];

            set_background_for_current_option(name_for_filter)

            apply_custom_filters_from_dropdown(filter);

            set_global_filters_as_filters_selected_in_dropdown(filter);
            
            document.querySelector('#filters-select').value = name_for_filter;

            remove_all_option_style();

            set_background_for_current_option(name_for_filter)

            filterData();
    
        } 

    });


    // Create the confirm delete button
    const confirmDelete = document.createElement('button');
    confirmDelete.className = 'confirm-delete-button';
    confirmDelete.textContent = `Confirm Deleting '${name_for_filter}'`;

    confirmDelete.onclick = function(event) {

        event.stopPropagation();

        optionDiv.remove();

        delete customFilters[name_for_filter]; // Delete the key-value pair

        check_if_dropdown_matches_global_filter_settings();

        check_options_filter_border_bottom();

        const message = {
            type: 'Delete Filter',
            filter_name: name_for_filter,
        };

        window.parent.postMessage(message, '*'); 

        // SEND MESSAGE TO WIX SAYING TO DELETE 'NAME_FOR_FILTER

    };


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

    if (name_for_filter != 'Qualifying Bet') {
        optionDiv.appendChild(confirmDelete);
        optionDiv.appendChild(deleteButton);
    }

    // Append the option container to the dropdown
    container.appendChild(optionDiv);


    check_options_filter_border_bottom();


}




function add_event_listener_for_saved_filters() {

    let container = document.querySelector('#filters-dropdown-select-container')

    container.addEventListener('click', (event) => {

        event.stopPropagation(); // Stop the click from closing the dropdown immediately

        if (document.querySelector('#filters-dropdown-options').style.display == 'block') {
            document.querySelector('#filters-dropdown-options').style.display = 'none'
            container.style.borderRadius = '10px';
        } else {
        closeAllDropdowns(); // Close all other dropdowns
        document.querySelector('#filters-dropdown-options').style.display = 'block'; // Show current dropdown
        container.style.borderRadius = '10px 10px 0 0';

        
        }
    });

}





example_data = [





    /*
    
    horse_race_distance: "5f 219y Flat"
    horse_race_runners: 5
    market_type: "Winner"
    lay_liquidity: 33
    
    */
    
    
    
            {
                "date_and_time": "08/08/24 14:05",
                "sport": 'Football',
                "fixture": "Arsenal Vs Tottenham",
                "outcome": "Arsenal",
                "back_odds": "10.22",
                "lay_odds": "44.20",
                "qualifying_loss": "-£0.29",
                "potential_profit": "£20.24",
                "rating": "97.50%",
                "_id" : '4384q2',
                "bookmaker": 'Bet365',
                "exchange": 'Betfair Exchange',
                "bookmaker_link": 'https://bet365.com/',
                "exchange_link": 'https://smarkets.com/',
                "market_type": 'Winner'
            },
            {
                "date_and_time": "02/08/24 18:00",
                "sport": 'Horse Racing',
                "fixture": "Liverpool Vs Chelsea",
                "outcome": "Draw",
                "back_odds": "3.34",
                "lay_odds": "2",
                "qualifying_loss": "£0.50",
                "potential_profit": "£31.24",
                "rating": "95.00%",
                "_id" : '3883fhe',
                "bookmaker": 'Betfred',
                "exchange": 'Betfair Exchange',
                "bookmaker_link": 'https://betfred.com/',
                "exchange_link": 'https://betfair.com/',
                "market_type": 'Winner'
            },
            {
                "date_and_time": "03/08/24 16:00",
                "sport": "Football",
                "fixture": "Manchester United Vs Chelsea",
                "outcome": "Draw",
                "back_odds": "3.55",
                "lay_odds": "3.6",
                "qualifying_loss": "-£0.20",
                "potential_profit": "£18.50",
                "rating": "93.00%",
                "_id": "4385q3",
                "bookmaker": "Virgin Bet",
                "exchange": "Smarkets",
                "bookmaker_link": "https://bet365.com/",
                "exchange_link": "https://smarkets.com/",
                "market_type": 'Winner'
            },
            {
                "date_and_time": "04/08/24 20:00",
                "sport": "Horse Racing",
                "fixture": "Royal Ascot - Race 5",
                "outcome": "Horse 3",
                "back_odds": "5.0",
                "lay_odds": "5.2",
                "qualifying_loss": "-£0.75",
                "potential_profit": "£29.00",
                "rating": "94.50%",
                "_id": "3884ghe",
                "bookmaker": "Livescore",
                "exchange": "Matchbook",
                "bookmaker_link": "https://betfred.com/",
                "exchange_link": "https://betfair.com/",
                "market_type": 'Winner'
            },
            {
                "date_and_time": "05/08/24 17:00",
                "sport": "Football",
                "fixture": "Liverpool Vs Newcastle",
                "outcome": "Liverpool",
                "back_odds": "2.22",
                "lay_odds": "2.25",
                "qualifying_loss": "-£0.15",
                "potential_profit": "£21.85",
                "rating": "96.00%",
                "_id": "4386q4",
                "bookmaker": "Bet365",
                "exchange": "Betfair Exchange",
                "bookmaker_link": "https://bet365.com/",
                "exchange_link": "https://smarkets.com/",
                "market_type": 'Winner'
            },
            {
                "date_and_time": "06/08/24 19:30",
                "sport": "Horse Racing",
                "fixture": "Cheltenham - Race 1",
                "outcome": "Horse 7",
                "back_odds": "8.0",
                "lay_odds": "8.2",
                "qualifying_loss": "-£0.80",
                "potential_profit": "£40.00",
                "rating": "91.00%",
                "_id": "3885ihe",
                "bookmaker": "Betfred",
                "exchange": "Betfair Exchange",
                "bookmaker_link": "https://betfred.com/",
                "exchange_link": "https://smarkets.com/",
                "market_type": 'Winner'
            },
            {
                "date_and_time": "07/08/24 15:00",
                "sport": "Football",
                "fixture": "Everton Vs West Ham",
                "outcome": "West Ham",
                "back_odds": "2.88",
                "lay_odds": "2.9",
                "qualifying_loss": "-£0.12",
                "potential_profit": "£25.00",
                "rating": "92.50%",
                "_id": "4387q5",
                "bookmaker": "Bet365",
                "exchange": "Betfair Exchange",
                "bookmaker_link": "https://bet365.com/",
                "exchange_link": "https://smarkets.com/",
                "market_type": 'Winner'
            },
            {
                "date_and_time": "08/08/24 14:00",
                "sport": "Horse Racing",
                "fixture": "Epsom Derby",
                "outcome": "Horse 2",
                "back_odds": "6.5",
                "lay_odds": "6.7",
                "qualifying_loss": "-£0.95",
                "potential_profit": "£35.05",
                "rating": "90.00%",
                "_id": "3886jhe",
                "bookmaker": "Betfred",
                "exchange": "Betfair Exchange",
                "bookmaker_link": "https://betfred.com/",
                "exchange_link": "https://matchbook.com/",
                "market_type": 'Winner'
            },
            {
                "date_and_time": "09/08/24 20:45",
                "sport": "Football",
                "fixture": "Barcelona Vs Real Madrid",
                "outcome": "Barcelona",
                "back_odds": "3.25",
                "lay_odds": "3.3",
                "qualifying_loss": "-£0.28",
                "potential_profit": "£22.72",
                "rating": "98.00%",
                "_id": "4388q6",
                "bookmaker": "Bet365",
                "exchange": "Betfair Exchange",
                "bookmaker_link": "https://bet365.com/",
                "exchange_link": "https://smarkets.com/",
                "market_type": 'Winner'
            },
            {
                "date_and_time": "10/08/24 16:00",
                "sport": "Horse Racing",
                "fixture": "Grand National",
                "outcome": "Horse 5",
                "back_odds": "15",
                "lay_odds": "15.5",
                "qualifying_loss": "-£2.00",
                "potential_profit": "£50.00",
                "rating": "89.50%",
                "_id": "3887khe",
                "bookmaker": "Betfred",
                "exchange": "Betfair Exchange",
                "bookmaker_link": "https://betfred.com/",
                "exchange_link": "https://smarkets.com/",
                "market_type": 'Winner'
            },
            {
                "date_and_time": "11/08/24 17:30",
                "sport": "Football",
                "fixture": "AC Milan Vs Juventus",
                "outcome": "Draw",
                "back_odds": "13.40",
                "lay_odds": "3.45",
                "qualifying_loss": "-£0.25",
                "potential_profit": "£24.75",
                "rating": "94.00%",
                "_id": "4389q7",
                "bookmaker": "Bet365",
                "exchange": "Betfair Exchange",
                "bookmaker_link": "https://bet365.com/",
                "exchange_link": "https://smarkets.com/",
                "market_type": 'Winner'
            },
            {
                "date_and_time": "12/08/24 18:00",
                "sport": "Horse Racing",
                "fixture": "Ascot Gold Cup",
                "outcome": "Horse 1",
                "back_odds": "7.0",
                "lay_odds": "7.2",
                "qualifying_loss": "-£0.85",
                "potential_profit": "£42.15",
                "rating": "92.00%",
                "_id": "3888lhe",
                "bookmaker": "Betfred",
                "exchange": "Betfair Exchange",
                "bookmaker_link": "https://betfred.com/",
                "exchange_link": "https://betfair.com/",
                "market_type": 'Winner'
            },
            {
                "date_and_time": "13/08/24 15:00",
                "sport": "Football",
                "fixture": "PSG Vs Lyon",
                "outcome": "PSG",
                "back_odds": "1.95",
                "lay_odds": "2",
                "qualifying_loss": "-£0.22",
                "potential_profit": "£17.78",
                "rating": "95.50%",
                "_id": "4390q8",
                "bookmaker": "Bet365",
                "exchange": "Betfair Exchange",
                "bookmaker_link": "https://bet365.com/",
                "exchange_link": "https://smarkets.com/",
                "market_type": 'Winner'
            },
            {
                "date_and_time": "14/08/24 13:00",
                "sport": "Horse Racing",
                "fixture": "Yorkshire Oaks",
                "outcome": "Horse 4",
                "back_odds": "9.0",
                "lay_odds": "9.2",
                "qualifying_loss": "-£1.10",
                "potential_profit": "£45.90",
                "rating": "93.50%",
                "_id": "3889mhe",
                "bookmaker": "Betfred",
                "exchange": "Betfair Exchange",
                "bookmaker_link": "https://betfred.com/",
                "exchange_link": "https://matchbook.com/",
                "market_type": 'Winner'
            }
        ]




        

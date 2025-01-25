// REPLACE ADDEVENTLISTENER, QUERYSELECTOR, GETELEMENTBYID, QUERYSELECTOR ALL WITH SCOPE(THIS.SHADOWROOT)

// TO COMMUNICATE FROM CUSTOM ELEMENT TO WIX SITE USE CUSTOM EVENTS, EXAMPLE BELOW ON SELECT

// HANDLE RESIZE FUNCTION WORKS CORRECTLY, MAKE IT UPDATE THE NEWIDTH EVERYTIME THERE IS A RESIZE THERE





// events are 'Select-Event', 'More-Info', 'Upgrade', 'Delete-Filter', 'Save-Filter



(function () {




const LARGE_FONT_WIDTH = 1370;
const LARGE_BOOKMAKER_AND_ODDS = 1180
const MEDIUM_FONT_WIDTH = 1060;
const SHOW_DATE_AND_TIME = 1000;

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


    let globalFilters = {};
    

    let customFilters = {};




let data_loaded_from_wix = false;




class TwoUpOddsmatcher extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: 'open' }); 

        this.isContentLoaded = false;
        this.attributeChangeQueue = [];
        
    }

    connectedCallback() {

        this.style.display = 'none'; // Make the host element visible

            this.render()  
            .then(() => {

                this.addStyles()
                .then(() => {

                    this.runSpecificScript(); 
                    this.add_loading_row();
                    this.isContentLoaded = true;
                    this.processQueuedAttributeChanges();
                    this.handleResize();
                    window.addEventListener('resize', this.handleResize.bind(this));

                    this.shadowRoot.querySelector('#info-container').style.display = 'none';
                    this.shadowRoot.querySelector('#button-container').style.display = 'none';

                });

            });
            
    }


    handleResize() {

        const width = (window.innerWidth * 0.98)-10;
        const contentDiv = this.shadowRoot.getElementById('outer-container-div');
        contentDiv.style.width = `${width}px`; // MAKE THE OUTER CONTAINER BE THE WIDTH OF THE WINDOW
        contentDiv.style.margin = "0 auto";     // Center the div within its parent

        this.set_font_size(width);

        this.make_odds_and_platform_small_if_screen_small(width)

        this.check_if_removing_or_showing_date_and_time(width);

        this.change_dropdowns_dropdown_width(width);

        this.make_premium_box_correct_size();

        
    }   

    check_if_removing_or_showing_date_and_time(width) {

        let td_date_and_time_display = 'table-cell';

        if (width < SHOW_DATE_AND_TIME) {
            td_date_and_time_display = 'none';
        }

        this.shadowRoot.querySelector('#date_and_time_header').style.display = td_date_and_time_display;

        var date_and_time_values = this.shadowRoot.querySelectorAll('.date_and_time_data');
        date_and_time_values.forEach(function(date_and_time_value) {
            date_and_time_value.style.display = td_date_and_time_display;
        });


    }

    set_font_size(width) {

        let header_font_size = '16px';
        let data_font_size = '14px';

        let expected_profit_header_width = '160px';
        let date_and_time_header_width = '75px';
        let rating_header_width = '70px';

    
        if (width < LARGE_FONT_WIDTH) {

            header_font_size = '14px';
            data_font_size = '12px';

            expected_profit_header_width = '135px';
            date_and_time_header_width = '60px';
            rating_header_width = '60px';
        } 

        if (width < MEDIUM_FONT_WIDTH) {

            header_font_size = '12px';
            data_font_size = '10px';

            expected_profit_header_width = '115px';
            date_and_time_header_width = '60px';
            rating_header_width = '60px';


        } 

        this.shadowRoot.querySelector('#expected_profit_header').style.width = expected_profit_header_width;
        this.shadowRoot.querySelector('#date_and_time_header').style.width = date_and_time_header_width;
        this.shadowRoot.querySelector('#rating_header').style.width = rating_header_width;

    
        var headers = this.shadowRoot.querySelectorAll('th');
        headers.forEach(function(header) {
            header.style.fontSize = header_font_size;
        });

        this.shadowRoot.querySelector('#pagination-info').style.fontSize = header_font_size;
        this.shadowRoot.querySelector('#prev-page').style.fontSize = header_font_size;
        this.shadowRoot.querySelector('#next-page').style.fontSize = header_font_size;

        
        var back_odds_values = this.shadowRoot.querySelectorAll('.back_odds_value');
        back_odds_values.forEach(function(back_odds_value) {
            back_odds_value.style.fontSize = header_font_size;
        });

        var lay_odds_values = this.shadowRoot.querySelectorAll('.lay_odds_value');
        lay_odds_values.forEach(function(lay_odds_value) {
            lay_odds_value.style.fontSize = header_font_size;
        });

        var at_symbols = this.shadowRoot.querySelectorAll('.at_symbol');
        at_symbols.forEach(function(at_symbol) {
            at_symbol.style.fontSize = header_font_size;
        });


            var cells = this.shadowRoot.querySelectorAll('td');
            cells.forEach(function(cell) {
                cell.style.fontSize = data_font_size;
            });

            var profit_qual = this.shadowRoot.querySelectorAll('.positive_profit_data, .negative_profit_data');
            profit_qual.forEach(function(pq) {
                pq.style.fontSize = data_font_size;
            });
    

    }

    loadExternalScript(scriptUrl) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = scriptUrl;
            script.type = 'text/javascript';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

  


    change_dropdowns_dropdown_width(width) {

        const dropdowns = this.shadowRoot.querySelectorAll('.dropdown-options');
        let dropdown_width = '100%'
        
            if (width < SHOW_DATE_AND_TIME) {
                dropdown_width = '120%'
            }

        dropdowns.forEach(dropdown => {
            dropdown.style.width = dropdown_width;
        });

    }


    make_odds_and_platform_small_if_screen_small(width) {

        let div_around_logo_width = '160px';
        let margin_size = '15px';
        let odds_height = '30px';
        let odds_width = '50px'

        if (width < LARGE_BOOKMAKER_AND_ODDS) {

            div_around_logo_width = '130px';
            margin_size = '10px';
            odds_height = '25px';
            odds_width = '45px';

        }
        
        const divAroundLogo = this.shadowRoot.querySelectorAll('.div_around_logo');
        divAroundLogo.forEach(element => {
            element.style.width = div_around_logo_width;
        });

    
        // Change style for elements with classes 'back_odds_value' and 'lay_odds_value'
        const oddsValues = this.shadowRoot.querySelectorAll('.back_odds_value, .lay_odds_value');
        oddsValues.forEach(element => {
            element.style.marginLeft = margin_size;
            element.style.width = odds_width;
            element.style.height = odds_height;
            element.style.lineHeight = odds_height;
        });
    
        // Change style for the element with class 'at_symbol'
        const atSymbol = this.shadowRoot.querySelectorAll('.at_symbol');
        atSymbol.forEach(element => {
            element.style.marginRight = margin_size;
            element.style.marginLeft = margin_size;
        });
    
        // Change style for elements with classes 'bookmaker_logo_div' and 'exchange_logo_div'
        const logoDivs = this.shadowRoot.querySelectorAll('.bookmaker_logo_div, .exchange_logo_div');
        logoDivs.forEach(element => {
            element.style.marginRight = margin_size;
        });
    
    
    }
    
    
    
    go_to_input_and_update_global_for_the_input(filterId, scope, globalFilters) {
    
        switch (filterId) {
    
            case 'bookmakers-dropdown-select-container':
                globalFilters.bookmakers = this.getCheckedOptions('#bookmakers-dropdown-options', scope);
                break;
            case 'exchanges-dropdown-select-container':
                globalFilters.exchanges = this.getCheckedOptions('#exchanges-dropdown-options', scope);
                break;
    
    
            case 'min-liquidity':
                globalFilters.minLiquidity = parseFloat(scope.getElementById('min-liquidity').value) || null;
                break;
            case 'min-back-odds':
                globalFilters.minBackOdds = parseFloat(scope.getElementById('min-back-odds').value) || null;
                break;
            case 'max-back-odds':
                globalFilters.maxBackOdds = parseFloat(scope.getElementById('max-back-odds').value) || null;
                break;
            case 'min-rating':
                globalFilters.minRating = parseFloat(scope.getElementById('min-rating').value) || null;
                break;
            case 'max-rating':
                globalFilters.maxRating = parseFloat(scope.getElementById('max-rating').value) || null;
                break;
            case 'min-qualifying-loss':
                let ql = parseFloat(scope.getElementById('min-qualifying-loss').value);
                globalFilters.minQualifyingLoss = isNaN(ql) ? null : ql;
                break;
            case 'min-potential-profit':
                globalFilters.minPotentialProfit = parseFloat(scope.getElementById('min-potential-profit').value) || null;
                break;
                
            case 'date-range':
                globalFilters.startTime = scope.getElementById('date-range').value;
                break;
        }
    
    
        return globalFilters
    
    
    }
    
    getCheckedOptions(containerId, scope) {
        const container = scope.querySelector(containerId);
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
    
    add_event_listener_for_saved_filters(scope) {
    
        let container = scope.querySelector('#filters-dropdown-select-container')
    
        container.addEventListener('click', (event) => {
    
            event.stopPropagation(); // Stop the click from closing the dropdown immediately
    
            if (scope.querySelector('#filters-dropdown-options').style.display == 'block') {
                scope.querySelector('#filters-dropdown-options').style.display = 'none'
                container.style.borderRadius = '10px';
            } else {
                this.closeAllDropdowns(scope); // Close all other dropdowns
            scope.querySelector('#filters-dropdown-options').style.display = 'block'; // Show current dropdown
            container.style.borderRadius = '10px 10px 0 0';
    
            
            }
        });
    
    }
    
    closeAllDropdowns(scope) {
        const dropdowns = scope.querySelectorAll('.dropdown-options');
        dropdowns.forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    
        let dropdown_corners = scope.querySelectorAll('.custom-select-container');
    
        dropdown_corners.forEach((dropdown) => {
    
            dropdown.style.borderRadius = '5px';
    
        });
    
    
        // ALSO CLOSE FILTER DROPDOWN
        scope.querySelector('#filters-dropdown-options').style.display = 'none';
    
        scope.querySelector('#filters-dropdown-select-container').style.borderRadius = '10px';
    
    }
    
    
    add_lock_if_premium() {
  
        if (!is_premium_member && filteredData.length != 0) {
            const placeholderRow = document.createElement('tr');
            placeholderRow.innerHTML = `
   
                <td colspan="100%" class="not_premium_member_row" >
                    <div class="outer_div_upgrade" >
   
   
                            <div class="outer_div_upgrade_text_row" >
   
                                Access More Events Across All Of Our Oddsmatchers
   
                                <a class="upgrade-button">UPGRADE TO PREMIUM <img src="https://img.icons8.com/?size=100&id=60654&format=png&color=ffffff" class="padlock-image-button" alt="Padlock" > </a>
   
                            </div>
   
                    </div>
   
                   
                </td>
   
            `;
   
            const tableBody = this.shadowRoot.querySelector('table tbody');
            tableBody.append(placeholderRow);
   
           
        }
   
   
    }
 
    
    
    function_using_global_data_and_global_filters_to_make_filtered_data(globalData, globalFilters) {
    
        const now = new Date(); 
    
        return globalData.filter(row => {
    
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
            const rowDateTime = this.parseDateAndTime_filterData(row.date_and_time);
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
                    default:
                        timeMatch = true;
                }
            }
    
            return bookmakerMatch && exchangeMatch && liquidityMatch && backOddsMatch && ratingMatch && qualifyingLossMatch && potentialProfitMatch && timeMatch;
        });
    
    }
    
    
    get_sort_type_using_current_sort() {
    
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
    
    create_row(row, scope) {
            
        const row_object = this.get_row_data(row);
    
        const tr = document.createElement('tr');

        tr.className = 'table_data_row';
        tr.setAttribute('data-id', row._id)
    
        tr.innerHTML = `
        <td class="date_and_time_data" id="date_time_${row._id}">${row.date_and_time}</td>
        <td class="fixture_data" id="fixture_${row._id}">${row.fixture}</td>
            <td class="outcome_data" id="outcome_${row._id}">${row.outcome}</td>
    
            <td id="back_odds_data_${row._id}" class="no_padding_margin">
                <div class="odds_and_bookmaker">
                    <div id="back_odds_value_${row._id}" class="back_odds_value">
                        <a href="${row.bookmaker_link}" target="_blank" class="odds-link">${row.back_odds}</a>
                    </div>    
                    <div class="at_symbol">@</div>
                    <div id="bookmaker_logo_${row._id}" class="bookmaker_logo_div">
                        <a class="div_around_logo" href="${row.bookmaker_link}" target="_blank" >
                            <img class='bookmaker_logo_img' src="${row_object.bookmaker_image}" alt="${row.sport} ${row.bookmaker} 2up bet">
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
                            <img class='exchange_logo_img' src="${row_object.exchange_image}" alt="${row.sport} ${row.exchange}" >
                        </a>
                    </div>
                </div>                
            </td>
            <td class="no_padding_margin">
                <div class="expected_profit_data">
                    <div id='qualifying_loss_${row._id}' class='${row_object.qualifying_loss_class}'>${row_object.qualifying_loss}</div>
                    <div id='potential_profit_${row._id}' class='${row_object.potential_profit_class}'>${row_object.potential_profit}</div>
                </div>
            </td>
            <td id="rating_${row._id}">
                ${row.rating}
            </td>
        `;
    
        const tableBody = scope.querySelector('table tbody');
        const buttonContainer = scope.getElementById('button-container');
        const infoContainer = scope.getElementById('info-container');
    
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
                selectButton.style.transition = 'all 0.2s ease';
            }, 100);
    
                    
        }, 100);

        this.add_hover_listener_to_select_boxes_and_calculator();
    
    
    }


    add_hover_listener_to_select_boxes_and_calculator() {


        const selectBoxes = this.shadowRoot.querySelectorAll('.select_button, .more_info_image');
 
 
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
 

 
    
    
    get_row_data(row) {
    
            let bookmaker_image = this.get_bookmaker_image(row.bookmaker)
            let exchange_image = this.get_exchange_image(row.exchange)
    
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
    
            return {
                bookmaker_image: bookmaker_image,
                exchange_image: exchange_image,
                qualifying_loss: qualifying_loss,
                potential_profit: potential_profit,
                qualifying_loss_class: qualifying_loss_class, 
                potential_profit_class: potential_profit_class
            }
    }
    
    
    
    get_bookmaker_image(bookmaker) {
        if (bookmakerImages[bookmaker]) {
            return bookmakerImages[bookmaker];
        } else {
            console.log("No image found for bookmaker:", bookmaker);
            return null; // Or a default URL if you prefer
        }
    }
    
    get_exchange_image(exchange) {
        if (exchangeImages[exchange]) {
            return exchangeImages[exchange];
        } else {
            console.log("No image found for exchange:", exchange);
            return null; // Or a default URL if you prefer
        }
    }
    
    sort_data(sort_by, method) {
    
        if (sort_by == 'rating') {
            globalData = this.sort_rows_by_rating(globalData, method)
        } else if (sort_by == 'potential profit') {
            globalData = this.sort_rows_by_potential_profit(globalData, method)
        } else if (sort_by == 'qualifying loss') {
            globalData = this.sort_rows_by_qualifying_loss(globalData, method)
        } else if (sort_by == 'date and time') {
            globalData = this.sort_rows_by_date_and_time(globalData, method)
        }
    
    }
    
    sort_rows_by_rating(rows, method) {
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
    
    sort_rows_by_qualifying_loss(rows, method) {
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
    
    
    sort_rows_by_potential_profit(rows, method) {
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
    
    sort_rows_by_date_and_time(rows, method) {
        return rows.sort((a, b) => {
    
            const dateA = this.parseDateAndTime(a.date_and_time);
            const dateB = this.parseDateAndTime(b.date_and_time);
    
            if (method === 'descending') {
                return dateB - dateA;  // Sort in descending order
            } else {
                return dateA - dateB;
            }
        });
    }
    
    
    parseDateAndTime(dateString) {
        const [date, time] = dateString.split(' ');
        const [day, month, year] = date.split('/');
        const [hour, minute] = time.split(':');
    
        // Adjust year format and create a Date object
        const fullYear = parseInt(year, 10) + 2000; // Adjust based on your specific needs
        return new Date(fullYear, parseInt(month, 10) - 1, parseInt(day, 10), parseInt(hour, 10), parseInt(minute, 10));
    }
    
    parseDateAndTime_filterData(dateString) {
        const [date, time] = dateString.split(' ');
        const [day, month, year] = date.split('/');
        const [hour, minute] = time.split(':');
        return new Date(`20${year}`, month - 1, day, hour, minute);
    }
    
    getRowObjById(rowId, globalData) {
        // Assuming globalData is accessible globally
        return globalData.find(item => item._id === rowId);
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
        this.shadowRoot.querySelector('#covering_filters').style.display = is_premium_member ? 'none' : 'flex';


        // use rows to update the table - filter and sort appropriatly first
        globalData = data.rows;
        this.filterData();


        // run something with filters

    }


    filterData() {

        currentPage = 1;
    
        this.sort_data(current_sort, this.get_sort_type_using_current_sort());
        
        filteredData = this.function_using_global_data_and_global_filters_to_make_filtered_data(globalData, globalFilters);
    
        this.setupPagination();
    
    }

    setupPagination() {

        if (!is_premium_member) {
            filteredData = filteredData.slice(0, 3);
        }

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


    displayRows(page, rows, totalPages) {


        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedItems = rows.slice(start, end);
   
        this.shadowRoot.querySelector('table tbody').innerHTML = '';
        this.shadowRoot.getElementById('button-container').innerHTML = '';
        this.shadowRoot.getElementById('info-container').innerHTML = '';
 
 
        this.add_loading_row();
 
 
        let min = 169;
        let max = 420;
 
 
        setTimeout(() => {
 
 
            this.shadowRoot.querySelector('table tbody').innerHTML = '';
 
 
            this.shadowRoot.querySelector('#info-container').style.display = 'block';
            this.shadowRoot.querySelector('#button-container').style.display = 'block';
 
 
           
            if (filteredData.length == 0) {
                this.add_no_data_row();
            }
 
 
            this.appendRows(paginatedItems);
       
 
 
            this.add_lock_if_premium();
 
 
            this.shadowRoot.getElementById('pagination-info').textContent = `Page ${page} of ${totalPages}`;
           
            if (totalPages == 0) {
                this.shadowRoot.getElementById('pagination-info').textContent = `Page 0 of 0`;
            }
 
 
        }, Math.floor(Math.random() * (max - min + 1) + min));
 
 
 
 
    }


    add_no_data_row() {
  


        this.shadowRoot.querySelector('#info-container').style.display = 'none';
        this.shadowRoot.querySelector('#button-container').style.display = 'none';
 
 
        const no_data_row = document.createElement('tr');
        no_data_row.setAttribute('id', 'no-data-row');
        no_data_row.innerHTML = `
 
 
        <td colspan="100%" style="padding: 0;">
            <div class="no-data-div">
 
 
                <h2 class="loading-text no-data-text">No Data Collected Yet...</h2>
            </div>
        </td>
 
 
    `;
 
 
        const tableBody = this.shadowRoot.querySelector('table tbody');
        tableBody.append(no_data_row);
 
 
    }
 
 
    appendRows(rows) {

        // for each row
        rows.forEach(row => {
            this.create_row(row, this.shadowRoot); // PASS THIS SHADOW ROOT TO OUTSIDE FUNCTION SO IT CAN CORRECTLY DO IT
        });

        this.handleResize();
    
    }

    add_listener_for_whole_oddsmatcher() {
        this.shadowRoot.getElementById('outer-container-div').addEventListener('click', (event) => {
            if (event.target.classList.contains('sort_by')) {
                if (data_loaded_from_wix) {
                    this.sort_data_on_click(event);
                }
            } else {
                this.process_click_message_info_select_and_upgrade(event); // Ensure this function is also in scope
            }
        });

        this.add_event_listener_for_saved_filters(this.shadowRoot);
    }



    updateGlobalFilters(filterId) {
    
        // TAKE SPECIFIC FILTER ID AND TAKE THE VALUE FROM THAT FILTER AND UPDATE GLOBAL FILTERS    
        globalFilters = this.go_to_input_and_update_global_for_the_input(filterId, this.shadowRoot, globalFilters);
    
    
        // FUNCTION TO CHECK THE NEW GLOBAL FILTERS WITH DROPDOWN VALUE    
        this.check_if_dropdown_matches_global_filter_settings();
    
    
        // IMPORTANT TO FILTERDATA AS THERE MAY OBVIOUSLY BE CHANGES
        this.filterData();
    
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
                "startTime": globalFilters.startTime || "", 
                "minLiquidity": globalFilters.minLiquidity || "null",
                "minBackOdds": globalFilters.minBackOdds || "null",
                "maxBackOdds": globalFilters.maxBackOdds || "null",
                "minRating": globalFilters.minRating || "null",
                "maxRating": globalFilters.maxRating || "null",
                "minQualifyingLoss": globalFilters.minQualifyingLoss || "null",
                "minPotentialProfit": globalFilters.minPotentialProfit || "null"
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
















            



        
        removeNonQualifyingBetOptions() {

            const options = Array.from(this.shadowRoot.querySelectorAll('.dropdown-option-filter'));
            
            options.forEach(option => {
                if (option.dataset.value !== 'No Filter') {
                    option.remove();
                }
            });

        }

        set_global_filters_as_filters_selected_in_dropdown(filters) {

            if (!filters) {
                console.log("(No Selected Filter)s provided for updating.");
                return;
            }

            // Update each key in globalFilters with the new values from filters
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


        set_input_values_using_filter(filters) {


            function manageDropdownCheckboxes(dropdownId, selectedItems, selectAllText, scope) {
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
            manageDropdownCheckboxes('bookmakers-dropdown-options', filters.bookmakers, 'Select All Bookmakers', this.shadowRoot);
            manageDropdownCheckboxes('exchanges-dropdown-options', filters.exchanges, 'Select All Exchanges', this.shadowRoot);


            const startTimeSelect = this.shadowRoot.getElementById('date-range');
            startTimeSelect.value = filters.startTime || '';


            function setInputValue(id, value, scope) {
                const input = scope.getElementById(id);
                input.value = value === 'null' ? '' : value;
            }

            setInputValue('min-liquidity', filters.minLiquidity, this.shadowRoot);
            setInputValue('min-back-odds', filters.minBackOdds, this.shadowRoot);
            setInputValue('max-back-odds', filters.maxBackOdds, this.shadowRoot);
            setInputValue('min-rating', filters.minRating, this.shadowRoot);
            setInputValue('max-rating', filters.maxRating, this.shadowRoot);
            setInputValue('min-qualifying-loss', filters.minQualifyingLoss, this.shadowRoot);
            setInputValue('min-potential-profit', filters.minPotentialProfit, this.shadowRoot);

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


        append_options_for_the_four_filter_dropdowns(containerId, optionsList) {

            const container = this.shadowRoot.querySelector(containerId);
            optionsList.forEach(option => {

                let label = document.createElement('label');




                let input = document.createElement('input');
                input.type = 'checkbox';
                input.checked = true;
                let span = document.createElement('span'); // Create span for custom checkbox
                label.appendChild(input);
                label.appendChild(span); // Append span to label
                label.appendChild(document.createTextNode(option));
                container.appendChild(label);
            });

        }


        removeOptionFromDropdown(name_for_filter) {
            
            const filtersDropdown = this.shadowRoot.getElementById('filters-dropdown-select-container');

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


        open_text_box_and_confirm() {

            this.shadowRoot.querySelector('.filter-dropdown-name-div').style.display = 'flex';
            this.shadowRoot.querySelector('.confirm-filter-name').style.display = 'block';
            this.shadowRoot.querySelector('.cancel-making-filter').style.display = 'flex';

            this.shadowRoot.querySelector('.div-outside-filter-dropdown').style.display = 'none';
            this.shadowRoot.querySelector('.save-filter-button').style.display = 'none';
            this.shadowRoot.querySelector('.get-alerts-button').style.display = 'none';

        }

        close_boxes() {

            let filter_name_label = this.shadowRoot.querySelector('#type-filter-name');
            filter_name_label.textContent = 'Filter Name';

            this.shadowRoot.querySelector('#get-filter-name').value = '';

            this.shadowRoot.querySelector('.filter-dropdown-name-div').style.display = 'none';
            this.shadowRoot.querySelector('.confirm-filter-name').style.display = 'none';
            this.shadowRoot.querySelector('.cancel-making-filter').style.display = 'none';


            this.shadowRoot.querySelector('.div-outside-filter-dropdown').style.display = 'flex';
            this.shadowRoot.querySelector('.save-filter-button').style.display = 'block';
            this.shadowRoot.querySelector('.get-alerts-button').style.display = 'flex';
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
                        
                    }, 6000);
                
                }


                return '';


            }

            filter_name_label.textContent = 'Filter Name';

            this.shadowRoot.querySelector('#get-filter-name').value = '';

            this.shadowRoot.querySelector('.filter-dropdown-name-div').style.display = 'none';
            this.shadowRoot.querySelector('.confirm-filter-name').style.display = 'none';
            this.shadowRoot.querySelector('.cancel-making-filter').style.display = 'none';


            this.shadowRoot.querySelector('.div-outside-filter-dropdown').style.display = 'flex';
            this.shadowRoot.querySelector('.save-filter-button').style.display = 'block';
            this.shadowRoot.querySelector('.get-alerts-button').style.display = 'flex';

            return filter_name;

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

            

            optionDiv.addEventListener('click', () => {

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
            deleteButton.addEventListener('click', (event) => {

                event.stopPropagation();

                confirmDelete.style.display = 'block';

                deleteButton.style.display = 'none';


                setTimeout(() => {

                    confirmDelete.style.display = 'none';

                    deleteButton.style.display = 'block';
                    
                }, 6000);

            });

            // Append the delete button to the option container

            if (name_for_filter != 'No Filter') {
                optionDiv.appendChild(confirmDelete);
                optionDiv.appendChild(deleteButton);
            }

            // Append the option container to the dropdown
            container.appendChild(optionDiv);


            this.check_options_filter_border_bottom();


    }



    add_loading_row() {

        console.log('adding loading row')

        const loadingrow = document.createElement('tr');
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
                <h2 class="loading-text">Collecting Bookmaker Data...</h2>
            </div>
        </td>

    `;

        const tableBody = this.shadowRoot.querySelector('table tbody');
        tableBody.append(loadingrow);

        this.alternateText();

}

alternateText() {

    const loadingText = this.shadowRoot.querySelector('.loading-text');
    let toggle = false; // State tracking

    setInterval(() => {
        if (toggle) {
            loadingText.textContent = 'Collecting Bookmaker Data...';
        } else {
            loadingText.textContent = 'Matching Bookmaker Odds...';
        }
        toggle = !toggle; 
    }, 3500); 

}




    confirm_filter_click() {

        let filter_name = this.get_name_and_close_boxes();

        // FUNCTION THAT TAKES GLOBAL FILTERS AND ADDS IT TO CUSTOM FILTERS BEFORE IT GOES INTO THE OPTIONS FOR THE DROPDOWN
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













        // AFTER RECEIVING FROM WIX

        // CALLED ON MESSAGE FROM WIX CONTAINING FILTERS. IT SHOULD DELETE ALL OPTIONS EXCEPT QUALIFYING BET, THEN FOR EACH FILTER AND NAME IN OBJECT APPEND TO CUSTOM FILTERS AND ADD OPTION

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



        // TAKES GLOBAL FILTERS AND ADDS IT TO CUSTOM FILTERS WITH NAME - AFTER HAVING CREATED A NEW FILTER

        // AFTER THIS IT SHOULD BE ADDED TO OPTIONS AND SENT TO WIX 

        append_global_filters_to_options(name_for_filter) {

            // also returns data about if its a duplicate i.e should it delete values at the name first

            return this.function_that_takes_global_filters_and_appends_it_to_current_with_name(name_for_filter)

        }



        // SETS THE INPUT FILTERS USING THE FILTERS GOTTEN FROM THE DROPDOWN - ON LOAD AND ON CLICK DROPDOWN (using custom filters object)

        apply_custom_filters_from_dropdown(filters) {

            // ONLY SETS THE INPUT AS THE CORRECT INPUTS - AFTER THIS IS CALLED NEED TO UPDATE TABLE WITH FILTERDATA()

            this.set_input_values_using_filter(filters);

        }

        append_options_for_dropdowns() {
            this.append_options_for_the_four_filter_dropdowns('#bookmakers-dropdown-options', Object.keys(bookmakerImages));
            this.append_options_for_the_four_filter_dropdowns('#exchanges-dropdown-options', Object.keys(exchangeImages));

            this.create_event_listeners_for_select_containers();
        }

        runSpecificScript() {

            this.shadowRoot.querySelector('.save-filter-button').addEventListener('click', () => { this.open_text_box_and_confirm(); });

            this.shadowRoot.querySelector('.cancel-making-filter').addEventListener('click', () => { this.close_boxes(); });

            this.shadowRoot.querySelector('.confirm-filter-name').addEventListener('click', () => { this.confirm_filter_click(); });


            let filter_name_first = 'No Filter';

            this.append_filter_to_options(filter_name_first)  
            //this.make_filter_selection_value_as_saved(filter_name_first); 
            //this.set_background_for_current_option(filter_name_first);
            this.add_listener_for_whole_oddsmatcher();

            let filterobj = customFilters[filter_name_first];

            // KEEP THESE THREE IN THIS ORDER

            //this.apply_custom_filters_from_dropdown(filterobj);
            //this.set_global_filters_as_filters_selected_in_dropdown(filterobj);


        }



















    // Method to inject CSS styles into the shadow DOM.

render() {
    return fetch('https://betterbetgroup.github.io/betterbet_html/oddsmatchers/2up_oddsmatcher/z.html')
        .then(response => response.text())
        .then(html => {
            this.shadowRoot.innerHTML = html;
            // Return the promise to ensure script loads before proceeding
            return this.loadExternalScript('https://betterbetgroup.github.io/betterbet_html/general_info.js');
        })
        .then(() => {
            // Now we are sure the script is loaded, we can safely call this function
            this.filter_bookmakers_and_exchanges(); 

            // Using requestAnimationFrame to make sure changes are visually updated correctly
            requestAnimationFrame(() => {
                this.make_premium_box_correct_size();
            });

        })
        .catch(error => {
            // Catch any errors that occur during the fetch or script loading
            console.error('Error loading script or processing data:', error);
        });
}



    filter_bookmakers_and_exchanges() {

        bookmakerImages = Object.fromEntries(
            Object.entries(bookmakerImages).filter(([key]) => TWOUP_BOOKMAKERS.includes(key))
        );

        exchangeImages = Object.fromEntries(
            Object.entries(exchangeImages).filter(([key]) => TWOUP_EXCHANGES.includes(key))
        );

        customFilters = {
            'No Filter':
                {
                    "bookmakers": Object.keys(bookmakerImages),
                    "exchanges": Object.keys(exchangeImages),
                    "startTime": "",
                    "minLiquidity": "null",
                    "minBackOdds": "null",
                    "maxBackOdds": "null",
                    "minRating": "null",
                    "maxRating": "null",
                    "minQualifyingLoss": "null",
                    "minPotentialProfit": "null"
                }
        };

        globalFilters = {
            bookmakers: Object.keys(bookmakerImages),
            exchanges: Object.keys(exchangeImages),
            startTime: '',
            minLiquidity: null,
            minBackOdds: null,
            maxBackOdds: null,
            minRating: null,
            maxRating: null,
            minQualifyingLoss: null,
            minPotentialProfit: null,
        };

        this.append_options_for_dropdowns();
   
    }

    make_premium_box_correct_size() {


        setTimeout(() => {
            
        
            requestAnimationFrame(() => {


                const filter_panel_container = this.shadowRoot.querySelector('#filter-panel-container');
                const box_for_covering_filters_ = this.shadowRoot.querySelector('#covering_filters');

                box_for_covering_filters_.style.margin = '0 auto';

                const rect = filter_panel_container.getBoundingClientRect(); // Get the dimensions and position

                const xPosition = this.getAbsoluteX(filter_panel_container);


                // Use the dimensions from getBoundingClientRect()
                box_for_covering_filters_.style.width = `${rect.width}px`;
                box_for_covering_filters_.style.height = `${rect.height}px`;
                box_for_covering_filters_.style.top = `${20}px`;


            });

        }, 10);

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
                link.setAttribute('href', 'https://betterbetgroup.github.io/betterbet_html/oddsmatchers/2up_oddsmatcher/styles.css'); 
                

                this.shadowRoot.appendChild(link);

                const fontAwesomeLink = document.createElement('link');
                fontAwesomeLink.setAttribute('rel', 'stylesheet');
                fontAwesomeLink.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
                
                this.shadowRoot.appendChild(fontAwesomeLink);

                setTimeout(() => {

                    this.style.display = 'block'; // Make the host element visible
                    
                }, 8);

                return resolve('done')

            } catch(error) {
                return reject(error)
            }

        });
    }








    sort_data_on_click(event) {

        var sortValue = event.target.getAttribute('data-sort');
    
        current_sort = sortValue;
    
        if (sortValue == 'rating') {
    
            this.filterData();
    
            if (sort_rating == 'ascending') {
                sort_rating = 'descending'
            } else {
                sort_rating = 'ascending'
            }
        }
    
        if (sortValue == 'potential profit') {
    
            this.filterData();
    
            if (sort_potential_profit == 'ascending') {
                sort_potential_profit = 'descending'
            } else {
                sort_potential_profit = 'ascending'
            }
        }
    
    
        if (sortValue == 'qualifying loss') {
    
            this.filterData();
    
            if (sort_qualifying_loss == 'ascending') {
                sort_qualifying_loss = 'descending'
            } else {
                sort_qualifying_loss = 'ascending'
            }
        }   
    
    
        if (sortValue == 'date and time') {
    
            this.filterData();
    
            if (sort_date_and_time == 'ascending') {
                sort_date_and_time = 'descending'
            } else {
                sort_date_and_time = 'ascending'
            }
        }   
    
    }

    process_click_message_info_select_and_upgrade(event) {

        let rowobj = this.getRowObjById(event.target.getAttribute('data-id'), globalData); 

        let message = {
            row: rowobj
        };

        let message_type;

        if (event.target.className === 'select_button') {
            message_type = 'Select-Event';
        }
        if (event.target.className === 'more_info_image') {
            message_type = 'More-Info';
        }
        if (event.target.className === 'upgrade-button' || event.target.className === 'padlock-image-button') {
            message_type = 'Upgrade';
        }
        if (event.target.className === 'get-alerts-button') {
            message_type = 'Get-Alerts';
        }
            
        const raise_event = new CustomEvent(message_type, {
            detail: message,  
            bubbles: true,       // Allows the event to bubble up through the DOM
            composed: true        // Allows the event to pass through shadow DOM boundaries
        });

        this.shadowRoot.dispatchEvent(raise_event); 
    
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
                    this.closeAllDropdowns(this.shadowRoot); // Close all other dropdowns
                container.querySelector('.dropdown-options').style.display = 'block'; // Show current dropdown
                container.style.borderRadius = '5px 5px 0 0';
                
                }
            });
    
    
        });
    
        this.shadowRoot.addEventListener('click', (event) => {
            if (!event.target.closest('.custom-select-container')) {
                this.closeAllDropdowns(this.shadowRoot);
            }
        });


        const textInputs = this.shadowRoot.querySelectorAll('.text-input');
        textInputs.forEach(input => {
            input.addEventListener('input', () => this.updateGlobalFilters(input.id));
        });
    
        const startTimeSelect = this.shadowRoot.getElementById('date-range');
        startTimeSelect.addEventListener('change', () => this.updateGlobalFilters(startTimeSelect.id));
    

    
    }

    


















}

customElements.define('two-up-oddsmatcher', TwoUpOddsmatcher);



})();

// REPLACE ADDEVENTLISTENER, QUERYSELECTOR, GETELEMENTBYID, QUERYSELECTOR ALL WITH SCOPE(THIS.SHADOWROOT)

// TO COMMUNICATE FROM CUSTOM ELEMENT TO WIX SITE USE CUSTOM EVENTS, EXAMPLE BELOW ON SELECT

// HANDLE RESIZE WORKS CORRECTLY, MAKE IT UPDATE THE NEWIDTH EVERYTIME THERE IS A RESIZE THERE

// RESIZE FUNCTIONS ARE AT THE BOTTOM

// HAVE TO GO THROUGH AND CHANGE EVENT LISTNERS TO BE ARROWS




// NOW JUST NEED TO MAKE THE SIZING WORK



// events are 'Select-Event', 'More-Info', 'Upgrade', 'Delete-Filter', 'Save-Filter


(function () {


    let is_premium_member = false;


    let globalData = [];
    let waiting_globalData = [];

    let filteredData = [];

    let currentPage = 1;
    const rowsPerPage = 10;

    let sort_rating = 'descending';
    let sort_qualifying_loss = 'ascending';
    let sort_potential_profit = 'ascending';
    let sort_date_and_time = 'ascending';


    let current_sort = 'rating';



    let globalFilters = {}

    let customFilters = {};






let data_loaded_from_wix = false;





class dutchingOddsmatcher extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: 'open' }); 

        this.isContentLoaded = false;
        this.attributeChangeQueue = [];
        
    }

    connectedCallback() {

        this.style.visibility = 'hidden'; // Make the host element visible


            this.render()  
            .then(() => {

                this.addStyles()
                .then(() => {

                    this.make_premium_box_correct_size().then(() => {
                        setTimeout(() => {
                            this.style.visibility = 'visible'; 
                        }, 100);

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
            this.add_filters(data.wix_filters)
        }

        is_premium_member = data.premium_member;
        if (window.getComputedStyle(this.shadowRoot.querySelector('#filter-panel-container')).display == 'flex') {
            this.shadowRoot.querySelector('#covering_filters').style.display = is_premium_member ? 'none' : 'flex';
        }

        if (data.rows) {
            waiting_globalData = data.rows;
            if (data.is_first) {
                globalData = data.rows;
                this.filterData();
            }
        }   

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





















    displayRows(page, rows, totalPages) {


        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedItems = rows.slice(start, end);
   
        this.shadowRoot.querySelector('table tbody').innerHTML = '';
        this.shadowRoot.getElementById('button-container').innerHTML = '';
        this.shadowRoot.getElementById('info-container').innerHTML = '';

        this.shadowRoot.getElementById('info-container').style.display = 'none';
 
 
        this.add_loading_row();
 
 
        let min = 169;
        let max = 420;
 
 
        setTimeout(() => {
 
 
            this.shadowRoot.querySelector('table tbody').innerHTML = '';
 
 
            this.shadowRoot.querySelector('#info-container').style.display = 'none';
            this.shadowRoot.querySelector('#button-container').style.display = 'flex';
 
 
           
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

    getRowObjById(rowId) {
        return globalData.find(item => item._id === rowId);
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
    
    add_lock_if_premium() {
  
        if (!is_premium_member && filteredData.length != 0) {
            const placeholderRow = document.createElement('tr');
            placeholderRow.innerHTML = `
   
                <td colspan="100%" class="not_premium_member_row" >
                    <div class="outer_div_upgrade" >
   
   
                            <div class="outer_div_upgrade_text_row" >
      
                                <a class="upgrade-button">Upgrade to Premium <img src="https://img.icons8.com/?size=100&id=60654&format=png&color=ffffff" class="padlock-image-button" alt="Padlock" > </a>
   
                            </div>
   
                    </div>
   
                   
                </td>
   
            `;
   
            const tableBody = this.shadowRoot.querySelector('table tbody');
            tableBody.append(placeholderRow);
   
           
        }
   
   
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
    
 
    updateGlobalFilters(filterId) {
    
    
        this.go_to_input_and_update_global_for_the_input(filterId);
        
        this.check_if_dropdown_matches_global_filter_settings();
    
        this.filterData();
    
    }
    
    
    filterData() {
    
        currentPage = 1;
    
        this.sort_data(current_sort, this.get_sort_type_using_current_sort());
        
        this.function_using_global_data_and_global_filters_to_make_filtered_data();
    
        this.setupPagination();
    
    }
    
    
    // APPEND THE ROWS TO THE PAGE - TAKING CURRENT PAGE ROWS
    
    appendRows(rows) {
        
        rows.forEach(row => {
    
            this.create_row(row);
    
        });

        this.handleResize();

        this.add_hover_listener_to_select_boxes_and_calculator();
    
    }
    
    add_loading_row() {
    
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
    
    set_event_listener_for_sort_click_and_select() {
        
        this.shadowRoot.getElementById('outer-container-div').addEventListener('click', (event) => {
        
            if (event.target.classList.contains('sort_by')) {

                if (data_loaded_from_wix) {
                    this.sort_data_on_click(event);
                }
        
            } else {
        
                this.process_click_message_info_select_and_upgrade(event);
        
            }
        
        });
    }
    
    
    




























    




























    




























    
get_bookmaker_image(bookmaker) {
    if (bookmakerImages[bookmaker]) {
        return bookmakerImages[bookmaker];
    } else {
        return this.get_exchange_image(bookmaker)
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

sort_rows_by_rating(rows, method) {
	return rows.sort((a, b) => {
            // Remove the '%' and convert to float for comparison
            const ratingA = parseFloat(a.rating);
            const ratingB = parseFloat(b.rating);

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


removeNonQualifyingBetOptions() {

    const filtersDropdown = this.shadowRoot.getElementById('filters-dropdown-select-container');

    const options = Array.from(this.shadowRoot.querySelectorAll('.dropdown-option-filter'));


    options.forEach(option => {
        if (option.dataset.value !== 'No Filter') {
            option.remove();
        }
    });

}








create_row(row) {

    let bookmaker_image = this.get_bookmaker_image(row.first_bookmaker)
    let win_exchange_image = this.get_bookmaker_image(row.second_bookmaker)
    let place_exchange_image = this.get_bookmaker_image(row.third_bookmaker)


    let first_outcome = '';
    let second_outcome = '';
    let third_outcome = '';


    if (row.sport == 'Football') {
        first_outcome = 'HOME';
        second_outcome = 'DRAW';
        third_outcome = 'AWAY'; 
    }


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

    tr.className = 'table_data_row';
tr.setAttribute('data-id', row._id)

    tr.innerHTML = `

        <td id="date_time_${row._id}" class="date_and_time_data" >${row.date_and_time}</td>

        <td class="fixture_data" id="fixture_${row._id}">${row.fixture}</td>




        <td id="back_odds_data_${row._id}" class="no_padding_margin">
            <div class="odds_and_bookmaker" id='back_each_way_odds_and_bookmaker'>


                <div id="first_outcome_${row._id}" class="outcome_value">
                    <a ${row.first_link ? `href="${row.first_link}" target="_blank"` : ''} class="odds-link">${first_outcome}</a>
                </div>    

                <div class="at_symbol_outcome">@</div>

                <div id="back_odds_value_${row._id}" class="back_odds_value">
                    <a ${row.first_link ? `href="${row.first_link}" target="_blank"` : ''} class="odds-link">${row.first_odds}</a>
                </div>    

                <div class="at_symbol">@</div>

                <div id="bookmaker_logo_${row._id}" class="bookmaker_logo_div">
                    <a class="div_around_logo" ${row.first_link ? `href="${row.first_link}" target="_blank"` : ''} >
                        <img class='bookmaker_logo_img' src="${bookmaker_image}" alt="${row.sport} ${row.bookmaker} each way bet">
                    </a>
                </div>
            </div>                
        </td>

        <td id="lay_odds_data_${row._id}" class="no_padding_margin">


            <div class="odds_and_bookmaker" id='win_lay_odds_and_bookmaker'>

                <div id="first_outcome_${row._id}" class="outcome_value">
                    <a ${row.second_link ? `href="${row.second_link}" target="_blank"` : ''} class="odds-link">${second_outcome}</a>
                </div>    

                <div class="at_symbol_outcome">@</div>


                <div id="lay_odds_value_${row._id}" class="lay_odds_value">
                    <a ${row.second_link ? `href="${row.second_link}" target="_blank"` : ''} class="odds-link">${row.second_odds}</a>
                </div>
                <div class="at_symbol">@</div>
                <div id="exchange_logo_${row._id}" class="exchange_logo_div">
                    <a class="div_around_logo" ${row.second_link ? `href="${row.second_link}" target="_blank"` : ''} >
                        <img class='exchange_logo_img' src="${win_exchange_image}" alt="${row.sport} ${row.win_exchange}" >
                    </a>
                </div>
            </div>                
        </td>

        <td id="lay_odds_data_${row._id}" class="no_padding_margin">
            <div class="odds_and_bookmaker" id='place_lay_odds_and_bookmaker'>

                <div id="first_outcome_${row._id}" class="outcome_value">
                    <a ${row.third_link ? `href="${row.third_link}" target="_blank"` : ''} class="odds-link">${third_outcome}</a>
                </div>    

                <div class="at_symbol_outcome">@</div>


                <div id="lay_odds_value_${row._id}" class="lay_odds_value_2">
                    <a ${row.third_link ? `href="${row.third_link}" target="_blank"` : ''} class="odds-link">${row.third_odds}</a>
                </div>
                <div class="at_symbol">@</div>
                <div id="exchange_logo_${row._id}" class="exchange_logo_div">
                    <a class="div_around_logo" ${row.third_link ? `href="${row.third_link}" target="_blank"` : ''} >
                        <img class='exchange_logo_img' src="${place_exchange_image}" alt="${row.sport} ${row.place_exchange}" >
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


        <td id="rating_${row._id}" class="rating_data">
            ${row.rating}
        </td>

    `;




    const tableBody = this.shadowRoot.querySelector('table tbody');
    const buttonContainer = this.shadowRoot.getElementById('button-container');
    const infoContainer = this.shadowRoot.getElementById('info-container');


    tableBody.appendChild(tr);


    let selectButton = document.createElement('button');
    selectButton.innerHTML = 'Select';
    selectButton.className = 'select_button';
    selectButton.setAttribute('data-id', row._id);



    buttonContainer.appendChild(selectButton);



    let infoButton = document.createElement('button');
    infoButton.innerHTML = 
            `   
            <div id="info_image_${row._id}" data-tooltip="More info" style="background: None; height: 2.5vw; width: 2.5vw; padding:0; margin: 0; display: flex;">
                <img class="more_info_image" data-id="${row._id}" id="more_info_button" src="https://img.icons8.com/?size=100&id=xxQh3SPI3ID7&format=png&color=000000" alt="Info">
            </div>
            `

    
    infoButton.className = 'info_button';


    infoContainer.appendChild(infoButton);


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
    globalFilters.minoutcomes = filters.minoutcomes !== "null" ? parseFloat(filters.minoutcomes) : null;
    globalFilters.minrating = filters.minrating !== "null" ? parseFloat(filters.minrating) : null;
    globalFilters.maxrating = filters.maxrating !== "null" ? parseFloat(filters.maxrating) : null;
    globalFilters.minQualifyingLoss = filters.minQualifyingLoss !== "null" ? parseFloat(filters.minQualifyingLoss) : null;
    globalFilters.minPotentialProfit = filters.minPotentialProfit !== "null" ? parseFloat(filters.minPotentialProfit) : null;


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


    const startTimeSelect = this.shadowRoot.getElementById('date-range');
    startTimeSelect.value = filters.startTime || '';


    function setInputValue(id, value) {
        const input = scope.getElementById(id);
        input.value = value === 'null' ? '' : value;
    }

    setInputValue('min-outcomes', filters.minoutcomes);
    setInputValue('min-rating', filters.minrating);
    setInputValue('max-rating', filters.maxrating);
    setInputValue('min-qualifying-loss', filters.minQualifyingLoss);
    setInputValue('min-potential-profit', filters.minPotentialProfit);




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
        "minoutcomes": globalFilters.minoutcomes || "null",
        "minrating": globalFilters.minrating || "null",
        "maxrating": globalFilters.maxrating || "null",
        "minQualifyingLoss": globalFilters.minQualifyingLoss || "null",
        "minPotentialProfit": globalFilters.minPotentialProfit || "null"
    };

    return {

        filters_to_send: customFilters[name_for_filter],
        is_delete: is_delete_option

    }

}







function_using_global_data_and_global_filters_to_make_filtered_data() {

    const now = new Date(); 

    const allPlatforms = globalFilters.bookmakers.concat(globalFilters.exchanges);

    filteredData = globalData.filter(row => {

        const allBookmakers = [row.first_bookmaker, row.second_bookmaker, row.third_bookmaker];
        const bookmakerMatch = allBookmakers.every(bookmaker => allPlatforms.includes(bookmaker));
        
        const outcomesMatch = globalFilters.minoutcomes === null || (parseFloat(row.outcomes) >= globalFilters.minoutcomes) && (parseFloat(row.outcomes) >= globalFilters.minoutcomes);

        const ratingMatch = (globalFilters.minrating === null || parseFloat(row.rating) >= globalFilters.minrating) &&
                            (globalFilters.maxrating === null || parseFloat(row.rating) <= globalFilters.maxrating);
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
                default:
                    timeMatch = true;
            }
        }

        return bookmakerMatch && outcomesMatch && ratingMatch && qualifyingLossMatch && potentialProfitMatch && timeMatch;


    });




}






curve_corners_of_filter_dropdown() {

    let dropdown = this.shadowRoot.querySelector('#filters-dropdown-select-container')

    dropdown.style.borderRadius = '0.71vw';
}


closeAllDropdowns() {
    const dropdowns = this.shadowRoot.querySelectorAll('.dropdown-options');
    dropdowns.forEach(dropdown => {
        dropdown.style.display = 'none';
    });

    let dropdown_corners = this.shadowRoot.querySelectorAll('.custom-select-container');

    dropdown_corners.forEach((dropdown) => {

        dropdown.style.borderRadius = '0.36vw';

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


        case 'min-outcomes':
            globalFilters.minoutcomes = parseFloat(this.shadowRoot.getElementById('min-outcomes').value) || null;
            break;
        case 'min-rating':
            globalFilters.minrating = parseFloat(this.shadowRoot.getElementById('min-rating').value) || null;
            break;
        case 'max-rating':
            globalFilters.maxrating = parseFloat(this.shadowRoot.getElementById('max-rating').value) || null;
            break;
        case 'min-qualifying-loss':
            let ql = parseFloat(this.shadowRoot.getElementById('min-qualifying-loss').value);
            globalFilters.minQualifyingLoss = isNaN(ql) ? null : ql;
            break;
        case 'min-potential-profit':
            let pp = parseFloat(this.shadowRoot.getElementById('min-potential-profit').value);
            globalFilters.minPotentialProfit = isNaN(pp) ? null : pp;
            break;
            
        case 'date-range':
            globalFilters.startTime = this.shadowRoot.getElementById('date-range').value;
            break;
    }


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

    this.shadowRoot.querySelector('.div-outside-switch').style.display = 'none';
    this.shadowRoot.querySelector('#data_timer').style.display = 'none';
    this.shadowRoot.querySelector('.refresh_results').style.display = 'none';

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

    this.shadowRoot.querySelector('.div-outside-switch').style.display = 'flex';
    this.shadowRoot.querySelector('#data_timer').style.display = 'block';
    this.shadowRoot.querySelector('.refresh_results').style.display = 'flex';
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
    this.shadowRoot.querySelector('.save-filter-button').style.display = 'block';
    this.shadowRoot.querySelector('.get-alerts-button').style.display = 'flex';

    this.shadowRoot.querySelector('.div-outside-switch').style.display = 'flex';
    this.shadowRoot.querySelector('#data_timer').style.display = 'block';
    this.shadowRoot.querySelector('.refresh_results').style.display = 'flex';

    return filter_name;

}




append_options_for_dropdowns() {

    this.append_options_for_the_four_filter_dropdowns('#bookmakers-dropdown-options', Object.keys(bookmakerImages));
    this.append_options_for_the_four_filter_dropdowns('#exchanges-dropdown-options', Object.keys(exchangeImages));

    this.create_event_listeners_for_select_containers();
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
                container.style.borderRadius = '0.36vw';

            } else {
                this.closeAllDropdowns(); // Close all other dropdowns
            container.querySelector('.dropdown-options').style.display = 'block'; // Show current dropdown
            container.style.borderRadius = '0.36vw 0.36vw 0 0';
            
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

    const startTimeSelect = this.shadowRoot.getElementById('date-range');
    startTimeSelect.addEventListener('change', () => this.updateGlobalFilters(startTimeSelect.id));


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
            "startTime": globalFilters.startTime || "", 
            "minoutcomes": globalFilters.minoutcomes || "null",
            "minrating": globalFilters.minrating || "null",
            "maxrating": globalFilters.maxrating || "null",
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


make_filter_selection_value_as_saved(filter_name) {

    let filtersDropdown = this.shadowRoot.querySelector('#filters-select');
    filtersDropdown.value = filter_name;

}



check_options_filter_border_bottom() {
    const list_of_options = this.shadowRoot.querySelectorAll('.dropdown-option-filter');

    // First, ensure all options have a bottom border
    list_of_options.forEach(option => {
        option.style.borderBottom = '0.07vw solid #444';
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
            container.style.borderRadius = '0.71vw';
        } else {
            this.closeAllDropdowns(); // Close all other dropdowns
        this.shadowRoot.querySelector('#filters-dropdown-options').style.display = 'block'; // Show current dropdown
        container.style.borderRadius = '0.71vw 0.71vw 0 0';

        
        }
    });

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






append_filter_to_options(name_for_filter) {

    if (name_for_filter == "") {
        return
    }

    this.append_filter_name_to_filter_options_in_dropdown(name_for_filter);


}



append_global_filters_to_options(name_for_filter) {

    return this.function_that_takes_global_filters_and_appends_it_to_current_with_name(name_for_filter)

}





// SETS THE INPUT FILTERS USING THE FILTERS GOTTEN FROM THE DROPDOWN - ON LOAD AND ON CLICK DROPDOWN (using custom filters object)

apply_custom_filters_from_dropdown(filters) {

    this.set_input_values_using_filter(filters);

}




add_event_listener_for_show_filters_switch() {

    let filter_switch = this.shadowRoot.querySelector('.show_filters_switch');
    let filters_container = this.shadowRoot.querySelector('#filter-panel-container');
    let covering_filters = this.shadowRoot.querySelector('#covering_filters');

    filter_switch.addEventListener('change', () => {

        if (!filter_switch.checked) {
            filters_container.style.display = 'none';
            covering_filters.style.display = 'none';

        } else {
            filters_container.style.display = 'flex';
            if (is_premium_member) {
                covering_filters.style.display = 'none';
            } else {
                covering_filters.style.display = 'flex';
                this.make_premium_box_correct_size();
            }
        }
                    
    });
}
make_timer_run_and_add_event_listener() {

    let timer = this.shadowRoot.getElementById('data_timer');
    let refreshButton = this.shadowRoot.getElementById('refresh_results');

    let seconds = 0;  
    let intervalId = null;

    function updateTimerDisplay() {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timer.textContent = 
            (minutes < 10 ? "0" + minutes : minutes) + ":" + 
            (secs < 10 ? "0" + secs : secs);

            if (seconds > 60) {
                timer.style.color = 'red';
            } else {
                timer.style.color = 'white'; // Reset to default color if timer is reset
            }
    }

    function startTimer() {
        intervalId = setInterval(() => {
            seconds++;
            updateTimerDisplay();
        }, 1000);  // Update every second
    }

    function resetTimer() {
        clearInterval(intervalId);  
        seconds = 0;  
        updateTimerDisplay();  
        startTimer();  
    }


    // Add event listener to the refresh button
    refreshButton.addEventListener('click', () => {
        globalData = waiting_globalData;
        this.filterData();
        resetTimer();
    });
    

    // Initially start the timer
    startTimer();
}





    runSpecificScript() {

        let filtName = 'No Filter'

        this.create_text_box_and_time_dropdown_event_listeners();
        this.add_event_listener_for_saved_filters();

        this.set_event_listener_for_sort_click_and_select();

        this.shadowRoot.querySelector('.save-filter-button').addEventListener('click', () => { this.open_text_box_and_confirm() });
        this.shadowRoot.querySelector('.cancel-making-filter').addEventListener('click', () => { this.close_boxes() });
        this.shadowRoot.querySelector('.confirm-filter-name').addEventListener('click', () => { this.confirm_filter_name() });    

        this.append_filter_to_options(filtName);
        //this.make_filter_selection_value_as_saved(filtName);
        //this.set_background_for_current_option(filtName) 


        this.add_event_listener_for_show_filters_switch();

        this.make_timer_run_and_add_event_listener();


        let filterobj = customFilters[filtName];
            
        //this.apply_custom_filters_from_dropdown(filterobj);
        //this.set_global_filters_as_filters_selected_in_dropdown(filterobj);
    
    }































    






















































































    // Method to inject CSS styles into the shadow DOM.

    render() {
        return fetch('https://betterbetgroup.github.io/betterbet_html/oddsmatchers/dutching_matcher/z.html')
        //return fetch('z.html')
            .then(response => response.text())
            .then(html => {
                this.shadowRoot.innerHTML = html;
                // Return the promise from loadExternalScript to ensure it completes before proceeding
                return this.loadExternalScript('https://betterbetgroup.github.io/betterbet_html/general_info.js');
            })
            .then(() => {
                // This then() block will execute only after the script has fully loaded
                this.filter_bookmakers_and_exchanges(); 
            })
            .catch(error => {
                // Catch and log any errors that occur during the fetch or script loading
                console.error('Error loading script or processing data:', error);
            });
    }
    



    filter_bookmakers_and_exchanges() {

        bookmakerImages = Object.fromEntries(
            Object.entries(bookmakerImages)
            .filter(([key]) => DUTCHING_BOOKMAKERS.includes(key))
            .sort((a, b) => a[0].localeCompare(b[0]))  
        );

        exchangeImages = Object.fromEntries(
            Object.entries(exchangeImages)
            .filter(([key]) => DUTCHING_EXCHANGES.includes(key))
            .sort((a, b) => a[0].localeCompare(b[0]))  
        );

        customFilters = {
            'No Filter':
                {
                    "bookmakers": Object.keys(bookmakerImages),
                    "exchanges": Object.keys(exchangeImages),
                    "startTime": "",
                    "minoutcomes": "null",
                    "minrating": "null",
                    "maxrating": "null",
                    "minQualifyingLoss": "null",
                    "minPotentialProfit": "null"
                }
        };

        globalFilters = {
            bookmakers: Object.keys(bookmakerImages),
            exchanges: Object.keys(exchangeImages),
            startTime: '',
            minoutcomes: null,
            minrating: null,
            maxrating: null,
            minQualifyingLoss: null,
            minPotentialProfit: null,
        };

        this.append_options_for_dropdowns();
   
    }







    make_premium_box_correct_size() {
        return new Promise((resolve) => {

                    const box_for_covering_filters_ = this.shadowRoot.querySelector('#covering_filters');
                    
                    let width = window.innerWidth
                    let filter_cover_width = ((width * 0.98) - 10) - (0.0072 * width);

                    box_for_covering_filters_.style.width = `${filter_cover_width}px`;
                    box_for_covering_filters_.style.height = `${13.16}vw`; // 13.16 vw from height of filter-panel-container
                    box_for_covering_filters_.style.top = `${11.3}vw`; // 8.8 vw from above columns height + 2.5 vw from filter-panel-container margin top
    
                    resolve(); 
        });
    }








    addStyles() {

        return new Promise((resolve, reject) => {

            try {

                const link = document.createElement('link');
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('href', 'https://betterbetgroup.github.io/betterbet_html/oddsmatchers/dutching_matcher/styles.css'); 
                //link.setAttribute('href', 'styles.css'); 
                

                this.shadowRoot.appendChild(link);

                const fontAwesomeLink = document.createElement('link');
                fontAwesomeLink.setAttribute('rel', 'stylesheet');
                fontAwesomeLink.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
                
                this.shadowRoot.appendChild(fontAwesomeLink);
                this.handleResize();

                return resolve('done')

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

        this.make_premium_box_correct_size();

        this.set_margin_top_for_select_buttons_and_info();

    }  




    set_margin_top_for_select_buttons_and_info() {

        // then margin top of table - which is 2.5vw

        // then check if filter-panel-container is display flex and if so add that height and the margin-top

        // then also get the height of the header


        let margin_top_table = 2.5;

        let filter_panel_container_height = 13.16;

        let added_height_for_showing_filters = filter_panel_container_height + margin_top_table;

        let table_header_height = 5.43;


        let row_height = 4.64; // this is set here as 4.64 as its mostly set by the images as they are the maxmimum

        let select_button_height = 2.2;

        let more_info_button_height = 2.5;


        let total_height_above_table = margin_top_table + table_header_height;


        let select_buttons = this.shadowRoot.querySelectorAll('.select_button');
        let select_buttons_index = 0;
        select_buttons.forEach((button) => {
            select_buttons_index++;
            if (select_buttons_index == 1) {
                button.style.marginTop = (total_height_above_table + ((row_height - select_button_height) / 2)).toString() + 'vw';
            } else {
                button.style.marginTop = ((row_height - select_button_height)).toString() + 'vw';
            }
        });

        let more_info_buttons = this.shadowRoot.querySelectorAll('.info_button');
        let more_info_buttons_index = 0;
        more_info_buttons.forEach((button) => {
            more_info_buttons_index++;
            if (more_info_buttons_index == 1) {
                button.style.marginTop = (total_height_above_table + ((row_height - more_info_button_height) / 2)).toString() + 'vw';
            } else {
                button.style.marginTop = (row_height - more_info_button_height).toString() + 'vw';
            }
        });

    

    }







}

customElements.define('dutching-oddsmatcher', dutchingOddsmatcher);



})();

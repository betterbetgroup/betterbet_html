// THIS SHOULD BE IN THE GUIDES, WHERE THE WIX VELO CODE FILTERS BASED ON WHAT THE BOOKMAKER IS AND SENDS RELAVENT ROWS TO ODDSMATCHER


// SHOULD DEFAULT TO SORT BY QUALIFYING LOSS FOR QUALIFYING BET AND TO POTENTIAL PROFIT FOR FREE BET


// THE TABLE SHOULD DO THE SORTING NOT THE WIX SITE



(function() {


    // make free bet version that just sorts by potential profit by default, - doesn't need to be new file just new custom element on wix
    

    
        let is_premium_member = true;
    
    
        let globalData = [];
    
        let currentPage = 1;
        const rowsPerPage = 10;
    
    
        let sort_rating = 'ascending';
        let sort_qualifying_loss = 'ascending';
        let sort_potential_profit = 'descending';
        let sort_date_and_time = 'ascending';
    
    
        let current_sort = 'potential profit';
    
        const marketsList = ['Match Odds', 'Winner', 'BTTS', 'Over/Under'];
    
        const sportIconUrls = {
            "Football": "https://img.icons8.com/?size=100&id=65497&format=png&color=000000",
            "Horse Racing": "https://img.icons8.com/?size=100&id=LuhFumPGCq9L&format=png&color=000000"
        };
    
    
    let data_loaded_from_wix = false;
    
    
    class QualBetOddsmatcher extends HTMLElement {
    
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
    
            is_premium_member = data.premium_member;
    
            globalData = data.rows;
            this.filterData();
    
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
    
            this.add_loading_row();
    
    
            let min = 169;
            let max = 420;
    
            setTimeout(() => {
    
                this.shadowRoot.querySelector('#info-container').style.display = 'block';
                this.shadowRoot.querySelector('#button-container').style.display = 'block';
    
                this.shadowRoot.querySelector('table tbody').innerHTML = '';
    
                if (globalData.length == 0) {
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
    
            console.log('adding no data row')
    
            this.shadowRoot.querySelector('#info-container').style.display = 'none';
            this.shadowRoot.querySelector('#button-container').style.display = 'none';
        
            const no_data_row = document.createElement('tr');
            no_data_row.setAttribute('id', 'no-data-row'); 
            no_data_row.innerHTML = `
    
            <td colspan="100%" style="padding: 0;">
                <div class="no-data-div">
    
                    <h2 class="loading-text no-data-text">No Data Collected Yet... Please manually find an event on the bookmaker to continue the offer</h2>
                </div>
            </td>
    
        `;
    
            const tableBody = this.shadowRoot.querySelector('table tbody');
            tableBody.append(no_data_row);
    
        }
        
        
        
        setupPagination() {
            
            if (!is_premium_member) {
                globalData = globalData.slice(0, 3);
            }
    
            let rows_to_send = globalData;
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
                
            const raise_event = new CustomEvent(message_type, {
                detail: message,  
                bubbles: true,       // Allows the event to bubble up through the DOM
                composed: true        // Allows the event to pass through shadow DOM boundaries
            });
    
            this.shadowRoot.dispatchEvent(raise_event); 
        
        }
        
    
        create_row(row) {
            let sport_icon_url = this.get_sport_icon_url(row.sport)
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
        
            const tr = document.createElement('tr');
    
            tr.className = 'table_data_row';
    
            tr.setAttribute('data-id', row._id)
    
        
            tr.innerHTML = `
                <td class="date_and_time_data" id="date_time_${row._id}">${row.date_and_time}</td>
                <td class="sport_data" id="sport_${row._id}"><img src="${sport_icon_url}" alt="${row.sport}" style="width: 2.14vw; height: 2.14vw;"></td>
                <td class="fixture_data" id="fixture_${row._id}">${row.fixture}</td>
                <td class="outcome_data" id="outcome_${row._id}">${row.outcome}</td>
        
                <td id="back_odds_data_${row._id}" class="no_padding_margin">
                    <div class="odds_and_bookmaker">
                        <div id="back_odds_value_${row._id}" class="back_odds_value">
                            <a ${row.bookmaker_link ? `href="${row.bookmaker_link}" target="_blank"` : ''} class="odds-link">${row.back_odds}</a>
                        </div>    
                        <div class="at_symbol">@</div>
                        <div id="bookmaker_logo_${row._id}" class="bookmaker_logo_div">
                            <a class="div_around_logo" ${row.bookmaker_link ? `href="${row.bookmaker_link}" target="_blank"` : ''} >
                                <img class='bookmaker_logo_img' src="${bookmaker_image}" alt="${row.sport} ${row.bookmaker}">
                            </a>
                        </div>
                    </div>                
                </td>
                <td id="lay_odds_data_${row._id}" class="no_padding_margin">
                    <div class="odds_and_bookmaker">
                        <div id="lay_odds_value_${row._id}" class="lay_odds_value">
                            <a ${row.exchange_link ? `href="${row.exchange_link}" target="_blank"` : ''} class="odds-link">${row.lay_odds}</a>
                        </div>
                        <div class="at_symbol">@</div>
                        <div id="exchange_logo_${row._id}" class="exchange_logo_div">
                            <a class="div_around_logo" ${row.exchange_link ? `href="${row.exchange_link}" target="_blank"` : ''} target="_blank" >
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
                <td id="rating_${row._id}">
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
        
            selectButton.style.display = 'none';
        
        
        
            let infoButton = document.createElement('button');
            infoButton.innerHTML = 
                    `   
                    <div id="info_image_${row._id}" data-tooltip="More info" style="background: None; height: 2.5vw; width: 2.5vw; padding:0; margin: 0; display: flex;">
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
        
                const select_button_height = getComputedStyle(selectButton).height.replace('px', '');
                const margin_top_for_select_button_on_row = (row_height - select_button_height) / 2;  
        
                const info_button_height = getComputedStyle(selectButton).height.replace('px', '');
                const margin_top_for_info_button_on_row = (row_height - info_button_height) / 2;
                        
                const trRect = tr.getBoundingClientRect();
                const selectRect = selectButton.getBoundingClientRect();
                const infoRect = infoButton.getBoundingClientRect();
        
                selectButton.style.marginTop = `${trRect.top - selectRect.top + margin_top_for_select_button_on_row}px`;
                infoButton.style.marginTop = `${trRect.top - infoRect.top + margin_top_for_info_button_on_row}px`;
        
                setTimeout(() => {
                    selectButton.style.transition = 'all 0.3s ease';
                }, 100);
        
                        
            }, 100);
    
    
            this.add_hover_listener_to_select_boxes_and_calculator();
    
        
        
        }
        
        
        
        add_lock_if_premium() {
        
            if (!is_premium_member && globalData.length != 0) {
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
        
        
    
        
        filterData() {
        
            currentPage = 1;
        
            let sort_type = this.get_sort_type_using_current_sort();
        
            this.sort_data(current_sort, sort_type);
                
            this.setupPagination();
        
        }
        
    
        appendRows(rows) {
            
            rows.forEach(row => {
        
                this.create_row(row);
        
            });
    
    
            this.handleResize();
    
            
        
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
        
        
        
        runSpecificScript() {
    
            this.set_event_listener_for_sort_click_and_select();
    
        }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        // Method to inject CSS styles into the shadow DOM.
    
        render() {
            return fetch('https://betterbetgroup.github.io/betterbet_html/oddsmatchers/qualifying_bet/z.html')
            //return fetch('z.html')
                .then(response => response.text())
                .then(html => {
                    this.shadowRoot.innerHTML = html;
                    // Return the promise from loadExternalScript to ensure it completes before proceeding
                    return this.loadExternalScript('https://betterbetgroup.github.io/betterbet_html/general_info.js');
                })
                .then(() => {
                    // This then() block will execute only after the script has fully loaded
                    // Any actions dependent on the script should be called here
                })
                .catch(error => {
                    // Catch and log any errors that occur during the fetch or script loading
                    console.error('Error loading script or processing data:', error);
                });
        }
        
    
    
    
    
        addStyles() {
    
            return new Promise((resolve, reject) => {
    
                try {
    
                    const link = document.createElement('link');
                    link.setAttribute('rel', 'stylesheet');
                    link.setAttribute('href', 'https://betterbetgroup.github.io/betterbet_html/oddsmatchers/qualifying_bet/styles.css'); 
                    //link.setAttribute('href', 'styles.css'); 
                    
    
                    this.shadowRoot.appendChild(link);
    
                    const fontAwesomeLink = document.createElement('link');
                    fontAwesomeLink.setAttribute('rel', 'stylesheet');
                    fontAwesomeLink.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
                    
                    this.shadowRoot.appendChild(fontAwesomeLink);
    
                    setTimeout(() => {
    
                        this.style.visibility = 'visible'; // Make the host element visible
                        
                    }, 250);
    
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
            contentDiv.style.margin = "0 auto";     // Center the div within its parent
        
        }   
    
    
    
        get_sport_icon_url(sport) {
            if (sportIconUrls[sport]) {
                return sportIconUrls[sport];
            } else {
                console.log("No icon URL found for sport:", sport);
                return null; // Or a default URL if you prefer
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
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    }
    
    customElements.define('freebet-oddsmatcher', QualBetOddsmatcher);
    
    
    
    })();
    
(function () {

let all_guides_object = []

let globalData = {};

let filteredData = [];

let current_sort = 'none';

let data_loaded_from_wix = false;


class AllGuides extends HTMLElement {

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

        if (data.all_guides_object) {
            all_guides_object = data.all_guides_object;

            if (all_guides_object.length == 0) {

                this.create_all_guides_object_new();

                this.send_all_guides_object_to_wix();

            }

            this.filterData();
        }

        // run something with filters

    }



    create_all_guides_object_new() {

        globalData.forEach((guide) => {

            const obj = {
                title: guide.title,
                complete: false,
            }

            all_guides_object.push(obj)

        });

    }

    send_all_guides_object_to_wix() {

        let message = {
            guides_array: all_guides_object
        };
            
        const raise_event = new CustomEvent('guides_array', {
            detail: message,  
            bubbles: true,       
            composed: true        
        });

        this.shadowRoot.dispatchEvent(raise_event); 

    }



    displayRows() {

        this.shadowRoot.querySelector('.item_container_div').innerHTML = '';

        this.appendRows();

        this.shadowRoot.querySelector('#loadingScreenRow').style.display = 'none';

    }


    get_and_display_guides_read() {

        let guides_read = 0;
        let total_guides = 0;
    
        globalData.forEach(item => {

            const userEntry = all_guides_object.find(userItem => userItem.title === item.title);
    
            total_guides += 1;
    
            if (userEntry && userEntry.complete) {
                guides_read += 1;
            }

        });
    
        this.display_guides_read(guides_read, total_guides);

    }



    display_guides_read(guides_read, total_guides) {

        let guides_read_text = this.shadowRoot.querySelector('.offers_value');

        guides_read_text.textContent = guides_read + '/' + total_guides;

    }
    
    
    
    getRowObjById(title) {
        return all_guides_object.find(item => item.title === title);
    }


    
    
    

    revertDateFormat(dateStr) {
        let [day, month, shortYear] = dateStr.split('/');
        let fullYear = `20${shortYear}`; // Prefix '20' to make it the 2000s decade
        return `${day}/${month}/${fullYear}`;
    }


    create_row(row) {

        let is_guide_complete = this.make_filtered_data_using_global_and_suo_object(row.title);

        const tr = document.createElement('div');

        tr.className = 'container_div_around_each_item';

        tr.setAttribute('data-id', row.title);


        tr.innerHTML = ` 

            <div class="table_data_row" >

                <div class="div_around_bookmaker_exhange_images" > 

                        <a class="anchor_round_bookmaker" ${row.guide ? `href="${row.guide}"` : ''} target="_blank" >
                            <img class='bookmaker_img' src="${row.main_image}" >
                        </a>

                </div>


                    <div class="description_content_div ${row.difficulty === 'Easy' ? 'easy_guide_button' : row.difficulty === 'Average' ? 'average_guide_button' : 'advanced_guide_button'}">

                        ${row.title}

                    </div>


                    <div class="div_for_offer_and_guide" >

                        <a class="item_button guide_button ${row.difficulty === 'Easy' ? 'easy_guide_button' : row.difficulty === 'Average' ? 'average_guide_button' : 'advanced_guide_button'}" ${row.guide ? `href="${row.guide}"` : ''}>
                            Read Guide
                        </a>

                    </div>

                    

                    <div class="div_for_available" >

                        <span class="span_next_to_switch">Complete</span>

                        <div class="switch_container">
                    
                                <label class="switch">
                                    <input type="checkbox" class="available_switch" data-id=${row.title.replace(/ /g, '-')} ${is_guide_complete ? 'checked' : ''}>
                                    <span class="slider"></span>
                                </label>
                        </div>


                    </div>




                </div>


        `

    
        const tableBody = this.shadowRoot.querySelector('.item_container_div');

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
                <h2 class="loading-text">Collecting Guides...</h2>
            </div>
        </td>

    `;

        const tableBody = this.shadowRoot.querySelector('#content');
        tableBody.append(loadingrow);

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
        

    create_listener_for_guides_search() {
    
        const textInputs = this.shadowRoot.querySelectorAll('.text-input');
        textInputs.forEach(input => {
            input.addEventListener('input', () => this.updateGlobalFilters(input.id));
        });
    
    }

        
    appendRows() {
        
        filteredData.forEach(row => {
    
            this.create_row(row);
    
        });

        this.add_event_listener_for_switches();
    
    }


    add_event_listener_for_switches() {

        
        this.shadowRoot.querySelectorAll('.available_switch').forEach(checkbox => {

            checkbox.addEventListener('change', () => {

                let rowobj = this.getRowObjById(checkbox.getAttribute('data-id').replace(/-/g, ' ')); 

                rowobj.complete = checkbox.checked;

                this.send_all_guides_object_to_wix();

                setTimeout(() => {
                    this.filterData();
                }, 700);


            });

        });

    }
    
    
    

    updateGlobalFilters() {
        
        this.filterData();
    
    }
    
    
    


    make_filtered_data_using_global_and_suo_object(title) {

        let foundMatch = false;  
        let is_guide_complete = false;

        all_guides_object.forEach((userGuide) => {

            if (title === userGuide.title) {
                foundMatch = true;  
                is_guide_complete = userGuide.complete;
            }

        });

        if (!foundMatch) {
            all_guides_object.push({
                title: title,
                complete: false,
            })
            this.send_all_guides_object_to_wix();
        }

        return is_guide_complete;
    }
    

    filter_guides() {

        const searchText = this.shadowRoot.getElementById('search-guides').value.trim().toLowerCase();
    
        if (searchText.length === 0) {
            filteredData = filteredData.slice(); 
        } else {
            filteredData = filteredData.filter(item => item.title.toLowerCase().includes(searchText));
        }
    
    }


    sort_filtered_data() {

        switch (current_sort) {
            case 'a-z':
                filteredData.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'z-a':
                filteredData.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'none':
            default:
                // No sort applied, data could be reset to initial state if needed
                break;
        }
    }
    
    
    filterData() {

        if (!data_loaded_from_wix) {
            return;
        }

        filteredData = globalData;

        this.get_and_display_guides_read();

        this.filter_guides();

        this.sort_filtered_data();

        this.displayRows();

    }
    

    

    add_event_listener_for_dropdown() {

        const dropdown = this.shadowRoot.getElementById('sort_items');

        dropdown.addEventListener('change', () => {
            current_sort = dropdown.value; 
            this.filterData();
        });
    
    }


    runSpecificScript() {

        this.create_listener_for_guides_search(); // this is event listener for the search button

        this.add_event_listener_for_dropdown(); // this is the sort dropdown

        this.shadowRoot.querySelector('.offers_value').textContent = '0/' + globalData.length

    }











    // Method to inject CSS styles into the shadow DOM.

    render() {
        return fetch('https://betterbetgroup.github.io/betterbet_html/list_pages/all_guides/all_guides/z.html')
        //return fetch('z.html')
            .then(response => response.text())
            .then(html => {
                this.shadowRoot.innerHTML = html;
                // Return the promise from loadExternalScript to ensure it completes before proceeding
                return this.loadExternalScript('https://betterbetgroup.github.io/betterbet_html/guides.js');
            })
            .then(() => {
                // This then() block will execute only after the script has fully loaded
                if (typeof all_guides !== 'undefined') {
                    globalData = all_guides;
                } else {
                    console.error('all_guides is undefined');
                }
            })
            .catch(error => {
                // Catch and log any errors that occur during the fetch or script loading
                console.error('Error loading script or processing data:', error);
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
                link.setAttribute('href', 'https://betterbetgroup.github.io/betterbet_html/list_pages/all_guides/all_guides/styles.css'); 
                //link.setAttribute('href', 'styles.css'); 
                
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


    }   



}

customElements.define('allguides-page', AllGuides);



})();

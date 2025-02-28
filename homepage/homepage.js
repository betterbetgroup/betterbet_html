(function () {


class Homepage extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: 'open' }); 

        this.isContentLoaded = false;

        this.initializeObserver();
        
    }

    connectedCallback() {

        this.style.visibility = 'hidden';

            this.render()  
            .then(() => {

                this.addStyles()
                .then(() => {

                    this.runSpecificScript(); 
                    this.handleResize();
                    window.addEventListener('resize', this.handleResize.bind(this));

                });

            });
            
    }

    initializeObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'attributes') {
                    this.style.visibility = 'visible';
                    this.dispatchEvent(new CustomEvent('Homescreen-Loaded', { bubbles: true, composed: true }));
                }
            });
        });
        observer.observe(this.shadowRoot, { attributes: true, childList: true, subtree: true });
    }

    handleResize() {

        const contentDiv = this.shadowRoot.getElementById('outer-container-div');

        const width = (window.innerWidth)
        contentDiv.style.width = `${width}px`; 

        const height = (window.innerHeight - 58) // minus 58 because of the header
        contentDiv.style.height = `${height}px`; 
        
    }   


    runSpecificScript() {

        this.make_typed_text_run();

        this.style.visibility = 'visible';

        this.add_event_listener_for_button();

    }



    render() {
        //return fetch('z.html')
        return fetch('https://betterbetgroup.github.io/betterbet_html/homepage/z.html')
            .then(response => response.text())
            .then(html => {
                this.shadowRoot.innerHTML = html;
            })
    }

    addStyles() {

        return new Promise((resolve, reject) => {

            try {

                const link = document.createElement('link');
                link.setAttribute('rel', 'stylesheet');

                //link.setAttribute('href', 'styles.css'); 
                link.setAttribute('href', 'https://betterbetgroup.github.io/betterbet_html/homepage/styles.css'); 
                
                this.shadowRoot.appendChild(link);
                const fontAwesomeLink = document.createElement('link');
                fontAwesomeLink.setAttribute('rel', 'stylesheet');
                fontAwesomeLink.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
                
                this.shadowRoot.appendChild(fontAwesomeLink);

                return resolve('done')

            } catch(error) {
                return reject(error)
            }

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














    make_typed_text_run() {

        const typedTextSpan = this.shadowRoot.querySelector(".typed-text");
        const cursorSpan = this.shadowRoot.querySelector(".cursor");
        const textArray = ["Guides & Tutorials", "Calculators", "Oddsmatchers", "Real-time Betting Alerts", "A Profit Tracker"];
        const typingDelay = 120;
        const erasingDelay = 50;
        const newTextDelay = 1000; 
        let textArrayIndex = 0;
        let charIndex = 0;
    
        const type = () => {
            if (charIndex < textArray[textArrayIndex].length) {
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                setTimeout(erase, newTextDelay);
            }
        };
    
        const erase = () => {
            if (charIndex > 0) {
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                textArrayIndex = (textArrayIndex + 1) % textArray.length;
                setTimeout(type, typingDelay + 1100);
            }
        };
    
        setTimeout(type, newTextDelay + 250);

    }

    add_event_listener_for_button() {

        this.shadowRoot.querySelector('#tutorial-button').addEventListener('click', (event) => {

            const raise_event = new CustomEvent('Upgrade', {
                bubbles: true,     
                composed: true        
            });
            this.shadowRoot.dispatchEvent(raise_event); 

        });

        this.shadowRoot.querySelector('#learn-more-button').addEventListener('click', (event) => {

            const raise_event = new CustomEvent('Tutorial', {
                bubbles: true,     
                composed: true        
            });
            this.shadowRoot.dispatchEvent(raise_event); 

        });


    }





}

customElements.define('home-page', Homepage);



})();

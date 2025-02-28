(function () {


class Homepage extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: 'open' }); 

        this.isContentLoaded = false;
        
    }

    connectedCallback() {

        this.style.display = 'none'; // Make the host element visible

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

    handleResize() {

        const contentDiv = this.shadowRoot.getElementById('outer-container-div');

        const width = (window.innerWidth)
        contentDiv.style.width = `${width}px`; 

        const height = (window.innerHeight - 58) // minus 58 because of the header
        contentDiv.style.height = `${height}px`; 
        
    }   


    runSpecificScript() {

        console.log('running')
        this.style.display = 'block';

    }



    render() {
        return fetch('z.html')
        //return fetch('https://betterbetgroup.github.io/betterbet_html/homepage/z.html')
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



}

customElements.define('home-page', Homepage);



})();

class AppBar extends HTMLElement{

    connectedCallback(){
        this.render()
    }

    render(){
        this.innerHTML = `
            <nav class="blue lighten-1" role="navigation">
                <div class="nav-wrapper container">
                    <a href="#" class="brand-logo" id="logo-container">Football</a>
                    <a href="#" class="sidenav-trigger" data-target="nav-mobile" id="sidenav">
                        <i class="material-icons">menu</i>
                    </a>
                    <ul class="topnav right hide-on-med-and-down"></ul>
                    <ul class="sidenav" id="nav-mobile"></ul>
                </div>
            </nav>
        `
    }
}

customElements.define("app-bar", AppBar)
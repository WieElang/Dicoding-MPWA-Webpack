class DetailBar extends HTMLElement{
    
    set type(type){
        this._type = type
        this.render()
    }

    render(){
        this.innerHTML = `
             <nav class="blue lighten-1" role="navigation">
                <div class="nav-wrapper container">
                    <a href="#" class="brand-logo" id="logo-container">Football</a>
                    <a href="#${this._type}" class="sidenav-trigger" id="back" data-target="nav-mobile">
                        <i class="material-icons">arrow_back</i>
                    </a>
                </div>
            </nav>
        `
    }
}

customElements.define("detail-bar", DetailBar)
class ListTeam extends HTMLElement{

    set teams(teams){
        this._teams = teams
        this.render()
    }

    render(){
        this.innerHTML = `
            <div class="col s12 16">
                <a href="#detail?id=${this._teams.id}" id="itemDetail">
                    <div class="card-panel grey lighten-5 z-depth-1">
                        <div class="row valign-wrapper">
                            <div class="col s2">
                                <img src="${this._teams.crestUrl}" alt="Team Logo" class="circle responsive-img">
                            </div>
                            <div class="col s10">
                                <span class="card-title">${this._teams.name||"-"}</span>
                                <p>Address : ${this._teams.address||"-"}</p>
                                <p>Email : ${this._teams.email||"-"}</p>
                                <p>Phone : ${this._teams.phone||"-"}</p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        `
    }
}

customElements.define("team-item", ListTeam)
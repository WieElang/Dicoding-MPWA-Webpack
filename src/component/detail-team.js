class DetailTeam extends HTMLElement{

    set team(team){
        this._team = team
        this.render()
    }

    render(){
        this.innerHTML = `
            <div class="card-image">
                <img src="${this._team.crestUrl}" alt="Team Logo" style="height:400px;">
                <span class="card-title blue-grey darken-1">${this._team.name||"-"}</span>
            </div>
            <div class="card-content">
                <div class="divider"></div>
                <div class="section">
                    <p>Address :${this._team.address||"-"}</p>
                    <p>Phone :${this._team.phone||"-"}</p>
                    <p>Email :${this._team.email||"-"}</p>
                    <p>Founded :${this._team.founded||"-"}</p>
                    <p>Venue :${this._team.venue||"-"}</p>
                    <p>Website :<a href="${this._team.website}">${this._team.website||"-"}</a></p>
                </div>
                <h5>Squad</h5>
                <div class="divider"></div>
                <div class="section">
        `
        this._team.squad.forEach(squad => {
            this.innerHTML += `
                <div class="col s12 16">
                        <div class="card-panel grey lighten-5 z-depth-1">
                            <div class="row valign-wrapper">
                                <div class="col s4">
                                    <span class="card-title">${squad.position||"-"}</span>
                                    <h4>${squad.shirtNumber||"-"}</h4>
                                </div>
                                <div class="col s8">
                                    <span class="card-title">${squad.name||"-"}</span>
                                    <p>${squad.countryOfBirth||"-"},${squad.dateOfBirth||"-"}</p>
                                    <p>${squad.nationality||"-"}</p>
                                    <p>Role: ${squad.role||"-"}</p>
                                </div>
                            </div>
                        </div>
                </div>
            `
        })

        this.innerHTML += `
            <div class="divider"></div>
            <div class="section">
                <p>Data last update ${this._team.lastUpdated}</p>
            </div>
        `
    }
}

customElements.define("detail-team", DetailTeam)
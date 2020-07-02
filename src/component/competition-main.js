class Competitions extends HTMLElement{

    set data(data){
        this._data = data
        this.render()
    }

    render(){
        this.innerHTML = `
            <div id="title">
                <h4> Group Stage </h4>
            </div>
            <br>
        `

        this._data.standings.forEach(standing => {
            this.innerHTML += `
                <div class="row">
                    <div class="card blue lighten-4">
                        <div class="card-content black-text">
                            <div class="row" id="group">
                                <div class="col s7">${standing.group||"-"}</div>
                                <div class="col s1">M</div>
                                <div class="col s1">W</div>
                                <div class="col s1">D</div>
                                <div class="col s1">L</div>
                                <div class="col s1">Pt</div>
                            </div>
                        </div>
                    </div>
                </div>
            `

            standing.table.forEach(table =>{
                this.innerHTML += `
                    <div class="divider"></div>
                    <div class="section">
                        <div class="row">
                            <div class="col s1">${table.position||""}</div>
                            <div class="col s2">
                                <img src="${table.team.crestUrl}" alt="Team Logo" class="circle responsive-img" id="team-logo">
                            </div>
                            <div class="col s4">${table.team.name}</div>
                            <div class="col s1">${table.playedGames||"0"}</div>
                            <div class="col s1">${table.won||"0"}</div>
                            <div class="col s1">${table.draw||"0"}</div>
                            <div class="col s1">${table.lost||"0"}</div>
                            <div class="col s1">${table.points||"0"}</div>
                        </div>
                    </div>
                `
            })
        })
    }
}

customElements.define("competition-main", Competitions)
import './team-item'

class Teams extends HTMLElement{

    set team(team){
        this._team = team
        this.render()
    }

    render(){
        this._team.forEach(team => {
            const teamsElements = document.createElement("team-item")
            teamsElements.teams = team
            this.appendChild(teamsElements)         
        })
    }
}

customElements.define("list-team", Teams)
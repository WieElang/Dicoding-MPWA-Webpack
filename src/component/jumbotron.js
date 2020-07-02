class Jumbotron extends HTMLElement{

    constructor(){
        super()
        this.shadowDom = this.attachShadow({mode:"open"})
    }

    set title(title){
        this._title = title
        this.render()
    }

    render(){
        this.shadowDom.innerHTML = `
            <style>
            .jumbotron{
                width: auto 100%;
                top: 0;
                left: 0;
                font-size: 20px;
                padding: 60px;
                margin: 0;
                text-align: center;  
                background-image: linear-gradient(to bottom right, #003399, aqua); 
            }
            .content{
                color: #FFF;
            }
            </style>
            <div class="jumbotron">
                <div class="content">
                    <h1>${this._title.competition.name}</h1>
                    <h3>(${this._title.competition.area.name})</h3>
                    <p>${this._title.season.startDate} - ${this._title.season.endDate}</p>
                </div>
            </div>
        `
    }
}

customElements.define("jumbotron-item", Jumbotron)
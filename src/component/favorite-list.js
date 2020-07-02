import './favorite-item'

class ListFavorite extends HTMLElement{

    set favorite(favorite){
        this._favorite = favorite
        this.render()
    }

    render(){
        if (this._favorite.length != 0){
            this._favorite.forEach(favorite => {
                const favoriteElements = document.createElement("favorite-item")
                favoriteElements.favorite = favorite
                this.appendChild(favoriteElements)         
            })
        }else{
            this.innerHTML = `
                <div class="row">
                    <div class="col s12">
                    <h5 class="black-text">You don't have any Favorite Team</h5>
                    <p class="black-text text-lighten-4">check in team page</p>
                    </div>
                </div>
            `
        }
    }
}

customElements.define("list-favorite", ListFavorite)
class FavoriteItem extends HTMLElement{

    set favorite(favorite){
        this._favorite = favorite
        this.render()
    }

    render(){
        this.innerHTML = `
            <div class="col s12 16">
                <a href="#detailFavorite?id=${this._favorite.id}">
                    <div class="card-panel grey lighten-5 z-depth-1">
                        <div class="row valign-wrapper">
                            <div class="col s2">
                                <img src="${this._favorite.crestUrl}" alt="Team Logo" class="circle responsive-img">
                            </div>
                            <div class="col s10">
                                <span class="card-title">${this._favorite.name||"-"}</span>
                                <p>Address : ${this._favorite.address||"-"}</p>
                                <p>Email : ${this._favorite.email||"-"}</p>
                                <p>Phone : ${this._favorite.phone||"-"}</p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        `
    }
}

customElements.define("favorite-item", FavoriteItem)
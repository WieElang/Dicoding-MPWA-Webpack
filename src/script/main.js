import M from "materialize-css/dist/js/materialize.min.js"
import DataSource from "./data-source.js"
import IndexedDB from "../db/db"
import '../component/app-bar'
import '../component/detail-bar'
import '../component/jumbotron'
import '../component/competition-main'
import '../component/team-list'
import '../component/favorite-list'
import '../component/detail-team'


function main(){
    const appBar = document.querySelector("#appbar")
    const mainBar = document.createElement("app-bar")
    appBar.appendChild(mainBar)

    const sidenav_elems = document.querySelectorAll(".sidenav")
    let content_page = window.location.hash.substr(1)
    let params
    if (content_page) {
        const content = content_page.split("?")
        content_page = content[0]
        params = content[1]
    }
    
    M.Sidenav.init(sidenav_elems)

    loadNav()

    if (content_page == '') content_page = 'home'
    loadPage(content_page, params)

    function loadNav(){
        const xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function(){
            if (xhttp.readyState == 4){
                if (xhttp.status != 200)return

                document.querySelectorAll(".topnav, .sidenav").forEach((elements) =>{
                    elements.innerHTML = xhttp.responseText
                })
                
                document.querySelectorAll(".sidenav a, .topnav a").forEach((elements) =>{
                    elements.addEventListener("click", event =>{
                        const sidenav = document.querySelector(".sidenav")
                        M.Sidenav.getInstance(sidenav).close()

                        content_page = event.target.getAttribute("href").substr(1)
                        loadPage(content_page)
                    })
                })
            }
        }
        xhttp.open("GET", "nav.html", true)
        xhttp.send()
    }

    function loadPage(pages, params =""){
        const xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4){
                const content = document.querySelector("#root")
                if (this.status == 200){
                    content.innerHTML = xhttp.responseText
                    switch (pages){
                        case "home":
                            DataSource.getCompetitions()
                            .then(renderCompetitions)
                            break
                        case "teams":
                            DataSource.getTeams()
                            .then(renderTeams)
                            break
                        case "favorite":
                            DataSource.getFavorite()
                            .then(renderFavorite)
                            break
                        case "detail":
                            const detailBar = document.createElement("detail-bar")
                            detailBar.type = "teams"
                            appBar.replaceChild(detailBar, mainBar)
                            const id = params.split("=")[1]
                            DataSource.getTeamsById(id)
                            .then(renderDetails)
                            break
                        case "detailFavorite":
                            const detailFavoriteBar = document.createElement("detail-bar")
                            detailFavoriteBar.type = "favorite"
                            appBar.replaceChild(detailFavoriteBar, mainBar)
                            const idFavorite = params.split("=")[1]
                            DataSource.getFavoriteById(idFavorite)
                            .then(renderDetails)
                            break
                        default:
                            console.log("Can't identify page")
                    }
                } else if (xhttp.status == 404){
                    content.innerHTML = "<h4>Page can't found</h4>"
                }
            }
        }
        xhttp.open("GET", "view/" + pages + ".html", true)
        xhttp.send()
    }

    const renderCompetitions = results =>{
        const jumbotron = document.getElementById("jumbotron")
        const competitions = document.getElementById("competitions")

        //jumbotron
        const jumbotronItems = document.createElement("jumbotron-item")
        jumbotronItems.title = results
        jumbotron.appendChild(jumbotronItems)

        //list competitions
        const competitionsElements = document.createElement("competition-main")
        competitionsElements.data = results
        competitions.appendChild(competitionsElements)
    }

    const renderTeams = results =>{
        const teams = document.getElementById("teams")
        const teamsElements = document.createElement("list-team")
        teamsElements.team = results
        teams.appendChild(teamsElements)
        initDetailBtn()
    }

    const renderFavorite = results =>{
        const favorite = document.getElementById("favorite")
        const favoriteElements = document.createElement("list-favorite")
        favoriteElements.favorite = results
        favorite.appendChild(favoriteElements)
        initFavoriteDetailBtn()
    }

    const renderDetails = results =>{
        const detail = document.getElementById("detail")
        const detailElements = document.createElement("detail-team")
        detailElements.team = results
        detail.appendChild(detailElements)

        const btnFavorite = document.getElementById("favorite")
        const btnDelete = document.getElementById("delete")

        if (btnFavorite != null){
            btnFavorite.addEventListener("click",function(){
                IndexedDB.saveFavorite(results)
                M.toast({html: "Team save sucessfully"})
            })
        }else if (btnDelete != null){
            btnDelete.addEventListener("click", function(){
                IndexedDB.deleteTeam(results.id)
                M.toast({html: "Team delete sucessfully"})
            })
        }

        window.onhashchange = function(){
            window.location.reload()
        }
    }

    const initDetailBtn = () =>{
        const btnDetails = document.querySelectorAll("team-item>div")
        for (let item of btnDetails){
            item.addEventListener("click", function(){
                const href = this.firstElementChild.href
                const content = href.split("?")
                content_page = content[0]
                let params = content[1]
                content_page = "detail"
                loadPage(content_page, params)
            })
        }
    }

    const initFavoriteDetailBtn = ()=>{
        const btnFavoriteDetails = document.querySelectorAll("favorite-item>div")
        for (let item of btnFavoriteDetails){
            item.addEventListener("click", function(){
                const href = this.firstElementChild.href
                const content = href.split("?")
                content_page = content[0]
                let params = content[1]
                content_page = "detailFavorite"
                loadPage(content_page, params)
            })
        }
    }
}

export default main
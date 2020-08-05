const BASE_URL = "https://api.football-data.org/v2/";
const API_TOKEN = "91510f3cd5b44de8be70e15bb35ae4bc";
const LEAGUE_CODE = 2021;
const loadingIndicator = document.querySelector(".loading");
const requestHeader = {
    'headers': new Headers({
        'X-Auth-Token': API_TOKEN
    })
};

function apiService(url) {
    return fetch(url, requestHeader);
}

function status(response) {
    if (response.status !== 200) {
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}

function getStandings() {
    const standingUrl = `${BASE_URL}competitions/${LEAGUE_CODE}/standings`;
    loadingIndicator.style.display = "flex";

    if ("caches" in window) {
        caches.match(standingUrl)
            .then(res => {
                if (res) {
                    loadingIndicator.style.display = "none";

                    res.json().then(data => {
                        let standingData = "";
                        data.standings[0].table.forEach((std) => {
                            standingData += `
                                    <tr>
                                        <td class="center-align">${std.position}</td>
                                        <td class="inline"><img src="${std.team.crestUrl}" width="25" alt="${std.team.name}-logo"><a href="./team.html?id=${std.team.id}" class="light-blue-text underline-hover">${std.team.name}</a></td>
                                        <td class="center-align">${std.playedGames}</td>
                                        <td class="center-align">${std.won}</td>
                                        <td class="center-align">${std.lost}</td>
                                        <td class="center-align">${std.draw}</td>
                                        <td class="center-align">${std.goalsAgainst}</td>
                                        <td class="center-align">${std.goalsFor}</td>
                                        <td class="center-align">${std.goalDifference}</td>
                                        <td class="center-align">${std.points}</td>
                                    </tr>
                                `;
                        });

                        document.querySelector("#standing-content").innerHTML = `
                            <div class="row">
                                <div class="col s12 m12">
                                    <p style="font-size: 16pt; font-weight: bold; margin-top: 20px;" class="grey-text darken-4 center-align">Current Standing</p>
                                    <table class="responsive-table striped">
                                        <thead>
                                            <tr>
                                                <th class="center-align">Position</th>
                                                <th>Club</th>
                                                <th class="center-align">Played</th>
                                                <th class="center-align">Won</th>
                                                <th class="center-align">Draw</th>
                                                <th class="center-align">Lost</th>
                                                <th class="center-align">GA</th>
                                                <th class="center-align">GF</th>
                                                <th class="center-align">GD</th>
                                                <th class="center-align">Points</th>
                                            </tr>
                                        </thead>
                                        
                                        <tbody>
                                            ${standingData}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            `;
                    });
                }
            })
            .catch(error);
    }

    apiService(standingUrl)
        .then(status)
        .then(json)
        .then(data => {
            loadingIndicator.style.display = "none";
            let standingData = "";

            if (data) {
                data.standings[0].table.forEach((std) => {
                    standingData += `
                        <tr>
                            <td class="center-align">${std.position}</td>
                            <td class="inline"><img src="${std.team.crestUrl}" width="25" alt="${std.team.name}-logo"><a href="./team.html?id=${std.team.id}" class="light-blue-text underline-hover">${std.team.name}</a></td>
                            <td class="center-align">${std.playedGames}</td>
                            <td class="center-align">${std.won}</td>
                            <td class="center-align">${std.lost}</td>
                            <td class="center-align">${std.draw}</td>
                            <td class="center-align">${std.goalsAgainst}</td>
                            <td class="center-align">${std.goalsFor}</td>
                            <td class="center-align">${std.goalDifference}</td>
                            <td class="center-align">${std.points}</td>
                        </tr>
                    `;
                });
            }

            document.querySelector("#standing-content").innerHTML = `
            <div class="row">
                <div class="col s12 m12">
                    <p style="font-size: 16pt; font-weight: bold; margin-top: 20px;" class="grey-text darken-4 center-align">Current Standing</p>
                    <table class="responsive-table striped">
                        <thead>
                            <tr>
                                <th class="center-align">Position</th>
                                <th>Club</th>
                                <th class="center-align">Played</th>
                                <th class="center-align">Won</th>
                                <th class="center-align">Draw</th>
                                <th class="center-align">Lost</th>
                                <th class="center-align">GA</th>
                                <th class="center-align">GF</th>
                                <th class="center-align">GD</th>
                                <th class="center-align">Points</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            ${standingData}
                        </tbody>
                    </table>
                </div>
            </div>
            `;
        })
        .catch(error);
}

function getMatch() {
    const matchesUrl = `${BASE_URL}matches?competitions=${LEAGUE_CODE}&status=SCHEDULED`;
    // const matchesUrl = `${BASE_URL}matches?competitions=2003`;
    loadingIndicator.style.display = "flex";

    if ("caches" in window) {
        caches.match(matchesUrl)
            .then(res => {
                if (res) {
                    res.json().then(data => {
                        loadingIndicator.style.display = "none";
                        let matchData = "";

                        if (data.count > 0) {
                            data.matches.forEach(match => {
                                matchData += `
                                <div class="card white col s12 m4 l3" style="margin: 10px;">
                                    <div class="card-content grey-text darken-4 center-align">
                                        <span style="font-size: 14pt; font-weight: bold;">Match Day ${match.matchday}</span>
                                        <div style="margin-top: 20px;">
                                            <p class="truncate">${match.homeTeam.name}</p>
                                            <p>vs</p>
                                            <p class="truncate">${match.awayTeam.name}</p>
                                        </div>
                                    </div>
                                </div>
                                `;
                            })
                        } else {
                            matchData = `
                            <div class="card white">
                                <div class="card-content grey-text darken-4">
                                    <p style="font-size: 14pt; font-weight: bold" class="grey-text darken-4 center-align center-block">No match scheduled.</p>
                                </div>
                            </div>
                            `;
                        }

                        document.querySelector("#match-content").innerHTML = `
                            <div class="col s12 center-align" style="margin: 0px auto;">
                                <p style="font-size: 16pt; font-weight: bold; margin-top: 20px;" class="grey-text darken-4 center-align">Current Scheduled Match</p>
                                ${matchData}
                            </div>
                        `;
                    });
                }
            })
            .catch(error);
    }

    apiService(matchesUrl)
        .then(status)
        .then(json)
        .then(data => {
            loadingIndicator.style.display = "none";
            let matchData = "";

            if (data.count > 0) {
                data.matches.forEach(match => {
                    matchData += `
                    <div class="card white col s12 m4 l3" style="margin: 10px;">
                        <div class="card-content grey-text darken-4 center-align">
                            <span style="font-size: 14pt; font-weight: bold;">Match Day ${match.matchday}</span>
                            <div style="margin-top: 20px;">
                                <p class="truncate">${match.homeTeam.name}</p>
                                <p>vs</p>
                                <p class="truncate">${match.awayTeam.name}</p>
                            </div>
                        </div>
                    </div>
                    `;
                })
            } else {
                matchData = `
                <div class="card white">
                    <div class="card-content grey-text darken-4">
                        <p style="font-size: 14pt; font-weight: bold" class="grey-text darken-4 center-align center-block">No match scheduled.</p>
                    </div>
                </div>
                `;
            }

            document.querySelector("#match-content").innerHTML = `
                <div class="col s12 center-align" style="margin: 0px auto;">
                    <p style="font-size: 16pt; font-weight: bold; margin-top: 20px;" class="grey-text darken-4 center-align">Current Scheduled Match</p>
                    ${matchData}
                </div>
            `;
        })
        .catch(error);
}

function getTeamDetail(id) {
    const teamURL = `${BASE_URL}teams/${id}`;
    loadingIndicator.style.display = "flex";

    return new Promise((resolve, reject) => {
        if ("caches" in window) {
            caches.match(teamURL)
                .then(res => {
                    if (res) {
                        res.json().then(data => {
                            let teamData = "";
                            let competitions = [];
                            loadingIndicator.style.display = "none";

                            if (data) {
                                data.activeCompetitions.forEach(cmp => {
                                    competitions.push(cmp.name);
                                });

                                let cmpData = competitions.join(",");

                                let squadData = "";

                                data.squad.forEach(sqd => {
                                    squadData += `
                                    <tr>
                                        <td><a href="./player.html?id=${sqd.id}">${sqd.name}</a></td>
                                        <td class="center-align">${sqd.nationality}</td>
                                        <td class="center-align">${sqd.countryOfBirth}</td>
                                        <td class="center-align">${sqd.position}</td>
                                        <td class="center-align">${sqd.shirtNumber != null ? sqd.shirtNumber : "-"}</td>
                                        <td class="center-align">${sqd.role}</td>
                                    </tr>
                                `;
                                });

                                let squad = `
                                <p style="font-size: 16pt; font-weight: bold; margin-top: 20px;" class="grey-text darken-4 center-align">Current Squad</p>
                                <table class="responsive-table striped">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th class="center-align">Nationality</th>
                                            <th class="center-align">Birth</th>
                                            <th class="center-align">Position</th>
                                            <th class="center-align">Shirt Number</th>
                                            <th class="center-align">Role</th>
                                        </tr>
                                    </thead>
            
                                    <tbody>
                                        ${squadData}
                                    </tbody>
                                </table>
                            `;

                                teamData = `
                                <div class="row" style="margin-top: 20px;">
                                    <div>
                                        <div class="col s12 m3 l3">
                                            <img src="${data.crestUrl}" class="responsive-img col s12" alt"${data.name}-logo">
                                        </div>
            
                                        <div class="col s12 m9 l9">
                                            <div style="margin-left: 50px auto;">
                                                <p class="flow-text center-align"><span style="font-weight: bold;">${data.name}</span> (${data.shortName})</p>
                                                <div class="col s12 m6 l6">
                                                    <p><span style="font-weight: bold;">Venue: </span> ${data.venue}</p>
                                                    <p><span style="font-weight: bold;">Address: </span> ${data.address}</p>
                                                    <p><span style="font-weight: bold;">Phone: </span> ${data.phone}</p>
                                                    <p><span style="font-weight: bold;">Website: </span> <a href="${data.website}">${data.website}</a></p>
                                                </div>
                                                <div class="col s12 m6 l6">
                                                    <p><span style="font-weight: bold;">Email: </span> ${data.email}</p>
                                                    <p><span style="font-weight: bold;">Color: </span> ${data.clubColors}</p>
                                                    <p><span style="font-weight: bold;">Area: </span> ${data.area.name}</p>
                                                    <p><span style="font-weight: bold;">Competitions: </span> ${cmpData}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
            
                                    <div>
                                        ${squad}
                                    </div>
                                </div>
                                `;
                            }

                            document.getElementById("body-content").innerHTML += teamData;
                            resolve(data);
                        })
                    }
                })
                .catch(error)
        }

        apiService(teamURL)
            .then(status)
            .then(json)
            .then(data => {
                let teamData = "";
                let competitions = [];
                loadingIndicator.style.display = "none";

                if (data) {
                    data.activeCompetitions.forEach(cmp => {
                        competitions.push(cmp.name);
                    });

                    let cmpData = competitions.join(",");

                    let squadData = "";

                    data.squad.forEach(sqd => {
                        squadData += `
                        <tr>
                            <td><a href="./player.html?id=${sqd.id}">${sqd.name}</a></td>
                            <td class="center-align">${sqd.nationality}</td>
                            <td class="center-align">${sqd.countryOfBirth}</td>
                            <td class="center-align">${sqd.position}</td>
                            <td class="center-align">${sqd.shirtNumber != null ? sqd.shirtNumber : "-"}</td>
                            <td class="center-align">${sqd.role}</td>
                        </tr>
                    `;
                    });

                    let squad = `
                    <p style="font-size: 16pt; font-weight: bold; margin-top: 20px;" class="grey-text darken-4 center-align">Current Squad</p>
                    <table class="responsive-table striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th class="center-align">Nationality</th>
                                <th class="center-align">Birth</th>
                                <th class="center-align">Position</th>
                                <th class="center-align">Shirt Number</th>
                                <th class="center-align">Role</th>
                            </tr>
                        </thead>

                        <tbody>
                            ${squadData}
                        </tbody>
                    </table>
                `;

                    teamData = `
                    <div class="row" style="margin-top: 20px;">
                        <div>
                            <div class="col s12 m3 l3">
                                <img src="${data.crestUrl}" class="responsive-img col s12" alt"${data.name}-logo">
                            </div>

                            <div class="col s12 m9 l9">
                                <div style="margin-left: 50px auto;">
                                    <p class="flow-text center-align"><span style="font-weight: bold;">${data.name}</span> (${data.shortName})</p>
                                    <div class="col s12 m6 l6">
                                        <p><span style="font-weight: bold;">Venue: </span> ${data.venue}</p>
                                        <p><span style="font-weight: bold;">Address: </span> ${data.address}</p>
                                        <p><span style="font-weight: bold;">Phone: </span> ${data.phone}</p>
                                        <p><span style="font-weight: bold;">Website: </span> <a href="${data.website}">${data.website}</a></p>
                                    </div>
                                    <div class="col s12 m6 l6">
                                        <p><span style="font-weight: bold;">Email: </span> ${data.email}</p>
                                        <p><span style="font-weight: bold;">Color: </span> ${data.clubColors}</p>
                                        <p><span style="font-weight: bold;">Area: </span> ${data.area.name}</p>
                                        <p><span style="font-weight: bold;">Competitions: </span> ${cmpData}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            ${squad}
                        </div>
                    </div>
                    `;
                }

                document.getElementById("body-content").innerHTML += teamData;
                resolve(data);
            })
            .catch(error);
    });
}

function getPlayerDetail(id) {
    const playerUrl = `${BASE_URL}players/${id}`;
    loadingIndicator.style.display = "flex";

    return new Promise((resolve, reject) => {
        if ("caches" in window) {
            caches.match(playerUrl)
                .then(res => {
                    res.json().then(data => {
                        loadingIndicator.style.display = "none";
                        document.getElementById("body-content").innerHTML = `
                        <div class="row">
                            <div class="col s12">
                                <p style="font-size: 16pt; font-weight: bold; margin-top: 20px;" class="grey-text darken-4 center-align">Player Profile</p>
                                    <div class="card white">
                                        <div class="card-content grey-text darken-4">
                                            <p class="flow-text center-align"><span style="font-weight: bold;">${data.name}</p></br>
                                            <p><span style="font-weight: bold;">First name: </span> ${data.firstName}</p>
                                            <p><span style="font-weight: bold;">Last name: </span> ${data.lastName == null ? "-" : data.lastName}</p>
                                            <p><span style="font-weight: bold;">Date of birth: </span> ${data.dateOfBirth}</p>
                                            <p><span style="font-weight: bold;">Country birth: </span> ${data.countryOfBirth}</p>
                                            <p><span style="font-weight: bold;">Nationality: </span> ${data.nationality}</p>
                                            <p><span style="font-weight: bold;">Shirt number: </span> ${data.shirtNumber == null ? "-" : data.shirtNumber}</p>
                                            <p><span style="font-weight: bold;">Position: </span> ${data.position}</p>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        `;

                        resolve(data);
                    });
                })
                .catch(error);
        }

        apiService(playerUrl)
            .then(status)
            .then(json)
            .then(data => {
                loadingIndicator.style.display = "none";
                document.getElementById("body-content").innerHTML = `
                <div class="row">
                    <div class="col s12">
                        <p style="font-size: 16pt; font-weight: bold; margin-top: 20px;" class="grey-text darken-4 center-align">Player Profile</p>
                            <div class="card white">
                                <div class="card-content grey-text darken-4">
                                    <p class="flow-text center-align"><span style="font-weight: bold;">${data.name}</p></br>
                                    <p><span style="font-weight: bold;">First name: </span> ${data.firstName}</p>
                                    <p><span style="font-weight: bold;">Last name: </span> ${data.lastName == null ? "-" : data.lastName}</p>
                                    <p><span style="font-weight: bold;">Date of birth: </span> ${data.dateOfBirth}</p>
                                    <p><span style="font-weight: bold;">Country birth: </span> ${data.countryOfBirth}</p>
                                    <p><span style="font-weight: bold;">Nationality: </span> ${data.nationality}</p>
                                    <p><span style="font-weight: bold;">Shirt number: </span> ${data.shirtNumber == null ? "-" : data.shirtNumber}</p>
                                    <p><span style="font-weight: bold;">Position: </span> ${data.position}</p>
                                </div>
                            </div>
                    </div>
                </div>
                `;

                resolve(data);
            })
            .catch(error);
    });
}

function showFavorite() {
    document.querySelector(".loading").style.display = "flex";
    getAllData().then(res => {
        document.querySelector(".loading").style.display = "none";
        if (res) {
            let teamFavData = "";
            let playerFavData = "";
            let innerHtmlFav = "";

            if (res[0].length > 0) {
                res[0].forEach(data => {
                    if (data) {
                        teamFavData += `
                            <li class="collection-item center-align inline2">
                                <img src="${data.crestUrl}" width="30" alt="${data.name}-logo">
                                <a href="./team.html?id=${data.id}&saved=true">${data.name}</a>
                            </li>
                        `;
                    }
                });
            } else {
                teamFavData = `<li class="collection-item center-align">No favorite team available.</li>`;
            }

            if (res[1].length > 0) {
                res[1].forEach(data => {
                    if (data) {
                        playerFavData += `<li class="collection-item center-align">
                            <a href="./player.html?id=${data.id}&saved=true">${data.name}</a>
                        </li>`;
                    }
                });
            } else {
                playerFavData = `<li class="collection-item center-align">No favorite player available.</li>`;
            }

            innerHtmlFav = `
                <div>
                    <p style="font-size: 16pt; font-weight: bold; margin-top: 20px;" class="grey-text darken-4 center-align">Favorite Team</p>
                    <ul class="collection">
                        ${teamFavData}
                    </ul>

                    <p style="font-size: 16pt; font-weight: bold; margin-top: 20px;" class="grey-text darken-4 center-align">Favorite Player</p>
                    <ul class="collection">
                        ${playerFavData}
                    </ul>
                </div>
            `;

            document.querySelector("#favorite-content").innerHTML = innerHtmlFav;
        }
    });
}

function getSavedArticleById(storename, id) {
    return new Promise(function (resolve, reject) {
        getDataById(storename, id).then(data => {
            if (storename == "team") {
                let teamData = "";
                let competitions = [];
                loadingIndicator.style.display = "none";

                if (data) {
                    data.activeCompetitions.forEach(cmp => {
                        competitions.push(cmp.name);
                    });

                    let cmpData = competitions.join(",");

                    let squadData = "";

                    data.squad.forEach(sqd => {
                        squadData += `
                            <tr>
                                <td><a href="./player.html?id=${sqd.id}">${sqd.name}</a></td>
                                <td class="center-align">${sqd.nationality}</td>
                                <td class="center-align">${sqd.countryOfBirth}</td>
                                <td class="center-align">${sqd.position}</td>
                                <td class="center-align">${sqd.shirtNumber != null ? sqd.shirtNumber : "-"}</td>
                                <td class="center-align">${sqd.role}</td>
                            </tr>
                        `;
                    });

                    let squad = `
                        <p style="font-size: 16pt; font-weight: bold; margin-top: 20px;" class="grey-text darken-4 center-align">Current Squad</p>
                        <table class="responsive-table striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th class="center-align">Nationality</th>
                                    <th class="center-align">Birth</th>
                                    <th class="center-align">Position</th>
                                    <th class="center-align">Shirt Number</th>
                                    <th class="center-align">Role</th>
                                </tr>
                            </thead>
    
                            <tbody>
                                ${squadData}
                            </tbody>
                        </table>
                    `;

                    teamData = `
                        <div class="row" style="margin-top: 20px;">
                            <div>
                                <div class="col s12 m3 l3">
                                    <img src="${data.crestUrl}" class="responsive-img col s12" alt"${data.name}-logo">
                                </div>
    
                                <div class="col s12 m9 l9">
                                    <div style="margin-left: 50px auto;">
                                        <p class="flow-text center-align"><span style="font-weight: bold;">${data.name}</span> (${data.shortName})</p>
                                        <div class="col s12 m6 l6">
                                            <p><span style="font-weight: bold;">Venue: </span> ${data.venue}</p>
                                            <p><span style="font-weight: bold;">Address: </span> ${data.address}</p>
                                            <p><span style="font-weight: bold;">Phone: </span> ${data.phone}</p>
                                            <p><span style="font-weight: bold;">Website: </span> <a href="${data.website}">${data.website}</a></p>
                                        </div>
                                        <div class="col s12 m6 l6">
                                            <p><span style="font-weight: bold;">Email: </span> ${data.email}</p>
                                            <p><span style="font-weight: bold;">Color: </span> ${data.clubColors}</p>
                                            <p><span style="font-weight: bold;">Area: </span> ${data.area.name}</p>
                                            <p><span style="font-weight: bold;">Competitions: </span> ${cmpData}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div>
                                ${squad}
                            </div>
                        </div>
                        `;
                        resolve(data);
                }

                document.getElementById("body-content").innerHTML += teamData;
            } else if (storename == "player") {
                loadingIndicator.style.display = "none";
                document.getElementById("body-content").innerHTML = `
                            <div class="row">
                                <div class="col s12">
                                    <p style="font-size: 16pt; font-weight: bold; margin-top: 20px;" class="grey-text darken-4 center-align">Player Profile</p>
                                        <div class="card white">
                                            <div class="card-content grey-text darken-4">
                                                <p class="flow-text center-align"><span style="font-weight: bold;">${data.name}</p></br>
                                                <p><span style="font-weight: bold;">First name: </span> ${data.firstName}</p>
                                                <p><span style="font-weight: bold;">Last name: </span> ${data.lastName == null ? "-" : data.lastName}</p>
                                                <p><span style="font-weight: bold;">Date of birth: </span> ${data.dateOfBirth}</p>
                                                <p><span style="font-weight: bold;">Country birth: </span> ${data.countryOfBirth}</p>
                                                <p><span style="font-weight: bold;">Nationality: </span> ${data.nationality}</p>
                                                <p><span style="font-weight: bold;">Shirt number: </span> ${data.shirtNumber == null ? "-" : data.shirtNumber}</p>
                                                <p><span style="font-weight: bold;">Position: </span> ${data.position}</p>
                                            </div>
                                        </div>
                                </div>
                            </div>
                            `;
                resolve(data);
            }
        })
    })
}
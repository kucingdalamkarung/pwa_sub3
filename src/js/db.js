const idbPromise = idb.open("footballdb", 1, function (upDB) {
    if (!upDB.objectStoreNames.contains("team_fav")) {
        let indexTeamFav = upDB.createObjectStore("team_fav", {
            keyPath: "id"
        });
        indexTeamFav.createIndex("teamName", "name", {
            unique: false
        });
    }

    if (!upDB.objectStoreNames.contains("player_fav")) {
        let indexTeamFav = upDB.createObjectStore("player_fav", {
            keyPath: "id"
        });
        indexTeamFav.createIndex("playerName", "name", {
            unique: false
        });
    }
});

function checkData(type, name) {
    return new Promise((resolve, reject) => {
        idbPromise.then(db => {
            let storename = "";

            if (type === "team") {
                storename = "team_fav";
            } else if (type === "player") {
                storename = "player_fav";
            }

            const tx = db.transaction(storename, "readonly");
            const store = tx.objectStore(storename);

            return store.get(name);
        })
            .then(res => {
                if (res) {
                    resolve(res);
                } else {
                    reject();
                }
            });
    });
}

function getAllData() {
    return new Promise(function (resolve, reject) {
        Promise.all([
            idbPromise.then(db => {
                const tx = db.transaction("team_fav", "readonly");
                const store = tx.objectStore("team_fav");

                return store.getAll();
            }),
            idbPromise.then(db => {
                const tx = db.transaction("player_fav", "readonly");
                const store = tx.objectStore("player_fav");

                return store.getAll();
            }),
        ])
            .then(res => {
                resolve(res);
            })
    })
}

function getDataById(type, id) {
    return new Promise(function (resolve, reject) {
        idbPromise.then(db => {
            let storename = "";

            if (type === "team") {
                storename = "team_fav";
            } else if (type === "player") {
                storename = "player_fav";
            }

            const tx = db.transaction(storename, "readonly");
            const store = tx.objectStore(storename);

            return store.get(id);
        })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                console.log("Get data failed.");
            });
    })
}

function createData(type, data) {
    idbPromise.then(db => {
        let storename = "";

        if (type === "team") {
            storename = "team_fav";
        } else if (type === "player") {
            storename = "player_fav";
        }

        const tx = db.transaction(storename, "readwrite");
        const store = tx.objectStore(storename);

        store.add(data);
        return tx.complete;
    })
        .then(function () {
            console.log("Data write success.");
        })
        .catch(err => {
            console.log("Data write failed.");
        });
}

function deleteData(type, id) {
    idbPromise.then(db => {
        let storename = "";
        if (type === "team") {
            storename = "team_fav";
        } else if (type === "player") {
            storename = "player_fav";
        }

        const tx = db.transaction(storename, "readwrite");
        const store = tx.objectStore(storename);

        store.delete(id);
        return tx.complete;
    }).then(() => {
        console.log("Item deleted");
    });
}


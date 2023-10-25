import * as SQLite from "expo-sqlite";

const name = "HikerApp.db";
const version = "1.0";
const displayname = "Hiker App Database";
const size = 200000;

const db = SQLite.openDatabase(name, version, displayname, size);

const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Hikes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            location TEXT,
            date TEXT,
            parking TEXT,
            length REAL,
            difficulty TEXT,
            description TEXT
          )`,
      [],
      () => console.log("Database and table created successfully."),
      (error) => console.log("Error occurred while creating the table.", error)
    );
  });
};

const insertHike = (
  name,
  location,
  date,
  parking,
  length,
  difficulty,
  description
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Hikes (name, location, date, parking, length, difficulty, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, location, date, parking, length, difficulty, description],
        (_, { insertId }) => {
          resolve(insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const getAllHikes = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Hikes",
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const updateHike = (
  id,
  name,
  location,
  date,
  parking,
  length,
  difficulty,
  description
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE Hikes SET name = ?, location = ?, date = ?, parking = ?, length = ?, difficulty = ?, description = ? WHERE id = ?",
        [name, location, date, parking, length, difficulty, description, id],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const deleteHike = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM Hikes WHERE id = ?",
        [id],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const deleteAll = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM Hikes",
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const Database = {
  initDatabase,
  insertHike,
  getAllHikes,
  deleteHike,
  updateHike,
  deleteAll,
};

export default Database;

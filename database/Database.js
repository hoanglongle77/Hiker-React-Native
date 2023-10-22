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

// const updateHike = (hike) => {
//   return new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         "UPDATE Hikes SET name=?, location=?, date=?, parking=?, length=?, difficulty=?, description=? WHERE id=?",
//         [
//           hike.name,
//           hike.location,
//           hike.date,
//           hike.parking,
//           hike.length,
//           hike.difficulty,
//           hike.description,
//           hike.id,
//         ],
//         (_, result) => resolve(result.rowsAffected),
//         (_, error) => reject(error)
//       );
//     });
//   });
// };

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

// const getHikeById = (id) => {
//   return new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         "SELECT * FROM Hikes WHERE id=?",
//         [id],
//         (_, result) => {
//           if (result.rows.length > 0) {
//             // Get the first (and hopefully only) result
//             const hike = result.rows.item(0);
//             resolve(hike);
//           } else {
//             resolve(null); // Hike not found
//           }
//         },
//         (_, error) => reject(error)
//       );
//     });
//   });
// };

const Database = {
  initDatabase,
  insertHike,
  getAllHikes,
  deleteHike,
};

export default Database;

import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (content) => {
    console.log('Put to the database');

    // Create a connection to the database and version we want to use
    const jateDb = await openDB('jate', 1);

    // Create a new transaction and specify the database and data privilages
    const tx = jateDb.transaction('jate', 'readwrite');

    // Open up the desired object store.
    const store = tx.objectStore('jate');

    const request = store.put({ id: 1, value: content});

    // Get confirmation of the request
    const result = await request;
    console.log('Data saved to the database', result.value);
    
};


export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;

  result 
  ? console.log('data was retirenved from the DB', result.value)
  : console.log('data was NOT retirenved from the DB')

  // return to get the data back
  return result?.value;
  
}

// start the database
initdb();

/* exported data */
interface entryFormat {
  entryID: number,
  title: string,
  photo: string,
  notes: string,
}

let data = {
  view: 'entry-form',
  entries: readEntries(),
  editing: null,
  nextEntryId: readNextEntryID(),
};

function writeEntries(): void {
    const entriesJSON: string = JSON.stringify(data.entries);
    const nextEntryJSON: string = JSON.stringify(data.nextEntryId);
    localStorage.setItem('journal-entries', entriesJSON);
    localStorage.setItem('nextEntryID', nextEntryJSON);
};

function readEntries(): entryFormat[] {
  let newEntries: entryFormat[] = [];
  const readJSON = localStorage.getItem('journal-entries');
  if (readJSON === null) {
    newEntries = [];
  } else {
    newEntries = JSON.parse(readJSON);
  }
  return newEntries;
}

function readNextEntryID(): number {
  let newEntryID: number = 1;
  const readJSON = localStorage.getItem('nextEntryID');
  if (readJSON === null) {
    newEntryID = 1;
  } else {
    newEntryID = JSON.parse(readJSON);
  }
  return newEntryID;
}

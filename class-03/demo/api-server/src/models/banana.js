class BananaModel {
  constructor(){
    this.id = 0;
    this.db = [];
  }
  // [{ id: x, ...record }, { id: x, ...record }]

  // gets all the bananas from the database or gets one banana from the database
  get(id){
    if(id){
      // this would be for the getOneBanana
      return this.db.find(record => record.id === id);
    } else {
      // this would be for getAllBananas
      return this.db;
    }
  }

  create(obj) {
    obj.id = ++this.id;
    this.db.push(obj);
    return obj;
  }

  update(id, obj){
    if (!id) {return null}

    // find the object that needs to be updated and update that object
    this.db = this.db.map(record => {
      if(record.id !== id)return;
      obj.keys.forEach(key => {
        record[key] = obj[key];
      })
      return record;
    })

    // TODO: figure out how to update an object
    return this.db.find(record => record.id === id);


    const dbObj = this.db.find(record => record.id === parseInt(id));
    dbObj = {...dbObj, ...obj};
    return dbObj;
  }

  delete(id) {
    if(!id) {return null}

    // TODO: figure out hoe to delete the object
    return null;
  }
}

module.exports = BananaModel;
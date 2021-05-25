
/**
 * @param {string} collection - path to a collection.
 * @returns The CollectionReference instance.
 * */

function getCollectionRef(firebase,collection) {
  console.log("getCollectionRef", firebase)
  return firebase?.firestore().collection(collection)
}

export default getCollectionRef

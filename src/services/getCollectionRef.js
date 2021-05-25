import firebaseConfigurator from './firebaseConfigurator'



/**
 * @param {string} collection - path to a collection.
 * @returns The CollectionReference instance.
 * */

function getCollectionRef(collection) {
  return firebaseConfigurator.firebase.firestore.collection(collection)
}

export default getCollectionRef

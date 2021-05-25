import getCollectionRef  from './getCollectionRef'
/**
 * @param {string} collection - collection name.
 * @param {string} document - document id.
 * @param {object} data - A map of the fields and values for the document.
 * @returns {Promise}
 * */

function setData(firebase,collection, document, data) {
  return getCollectionRef(firebase,collection).doc(document).set(data, { merge: true })
}
export default setData

import firebaseConfigurator from './firebaseConfigurator'

/**
 *
 * @returns {firebase.firestore.Timestamp}
 */
const getTimestamp = () => firebaseConfigurator.firebase.firestore.Timestamp

export default getTimestamp

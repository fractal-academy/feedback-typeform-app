import "firebase/firestore"
function firebaseConfigurator(){
this.config = ({firebase})=>{
  this.firebase = firebase
}
}
export default new firebaseConfigurator()
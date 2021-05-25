import {useTypeformConfiguration} from "../context/TypeFormConfigurationContext/useTypeformConfiguration"
import getCollectionRef from "../services/getCollectionRef"
import getTimestamp from "../services/getTimestamp"
import setData from "../services/setData"

const useFunctions = (FB) => {
const firebase = useTypeformConfiguration()
  return {
  getCollectionRef: (collection)=> getCollectionRef(firebase||FB,collection),
    getTimestamp:()=>getTimestamp(firebase||FB),
    setData:(collection, document, data)=>setData(firebase||FB,collection, document, data)
  }
}
export default useFunctions
































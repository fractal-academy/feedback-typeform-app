import { FormEdit, FormsAll, FormShow } from '../domains/Form/routes'
import ROUTES_PATHS from './routesPaths'

const ROUTES = {
  FORMS_ALL: {
    component: FormsAll,
    path: ROUTES_PATHS.FORMS_ALL
  },
  FORM_EDIT: {
    component: FormEdit,
    path: ROUTES_PATHS.FORM_EDIT
  },
  FORM_SHOW: {
    component: FormShow,
    path: ROUTES_PATHS.FORM_SHOW
  }
}

const ROUTES_VALUES = Object.values(ROUTES)
const ROUTES_KEYS = Object.keys(ROUTES)

export { ROUTES_KEYS, ROUTES_VALUES }
export default ROUTES

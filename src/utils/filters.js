export default class Filter {
    view = null;
    appContext = null;
    constructor(view, appContext) {
        this.view = view;
        this.appContext = appContext;
    }
    set = (key, props, value) => {
        let nurseId = props.nurseId && props.nurseId !== 'undefined' ? props.nurseId : '';
        let doctorId = props.doctorId && props.doctorId !== 'undefined' ? props.doctorId : '';
        let drugId = props.drugId && props.drugId !== 'undefined' ? props.drugId : '';
        let k = key + this.view + nurseId + drugId + doctorId;
        let filters = {}
        if (this.appContext.appState.filters) {
            filters = this.appContext.appState.filters;
        }
        filters[k] = value;
        this.appContext.appDispatch({ type: "setFilters", payload: filters });
    }
    get = (key, props) => {
        let nurseId = props.nurseId && props.nurseId !== 'undefined ' ? props.nurseId : '';
        let doctorId = props.doctorId && props.doctorId !== 'undefined' ? props.doctorId : '';
        let drugId = props.drugId && props.drugId !== 'undefined' ? props.drugId : '';
        if ( this.appContext.appState.filters &&  this.appContext.appState.filters[key + this.view + nurseId + drugId + doctorId]) {
            return this.appContext.appState.filters[key + this.view + nurseId + drugId + doctorId];
        } else {
            return null;
        }

    }
}
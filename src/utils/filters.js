export default class Filter {
    
    constructor(view, dispatch, session) {
        this.view = view;
        this.dispatch = dispatch;
        this.session = session;
    }
    set = (key,props, value) => {
        let nurseId = props.nurseId && props.nurseId !== 'undefined' ? props.nurseId:'';
        let doctorId = props.doctorId && props.doctorId !== 'undefined' ? props.doctorId:'';
        let drugId = props.drugId && props.drugId !=='undefined' ? props.drugId:'';
        console.log('hey',key,value,this.session)
        let k = key+this.view+nurseId+drugId+doctorId;
        let filters = {}
        if(this.session.filters){
            filters = this.session.filters;
        } 
        filters[k] = value;
        this.dispatch({ type: "filters", payload: JSON.stringify(filters) });
    }
    get = (key,props) => {
        let nurseId = props.nurseId && props.nurseId !== 'undefined '? props.nurseId:'';
        let doctorId = props.doctorId && props.doctorId !== 'undefined' ? props.doctorId:'';
        let drugId = props.drugId && props.drugId !== 'undefined' ? props.drugId:'';
       //return window.appStorage.getItem(key+this.view+props.nurseId+props.drugId+props.doctorId);
       return this.session['filters'][key+this.view+nurseId+drugId+doctorId];
    }
}
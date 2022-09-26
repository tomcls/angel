
export default class Filter {
    constructor(view) {
        this.view = view;
    }
    set = (key,props, value) => {
        window.appStorage.setItem(key+this.view+props.nurseId+props.drugId+props.doctorId, value, 1200000);
    }
    get = (key,props) => {
       return window.appStorage.getItem(key+this.view+props.nurseId+props.drugId+props.doctorId);
    }
}
import DoctorContainer from "../containers/Doctor";
import Doctors from "../containers/Doctors";
import DrugContainer from "../containers/Drug";
import HospitalContainer from "../containers/Hospital";
import Laboratories from "../containers/Laboratories";
import MoodContainer from "../containers/Mood";
import NurseContainer from "../containers/Nurse";
import Nurses from "../containers/Nurses";
import PatientContainer from "../containers/Patient";
import Patients from "../containers/Patients";
import PatientSurveys from "../containers/PatientSurveys";
import PatientTreatments from "../containers/PatientTreatments";
import ScientistContainer from "../containers/Scientist";
import SideEffectContainer from "../containers/SideEffect";

export default class Tabs {
    constructor(tabName, tabIndex, tabs, setTabs, setSelectedTab, setTabIndex, newBtn, lg) {
        this.tabs = tabs;
        this.setTabs = setTabs;
        this.setSelectedTab = setSelectedTab;
        this.tabIndex = tabIndex;
        this.newBtn = newBtn;
        this.setTabIndex = setTabIndex;
        this.tabName = tabName;
        this.lg = lg;
    }
    openPatientTab = (userId, text) => {
        this.createTab(this.tabName, text, userId)
    }
    getTab = (v) => {
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].value === '' + v) {
                return this.tabs[i];
            }
        }
        return null;
    }
    handleCloseTab = (event, idx) => {
        event.stopPropagation();
        const tabArr = this.tabs.filter(x => x.idx !== idx)
        this.setTabs(tabArr)
        this.setSelectedTab('Main');
    }
    createTab = (type, text, id, panel) => {
        const value = text;
        let tab = this.getTab(value);
        let newTab = null;
        if (tab) {
            this.setSelectedTab(tab.value);
        } else {
            newTab = {
                label: text,
                value: value ? value : this.tabIndex,
                idx: this.tabIndex,
                child: () => {
                    switch (type) {
                        case 'nurse':
                            return <NurseContainer userId={id} />
                        case 'patient':
                            return <PatientContainer userId={id} />
                        case 'drug_patients':
                            return <Patients drugId={id} />
                        case 'nurse_patients':
                            return <Patients openUser={this.openPatientTab} nurseId={id} openNurses={() => this.setSelectedTab('Main')} openDoctors={() => this.setSelectedTab('Main')} openTreatments={() => this.setSelectedTab('Main')} />
                        case 'doc_patients':
                            return <Patients openUser={this.openPatientTab} doctorId={id} openDoctors={() => this.setSelectedTab('Main')} openNurses={() => this.setSelectedTab('Main')} openTreatments={() => this.setSelectedTab('Main')} />
                        case 'doctors':
                            return <Doctors patientId={id} openPatients={this.openTab} />
                        case 'doctor':
                            return <DoctorContainer userId={id} showDoctorPatients={this.openTab} />
                        case 'nurses':
                            return <Nurses patientId={id} openPatients={this.openTab} text={text} />
                        case 'patient_treatments':
                            return <PatientTreatments patientId={id} />
                        case 'drug_laboratories':
                            return <Laboratories drugId={id} />
                        case 'drug':
                            return <DrugContainer drugId={id} />
                        case 'scientist':
                            return <ScientistContainer scientistId={id} />
                        case 'patient_surveys':
                            return <PatientSurveys patientId={id} panel={panel} />
                        case 'mood':
                            return <MoodContainer moodId={id} />
                        case 'side_effect':
                            return <SideEffectContainer sideEffectId={id} />
                        case 'hospital':
                            return <HospitalContainer hospitalId={id} />
                        default:
                            return;
                    }
                }
            }
            this.setTabs([...this.tabs, newTab])
            this.handleTabOptions(value ? value : this.tabIndex);
        }
    }
    openTab = (id, text, type, panel) => {
        console.log(this.tabName + '.openTab', id, text, type, panel)
        if (!window.angel) {
            window.angel = {};
        }
        switch (type) {
            case 'hospital':
                window.angel.hospitalId = id;
                window.angel.tabType = 'hospital';
                window.angel.tabName = this.lg.get('Hospital') + ' ' + text;
                break;
            case 'scientist':
                window.angel.userId = id;
                window.angel.tabType = 'scientist';
                window.angel.tabName = this.lg.get('Scientist') + ' ' + text;
                break;
            case 'doctor':
                window.angel.userId = id;
                window.angel.tabType = 'doctor';
                window.angel.tabName = 'Doc ' + text;
                break;
            case 'patient':
                window.angel.userId = id;
                window.angel.tabType = 'patient';
                window.angel.tabName = this.lg.get('Patient') + ' ' + text;
                break;
            case 'nurse':
                window.angel.userId = id;
                window.angel.tabType = 'nurse';
                window.angel.tabName = this.lg.get('Nurse') + ' ' + text;
                break;
            case 'patient_doctors':
                window.angel.userId = id;
                window.angel.tabType = 'doctors';
                window.angel.tabName = this.lg.get('Doctors of') + ' ' + text;
                break;
            case 'patient_nurses':
                window.angel.userId = id;
                window.angel.tabType = 'nurses';
                window.angel.tabName = this.lg.get('Nurses of') + ' ' + text;
                break;
            case 'nurse_patients':
                window.angel.nurseId = id;
                window.angel.tabName = this.lg.get('Patients of') + ' ' + text;
                break;
            case 'doc_patients':
                window.angel.doctorId = id;
                window.angel.tabName = this.lg.get('Patients of') + ' Doc ' + text;
                break;
            case 'drug_patients':
                window.angel.tabType = 'drug_patients';
                window.angel.drugId = id;
                window.angel.tabName = this.lg.get('Patients of') + ' ' + text;
                break;
            case 'doctors':
                window.angel.userId = id;
                window.angel.tabType = 'doctors';
                window.angel.tabName = this.lg.get('Doctors of') + ' ' + text;
                break;
            case 'patient_treatments':
                window.angel.userId = id;
                window.angel.tabType = 'patient_treatments';
                window.angel.tabName = this.lg.get('Treatments of') + ' ' + text;
                break;
            case 'drug_laboratories':
                window.angel.drugId = id;
                window.angel.tabType = 'drug_laboratories';
                window.angel.tabName = this.lg.get('Laboratory of') + ' ' + text;
                break;
            case 'drug_treatments':
                window.angel.tabType = 'drug_treatments';
                window.angel.drugId = id;
                window.angel.tabName = this.lg.get('Treatments assigned to') + ' ' + text;
                break;
            case 'drug':
                window.angel.drugId = id;
                window.angel.tabType = 'drug';
                window.angel.tabName = this.lg.get('Treatment') + ' ' + text;
                break;
            case 'mood':
                window.angel.moodId = id;
                window.angel.tabType = 'mood';
                window.angel.tabName = this.lg.get('Mood') + ' ' + text;
                break;
            case 'side_effect':
                window.angel.sideEffectId = id;
                window.angel.tabType = 'side_effect';
                window.angel.tabName = this.lg.get('Side effect') + ' ' + text;
                break;
            case 'treatment':
                window.angel.treatmentId = id;
                window.angel.tabType = 'treatment';
                window.angel.tabName = this.lg.get('Treatment') + ' ' + text;
                break;
            case 'patient_surveys':
                window.angel.patientId = id;
                window.angel.tabType = 'patient_surveys';
                window.angel.tabName = this.lg.get('Survey of') + ' ' + text;
                window.angel.panelName = panel;
                break;
            default:
                return;
        }
        this.newBtn.current.click();
    }
    onOpenTabClick = () => {
        console.log(this.tabName + '.onOpenTabClick', window.angel)
        if (window.angel && window.angel.userId && window.angel.tabType === 'nurses') {
            this.createTab('nurses', window.angel.tabName, window.angel.userId);
            window.angel.userId = null;
            window.angel.tabType = null;
            window.angel.tabName = null;
        } else if (window.angel && window.angel.userId && window.angel.tabType === 'doctors') {
            this.createTab('doctors', window.angel.tabName, window.angel.userId);
            window.angel.userId = null;
            window.angel.tabType = null;
            window.angel.tabName = null;
        } else if (window.angel && window.angel.userId && window.angel.tabType === 'patient_treatments') {
            this.createTab('patient_treatments', window.angel.tabName, window.angel.userId);
            window.angel.userId = null;
            window.angel.tabType = null;
            window.angel.tabName = null;
        } else if (window.angel && window.angel.nurseId) {
            this.createTab('nurse_patients', window.angel.tabName, window.angel.nurseId);
            window.angel.nurseId = null;
            window.angel.tabType = null;
            window.angel.tabName = null;
        } else if (window.angel && window.angel.drugId && window.angel.tabType === 'drug_patients') {
            this.createTab('drug_patients', window.angel.tabName, window.angel.drugId);
            window.angel.drugId = null;
            window.angel.tabType = null;
            window.angel.tabName = null;
        } else if (window.angel && window.angel.doctorId) {
            this.createTab('doc_patients', window.angel.tabName, window.angel.doctorId);
            window.angel.doctorId = null;
            window.angel.tabType = null;
            window.angel.tabName = null;
        } else if (window.angel && window.angel.userId && window.angel.tabType === 'doctor') {
            this.createTab('doctor', window.angel.tabName, window.angel.userId);
            window.angel.userId = null;
            window.angel.tabType = null;
            window.angel.tabName = null;
        } else if (window.angel && window.angel.userId && window.angel.tabType === 'patient') {
            this.createTab('patient', window.angel.tabName, window.angel.userId);
            window.angel.userId = null;
            window.angel.tabType = null;
            window.angel.tabName = null;
        } else if (window.angel && window.angel.userId && window.angel.tabType === 'nurse') {
            this.createTab('nurse', window.angel.tabName, window.angel.userId);
            window.angel.userId = null;
            window.angel.tabType = null;
            window.angel.tabName = null;
        } else if (window.angel && window.angel.moodId && window.angel.tabType === 'mood') {
            this.createTab('mood', window.angel.tabName, window.angel.moodId);
            window.angel.moodId = null;
            window.angel.tabType = null;
            window.angel.tabName = null;
        } else if (window.angel && window.angel.sideEffectId && window.angel.tabType === 'side_effect') {
            this.createTab('side_effect', window.angel.tabName, window.angel.sideEffectId);
            window.angel.sideEffectId = null;
            window.angel.tabType = null;
            window.angel.tabName = null;
        } else if (window.angel && window.angel.drugId && window.angel.tabType === 'drug_laboratories') {
            this.createTab('drug_laboratories', window.angel.tabName, window.angel.drugId);
            window.angel.drugId = null;
            window.angel.tabType = null;
            window.angel.tabName = null;
        } else if (window.angel && window.angel.drugId && window.angel.tabType === 'drug') {
            this.createTab('drug', window.angel.tabName, window.angel.drugId);
            window.angel.drugId = null;
            window.angel.tabType = null;
            window.angel.tabName = null;
        } else if (window.angel && window.angel.drugId && window.angel.tabType === 'drug_treatments') {
            this.createTab('drug_treatments', window.angel.tabName, window.angel.drugId);
            window.angel.drugId = null;
            window.angel.tabType = null;
            window.angel.tabName = null;
        } else if (window.angel && window.angel.treatmentId && window.angel.tabType === 'treatment') {
            this.createTab('treatment', window.angel.tabName, window.angel.treatmentId);
            window.angel.treatmentId = null;
            window.angel.tabType = null;
            window.angel.tabName = null;
        } else if (window.angel && window.angel.patientId && window.angel.tabType === 'patient_surveys') {
            this.createTab('patient_surveys', window.angel.tabName, window.angel.patientId, window.angel.panelName);
            window.angel.patientId = null;
            window.angel.tabType = null;
            window.angel.tabName = null;
            window.angel.panelName = null;
        } else if (window.angel && window.angel.hospitalId && window.angel.tabType === 'hospital') {
            this.createTab('hospital', window.angel.tabName, window.angel.hospitalId, window.angel.panelName);
            window.angel.hospitalId = null;
            window.angel.tabType = null;
            window.angel.tabName = null;
            window.angel.panelName = null;
        } else {
            this.createTab(this.tabName, this.lg.get('New') + ' ' + this.tabName);
        }
    }
    handleTabOptions = (value) => {
        this.setSelectedTab(value)
        this.setTabIndex(this.tabIndex + 1)
    }
}
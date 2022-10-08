import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PatientSurveyEffects from './PatientSurveyEffects';
import PatientSurveyMoods from './PatientSurveyMoods';
import PatientTreatments from './PatientTreatments';
import { useStore } from '../utils/store';
import Translation from '../utils/translation';

export default function PatientSurveys(props) {

  const { session, } = useStore();
  const [userSession,] = React.useState(session.user ? session.user : null);
  const lg = new Translation(userSession ? userSession.lang : 'en');

  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  React.useEffect(() => {
    setExpanded(props.panel);
  },[props.panel]);
  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {lg.get('Side effects')}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PatientSurveyEffects patientId={props.patientId} />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>{lg.get('Moods')}</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
            <PatientSurveyMoods patientId={props.patientId} />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
          {lg.get('Treatments')}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
           
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PatientTreatments patientId={props.patientId} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
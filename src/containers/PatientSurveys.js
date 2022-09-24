import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PatientSurveyEffects from './PatientSurveyEffects';
import PatientSurveyMoods from './PatientSurveyMoods';
import PatientTreatments from './PatientTreatments';

export default function PatientSurveys(props) {
  const [expanded, setExpanded] = React.useState(null);
  const [expanded1, setExpanded1] = React.useState(null);
  const [expanded2, setExpanded2] = React.useState(null);
  const [expanded3, setExpanded3] = React.useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  React.useEffect(() => {
    setExpanded(props.panel);
    console.log('aaaaaaa',props.panel)
  },[props.panel]);
  return (
    <div>
      <Accordion expanded={true} onChange={handleChange('panel1')}>
        <AccordionSummary
          
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Side effects
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PatientSurveyEffects patientId={props.patientId} />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={true} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Moods</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
            <PatientSurveyMoods patientId={props.patientId} />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={true} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Treatments
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
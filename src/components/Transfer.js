import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';
import AngelNurse from '../api/angel/nurse';

export default function Transfer(props) {
    const [checked, setChecked] = React.useState([0]);
    const [transfers, setTransfers] = React.useState([]);

    const fetchData = async () => {
        // run asynchronous tasks here
        const tr = await AngelNurse().transfers({ nurse_id: props.nurseId })
        setTransfers(tr)
    };
    
    React.useEffect(() => {
        fetchData();
    },[transfers]); // Note the curly braces around myFunction!

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    const getBack = async (transferId) =>  {
         await AngelNurse().recoverTransfer({ transfer_id: transferId });
        props.onPatientRecovered();
        fetchData();
    }
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {transfers && transfers.length ? transfers.map((transfer) => {
                return (
                    <ListItem
                        key={transfer.id}
                        secondaryAction={
                            <IconButton edge="end" aria-label="Get Back" onClick={() => getBack(transfer.id)}>
                                <RestartAltIcon />
                            </IconButton>
                        }
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={handleToggle(transfer.id)} dense>
                            <ListItemText>
                                <b>{transfer.id}</b>
                            </ListItemText>
                            <ListItemText
                                primary={'Patient ' + transfer.firstname+" "+transfer.lastname}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                           From Nurse {transfer.firstname_from+" "+transfer.lastname_from} 
                                        </Typography><br/>
                                        to {transfer.firstname_to+" "+transfer.lastname_to}
                                    </React.Fragment>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                );
            }):null}
        </List>
    );
}
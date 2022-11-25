import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';
import AppContext from '../contexts/AppContext';
import AngelScientist from '../api/angel/scientist';
import AngelUser from '../api/angel/user';

export default function LaboratoryContacts(props) {
    const [contacts, setLaboratoryContacts] = React.useState([]);
    const appContext = React.useContext(AppContext);
    const [userSession,] = React.useState(appContext.appState.user);
    
    const fetchData = async () => {
        const tr = await AngelScientist().list({ laboratory_id: props.laboratoryId,lang_id:userSession ? userSession.lang : 'en' })
        setLaboratoryContacts(tr)
    };
    
    React.useEffect(() => {
        fetchData();
    },[props.update,props.drugId]); 

    const onDelete = async (id) => {
        await AngelUser().delete({ids: id});
        props.onDeleted(id);
    }
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} update={props.update}>
            {contacts && contacts.length ? contacts.map((contact) => {
                return (
                    <ListItem
                        key={contact.id}
                        secondaryAction={
                            <IconButton edge="end" aria-label="Get Back" onClick={() => onDelete(contact.id)}>
                                <Delete color={'error'}/>
                            </IconButton>
                        }
                        disablePadding
                    >
                        <ListItemButton role={undefined} dense>
                            <ListItemText>
                                <b>{contact.id}#</b>
                            </ListItemText>
                            <ListItemText
                                primary={'' + contact.firstname + ' ' + contact.firstname}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            }):props.lg.get('No contact yet')}
        </List>
    );
}
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import AngelDrug from '../api/angel/drugs';
import { Delete } from '@mui/icons-material';
import AppContext from '../contexts/AppContext';

export default function SideEffects(props) {
    const [sideEffects, setSideEffects] = React.useState([]);
    const appContext = React.useContext(AppContext);
    const [userSession,] = React.useState(appContext.appState.user);

    const fetchData = async () => {
        if (props.drugId) {
            const tr = await AngelDrug().getEffects({ drug_id: props.drugId, lang_id: userSession ? userSession.lang : 'en' })
            setSideEffects(tr);
        }
    };
    React.useEffect(() => {
        fetchData();
    }, [props.update, props.drugId]);

    const onDelete = async (id) => {
        if(!appContext.appState.user.nurse_id) {
            await AngelDrug().deleteEffect({ ids: id });
            props.onDeleted(id);
        }
       
    }
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} update={props.update}>
            {sideEffects && sideEffects.length ? sideEffects.map((sideEffect) => {
                return (
                    <ListItem
                        key={sideEffect.id}
                        secondaryAction={
                            <IconButton edge="end" aria-label="Get Back" onClick={() => onDelete(sideEffect.id)}>
                                <Delete color={'error'} />
                            </IconButton>
                        }
                        disablePadding
                    >
                        <ListItemButton role={undefined} dense>
                            {/* <ListItemText>
                                <b>{sideEffect.id}#</b>
                            </ListItemText> */}
                            <ListItemText
                                primary={'' + sideEffect.name}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            }) : props.lg.get('No side effect')}
        </List>
    );
}
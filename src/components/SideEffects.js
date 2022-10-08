import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import AngelDrug from '../api/angel/drugs';
import { Delete } from '@mui/icons-material';

export default function SideEffects(props) {
    const [sideEffects, setSideEffects] = React.useState([]);

    const fetchData = async () => {
        const tr = await AngelDrug().getEffects({ drug_id: props.drugId,lang_id:'en' })
        setSideEffects(tr)
    };
    
    React.useEffect(() => {
        fetchData();
    },[props.drugId]); // Note the curly braces around myFunction!

    const onDelete = async (id) => {
        await AngelDrug().deleteEffect({id: id});
    }
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {sideEffects && sideEffects.length ? sideEffects.map((sideEffect) => {
                return (
                    <ListItem
                        key={sideEffect.id}
                        secondaryAction={
                            <IconButton edge="end" aria-label="Get Back" onClick={() => onDelete(sideEffect.id)}>
                                <Delete />
                            </IconButton>
                        }
                        disablePadding
                    >
                        <ListItemButton role={undefined} dense>
                            <ListItemText>
                                <b>{sideEffect.id}#</b>
                            </ListItemText>
                            <ListItemText
                                primary={'' + sideEffect.name}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            }):null}
        </List>
    );
}
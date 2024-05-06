import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import style from './style.module.css'
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 360,
    },
  },
};


export default function MultipleSelectCheckmarks(props) {
 const {
     state,
     onChangeInput,
 } = props
  return (

    // <form noValidate autoComplete="off">
    <div>
      <FormControl className={style.categories}>
        <InputLabel id="demo-multiple-checkbox-label">Specialities</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={state && state.values && state.values.categories ? state.values.categories : []}
          input={<OutlinedInput label="Categories" />}
          renderValue={(selected) => selected.join(', ')}
          onChange={(event) => onChangeInput(event.target.value, "categories")}
          MenuProps={MenuProps}
        >
          {state && state.categoriesList && state.categoriesList.map((item, index) => (
            <MenuItem  key={index} value={item.name}>
              <Checkbox checked={state && state.values && state.values.categories ? state.values.categories.indexOf(item.name) > -1 : []} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
    // </form>
  );
}

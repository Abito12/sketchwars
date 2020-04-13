import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import CategoryListView from './Categories';
import withRoot from '../helpers/withRoot';
import {mapCodeToLanguage} from '../helpers/utilities';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </Typography>
  );
}


function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%'
  },
  tab: {
    background: theme.palette.primary.light
  },
  panel: {
    background: theme.palette.primary.main
  }
}));

const ScrollableTabsButtonAuto = ({handleInvitationClick, handleSinglePlayer, categories}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [categoriesByLanguage, SetCategoriesByLanguage] = React.useState([]);
  
  React.useEffect(() => {
    if(!categories) return;
    const catByLang = {};
    categories.forEach(c => {
      let lan = c.language ? c.language : 'en';
      if(catByLang[lan])
          catByLang[lan].push(c);
      else
        catByLang[lan] = [c];        
    });
    SetCategoriesByLanguage(catByLang);
  }, []);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabs = () => {
    const langCodes = Object.keys(categoriesByLanguage);
    return langCodes.map((code, idx) => {
      return <Tab label={mapCodeToLanguage(code)} {...a11yProps(idx)} />;
    });
  }

  const renderPanels = () => {
    const langCodes = Object.keys(categoriesByLanguage);
    return langCodes.map((code, idx) => {
      return (
        <TabPanel className={classes.panel} value={value} index={idx}>
          <CategoryListView 
            handleInvitationClick={handleInvitationClick}
            categories={categoriesByLanguage[code]}
            handleSinglePlayer={handleSinglePlayer}  
          />
        </TabPanel>
      );
    })
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Tabs
          value={value}
          onChange={handleChange}
          className={classes.tab}
          TabIndicatorProps={{style: {background: '#035EAF', height: 5}}}
          style={{color: '#fff'}}
          //variant="scrollable"
          //scrollButtons="auto"
          //aria-label="scrollable auto tabs language"
          centered
        >
          {renderTabs()}
        </Tabs>
      </AppBar>
      {
        renderPanels()
      }
    </div>
  );
}


export default withRoot(ScrollableTabsButtonAuto);
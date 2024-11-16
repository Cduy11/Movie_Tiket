import { Box, Typography } from "@mui/material";
import PropTypes from 'prop-types'; 
function useTabPanel() {
    const TabPanel = (props) => {
      const { children, value, index, ...other } = props;
  
      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`vertical-tabpanel-${index}`}
          aria-labelledby={`vertical-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box sx={{ p: 3 }}>
              <Typography>{children}</Typography>
            </Box>
          )}
        </div>
      );
    };
  
    TabPanel.propTypes = {
      children: PropTypes.node,
      index: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    };
  
    const a11yProps = (index) => {
      return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
      };
    };
  
    return { TabPanel, a11yProps };
  }

  export default useTabPanel
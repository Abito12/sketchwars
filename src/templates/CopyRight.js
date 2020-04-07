import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import withRoot from '../helpers/withRoot';


const CopyRight = () => {
    return (
      <Typography variant="body2" color="text" align="center">
        {'Copyright © '}
        <Link color="inherit">
          Buzzle | All rights reserved
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
};

export default withRoot(CopyRight);;
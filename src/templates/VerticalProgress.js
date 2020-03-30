import React from "react";
import { lighten } from '@material-ui/core/styles';
import { Spring } from "react-spring/renderprops";

const VerticalProgress = ({ progress, p1=false }) => {

 const styles = {
    progress: {
        backgroundColor: p1 ? lighten('#f9ca24', 0.7) : lighten('#be2edd', 0.7),
        borderRadius: '3px',
        position: 'relative',
        width: '40px',
        height: '100px',
        display: 'inline-block',
        marginRight: '10px',
        marginLeft: '10px',
        overflow: 'hidden',
        boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'
      },
    progressBar: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        float: 'left',
        height: '100%',
        fontSize: '12px',
        lineHeight: '20px',
        color: '#fff',
        textAlign: 'center',
        backgroundColor: p1 ? '#f9ca24' : '#be2edd',        
        boxShadow: 'inset 0 -1px 0 rgba(0, 0, 0, 0.15)',
        transition: 'width 0.6s ease'
    },
    span: {
        fontSize: '10px',
        fontWeight: 'bolder'
    }
 }

  return (
    <Spring from={{ percent: 0 }} to={{ percent: progress }}>
      {({ percent }) => (
        <div style={styles.progress}>
          <div style={{ ...styles.progressBar, height: `${percent}%` }}>            
          </div>
        </div>
      )}
    </Spring>
  );
};

export default VerticalProgress;

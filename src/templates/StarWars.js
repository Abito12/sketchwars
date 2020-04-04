import React, {useEffect, useState}from "react";
import {useParams} from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import withRoot from '../helpers/withRoot';

import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import RedditIcon from '@material-ui/icons/Reddit';
import EmailIcon from '@material-ui/icons/Email';
import '../assets/css/component.css';


const StarWars = () => {

  const linkStyle = {
      width: '250px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: 'white'
  };

  const {gameId} = useParams();

  const [gameUrl, setGameUrl] = useState(null);

  useEffect(() => {
    const url = `${window.location.origin}/game/${gameId}`;
    setGameUrl(url);
  }, []);

  return (
    <>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="text" noWrap>
              Home
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="page">
          <div className="page-content">
            <i className="dark-bg"></i>
            <div className="layers-rock-last">
              <i className="star-0"></i>
              <i className="star-1"></i>
              <i className="star-2"></i>
              <i className="star-3"></i>
              <i className="star-4"></i>
              <i className="star-5"></i>
              <i className="star-6"></i>
              <i className="star-7"></i>
              <i className="star-8"></i>
              <i className="star-9"></i>
              <i className="star-10"></i>
              <i className="star-11"></i>
              <i className="star-12"></i>
              <div className="rock rock-1">
                <i className="dark-bg"></i>
              </div>
              <div className="rock rock-2">
                <i className="dark-bg"></i>
              </div>
              <div className="rock rock-3">
                <i className="dark-bg"></i>
              </div>
              <div className="rock rock-4">
                <i className="dark-bg"></i>
              </div>
              <div className="rock-bg">
                <i className="dark-bg"></i>
              </div>
            </div>
            <div className="layers-trees-3">
              <div className="tree-1">
                <i className="dark-bg"></i>
              </div>
              <div className="tree-2">
                <i className="dark-bg"></i>
              </div>
              <div className="tree-3">
                <i className="dark-bg"></i>
              </div>
              <div className="tree-4">
                <i className="dark-bg"></i>
              </div>
              <div className="tree-5">
                <i className="dark-bg"></i>
              </div>
              <div className="tree-6">
                <i className="dark-bg"></i>
              </div>
            </div>
            <div className="layers-trees-2">
              <div className="tree-1">
                <i className="dark-bg">
                  <i className="i-first"></i>
                  <i className="i-second"></i>
                </i>
                <i className="i-first"></i>
                <i className="i-second"></i>
              </div>
              <div className="tree-2">
                <i className="dark-bg">
                  <i className="i-first"></i>
                  <i className="i-second"></i>
                </i>
                <i className="i-first"></i>
                <i className="i-second"></i>
              </div>
              <div className="tree-3">
                <i className="dark-bg">
                  <i className="i-first"></i>
                  <i className="i-second"></i>
                </i>
                <i className="i-first"></i>
                <i className="i-second"></i>
              </div>
              <div className="tree-4">
                <i className="dark-bg">
                  <i className="i-first"></i>
                  <i className="i-second"></i>
                </i>
                <i className="i-first"></i>
                <i className="i-second"></i>
              </div>
            </div>
            <div className="layers-rock-first">
              <i className="rock-bg"></i>
              <div className="rock-left-content">
                <i className="rock-2">
                  <i className="rock-top"></i>
                  <i className="rock-left"></i>
                </i>
                <i className="rock-1">
                  <i className="rock-left"></i>
                  <i className="rock-right"></i>
                  <i className="rock-center"></i>
                </i>
                <i className="rock-3">
                  <i className="rock-left"></i>
                  <i className="rock-top">
                    <i className="rock-top-right"></i>
                  </i>
                </i>
              </div>
              <div className="rock-right-content">
                <i className="rock-1">
                  <i className="rock-top-back"></i>
                  <i className="rock-top-front"></i>
                  <i className="rock-bottom-back"></i>
                  <i className="rock-bottom-front"></i>
                </i>
                <i className="rock-2">
                  <i className="rock-bottom"></i>
                  <i className="rock-bottom-front"></i>
                  <i className="rock-top"></i>
                </i>
              </div>
            </div>
            <div className="layers-kylo">
              <div className="kylo">
                <div className="kylo-head">
                  <i className="head-bg"></i>
                  <i className="head-content">
                    <i className="head-content-mask"></i>
                  </i>
                  <i className="head">
                    <i className="head-last"></i>
                    <i className="head-light"></i>
                    <i className="head-second"></i>
                    <i className="head-first"></i>
                    <i className="head-mask">
                      <i className="head-mask-top"></i>
                      <i className="head-mask-bottom">
                        <i className="head-mask-bottom-place"></i>
                      </i>
                    </i>
                  </i>
                </div>
                <div className="kylo-body-top">
                  <i className="kylo-body-top-black"></i>
                  <i className="kylo-body-top-shoulders">
                    <i className="shoulders-left"></i>
                    <i className="shoulders-right"></i>
                  </i>
                </div>
                <div className="kylo-body-bottom">
                  <i className="kylo-body-bottom-black"></i>
                </div>
                <i className="kylo-hand-left">
                  <i className="hand-arm">
                    <i className="hand-last">
                      <i className="hand-finger-right"></i>
                      <i className="lightsaber">
                        <i className="lightsaber-light-bg"></i>
                        <i className="lightsaber-cross-content">
                          <i className="lightsaber-cross-light">
                            <i className="light-item-1"></i>
                            <i className="light-item-2"></i>
                          </i>
                          <i className="lightsaber-cross"></i>
                        </i>
                        <i className="lightsaber-light">
                          <i className="light-item-1"></i>
                          <i className="light-item-2"></i>
                          <i className="light-item-3"></i>
                          <i className="light-item-4"></i>
                          <i className="light-item-5"></i>
                          <i className="light-item-6"></i>
                          <i className="light-item-7"></i>
                          <i className="light-item-8"></i>
                          <i className="light-item-9"></i>
                        </i>
                      </i>
                    </i>
                  </i>
                </i>
                <i className="kylo-hand-right">
                  <i className="hand-arm">
                    <i className="hand-last">
                      <i className="hand-finger-left"></i>
                    </i>
                  </i>
                </i>
              </div>
            </div>
            <div className="layers-trees-1">
              <div className="tree-left-content">
                <i className="i-right-top"></i>
                <i className="i-right-middle"></i>
                <i className="i-right-bottom"></i>
                <i className="limb">
                  <i className="limb-bottom"></i>
                  <i className="limb-1">
                    <i className="limb-2">
                      <i className="limb-3-second"></i>
                      <i className="limb-3">
                        <i className="limb-4">
                          <i className="limb-5-second"></i>
                          <i className="limb-5-first"></i>
                        </i>
                      </i>
                    </i>
                  </i>
                </i>
              </div>
              <div className="tree-right-content">
                <i className="i-left-top">
                  <i className="top-limb">
                    <i className="top-limb-1">
                      <i className="top-limb-2">
                        <i className="top-limb-3"></i>
                      </i>
                    </i>
                  </i>
                </i>
                <i className="i-left-bottom">
                  <i className="bottom-limb">
                    <i className="bottom-limb-1">
                      <i className="bottom-limb-2">
                        <i className="bottom-limb-3">
                          <i className="bottom-limb-4"></i>
                        </i>
                      </i>
                    </i>
                  </i>
                </i>
                <i className="center-limb">
                  <i className="center-limb-1">
                    <i className="center-limb-2"></i>
                  </i>
                </i>
                <i className="i-right-top"></i>
                <i className="i-right-bottom">
                  <i></i>
                </i>
              </div>
            </div>
          </div>
          <div className="page-deco"></div>
        </div>
        <div lg={12} style={{display: 'flex', flexDirection: 'column', padding: '12px', justifyContent: 'center',
          alignItems: 'center'
        }}>
            <Button
              variant="contained"
              color="secondary"
              style={{maxWidth: '400px', marginBottom: '16px'}}
            >
              Play now</Button>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Button
                  variant="contained"
                  color="secondary"
                  variant="outlined"
                  size='small'
                  style={{textTransform: 'lowercase'}}
                >
                  <span style={linkStyle}>{gameUrl}</span>
                  
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{marginLeft: '6px'}}
                >
                  Copy
                </Button>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', marginTop: '16px', justifyContent: 'space-around'}}>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${gameUrl}`} target="_blank" rel="noopener noreferrer"> 
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{border: 'none'}}
                >
                                   
                    <FacebookIcon style={{ color: '#3b5998' }} fontSize="large" />
                  
                </Button>
                </a>
                <a href={`https://api.whatsapp.com/send?text=Hi, Play with me on Quizup! Click here: ${gameUrl}`} target="_blank" rel="noopener noreferrer">                    
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{border: 'none'}}
                >                  
                      <WhatsAppIcon style={{ color: '#128C7E' }} fontSize="large" />                                    
                </Button>
                </a>
                <a href={`http://www.reddit.com/submit?url=${gameUrl}&title=Play with me on Quizup. Click on the URL`} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{border: 'none'}}
                >                  
                    <RedditIcon style={{ color: '#FF4301' }} fontSize="large" />                  
                </Button>
                </a>
                <a href="mailto:friend@site.com?subject=I challenge you to a game of quizup" rel="noopener noreferrer">
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{border: 'none'}}
                >
                  
                    <EmailIcon style={{ color: '#E2E2E2' }} fontSize="large" />                  
                </Button>
                </a>
            </div>
        </div>
        
    </>
  );
};


            
            
        

export default withRoot(StarWars);
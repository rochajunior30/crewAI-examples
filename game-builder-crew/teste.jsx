import {
    Typography,
    Box,
    Avatar,
    Card,
    Grid,
    styled,
    useTheme,
    Button
  } from '@mui/material';
  
import ArrowDownwardTwoToneIcon from '@mui/icons-material/ArrowDownwardTwoTone';
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';
import ArrowUpwardTwoToneIcon from '@mui/icons-material/ArrowUpwardTwoTone';
import SupportTwoToneIcon from '@mui/icons-material/SupportTwoTone';
import YardTwoToneIcon from '@mui/icons-material/YardTwoTone';
import SnowmobileTwoToneIcon from '@mui/icons-material/SnowmobileTwoTone';

import CountUp from 'react-countup';
import MouseIcon from '@mui/icons-material/Mouse';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ReviewsIcon from '@mui/icons-material/Reviews';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import ArrowDownwardTwoTone from '@mui/icons-material/ArrowDownwardTwoTone';

import { useState, useEffect } from 'react';
import { useAnuncio } from '../contexts/AnuncioContext';
import { useGraficos } from '../contexts/GraficosContext';
import api from '../../config/Api';

  const AvatarWrapper = styled(Avatar)(
    ({ theme }) => `
        color:  #FFFF;
        background-color: black;
        width: spacing(5.5)};
        height: spacing(5.5)};
  `
  );
  
export default function Block1() {
  
    const { 
      dataEscolhida, 
      anuncio, 
      datasAnuncio, 

      isVisible,
    } = useAnuncio();

    const {
      setImpressoesDatas, 
      setCliquesDatas, 
    } = useGraficos();
  
    const [ctr, setCtr] = useState([])
    const [cpc, setCpc] = useState([])
    const [cpm, setCpm] = useState([])
    const [impressoes, setImpressoes] = useState([])
    const [cliques, setCliques] = useState([])
    const [valorGasto, setValorGasto] = useState([])
  
    const fetchData = async () => {
      try {
        const response = await api.get('/campanhas')
        const dados = response.data;

        const dadosDataEscolhida = response.data.filter(item => item.ad_name === anuncio && item.date_start === dataEscolhida);
        console.log('Dados da data escolhida:', dadosDataEscolhida);
        
        setCtr(dadosDataEscolhida[0].ctr)
        setCpc(dadosDataEscolhida[0].cpc)
        setCpm(dadosDataEscolhida[0].cpm)
        setImpressoes(dadosDataEscolhida[0].impressions)
        setCliques(dadosDataEscolhida[0].clicks)
        setValorGasto(dadosDataEscolhida[0].spend)
  
  
        const dadosImpressoes = [];
        const dadosCliques = [];
        const dadosCPM = [];
        const dadosCTR = [];
        const dadosCPC = [];
        
  
        datasAnuncio.forEach(async (data) => {
          const dadosDataEscolhida = dados.filter(item => item.ad_name === anuncio && item.date_start === data);

          if (dadosDataEscolhida.length > 0) {
            dadosImpressoes.push(dadosDataEscolhida[0].impressions);
          } else {
            dadosImpressoes.push(0);
          }
        });
        setImpressoesDatas(dadosImpressoes);

        datasAnuncio.forEach(async (data) => {
          const dadosDataEscolhida = dados.filter(item => item.ad_name === anuncio && item.date_start === data);

          if (dadosDataEscolhida.length > 0) {
            dadosCliques.push(dadosDataEscolhida[0].clicks);
          } else {
            dadosCliques.push(0);
          }
        });
        setCliquesDatas(dadosCliques);
  
      } catch (e) {
        console.log(e)
      }
    }
    
    useEffect(() => {
      fetchData()
    }, [dataEscolhida, datasAnuncio, setImpressoesDatas]);
  
    const theme = useTheme();
  
    return (
      <>
      {isVisible && (
      <Grid container spacing={2}>
        
        <Grid item xs={12} sm={6} lg={2}>
          <Card
            sx={{
              
              px: 3,
              pb: 3,
              pt: 3,
              color: 'white',
              backgroundColor: 'transparent',
              border: `1px solid rgba(255, 255, 255, 0.126)`,
              borderRadius: 3
            }}
          >
            <Box display="flex" alignItems="center">
              <AvatarWrapper style={{backgroundColor: '#384E75'}}>
                <MouseIcon fontSize="small"/>
              </AvatarWrapper>
              <Typography
                sx={{
                  ml: 1.5,
                  fontSize: 25,
                  fontWeight: '700',
                  fontFamily: "Poppins",
                }}
                variant="subtitle2"
                component="div"
              >
                Cliques
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                ml: -2,
                pt: 2,
                justifyContent: 'center',
              }}
            >
              {/* <ArrowDownwardTwoToneIcon/> */}
              <Typography
                sx={{
                  pl: 1,
                  fontSize: 35,
                  fontWeight: '700',
                  fontFamily: "Poppins",
                }}
                variant="h1"
              >
                <CountUp
                  start={0}
                  end={cliques}
                  duration={4}
                  separator=""
                  delay={3}
                  decimals=""
                  decimal=""
                  prefix=""
                  suffix=""
                />
              </Typography>
            </Box>
            <Button><ArrowDownwardTwoTone /></Button>
          </Card>
        </Grid>
  
        <Grid item xs={12} sm={6} lg={2}>
          <Card
            sx={{
              
              px: 3,
              pb: 3,
              pt: 3,
              color: 'white',
              backgroundColor: 'transparent',
              border: `1px solid rgba(255, 255, 255, 0.126)`,
              borderRadius: 3
            }}
          >
            <Box display="flex" alignItems="center">
              <AvatarWrapper style={{backgroundColor: '#384E75'}}
              >
                <RemoveRedEyeIcon fontSize="small" />
              </AvatarWrapper>
              <Typography
                sx={{
                  ml: 1.5,
                  fontSize: 20,
                  fontWeight: '700',
                  fontFamily: "Poppins",
                }}
                variant="subtitle2"
                component="div"
              >
                Impressões
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                ml: -2,
                pt: 2,
                justifyContent: 'center'
              }}
            >
              {/* <ArrowUpwardTwoToneIcon/> */}
              <Typography
                sx={{
                  pl: 1,
                  fontSize: 35,
                  fontWeight: '700',
                  fontFamily: "Poppins",
                }}
                variant="h1"
              >
                <CountUp
                  start={0}
                  end={impressoes}
                  duration={4}
                  separator=""
                  delay={3}
                  decimals=""
                  decimal=""
                  prefix=""
                  suffix=""
                />
              </Typography>
            </Box>
            <Button><ArrowDownwardTwoTone /></Button>
          </Card>
        </Grid>
  
        <Grid item xs={12} sm={6} lg={2}>
          <Card
            sx={{
              
              px: 3,
              pb: 3,
              pt: 3,
              color: 'white',
              backgroundColor: 'transparent',
              border: `1px solid rgba(255, 255, 255, 0.126)`,
              borderRadius: 3
            }}
          >
            <Box display="flex" alignItems="center">
              <AvatarWrapper style={{backgroundColor: '#1D2AFF'}}
              >
                <LocalOfferIcon fontSize="small" />
              </AvatarWrapper>
              <Typography
                sx={{
                  ml: 1.5,
                  fontSize: 25,
                  fontWeight: '700',
                  fontFamily: "Poppins",
                }}
                variant="subtitle2"
                component="div"
              >
                CPM
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                ml: -2,
                pt: 2,
                justifyContent: 'center'
              }}
            >
              {/* <ArrowDownwardTwoToneIcon /> */}
              <Typography
                sx={{
                  pl: 1,
                  fontSize: 35,
                  fontWeight: '700',
                  fontFamily: "Poppins",
                }}
                variant="h1"
              >
                <CountUp
                  start={0}
                  end={cpm}
                  duration={4}
                  separator=""
                  delay={3}
                  decimals={3}
                  decimal=","
                  prefix=""
                  suffix=""
                />
              </Typography>
            </Box>
            <Button><ArrowDownwardTwoTone /></Button>
          </Card>
        </Grid>
  
        <Grid item xs={12} sm={6} lg={2}>
          <Card
            sx={{
              
              px: 3,
              pb: 3,
              pt: 3,
              color: 'white',
              backgroundColor: 'transparent',
              border: `1px solid rgba(255, 255, 255, 0.126)`,
              borderRadius: 3
            }}
          >
            <Box display="flex" alignItems="center">
              <AvatarWrapper style={{backgroundColor: '#52C824'}}
              >
                <ReviewsIcon fontSize="small" />
              </AvatarWrapper>
              <Typography
                sx={{
                  ml: 1.5,
                  fontSize: 25,
                  fontWeight: '700',
                  fontFamily: "Poppins",
                }}
                variant="subtitle2"
                component="div"
              >
                CTR
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                ml: -2,
                pt: 2,
                justifyContent: 'center'
              }}
            >
              <Typography
                sx={{
                  pl: 1,
                  fontSize: 35,
                  fontWeight: '700',
                  fontFamily: "Poppins",
                }}
                variant="h1"
                >
                <CountUp
                  start={0}
                  end={ctr}
                  duration={4}
                  separator=""
                  delay={3}
                  decimals={3}
                  decimal=","
                  prefix=""
                  suffix=""
                  />
              </Typography>
              {/* <ArrowUpwardTwoToneIcon style={{color: 'green'}}/> */}
            </Box>
            <Button><ArrowDownwardTwoTone /></Button>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} lg={2}>
          <Card
            sx={{
              px: 3,
              pb: 3,
              pt: 3,
              color: 'white',
              backgroundColor: 'transparent',
              border: `1px solid rgba(255, 255, 255, 0.126)`,
              borderRadius: 3
            }}
          >
            <Box display="flex" alignItems="center">
              <AvatarWrapper style={{backgroundColor: '#FCA114'}}
              >
                <CurrencyExchangeIcon fontSize="small" />
              </AvatarWrapper>
              <Typography
                sx={{
                  ml: 1.5,
                  fontSize: 25,
                  fontWeight: '700',
                  fontFamily: "Poppins",
                }}
                variant="subtitle2"
                component="div"
              >
                CPC
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                ml: -2,
                pt: 2,
                justifyContent: 'center'
              }}
            >
              <Typography
                sx={{
                  pl: 1,
                  fontSize: 35,
                  fontWeight: '700',
                  fontFamily: "Poppins",
                }}
                variant="h1"
              >
                <CountUp
                  start={0}
                  end={cpc}
                  duration={4}
                  separator=""
                  delay={3}
                  decimals={2}
                  decimal=","
                  prefix=""
                  suffix=""
                />
              </Typography>
              {/* <ArrowDownwardTwoToneIcon style={{color: 'red'}}/> */}
            </Box>
            <Button><ArrowDownwardTwoTone /></Button>
          </Card>
        </Grid>
  
        <Grid item xs={12} sm={6} lg={2}>
          <Card
            sx={{
              px: 3,
              pb: 3,
              pt: 3,
              color: 'white',
              backgroundColor: 'transparent',
              border: `1px solid rgba(255, 255, 255, 0.126)`,
              borderRadius: 3
            }}
          >
            <Box display="flex" alignItems="center">
              <AvatarWrapper style={{backgroundColor: '#FF1A4A'}}
              >
                <MoneyOffIcon fontSize="small" />
              </AvatarWrapper>
              <Typography
                sx={{
                  ml: 1.5,
                  fontSize: 20,
                  fontWeight: '700',
                  fontFamily: "Poppins",
                }}
                variant="subtitle2"
                component="div"
              >
                Valor usado
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                ml: -2,
                pt: 2,
                pb: 4.5,
                justifyContent: 'center'
              }}
            >
              
              <Typography
                sx={{
                  pl: 1,
                  fontSize: 35,
                  fontWeight: '700',
                  fontFamily: "Poppins",
                }}
                variant="h1"
              >
                <CountUp
                  start={0}
                  end={valorGasto}
                  duration={4}
                  separator=""
                  delay={3}
                  decimals={2}
                  decimal=","
                  prefix="R$"
                  suffix=""
                />
              </Typography>
            </Box>
          </Card>
        </Grid>

      </Grid>
      )}
    </>
    );
  }
  

import React from 'react';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import FavoriteIcon from "@mui/icons-material/Favorite"
import { PlayArrowOutlined, PlayArrowRounded, PlayArrowTwoTone } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const PlayIcon = styled.div`
    padding: 10px;
    border-radius: 50%;
    z-index: 100;
    display: flex;
    align-items: center;
    background: #9000ff !important;
    color: white !important;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    position: absolute !important;
    top: 45%;
    right: 10%;
    display: none;
    transition: all 0.4s ease-in-out;
    box-shadow: 0 0 16px 4px #9000ff50 !important;
`;



const Card = styled.div`
    position: relative;
    text-decoration: none;
    background-color: ${( {theme}) => theme.card};
    max-width: 250px;
    height: 320px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 16px;
    border-radius: 6px;
    box-shadow: 0 0 16px 0 rgba(0,0,0,0.1);
    &:hover{
        cursor: pointer;
        transform: translateY(-8px);
        transition: all 0.4s ease-in-out;
        box-shadow: 0 0 18px 0 rgba (0,0,0,0.3);
        filter: brightness(1.3);
    }

    &:hover ${PlayIcon}{
        display: flex;

    }
`;

const Top = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    position: relative;
`;


const CardImage = styled.img`
    object-fit: cover;
    width : 220px;
    height: 140px;
    border-radius: 14px;
    box-shadow: 0 4px 30px rgba(0,0,0, 0.3);
    &hover {
        box-shadow: 0 4px 30px rgba(0,0,0,0.4);
    }
`;


const CardInformation = styled.div`
    display: flex;
    align-items: flex-end;
    font-weight: 450;
    padding: 14px 0px 0px 0px;
    width: 100%;
`;


const MainInfo = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    gap: 4px;
`;


const Title = styled.div`
    overflow: hidden;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({theme}) => theme.text_primary};
    text-decoration: none;
`;


const Description = styled.div`
    overflow: hidden;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({theme}) => theme.text_primary};
    font-size: 12px;
`;

const CreatorsInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-top: 6px;
`;

const Creator = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;

`;

const CreatorName = styled.div`
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${({theme}) => theme.text_secondary};
`;


const Views = styled.div`
    font-size: 10px;
    color: ${({ theme }) => theme.text_secondary};
    width: max-content;
`;

const Favorite = styled(IconButton)`
    color: white;
    top: 8px;
    right 6px;
    padding: 6px !important;
    border-radius: 50%;
    z-index: 100;
    display: flex;
    align-items: center;
    background: ${({theme}) => theme.text_secondary + 95 } !important;
    color: white !important;
    position: absolute !important;
    backdrop-filter: blur(4px);
    box-shadow: 0 0 16px 6px #222423 !important;

`;





const PodcastCard = () => {
  return (
    <Card>
        <div>
            <Link to="/PSL/live" style={{ textDecoration: 'none' }}>
            <CardInformation style={ {textDecoration: "none"} }>
                <MainInfo>
                <CardImage src="data:image/jpeg;base64,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"/>
                    <Title style={ {textDecoration: "none"} }> PSL PAKISTAN SUPER LEAGUE </Title>
                    <Description style={ {textDecoration: "none"} }>
                        

                        PSL Live refers to the live broadcasting and streaming of matches from the Pakistan Super League (PSL), a professional Twenty20 cricket league in Pakistan. Fans can watch live games, enjoy real-time updates, and follow the latest news and highlights of the tournament. 
                    </Description>
                    <CreatorsInfo>
                        <Creator>
                            <Avatar> M </Avatar>
                            <CreatorName>Maryam</CreatorName>
                        </Creator>
                        <Views> live </Views>
                    </CreatorsInfo>
                </MainInfo>
            </CardInformation>
            </Link>
        </div>
        {/* <PlayIcon>=
            <PlayArrowTwoTone style={ {width:"10px" , height: "10px"} } />
        </PlayIcon> */}
        
        
    </Card>
  )
}

export default PodcastCard
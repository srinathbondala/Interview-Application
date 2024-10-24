import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import { gsap } from 'gsap';
// import { useGSAP } from '@gsap/react'
import useToken from '../../useToken'
import { 
    Card, 
    CardHeader, 
    CardContent, 
    IconButton, 
    Typography, 
    Avatar, 
    Button,  
} from '@mui/material';


const UserCard = (props) => {
    const { checkToken } = useToken();
    // useGSAP(() => {
    //     gsap.fromTo('.card', { y: '200', opacity: 0 },
    //       { y: 0, opacity: 1, duration: 0.5, ease:'back.in', stagger: 0.25, delay: 0 });
    //   })
    const navigate = useNavigate();
    const { _id,jobId, companyName, role, technicalSkills, salaryRange, description,islogged } = props;
    function handleApply(jobId){
        if(checkToken()){
            navigate(`/user/apply/${jobId}`);
        }
        else{
            navigate('/login');
        }
    }
    return (
        <Card className='card' elevation={2} sx={{ borderRadius: 2,background:`url('/imgs/cardBg5.jpg')`,backgroundPosition:'center',backgroundSize:'cover', transition: '0.3s', '&:hover': { boxShadow: 6 }, mb: 2,display:'flex',flexDirection:'column', height:'100%'}}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'primary.main', color: 'white' }}>
                        {companyName[0].toUpperCase()}
                    </Avatar>
                }
                title={
                    <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '1.2rem' }}>
                        {companyName}
                    </Typography>
                }
            />
            <CardContent>
                <Typography variant='body2' color='grey' sx={{ 
                    mb: 1,
                    maxHeight: '1.5em',
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    whiteSpace: 'nowrap' 
                }}>
                    Technical Skills: {technicalSkills.join(', ')}
                </Typography>
                {salaryRange && (
                    <Typography variant='body2' color='grey' sx={{ mb: 1 }}>
                        Salary Range: {salaryRange}
                    </Typography>
                )}
                {description && (
                    <Typography variant='body2' color='grey' sx={{ 
                        mb: 1,
                        maxHeight: '4.5em',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                     }}>
                        {description}
                    </Typography>
                )}
            </CardContent>
            <Button sx={{ m: 1 ,border:'1px solid'}} variant="outlined" color="primary"  onClick={() => handleApply(_id)}>
                Apply
            </Button>
        </Card>
    );
};

export default UserCard;

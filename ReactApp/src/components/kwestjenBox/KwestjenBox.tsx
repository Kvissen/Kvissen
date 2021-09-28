import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export interface Kwestjen {
    number: number,
    pictureURL?: string,
    question: string,
}

export default function Kwestjen (kwestjen: Kwestjen) {
    return (
        <Card sx={{minWidth:300, maxWidth:500 , backgroundColor: "lightgray"}} raised={false} >
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                    Kwestjen No. {kwestjen.number}
                </Typography>
                <Typography variant="body1">
                    {kwestjen.question}
                </Typography>
            </CardContent>
        </Card>
    );
}
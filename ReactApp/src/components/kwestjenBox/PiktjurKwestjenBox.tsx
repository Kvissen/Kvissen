import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export interface Kwestjen {
    number: number,
    picturePath?: string,
    question: string,
}

export default function PiktjurKwestjenBox (kwestjen: Kwestjen) {
    return (
        <Card sx={{minWidth:300, maxWidth:500 , backgroundColor: "lightgray"}} raised={false} >
            <CardMedia
                sx={{minHeight: 150, maxHeight: 400}}
                component="img"
                image={kwestjen.picturePath}
                alt="Todo"
            />
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
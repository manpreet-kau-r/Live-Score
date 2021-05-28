import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { getMatchDetail } from "../api/Api";
import  vs from '../img/vs.png';

const MyCard = ({match}) =>
{
    const [detail, setDetail] = useState({});
    const [open, setOpen] = useState(false);

    const handleOpen = () =>
    {
        setOpen(true);
    };

    const handleClose = () =>
    {
        setOpen(false);
    };

    const handleClick = (id) =>
    {
        getMatchDetail(id).then(data => { setDetail(data); handleOpen(); })
                            .catch(error => console.log(error));
    };
    
    const getMatchCart = () =>
    {
        return (
            <Card style={{ marginTop: 15 }}>
            
                <CardContent>
                    <Grid container justify="center" spacing={4} alignItems="center">
                        
                        <Grid item>
                            <Typography variant="h5">{ match["team-1"] }</Typography>
                        </Grid>
                        <Grid item>
                            <img src={vs} style={{ width: 85 }} alt="vs" />
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">{ match["team-2"] }</Typography>
                        </Grid>

                    </Grid>
                </CardContent>
                
                <CardActions>
                    <Grid container justify="center" style={{ marginBottom: 5 }}>
                        
                        <Button variant="contained" color="primary" onClick = {() => handleClick(match.unique_id)}>
                            Show Details
                        </Button>
                        <Button style={{ marginLeft: 5 }} variant="contained" color="primary">
                            Start Time {new Date(match.dateTimeGMT).toLocaleString()}
                        </Button>

                    </Grid>
                </CardActions>

            </Card>
        );
    };

    const getDialog = () =>
    {
        return (
            <Dialog open={open} onClose={handleClose}>
                
                <DialogTitle id="alert-dialog-title">{"Match Detail..."}</DialogTitle>
                
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        <Typography>{detail.stat}</Typography>
                        <Typography>
                            Match <span style={{ fontStyle: "italic", fontWeight: "bold" }}>{detail.matchStarted ? "Started" : "Still not started"}</span>
                        </Typography>
                        <Typography>
                            Score <span style={{ fontStyle: "italic", fontWeight: "bold" }}>{detail.score}</span>
                        </Typography>
                        
                    </DialogContentText>    
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>Close</Button>
                </DialogActions>

            </Dialog>
        );
    };

    return (
        <Fragment>
            {getMatchCart()}
            {getDialog()}
        </Fragment>
        
    );
    
}

export default MyCard;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
	image: {
		height: 200,
		backgroundSize: 'contain'
	},
	card: {
		minHeight: 400
	}
});

export default function ItemCard(props) {

	const classes = useStyles();

	return (
		<Card>
			<CardActionArea className={classes.card}>
				<CardMedia
					className={classes.image}
					image={props.item.thumbnail.path+'.'+props.item.thumbnail.extension}
					title={props.item.name}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{props.item.name}
         			</Typography>
					{props.item.description ?
						<Typography variant="body2" color="textSecondary" component="p">
							{ props.item.description.length >= 250 ? props.item.description.substr(0,250)+'...' : props.item.description.substr(0,250) }
						</Typography>
						:
						<Typography variant="subtitle2" color="textSecondary" component="h4">
							Description is empty !
						</Typography>
					}
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
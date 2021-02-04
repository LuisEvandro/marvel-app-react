import React, { useEffect, useState, ChangeEvent} from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '../components/card';
import axios from 'axios';
import GetApi from '../api/marvel';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(() =>
	createStyles({
		marginPagination: {
			marginBottom: 50,
			marginTop: 50,
		},
		styleLoader: {
			marginBottom: 100,
			marginTop: 100,
			textAlign: "center"
		}
	})
);

export default function Characters() {
	const classes = useStyles();
	const [ data , setData ] = useState([]);
	const [ characters , setCharacters ] = useState([]);

	const [page, setPage] = useState(1);
	const handleChange = (event, value) => {
		setPage(value);
	};

	useEffect(() => {
		setCharacters([]);
		let orderBy = 'name';
		let limit = 15;
		let offset = ((page - 1) * limit);

		const urlApi = GetApi(`v1/public/characters?orderBy=${orderBy}&limit=${limit}&offset=${offset}`);

		axios.get(urlApi).then(resp => {
			setData(resp.data.data);
			setCharacters(resp.data.data.results);
		});

	}, [page]);

	return (
		<Container fixed>
			<Grid container spacing={3}>
				<Grid item xs={12} className={classes.marginPagination}>
					<Pagination color="standard" count={Math.round(data.total / 15)} page={page} onChange={handleChange} />
				</Grid>
				{characters.length > 0 ?
						<>
							{characters.map(characterItem => {
								return 	<Grid item xs={12} sm={6} md={4} key={characterItem.name}> 
											<Card key={characterItem.name} item={characterItem} /> 
										</Grid>
							})}
						</>
					:
					<Grid item xs={12} className={classes.styleLoader}>
						<CircularProgress size={60} color="secondary" />
					</Grid>
				}
				<Grid item xs={12} className={classes.marginPagination} >
					<Pagination color="standard" count={Math.round(data.total / 15)} page={page} onChange={handleChange} />
				</Grid>
			</Grid>
		</Container>
	);
}
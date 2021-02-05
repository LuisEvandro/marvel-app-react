import React, { useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '../components/card';
import axios from 'axios';
import GetApi from '../api/marvel';
import Pagination from '@material-ui/lab/Pagination';
import Skeleton from '@material-ui/lab/Skeleton';
import { useHistory } from "react-router-dom";
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(() =>
	createStyles({
		marginPagination: {
			marginBottom: 50,
			marginTop: 50,
		},
		styleLoader: {
			marginBottom: 100,
			marginTop: 25,
			textAlign: "center"
		},
		styleBoxTextEmpty: {
			marginTop: 50,
			textAlign: "center",
		},
		styleTextEmpty: {
			textTransform: 'uppercase',
			color: '#393939'
		}
	})
);

export default function Characters() {
	const classes = useStyles();
	const [ data , setData ] = useState([]);
	const [ characters , setCharacters ] = useState([]);
	let history = useHistory();

	const [page, setPage] = useState(1);
	const handleChange = (event, value) => {
		setPage(value);
	};

	const openDatail = (id) => () => {
		history.push("/Characters/"+id);	
	};

	useEffect(() => {
		setCharacters([]);
		let orderBy = 'name';
		let limit = 15;
		let offset = ((page - 1) * limit);
		let search = '';

		let urlRequest = search ? `v1/public/characters?nameStartsWith=${search}&orderBy=${orderBy}&limit=${limit}&offset=${offset}` : `v1/public/characters?orderBy=${orderBy}&limit=${limit}&offset=${offset}`;

		const urlApi = GetApi(urlRequest);

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
								return 	<Grid item xs={12} sm={6} md={4} key={characterItem.name} onClick={openDatail(characterItem.id)}>
											<Card key={characterItem.name} item={characterItem} /> 
										</Grid>
							})}
						</>
					:
					<>
						<Grid item xs={12} className={classes.styleBoxTextEmpty}>
							{data.count === 0 ? 
								<Typography variant="h6" className={classes.styleTextEmpty} gutterBottom>
									Sem Resultados
								</Typography>
								:
								<Typography variant="h6" className={classes.styleTextEmpty} gutterBottom>
									Carregando ...
								</Typography>
							}
						</Grid>
						<Grid item xs={12} sm={6} md={4} className={classes.styleLoader}>
							<Skeleton variant="rect" height={200} animation="wave" />
							<Skeleton variant="text" animation="wave" width="100%" />
							<Skeleton variant="text" animation="wave" width="85%" />
						</Grid>
						<Grid item xs={12} sm={6} md={4} className={classes.styleLoader}>
							<Skeleton variant="rect" height={200} animation="wave" />
							<Skeleton variant="text" animation="wave" width="100%" />
							<Skeleton variant="text" animation="wave" width="85%" />
						</Grid>
						<Grid item xs={12} sm={6} md={4} className={classes.styleLoader}>
							<Skeleton variant="rect" height={200} animation="wave" />
							<Skeleton variant="text" animation="wave" width="100%" />
							<Skeleton variant="text" animation="wave" width="85%" />
						</Grid>
					</>
				}
				<Grid item xs={12} className={classes.marginPagination} >
					<Pagination color="standard" count={Math.round(data.total / 15)} page={page} onChange={handleChange} />
				</Grid>
			</Grid>
		</Container>
	);
}
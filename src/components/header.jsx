import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../images/logo_marvel.svg';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles({
	menuButton: {
		marginRight: 15,
	},
	drawer: {
		width: 220,
		flexShrink: 0,
	},
	link: {
		textDecoration: "none",
		color: '#000'
	}
});


export default function Header() {

	const [open, setOpen] = useState(false);

	const history = useHistory();

	const handleClickPage = (to) => {
		history.push(to);
	}

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const classes = useStyles();

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
						<MenuIcon />
					</IconButton>
					<img src={Logo} className={classes.logo} />
				</Toolbar>
			</AppBar>
			<Drawer
				variant="persistent"
				anchor="left"
				open={open}
			>
				<div className={classes.drawer}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem button key={"Home"}>
						<ListItemIcon><HomeIcon /></ListItemIcon>
						<ListItemText primary={"Home"} />
					</ListItem>
					<ListItem button key={"Characters"}>
						<ListItemIcon><GroupIcon /></ListItemIcon>
						<ListItemText primary={"Characters"} />
					</ListItem>
				</List>
			</Drawer>
		</>
	);
}
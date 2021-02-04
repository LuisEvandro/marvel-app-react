import React, { useState } from 'react';
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
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
	drawer: {
		width: 220,
	},
	drawerIcon:{
		marginBottom: 8,
		marginTop: 7
	},
	link: {
		textDecoration: "none",
		color: '#000'
	},
	logo: {
		marginLeft: "auto",
    	marginRight: "auto",
	},
	dividerList:{
		marginTop: 8,
		marginBottom: 8
	}
});


export default function Header() {

	const [open, setOpen] = useState(false);

	const headerItems = [
		{ "Nome": "Home", "Link": "/", "Chave": "HomeKey", "Icone": "HomeIcon" },
		{ "Nome": "Characters", "Link": "/Characters", "Chave": "CharactersKey", "Icone": "GroupIcon" },
	];

	const IconSelected = (Icon) => {
		switch(Icon.IconName){
			case 'HomeIcon': return <HomeIcon/>;
			case 'GroupIcon': return <GroupIcon/>;
			default: return <BrokenImageIcon/>
		}
	};

	function ListItemLink(props) {
		return <ListItem button component="a" {...props} />;
	};

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
					<IconButton edge="start" color="inherit" aria-label="menu-icon" onClick={handleDrawerOpen}>
						<MenuIcon />
					</IconButton>
					<Link to={'/'} className={classes.logo}><img src={Logo} /></Link>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="persistent"
				anchor="left"
				open={open}
			>
				<div className={classes.drawer}>
					<IconButton color="inherit" className={classes.drawerIcon} onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
					<Divider />
				</div>
				<List>
					{headerItems.map((item,index) => (
						<div key={index}>
							<ListItemLink href={item.Link} button key={item.Chave}>
								<ListItemIcon><IconSelected IconName={item.Icone} /></ListItemIcon>
								<ListItemText primary={item.Nome} />
							</ListItemLink>
							<Divider className={classes.dividerList} />
						</div>
					))}
				</List>
			</Drawer>
		</>
	);
}
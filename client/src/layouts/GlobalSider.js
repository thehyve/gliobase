import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from "react-router-dom";
import './GlobalSider.css';
const SubMenu = Menu.SubMenu;

class GlobalSider extends Component {
  	render() {
		return (
			<div>
			<div className="global-sider-logo">
        <Link to="/">
          <span className="logo-big">{this.props.collapsed ? "g" : "glio"}</span>
          <span className="logo-small">DB</span>
        </Link>
			</div>
			<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
			<Menu.Item key="1">
				<Link to="/">
          <Icon type="home"/>
          <span>Home</span>
				</Link>
			</Menu.Item>
			<Menu.Item key="2">
				<Link to="/search">
          <Icon type="search"/>
          <span>Search</span>
				</Link>
			</Menu.Item>
			<Menu.Item key="3">
				<Link to="/exploration">
          <Icon type="pie-chart" />
          <span>Exploration</span>
				</Link>            
			</Menu.Item>
			{/*
			<SubMenu key="sub1" title={<span><Icon type="user" /><span>User</span></span>}>
				<Menu.Item key="4">
				<Link to="/profile">
					<span>Profile</span>
				</Link>
				</Menu.Item>
				<Menu.Item key="5">
				<Link to="/settings">
					<span>Settings</span>
				</Link>
				</Menu.Item>
			</SubMenu>
			*/}
			</Menu>
			</div>
		)
  	};
}

export default GlobalSider

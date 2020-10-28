import React, { Component } from 'react';
import { Icons } from '../../iconSet';
import { SideBar, SideBarItem, SideBarDropDown, SideBarDropDownItem} from '../template/Layout';

/*----------------------------------------------------------------------------------------------------*/
/*  Admin  */
class Admin extends Component
{
	render()
	{
		return (
			<SideBar>
				<SideBarItem active={ false } url="/" name='menu.dashboard' icon={ Icons.dashboard } />

                <SideBarDropDown name='menu.cadastro' icon={Icons.cadastro}>
					<SideBarDropDownItem name='menu.user.title' url="/users/list" />
					<SideBarDropDownItem name='menu.company.title' url="/companies/list" />


				</SideBarDropDown>






			</SideBar>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

export { Admin};

import {Header as UIHeader, HeaderName, HeaderMenuItem, HeaderNavigation, HeaderMenu, HeaderGlobalBar, HeaderGlobalAction} from 'carbon-components-react';
import {Search20, Notification20, AppSwitcher20} from '@carbon/icons-react';
import React from 'react';
import {Link} from 'react-router-dom';

export const Header = () => (
    <UIHeader aria-label="IBM Platform Name">
      <HeaderName element={Link} to='/' prefix=''>
        [DigiPIL]
      </HeaderName>
      <HeaderNavigation aria-label="IBM [Platform]">
          <HeaderMenuItem element={Link} to='/'>
            Find PIL
          </HeaderMenuItem>
          <HeaderMenuItem element={Link} to='/interactions'>Find Drug Interaction</HeaderMenuItem>
        </HeaderNavigation>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Search">
          <Search20 />
        </HeaderGlobalAction>
        <HeaderGlobalAction
          aria-label="Notifications">
          <Notification20 />
        </HeaderGlobalAction>
        <HeaderGlobalAction
          aria-label="App Switcher"
          tooltipAlignment="end">
          <AppSwitcher20 />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </UIHeader>
  );
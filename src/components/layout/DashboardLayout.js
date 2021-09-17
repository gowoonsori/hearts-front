import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {experimentalStyled} from '@material-ui/core';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayoutRoot = experimentalStyled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
  width: '100%',
  minWidth: '530px'
}));

const DashboardLayoutWrapper = experimentalStyled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 58
}));

const DashboardLayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const DashboardLayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  marginTop: '22px',
  height: '100%',
  overflow: 'auto'
});

const DashboardLayout = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <DashboardLayoutRoot id="dashboard-layout-root">
      <DashboardNavbar onNavOpen={() => setIsNavOpen(true)} />
      <DashboardSidebar onClose={() => setIsNavOpen(false)} open={isNavOpen} />
      <DashboardLayoutWrapper id="dashboard-layout-wrapper">
        <DashboardLayoutContainer id="dashboard-layout-container">
          <DashboardLayoutContent id="dashboard-layout-content">
            <Outlet />
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;

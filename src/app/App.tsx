import { useEffect, useCallback, type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { useMediaQuery } from 'react-responsive';

import { useAppDispatch, useAppSelector } from '@/app/store';
import {
  fetchCurrentUser,
  hideOnboarding,
  selectAccessToken,
  selectCurrentUser,
  selectShowOnboarding,
} from '@/entities/User';
import Header from '@/shared/ui/Header';
import Sidebar from '@/shared/ui/Sidebar';
import MainContent from '@/shared/ui/MainContent';
import OnboardingModal from '@/shared/ui/OnboardingModal';

import styles from './App.module.scss';

const { Content } = Layout;

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const accessToken = useAppSelector(selectAccessToken);
  const user = useAppSelector(selectCurrentUser);
  const showOnboarding = useAppSelector(selectShowOnboarding);

  const handleCloseOnboarding = useCallback(() => {
    dispatch(hideOnboarding());
  }, [dispatch]);

  useEffect(() => {
    if (accessToken && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [accessToken, user, dispatch]);

  return (
    <Layout className={styles.layout}>
      <Header />

      <Layout className={styles.mainLayout}>
        {!isMobile && (
          <Layout.Sider className={styles.sider} width={220} theme="light">
            <Sidebar />
          </Layout.Sider>
        )}

        <Content className={styles.content}>
          <MainContent>
            <Outlet />
          </MainContent>
        </Content>
      </Layout>

      <OnboardingModal
        visible={showOnboarding}
        onClose={handleCloseOnboarding}
      />
    </Layout>
  );
};

export default App;
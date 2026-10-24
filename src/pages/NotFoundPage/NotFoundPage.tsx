import { useNavigate } from 'react-router-dom';

import {
  Card,
  Container,
  Description,
  HomeButton,
  Subtitle,
  Title,
} from './NotFoundPage.styles';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Card>
        <Subtitle>404</Subtitle>

        <Title>Page Not Found</Title>

        <Description>
          The page you are looking for does not exist or may have been moved.
        </Description>

        <HomeButton onClick={() => navigate('/resources')}>
          Go to Resources
        </HomeButton>
      </Card>
    </Container>
  );
};

export default NotFoundPage;

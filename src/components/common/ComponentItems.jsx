
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

export const BodyDiv = styled.div`
  display: inline;
`;

export const CloseButton = styled(Button)`
  background-color: white;
`;

export const SearchDrawer = styled.div`
  padding: 1em;
  margin-bottom: 0.3em;
  text-align: center;
`;

export const InfoDrawer = styled.div`
  padding: 1em;
  display: flex;
  align-items: center;

  h3 {
    flex: 2;
    text-align: left;
  }

  div {
    flex: 3;
    text-align: left;
  }
`;

export const FooterDrawer = styled.div`
  text-align: center;
  margin-top: 3em;
`;

export const FormControlComponent = styled(FormControl)`
  width: 100%;
`;

export const SearchList = styled(List)`
  width: 100%;
`;

export const SearchTypography = styled(Typography)`
  display: inline;
`;







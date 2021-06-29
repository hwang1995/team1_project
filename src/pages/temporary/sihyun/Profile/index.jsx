import BlockDiv from "./BlockDiv";
import InlineDiv from "./InlineDiv";
import Avatar from '@material-ui/core/Avatar';
import Ptext from "../Text/Ptext";

function Profile() {
  return (
    <InlineDiv>
      <BlockDiv>
        <Ptext>박시현</Ptext>
        <Ptext>의사</Ptext>
      </BlockDiv>
      <InlineDiv>
        <Avatar />
      </InlineDiv>
    </InlineDiv>
  );
}

export default Profile;
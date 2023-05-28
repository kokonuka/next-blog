import { Link as Scroll } from 'react-scroll';
import { IdsWithHeadings } from '../../pages/posts/[id]';
import { Box } from '@chakra-ui/react';

type Props = {
  idsWithHeadings: IdsWithHeadings[]
}

export const SideMenu: React.FC<Props> = ({ idsWithHeadings }) => {
  return (
    <Box bg="white" p="5" borderRadius="10">
      <p>目次</p>
      {idsWithHeadings.map(id => (
        <>
          <Scroll to={`${id.id}`} smooth={true} >{id.heading}</Scroll><br />
        </>
      ))}
    </Box>
  )
}
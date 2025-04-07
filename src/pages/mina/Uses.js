import usesBackgroundPlaceholder from 'assets/uses-background-placeholder.jpg';
import usesBackground from 'assets/uses-background.mp4';
import qrCodeLarge from 'assets/qrcode-large.png';
import qrCodePlaceHolder from 'assets/qrcode-placeholder.png';
import qrCode from 'assets/qrcode.png';
import { media } from 'utils/style';
import { Footer } from 'components/Footer';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Link } from 'components/Link';
import { Text } from 'components/Text';
import { List, ListItem } from 'components/List';
import { Meta } from 'components/Meta';
import { Table, TableBody, TableCell, TableHeadCell, TableRow } from 'components/Table';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from 'layouts/Project';
import { Fragment, useState, useEffect, useRef } from 'react';
import styles from './Uses.module.css';
import { Image } from 'components/Image';
import { DecoderText } from 'components/DecoderText';
import { Heading } from 'components/Heading';

const ZomsText = () => {
  return (
    <>
      <Text size="l" as="p">
        {
          'Gaa Welcome to Frankfurt, Ehtemaln alan residi Frankfurt ke dari injaro mibini. Doost dashtm ye jayi vojood dashte bashe ke chizaye ghashangi ke bkhatere to boode ro inja bezaram va hamishe ghabel didan bashe.'
        }
      </Text>
      <Text size="l" as="p">
        {
          'Hame in khaterat be khatere vojood to bude va man be shakhse qadrdane in khaterat qashang hastm🥲.'
        }
      </Text>
    </>
  );
};

export const Uses = () => {
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmttedValue] = useState('');
  const audioRef = useRef(null);

  useEffect(() => {
    if (submittedValue === 'bahar') {
      // Play the music only when the submitted value matches "bahar"
      console.log('play');
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(error => {
            console.error('Autoplay blocked:', error);
          });
        }
      }, 1500); // Optional delay of 500ms
    } else {
      // Pause or stop the music if the value is not "bahar"
      console.log('pause');
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset playback position
      }
    }
  }, [submittedValue]); // Runs when `submittedValue` changes

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    setSubmttedValue(inputValue);
    setInputValue('');
  };

  return (
    <Fragment>
      <Meta
        title="Mina"
        description="A list of hardware and software I use to do my thing"
      />
      {submittedValue === 'bahar' ? (
        <ProjectContainer className={styles.uses}>
          <audio ref={audioRef} src="/zoms.mp3" loop />
          <ProjectHeader
            title={<DecoderText text="Hello Ga" start={true} delay={500} />}
            description={<ZomsText />}
          />
          <ProjectSection padding="none" className={styles.section}>
            <ProjectSectionContent>
              <ProjectTextRow width="m">
                <Heading className={styles.title} level={4}>
                  <DecoderText text="Axamoon" start={true} delay={1000} />
                </Heading>
                <ProjectSectionText as="div">
                  <List>
                    <ListItem>
                      <Link href="https://photos.app.goo.gl/bMWUDVDuPBBVpudV8">
                        Axa va filmayi
                      </Link>{' '}
                      ke dashtim ro mituni tooye link bebini. az QR-Code zir ham mituni
                      estefade koni. har moqe deltang shodi bia ye negahi bokon.🫠🥲
                    </ListItem>
                    <ListItem>
                      Ehtemaln alan ye ahang dare play mishe barat, vali age ahangi play
                      nshod, age doos dashti in{' '}
                      <Link href="https://irsv.upmusics.com/AliBZ/Mesl%20Avalash%20To%20Ashegham%20nabash%20(320).mp3">
                        ahang
                      </Link>{' '}
                      ro moqe didaneshoon play kon :)
                    </ListItem>
                    <ListItem>
                      Koln hm in Axa chand vaght yebar update mishan va avaz mishan, Har
                      chand vaght ye bar be inja sar bezan, chon shyd hata ye chiz jadid
                      be zehnam berese va inja bezaramesh🥲
                    </ListItem>
                    <Image
                      reveal
                      delay={100}
                      style={{ padding: '24px 0 24px 0' }}
                      placeholder={qrCodePlaceHolder}
                      srcSet={[qrCode, qrCodeLarge]}
                      sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                    />
                    <ListItem>
                      {
                        'Merc ke boodi va zendegi ro ghashang tar kardi❤️, Khyli khyli dooset drm va omidvaram part jadid zendegit ghashang tar az in ham beshe :)))'
                      }
                    </ListItem>
                  </List>
                </ProjectSectionText>
              </ProjectTextRow>
            </ProjectSectionContent>
          </ProjectSection>
        </ProjectContainer>
      ) : (
        <ProjectContainer className={styles.uses}>
          <ProjectBackground
            src={{ src: usesBackground }}
            placeholder={usesBackgroundPlaceholder}
            opacity={0.7}
          />
          <ProjectSection padding="none" className={styles.section}>
            <ProjectHeader title="Welcome Boo👻" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <Input
                label={'Password'}
                value={inputValue}
                error={
                  submittedValue !== 'bahar' && submittedValue !== ''
                    ? 'Ga khordi, eshtebahe'
                    : ''
                }
                onChange={handleChange}
              ></Input>
              <Button onClick={handleSubmit}>Enter</Button>
            </div>
          </ProjectSection>
        </ProjectContainer>
      )}
      {submittedValue === 'bahar' && <Footer />}
    </Fragment>
  );
};

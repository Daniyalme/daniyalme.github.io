import usesBackgroundPlaceholder from 'assets/uses-background-placeholder.jpg';
import usesBackground from 'assets/uses-background.mp4';
import { Footer } from 'components/Footer';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Link } from 'components/Link';
import { Text } from 'components/Text';
import { List, ListItem } from 'components/List';
import { Meta } from 'components/Meta';
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
import styles from './Welcome.module.css';
import { DecoderText } from 'components/DecoderText';
import { Heading } from 'components/Heading';
import dynamic from 'next/dynamic';

const permitted_strings = ['dorsa', 'Dorsa', 'DORSA'];
const DisplacementSphere = dynamic(() =>
  import('layouts/Home/DisplacementSphere').then(mod => mod.DisplacementSphere)
);

const HeaderText = () => {
  return (
    <>
      <Text size="l" as="span">
        {'Esmeto in zir bzn ke motmaen sham adam dorost oomade'}
      </Text>
    </>
  );
};

export const WelcomePage = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputValuePass, setInputValuePass] = useState('');
  const [submittedValue, setSubmttedValue] = useState('');
  const [submittedPass, setSubmittedPass] = useState('');
  const [inputError, setInputError] = useState('');
  const [inputErrorPass, setInputErrorPass] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [is]
  const audioRef = useRef(null);

  useEffect(() => {
    if (permitted_strings.includes(submittedPass)) {
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
  }, [submittedPass]); // Runs when `submittedValue` changes

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const handleChangePass = e => {
    setInputValuePass(e.target.value);
  };

  const handleSubmitPass = () => {
    setSubmittedPass(inputValuePass);
    setInputValue('');

    if (permitted_strings.includes(inputValuePass)) {
      setInputErrorPass('');
    } else {
      setInputErrorPass('Wrong Name :)');
    }
  };

  const handleSubmit = async () => {
    const value = inputValue;
    if (!value) return;
    setIsSubmitting(true);
    setInputError('');
    // clear the input immediately for UX
    setInputValue('');

    try {
      // NOTE: set NEXT_PUBLIC_NOTIFY_URL in your environment to the full Cloudflare Worker URL
      // The site is standalone, so a relative path (e.g. '/notify') would target the site's origin,
      // not the worker. Require an absolute URL here and show an error if it's not configured.
      const notifyUrl = process.env.NEXT_PUBLIC_NOTIFY_URL;
      if (!notifyUrl) {
        setInputError(
          'Notify URL not configured. Set NEXT_PUBLIC_NOTIFY_URL to your worker URL'
        );
        setIsSubmitting(false);
        return;
      }
      const resp = await fetch(notifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value }),
      });

      let data = {};
      try {
        data = await resp.json();
      } catch (e) {
        // ignore JSON parse error
      }

      if (resp.ok) {
        // keep the submitted value so existing behavior (e.g. playing audio for "bahar") still works
        setSubmttedValue(value);
        // show success or returned message in the input error slot (per request)
        setInputError('Sent successfully');
      } else {
        setInputError('Failed to send');
      }
    } catch (err) {
      setInputError('Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Fragment>
      <Meta
        title="Welcome rsa"
        description="A list of hardware and software I use to do my thing"
      />
      {permitted_strings.includes(submittedPass) ? (
        <ProjectContainer className={styles.uses}>
          <audio ref={audioRef} src="/effect.mp3" loop />
          <DisplacementSphere />

          <ProjectHeader
            title={<DecoderText text="Hi Dorsa :))" start={true} delay={500} />}
            description={
              <>
                <Text size="l" as="p">
                  {'Kheyli mamnoon ke oomadi inja'}
                </Text>
                <br />
                <Text size="l" as="p">
                  {'Age doos dashti ba 🎧Headphone🎧 edame bede'}
                </Text>
              </>
            }
          />
          <ProjectSection padding="none" className={styles.section}>
            <ProjectSectionContent>
              <ProjectTextRow width="m">
                <Heading className={styles.title} level={4}>
                  <DecoderText text="..." start={true} delay={1000} />
                </Heading>
                <ProjectSectionText as="div">
                  <List>
                    <ListItem>
                      2 mah akhir har rooz mididamet va nmidunestm chtori sohbat ro baz
                      konm, chon axaran ba doostat budi. Va in tanha rahi bud ke be zehnam
                      resid.
                    </ListItem>
                    <ListItem>
                      Khyli cute va doost dashtani hasti va hes mikonm ke adam khubi
                      hasti, va bnzrm arzesh dasht ke in kararo barat bokonm ta betunm
                      deleto be dast biyaram. Khyli doos daram bishtr dr moredet bdunm va
                      betunim vaght begzaroonim.
                    </ListItem>
                    <ListItem>
                      Nmidunm, vali hamishe ba negahi ke mikardi hes mikrdm shyd khyli
                      khoshet nayad azam, vali delo be darya zadam va goftm emtehan konm
                    </ListItem>
                    <ListItem>
                      Shayad bnzrt khyli chosi bashe ke ovordamet tooye site khodm :)),
                      vali bkhoda platformi nadashtm dame dast ke in ide ro ejra konm.
                      lotfan be hesabe chosi budn nazar
                    </ListItem>
                    <ListItem>
                      Age ta inja oomdi ehtemalan nazaret mosbat bude ke bishtr ba ham
                      ashna beshim, age doos dashti shomarato ya ID telegram ya har rahi
                      ke doos dari ro inja baram bzn va baraye man miad. hata agar sohbati
                      dari hm mituni inja begi
                    </ListItem>
                    <div
                      style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
                    >
                      <Input
                        label={'Write Your Message'}
                        value={inputValue}
                        error={inputError}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      ></Input>
                      <Button onClick={handleSubmit} loading={isSubmitting}>
                        Send
                      </Button>
                    </div>
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
            <ProjectHeader title="Hello" description={<HeaderText />} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <Input
                label={'Password'}
                value={inputValuePass}
                error={inputErrorPass}
                onChange={handleChangePass}
              ></Input>
              <Button onClick={handleSubmitPass}>Enter</Button>
            </div>
          </ProjectSection>
        </ProjectContainer>
      )}
      {permitted_strings.includes(submittedPass) && <Footer />}
    </Fragment>
  );
};

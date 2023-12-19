import React from 'react';
import Section from '../layout/Section';
import ImageWithMedia from '../sections/imageWithMedia';
import Globe from '../assets/globe';

export default function LandingPage() {
  return (
    <Section>
        <ImageWithMedia media={<Globe />}/>
    </Section>
  );
};

'use client';

import { Column, Text, Flex } from '@fck/components/ui';
import type * as React from 'react';
import type { TableOfContentsProps } from '@fck/components/interfaces';

const TableOfContents: React.FC<TableOfContentsProps> = ({
  structure,
  about,
}) => {
  const scrollTo = (id: string, offset: number) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (!about.tableOfContent.display) {
    return null;
  }

  return (
    <Column
      left="0"
      style={{
        top: '50%',
        transform: 'translateY(-50%)',
        whiteSpace: 'nowrap',
      }}
      position="fixed"
      paddingLeft="24"
      gap="32"
      hide="m"
    >
      {structure
        .filter((section) => section.display)
        .map((section, sectionIndex) => (
          <Column key={sectionIndex} gap="12">
            <Flex
              cursor="interactive"
              className="hover"
              gap="8"
              vertical="center"
              onClick={() => scrollTo(section.title, 80)}
            >
              <Flex height="1" minWidth="16" background="neutral-strong" />
              <Text>{section.title}</Text>
            </Flex>
            {about.tableOfContent.subItems &&
              section.items.map((item, itemIndex) => (
                <Flex
                  hide="l"
                  key={itemIndex}
                  style={{ cursor: 'pointer' }}
                  className="hover"
                  gap="12"
                  paddingLeft="24"
                  vertical="center"
                  onClick={() => scrollTo(item, 80)}
                >
                  <Flex
                    height="1"
                    minWidth="8"
                    background="neutral-strong"
                  />
                  <Text>{item}</Text>
                </Flex>
              ))}
          </Column>
        ))}
    </Column>
  );
};

export default TableOfContents;

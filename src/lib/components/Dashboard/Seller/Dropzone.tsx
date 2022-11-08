import { useRef } from 'react';
import { Text, Group, Button, createStyles } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    marginBottom: 30
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4]
  },

  control: {
    position: 'absolute',
    width: 250,
    left: 'calc(50% - 125px)',
    bottom: -20
  }
}));

type DropZoneProp = {
  onDrop: (file: string) => void;
};

export function DropzoneButton({ onDrop }: DropZoneProp) {
  const [fileName, setFileName] = useState('');
  const { classes, theme } = useStyles();
  const openRef = useRef<() => void>(null);

  const handleImageUpload = (file: Blob) => {
    let imageDataUrl = URL.createObjectURL(file);
    onDrop(imageDataUrl);
  };

  return (
    <div className={classes.wrapper}>
      <Dropzone
        multiple={false}
        openRef={openRef}
        onDrop={(files) => handleImageUpload(files[0])}
        onReject={(files) => console.log('rejected files', files)}
        className={classes.dropzone}
        radius="md"
        accept={IMAGE_MIME_TYPE}
        maxSize={40 * 1024 ** 2}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group position="center">
            <Dropzone.Accept>
              <IconDownload size={50} color={theme.colors[theme.primaryColor][6]} stroke={1.5} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload
                size={50}
                color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
                stroke={1.5}
              />
            </Dropzone.Idle>
          </Group>

          <Text align="center" weight={700} size="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Image file less than 5mb</Dropzone.Reject>
            <Dropzone.Idle>Upload product image</Dropzone.Idle>
          </Text>
          <Text align="center" size="sm" mt="xs" color="dimmed">
            Drag&apos;n&apos;drop you image here to upload. Max size allowed is 5mb.
          </Text>
        </div>
      </Dropzone>

      <Button
        className={classes.control}
        color="blue"
        size="md"
        radius="xl"
        onClick={() => openRef.current?.()}
      >
        Select Image
      </Button>
    </div>
  );
}

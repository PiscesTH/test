import React, { useState } from 'react';
import Resizer from 'react-image-file-resizer';
import { saveAs } from 'file-saver';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resizedImage, setResizedImage] = useState<Blob | null>(null);
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(300);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleResize = () => {
    if (!selectedFile) return;

    Resizer.imageFileResizer(
      selectedFile,
      width,
      height,
      'JPEG',
      100,
      0,
      (uri : any) => {
        if (uri instanceof Blob) {
          setResizedImage(uri);
        }
      },
      'blob'
    );
  };

  const handleDownload = () => {
    if (resizedImage) {
      saveAs(resizedImage, 'resized_image.jpg');
    }
  };

  return (
    <div className="App">
      <h1>Image Resize and Download</h1>
      <div>
        <label>
          Width:
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </label>
      </div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleResize} disabled={!selectedFile}>
        Resize Image
      </button>
      <button onClick={handleDownload} disabled={!resizedImage}>
        Download Resized Image
      </button>
    </div>
  );
};

export default App;